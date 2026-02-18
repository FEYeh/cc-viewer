#!/usr/bin/env node

import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LIB = join(__dirname, 'lib');

// 清理并创建 lib 目录
rmSync(LIB, { recursive: true, force: true });
mkdirSync(LIB, { recursive: true });

// 1. 执行 vite build
console.log('🔨 正在执行 Vite 构建...');
execSync('npx vite build', { cwd: __dirname, stdio: 'inherit' });

// 2. 将 dist/ 内容复制到 lib/
cpSync(join(__dirname, 'dist'), LIB, { recursive: true });

// 3. 复制 server.js 到 lib/
cpSync(join(__dirname, 'server.js'), join(LIB, 'server.js'));

// 4. 修改 lib/server.js — import 路径指向根目录的 interceptor.js
let serverCode = readFileSync(join(LIB, 'server.js'), 'utf-8');
serverCode = serverCode.replace(
  "import { LOG_FILE } from 'cc-viewer/interceptor.js';",
  "import { LOG_FILE } from '../interceptor.js';"
);
writeFileSync(join(LIB, 'server.js'), serverCode);

console.log('✅ Build 完成，输出目录: lib/');
console.log('   - lib/server.js');
console.log('   - lib/index.html');
console.log('   - lib/assets/');
