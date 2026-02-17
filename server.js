import { createServer } from 'node:http';
import { readFileSync, existsSync, watchFile, unwatchFile } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { setupInterceptor, LOG_FILE } from 'cc-viewer/interceptor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const START_PORT = 7008;
const MAX_PORT = 7099;
const HOST = '127.0.0.1';

let clients = [];
let server;
let actualPort = START_PORT;

function readLogFile() {
  if (!existsSync(LOG_FILE)) {
    return [];
  }

  try {
    const content = readFileSync(LOG_FILE, 'utf-8');
    const entries = content.split('\n---\n').filter(line => line.trim());
    return entries.map(entry => {
      try {
        return JSON.parse(entry);
      } catch {
        return null;
      }
    }).filter(Boolean);
  } catch (err) {
    console.error('Error reading log file:', err);
    return [];
  }
}

function sendToClients(entry) {
  clients.forEach(client => {
    try {
      client.write(`data: ${JSON.stringify(entry)}\n\n`);
    } catch (err) {
      // Client disconnected
    }
  });
}

function startWatching() {
  let lastSize = 0;
  watchFile(LOG_FILE, { interval: 500 }, () => {
    try {
      const content = readFileSync(LOG_FILE, 'utf-8');
      const newContent = content.slice(lastSize);
      lastSize = content.length;

      if (newContent.trim()) {
        const entries = newContent.split('\n---\n').filter(line => line.trim());
        entries.forEach(entry => {
          try {
            const parsed = JSON.parse(entry);
            sendToClients(parsed);
          } catch (err) {
            // Skip invalid entries
          }
        });
      }
    } catch (err) {
      // File not yet created, will retry on next poll
    }
  });
}

function handleRequest(req, res) {
  const { url, method } = req;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Serve HTML
  if (url === '/' && method === 'GET') {
    try {
      const htmlPath = join(__dirname, 'index.html');
      const html = readFileSync(htmlPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (err) {
      res.writeHead(500);
      res.end('Error loading page');
    }
  }
  // Serve CSS
  else if (url === '/style.css' && method === 'GET') {
    try {
      const cssPath = join(__dirname, 'style.css');
      const css = readFileSync(cssPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
      res.end(css);
    } catch (err) {
      res.writeHead(500);
      res.end('Error loading CSS');
    }
  }
  // Serve JavaScript
  else if (url === '/app.js' && method === 'GET') {
    try {
      const jsPath = join(__dirname, 'app.js');
      const js = readFileSync(jsPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
      res.end(js);
    } catch (err) {
      res.writeHead(500);
      res.end('Error loading JavaScript');
    }
  }
  // Serve node_modules files
  else if (url.startsWith('/node_modules/') && method === 'GET') {
    try {
      const filePath = join(__dirname, url);
      const content = readFileSync(filePath);

      let contentType = 'application/octet-stream';
      if (url.endsWith('.js')) {
        contentType = 'application/javascript; charset=utf-8';
      } else if (url.endsWith('.css')) {
        contentType = 'text/css; charset=utf-8';
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (err) {
      res.writeHead(404);
      res.end('File not found');
    }
  }
  // SSE endpoint
  else if (url === '/events' && method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    clients.push(res);

    const entries = readLogFile();
    entries.forEach(entry => {
      res.write(`data: ${JSON.stringify(entry)}\n\n`);
    });

    req.on('close', () => {
      clients = clients.filter(client => client !== res);
    });
  }
  // API endpoint
  else if (url === '/api/requests' && method === 'GET') {
    const entries = readLogFile();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(entries));
  }
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
}

export function startViewer() {
  // 首先设置拦截器
  setupInterceptor();

  return new Promise((resolve, reject) => {
    function tryListen(port) {
      if (port > MAX_PORT) {
        console.log(`⚠️  端口 ${START_PORT}-${MAX_PORT} 均被占用，请求监控服务未启动`);
        resolve(null);
        return;
      }

      const currentServer = createServer(handleRequest);

      currentServer.listen(port, HOST, () => {
        server = currentServer;
        actualPort = port;
        console.log(`\n🔍 Claude 请求监控服务已启动: http://${HOST}:${port}\n`);
        startWatching();
        resolve(server);
      });

      currentServer.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`⚠️  端口 ${port} 已被占用，尝试 ${port + 1}...`);
          tryListen(port + 1);
        } else {
          reject(err);
        }
      });
    }

    tryListen(START_PORT);
  });
}

export function stopViewer() {
  unwatchFile(LOG_FILE);
  clients.forEach(client => client.end());
  clients = [];
  if (server) {
    server.close();
  }
}

// Auto-start the viewer when imported
startViewer().catch(err => {
  console.error('Failed to start CC Viewer:', err);
});
