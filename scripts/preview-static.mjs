// Local preview of the exported files; production is served by Firebase Hosting.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function exists(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

if (!(await exists(resolve(root, "index.html")))) {
  throw new Error("No existe out/index.html. Ejecutá npm run build primero.");
}

createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (
      pathname.startsWith("//") ||
      pathname.includes("\\") ||
      pathname.includes("\0")
    ) {
      response.writeHead(400).end();
      return;
    }
    const file = resolve(root, `.${pathname}`);
    if (!file.startsWith(resolve(root) + sep) && file !== resolve(root)) {
      response.writeHead(400).end();
      return;
    }
    let destination;
    if (pathname === "/index" || pathname === "/index.html") destination = "/";
    else if (pathname !== "/" && pathname.endsWith("/"))
      destination = pathname.slice(0, -1);
    else if (pathname.endsWith(".html") && (await exists(file)))
      destination = pathname.slice(0, -5);
    if (destination) {
      response.writeHead(301, { Location: destination + url.search }).end();
      return;
    }
    const candidates =
      pathname === "/" ? [resolve(root, "index.html")] : [file, `${file}.html`];
    let target;
    for (const candidate of candidates) {
      if (await exists(candidate)) {
        target = candidate;
        break;
      }
    }
    const status = target ? 200 : 404;
    target ??= resolve(root, "404.html");
    const content = await readFile(target);
    response.writeHead(status, {
      "Content-Type": types[extname(target)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    response.writeHead(400).end();
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Exportación estática: http://localhost:${port}`);
});
