import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const port = Number(valueAfter('--port', '4173'));
const host = valueAfter('--host', '0.0.0.0');
const root = process.cwd();
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2'
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://local').pathname);
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, safePath);
  if (pathname.endsWith('/')) file = join(file, 'index.html');
  if (!existsSync(file) || statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(port, host);
