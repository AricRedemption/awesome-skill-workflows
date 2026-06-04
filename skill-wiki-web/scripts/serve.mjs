import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4179);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer((request, response) => {
  const requestPath = new URL(request.url ?? "/", `http://${request.headers.host}`).pathname;
  const relativePath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.join(webRoot, relativePath);
  const safePath = path.normalize(filePath);

  if (!safePath.startsWith(webRoot)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(safePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const extension = path.extname(safePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Skill Wiki web server running at http://127.0.0.1:${port}`);
});
