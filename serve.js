// Zero-dependency static file server for local preview of dist/.
// Run with: node serve.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
};

function resolvePath(urlPath) {
  if (urlPath === '/') return path.join(DIST, 'index.html');
  const direct = path.join(DIST, urlPath);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  return path.join(DIST, `${urlPath}.html`);
}

http
  .createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    const filePath = resolvePath(urlPath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`Serving dist/ at http://localhost:${PORT}`);
  });
