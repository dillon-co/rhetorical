import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root = new URL('./dist/', import.meta.url);
const types = {html:'text/html',js:'text/javascript',css:'text/css',png:'image/png',webmanifest:'application/manifest+json',woff2:'font/woff2'};
http.createServer(async (req,res) => {
  try {
    const name = decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
    const path = new URL(name, root);
    if (!fileURLToPath(path).startsWith(fileURLToPath(root))) {res.writeHead(403).end(); return;}
    const data = await readFile(path);
    res.writeHead(200, {'Cache-Control':'no-cache','Content-Type':types[name.split('.').pop()] || 'application/octet-stream'}).end(data);
  } catch {res.writeHead(404).end('Not found');}
}).listen(Number(process.env.PORT || 5173), '127.0.0.1', () => console.log('Local: http://127.0.0.1:5173'));
