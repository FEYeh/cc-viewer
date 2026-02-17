#!/usr/bin/env node

import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LIB = join(__dirname, 'lib');

// 清理并创建 lib 目录
rmSync(LIB, { recursive: true, force: true });
mkdirSync(LIB, { recursive: true });
mkdirSync(join(LIB, 'vendor'), { recursive: true });

// 1. 复制源文件（cli.js 和 interceptor.js 保留在根目录，不放入 lib）
const sourceFiles = ['server.js', 'app.js', 'index.html', 'style.css'];
for (const file of sourceFiles) {
  cpSync(join(__dirname, file), join(LIB, file));
}

// 2. 复制 vendor 依赖
cpSync(
  join(__dirname, 'node_modules/marked/lib/marked.umd.js'),
  join(LIB, 'vendor/marked.umd.js')
);
cpSync(
  join(__dirname, 'node_modules/@alenaksu/json-viewer/dist/json-viewer.bundle.js'),
  join(LIB, 'vendor/json-viewer.bundle.js')
);

// 3. 修改 lib/index.html — vendor 路径
let html = readFileSync(join(LIB, 'index.html'), 'utf-8');
html = html.replace('/node_modules/marked/lib/marked.umd.js', '/vendor/marked.umd.js');
html = html.replace('/node_modules/@alenaksu/json-viewer/dist/json-viewer.bundle.js', '/vendor/json-viewer.bundle.js');
writeFileSync(join(LIB, 'index.html'), html);

// 4. 修改 lib/server.js — import 路径指向根目录的 interceptor.js，静态文件服务改为 vendor
let serverCode = readFileSync(join(LIB, 'server.js'), 'utf-8');
serverCode = serverCode.replace(
  "import { setupInterceptor, LOG_FILE } from 'cc-viewer/interceptor.js';",
  "import { setupInterceptor, LOG_FILE } from '../interceptor.js';"
);
// 将 node_modules 静态服务改为 vendor
serverCode = serverCode.replace(
  "else if (url.startsWith('/node_modules/') && method === 'GET')",
  "else if (url.startsWith('/vendor/') && method === 'GET')"
);
writeFileSync(join(LIB, 'server.js'), serverCode);

console.log('✅ Build 完成，输出目录: lib/');
console.log('   - lib/server.js');
console.log('   - lib/app.js');
console.log('   - lib/index.html');
console.log('   - lib/style.css');
console.log('   - lib/vendor/marked.umd.js');
console.log('   - lib/vendor/json-viewer.bundle.js');
