import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { refreshBaiduData } from "./refresh-baidu.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 8787);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "content-type": type, "cache-control": "no-store" });
  res.end(body);
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const target = normalize(join(root, pathname));
  if (!target.startsWith(root)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }
  if (!existsSync(target)) {
    send(res, 404, "Not found", "text/plain; charset=utf-8");
    return;
  }
  const data = await readFile(target);
  send(res, 200, data, types[extname(target)] || "application/octet-stream");
}

const server = createServer(async (req, res) => {
  try {
    if (req.url?.startsWith("/api/refresh")) {
      const result = await refreshBaiduData();
      send(res, result.ok ? 200 : 503, JSON.stringify(result, null, 2));
      return;
    }
    await serveStatic(req, res);
  } catch (error) {
    send(
      res,
      500,
      JSON.stringify({ ok: false, error: String(error?.message || error), stack: error?.stack }, null, 2)
    );
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`百度投放看板已启动：http://127.0.0.1:${port}/`);
});
