import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const rootDir = path.resolve("build/client");
const port = Number(process.env.PORT ?? 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".data": "application/json; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(urlPath) {
  const cleanedPath = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = cleanedPath === "/" ? "/index.html" : cleanedPath;

  if (path.extname(normalized)) {
    return path.join(rootDir, normalized);
  }

  return path.join(rootDir, normalized, "index.html");
}

async function streamFile(filePath, response) {
  const extension = path.extname(filePath);
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}

const server = http.createServer(async (request, response) => {
  const requestedPath = resolveFile(request.url ?? "/");

  try {
    await access(requestedPath);
    await streamFile(requestedPath, response);
    return;
  } catch {}

  const assetPath = path.join(
    rootDir,
    decodeURIComponent((request.url ?? "/").slice(1)),
  );

  try {
    await access(assetPath);
    await streamFile(assetPath, response);
    return;
  } catch {}

  const fallbackPath = path.join(rootDir, "__spa-fallback.html");

  try {
    await access(fallbackPath);
    await streamFile(fallbackPath, response);
    return;
  } catch {}

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Preview server running at http://127.0.0.1:${port}`);
});
