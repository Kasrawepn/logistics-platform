// Dependency-free static dev server with live reload.
// Serves dental-clinic/ on port 3000, injects /config.js from PAYPAL_CLIENT_ID
// (delivered by the platform outside the repo) and pushes a reload over SSE
// whenever a served file changes.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = Number(process.env.PORT || 3000);
const APP_DIR = path.resolve(process.env.APP_DIR || 'dental-clinic');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

const RELOAD_SNIPPET = `
<script>
(function () {
  try {
    var es = new EventSource('/_reload');
    es.onmessage = function () { window.location.reload(); };
  } catch (e) {}
})();
</script>
`;

const clients = new Set();

function resolveTarget(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }
  const resolved = path.resolve(APP_DIR, '.' + decoded);
  if (resolved !== APP_DIR && !resolved.startsWith(APP_DIR + path.sep)) return null;
  return resolved;
}

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.url === '/_reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write('retry: 1000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // The PayPal client ID never lives in the repository: it arrives as an
  // environment variable and is handed to the browser through this endpoint.
  if (req.url.split('?')[0] === '/config.js') {
    const clientId = JSON.stringify(process.env.PAYPAL_CLIENT_ID || '');
    send(res, 200, MIME['.js'], `window.PAYPAL_CLIENT_ID = ${clientId};\n`);
    return;
  }

  const target = resolveTarget(req.url || '/');
  if (!target) {
    send(res, 403, MIME['.txt'], 'Forbidden');
    return;
  }

  fs.stat(target, (err, stat) => {
    const file = !err && stat.isDirectory() ? path.join(target, 'index.html') : target;
    fs.readFile(file, (readErr, data) => {
      if (readErr) {
        send(res, 404, MIME['.txt'], 'Not found');
        return;
      }
      const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
      if (type.startsWith('text/html')) {
        res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
        res.end(data.toString('utf8').replace(/<\/body>/i, RELOAD_SNIPPET + '</body>'));
        return;
      }
      send(res, 200, type, data);
    });
  });
});

let reloadTimer = null;
try {
  fs.watch(APP_DIR, { recursive: true }, () => {
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
      for (const client of clients) client.write('data: reload\n\n');
    }, 120);
  });
} catch (error) {
  console.warn('live reload disabled:', error.message);
}

server.listen(PORT, '0.0.0.0', () => {
  const paypal = process.env.PAYPAL_CLIENT_ID ? 'configured' : 'not configured (test payment mode)';
  console.log(`Serving ${APP_DIR} on http://0.0.0.0:${PORT} — PayPal: ${paypal}`);
});
