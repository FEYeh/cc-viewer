# CC-Viewer

Claude Code API 请求监控系统，实时捕获并可视化展示 Claude Code 的所有 API 请求与响应。

## 使用方法

```bash
npm install -g cc-viewer
```

安装完成后运行：

```bash
ccv
```

该命令会自动将监控脚本注入到本地安装的 Claude Code 中。之后正常使用 Claude Code，打开浏览器访问 `http://localhost:7008` 即可查看监控界面。

## 功能

### 请求监控（原文模式）

- 实时捕获 Claude Code 发出的所有 API 请求，包括流式响应
- 左侧请求列表展示请求方法、URL、耗时、状态码
- 自动识别并标记 Main Agent 和 Sub Agent 请求
- 右侧详情面板支持 Request / Response 两个 Tab 切换查看
- Request Body 中 `messages`、`system`、`tools` 默认展开一层子属性
- Response Body 默认全部展开
- 支持 JSON 视图与纯文本视图切换
- 支持一键复制 JSON 内容

### 对话模式

点击右上角「对话模式」按钮，将 Main Agent 的完整对话历史解析为聊天界面：

- 用户消息左对齐（蓝色气泡）
- Main Agent 回复左对齐（深灰气泡），支持 Markdown 渲染
- 工具调用结果内联显示在对应的 Assistant 消息内部
- `thinking` 块默认折叠，点击展开查看思考过程
- `tool_use` 显示为紧凑的工具调用卡片（Bash、Read、Edit、Write、Glob、Grep、Task 等均有专属展示）
- 用户选择型消息（AskUserQuestion）以问答形式展示
- 系统注入标签（`<system-reminder>`、`<project-reminder>` 等）自动折叠
- 自动过滤系统注入文本，只展示用户的真实输入
- 支持多 session 分段展示（`/compact`、`/clear` 等操作后自动分段）
- 每条消息显示精确到秒的时间戳

### Token 消耗统计

Header 区域的「Token 消耗统计」悬浮面板：

- 按模型分组统计 input/output token 数量
- 显示 cache creation/read 数量及缓存命中率
- Main Agent 缓存失效倒计时

### 日志管理

通过左上角 CC-Viewer 下拉菜单：

- 导入本地日志：浏览历史日志文件，按项目分组，在新窗口打开
- 当前日志另存为：下载当前监控的 JSONL 日志文件
- 导出用户 Prompt：提取并展示所有用户输入，支持 system-reminder 折叠查看

### 数据解析

| 消息类型 | 识别方式 | 展示 |
|---------|---------|------|
| 用户输入 | `role: "user"` + 非系统标签文本 | 蓝色气泡 |
| 用户选择 | `[SUGGESTION MODE:]` + `tool_result` | 问答卡片 |
| Agent 文本回复 | `role: "assistant"` + `type: "text"` | Markdown 渲染 |
| Agent 工具调用 | `role: "assistant"` + `type: "tool_use"` | 工具调用卡片 + 内联结果 |
| Agent 思考 | `role: "assistant"` + `type: "thinking"` | 可折叠思考块 |

对于 `Task` 类型的工具调用，会从 `input` 中提取 `subagent_type` 和 `description` 来标识具体的 Sub Agent。

## 技术栈

- 前端：React + Ant Design，暗色主题
- Markdown 渲染：[marked](https://github.com/markedjs/marked)
- 后端：Node.js 原生 HTTP 服务 + SSE 实时推送
- 请求拦截：通过 `globalThis.fetch` 拦截，支持流式响应组装
- 构建：Vite

## License

MIT
