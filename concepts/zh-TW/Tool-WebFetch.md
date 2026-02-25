# WebFetch

## 定義

擷取指定 URL 的網頁內容，將 HTML 轉換為 markdown，並使用 AI 模型根據 prompt 處理內容。

## 參數

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `url` | string (URI) | 是 | 要擷取的完整 URL |
| `prompt` | string | 是 | 描述要從頁面中提取什麼資訊 |

## 使用場景

**適合使用：**
- 取得公開網頁的內容
- 查閱線上文件
- 提取網頁中的特定資訊

**不適合使用：**
- 需要認證的 URL（Google Docs、Confluence、Jira、GitHub 等）——應先查找專用的 MCP 工具
- GitHub URL——優先使用 `gh` CLI

## 注意事項

- URL 必須是完整的有效 URL
- HTTP 會自動升級為 HTTPS
- 內容過大時結果可能被摘要
- 包含 15 分鐘自清理快取
- 當 URL 重新導向到不同主機時，工具會回傳重新導向 URL，需要用新 URL 重新請求
- 如果有 MCP 提供的 web fetch 工具可用，優先使用那個

## 在 cc-viewer 中的意義

WebFetch 呼叫在請求日誌中表現為 `tool_use` / `tool_result` content block 對。`tool_result` 包含經 AI 處理後的網頁內容摘要。
