// Dependency-free static dev server with live reload.
// Serves the apps in logistics-platform/ from a single origin on port 3000 so the
// three panels share the same localStorage. Injects a reload snippet into HTML,
// and pushes a reload over SSE whenever a served file changes.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = Number(process.env.PORT || 3000);
const APP_DIR = path.resolve(process.env.APP_DIR || 'logistics-platform');

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

  const target = resolveTarget(req.url || '/');
  if (!target) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(target, (err, stat) => {
    const file = !err && stat.isDirectory() ? path.join(target, 'index.html') : target;
    fs.readFile(file, (readErr, data) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }
      const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
      const headers = { 'Content-Type': type, 'Cache-Control': 'no-store' };
      if (type.startsWith('text/html')) {
        res.writeHead(200, headers);
        res.end(data.toString('utf8').replace(/<\/body>/i, RELOAD_SNIPPET + '</body>'));
        return;
      }
      res.writeHead(200, headers);
      res.end(data);
    });
  });
});

let reloadTimer = null;
try {
  fs.watch(APP_DIR, { recursive: true }, () => {
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
      for (const client of clients) client.write('data: reload\n\n');
    }, 100);
  });
} catch (e) {
  console.warn('live reload disabled:', e.message);
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serving ${APP_DIR} on http://0.0.0.0:${PORT} (live reload enabled)`);
});
