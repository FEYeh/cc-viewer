#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const INJECT_START = '// >>> Start CC Viewer Web Service >>>';
const INJECT_END = '// <<< Start CC Viewer Web Service <<<';
const INJECT_IMPORT = "import '../../cc-viewer/interceptor.js';";
const INJECT_BLOCK = `${INJECT_START}\n${INJECT_IMPORT}\n${INJECT_END}`;

// Claude Code cli.js 的路径
const cliPath = resolve(__dirname, '../@anthropic-ai/claude-code/cli.js');

try {
  const content = readFileSync(cliPath, 'utf-8');

  if (content.includes(INJECT_START)) {
    console.log('✅ CC Viewer 已注入，无需重复操作');
  } else {
    // 在第3行（第2行之后）插入注入代码
    const lines = content.split('\n');
    lines.splice(2, 0, INJECT_BLOCK);
    writeFileSync(cliPath, lines.join('\n'));
    console.log('✅ CC Viewer 运行成功');
  }
  console.log(`直接运行 claude 即可，启动时会显示 cc-viewer 的实际运行地址`);
  console.log(`如果后续功能失效，请重新执行一次 ccviewer 命令即可`);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('❌ 找不到 Claude Code cli.js:', cliPath);
    console.error('   请确认 @anthropic-ai/claude-code 已安装');
  } else {
    console.error('❌ 注入失败:', err.message);
  }
  process.exit(1);
}
