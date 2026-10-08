/**
 * Contact form API for the AYDIN TRANSPORT & LOGISTIK website.
 *
 * The website itself stays static (nginx); this service is the only part of the stack that
 * talks to the outside world. It takes the enquiry form as JSON and hands it to an SMTP
 * server — Gmail by default — so the message lands in the owner's inbox instead of the
 * visitor's browser storage.
 *
 *   GET  /api/health   -> { ok: true, mail: "configured" | "missing" }
 *   POST /api/contact  -> { ok: true } once the message is accepted by the SMTP server
 *
 * The site is reachable whether or not this service is running: nginx proxies /api/ here,
 * and the form reports a failure if the service (or the mail account) is not available.
 *
 * Environment (the two credentials arrive from the platform-managed env file):
 *   GMAIL_USER          the sending Gmail address
 *   GMAIL_APP_PASSWORD  a Google "App Password" for that account (2-step verification)
 * Optional: CONTACT_TO (default the owner's address), PORT (8080),
 *           SMTP_HOST / SMTP_PORT (default smtp.gmail.com:465).
 */
import http from "node:http";
import nodemailer from "nodemailer";

const PORT = Number(process.env.PORT || 8080);
const CONTACT_TO = process.env.CONTACT_TO || "Aydinmuhammet601@gmail.com";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.GMAIL_USER || "";
const SMTP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";
const MAIL_CONFIGURED = Boolean(SMTP_USER && SMTP_PASSWORD);

const transporter = MAIL_CONFIGURED
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // 465 = implicit TLS, 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    })
  : null;

/* Accepted form fields and the longest value kept for each; anything else is dropped. */
const FIELDS = {
  name: 120,
  company: 120,
  email: 160,
  phone: 60,
  service: 90,
  origin: 140,
  destination: 140,
  details: 300,
  date: 24,
  message: 4000,
};

const LABELS = {
  company: "Firma",
  email: "E-Mail",
  phone: "Telefon",
  service: "Leistung",
  origin: "Abholort",
  destination: "Zielort",
  details: "Sendungsdetails",
  date: "Gewünschter Termin",
};

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const recentHits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const inWindow = (time) => now - time < RATE_LIMIT.windowMs;
  const hits = (recentHits.get(ip) || []).filter(inWindow);
  hits.push(now);
  recentHits.set(ip, hits);

  if (recentHits.size > 500) {
    for (const [key, times] of recentHits) {
      if (times.every((time) => !inWindow(time))) recentHits.delete(key);
    }
  }
  return hits.length > RATE_LIMIT.max;
}

function singleLine(value, max) {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/ {2,}/g, " ")
    .trim()
    .slice(0, max);
}

function readEnquiry(body) {
  const data = {};
  for (const [field, max] of Object.entries(FIELDS)) {
    data[field] = field === "message"
      ? String(body[field] ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max)
      : singleLine(body[field], max);
  }
  return data;
}

function validate(data) {
  if (!data.name) return "missing_name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return "invalid_email";
  if (!data.message) return "missing_message";
  return "";
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function buildEnquiryEmail(data) {
  const service = data.service ? ` – ${data.service}` : "";
  const rows = [["Name", data.name]];
  for (const [field, label] of Object.entries(LABELS)) {
    if (field !== "message" && data[field]) rows.push([label, data[field]]);
  }

  const text = [
    "Neue Anfrage über die Website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Nachricht:",
    data.message,
    "",
  ].join("\n");

  const html = [
    '<h2 style="font-family:sans-serif">Neue Anfrage über die Website</h2>',
    '<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">',
    rows
      .map(([label, value]) =>
        `<tr><td style="padding:4px 14px 4px 0;color:#666">${escapeHtml(label)}</td>` +
        `<td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`)
      .join(""),
    "</table>",
    '<p style="font-family:sans-serif;font-size:15px"><strong>Nachricht</strong></p>',
    `<p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
  ].join("");

  return {
    subject: `Neue Anfrage: ${data.name}${service}`,
    text,
    html,
  };
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let raw = "";
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 64 * 1024) {
        reject(new Error("payload_too_large"));
        req.destroy();
        return;
      }
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, "http://localhost").pathname;

  if (req.method === "GET" && path === "/api/health") {
    sendJson(res, 200, { ok: true, mail: MAIL_CONFIGURED ? "configured" : "missing" });
    return;
  }

  if (req.method !== "POST" || path !== "/api/contact") {
    sendJson(res, 404, { ok: false, error: "not_found" });
    return;
  }

  if (!MAIL_CONFIGURED) {
    console.error("[contact] refused: GMAIL_USER / GMAIL_APP_PASSWORD are not set");
    sendJson(res, 503, { ok: false, error: "mail_not_configured" });
    return;
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim()
    || req.socket.remoteAddress
    || "unknown";
  if (rateLimited(ip)) {
    sendJson(res, 429, { ok: false, error: "too_many_requests" });
    return;
  }

  let body;
  try {
    body = await readJson(req);
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message });
    return;
  }

  const data = readEnquiry(body);
  const problem = validate(data);
  if (problem) {
    sendJson(res, 400, { ok: false, error: problem });
    return;
  }

  const { subject, text, html } = buildEnquiryEmail(data);
  try {
    await transporter.sendMail({
      from: `"Website Aydın Transport" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: data.email,
      subject,
      text,
      html,
    });
    console.log(`[contact] delivered enquiry from ${data.email} to ${CONTACT_TO}`);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("[contact] delivery failed:", error.message);
    sendJson(res, 502, { ok: false, error: "delivery_failed" });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `contact api listening on :${PORT} — mail ${MAIL_CONFIGURED
      ? `configured (${SMTP_HOST}:${SMTP_PORT} -> ${CONTACT_TO})`
      : "NOT configured: set GMAIL_USER and GMAIL_APP_PASSWORD"}`,
  );
});
