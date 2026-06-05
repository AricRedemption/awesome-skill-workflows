import { createServer } from "http";
import { resolve, extname } from "path";
import { existsSync, statSync, createReadStream } from "fs";

const PORT = 7745;
const ROOT = resolve(import.meta.dirname);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

createServer((req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = resolve(ROOT, urlPath.slice(1));

  // Security: stay inside ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // SPA fallback: missing file or directory → index.html
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    const index = resolve(ROOT, "index.html");
    res.writeHead(200, { "Content-Type": MIME_TYPES[".html"] });
    createReadStream(index).pipe(res);
    return;
  }

  const ext = extname(filePath);
  const mime = MIME_TYPES[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": mime });
  createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(`Skill wiki → http://localhost:${PORT}`);
});