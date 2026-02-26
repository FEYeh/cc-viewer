# WebSearch

## 定義

執行搜尋引擎查詢，回傳搜尋結果用於取得最新資訊。

## 參數

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `query` | string | 是 | 搜尋查詢（最少 2 個字元） |
| `allowed_domains` | string[] | 否 | 僅包含這些網域的結果 |
| `blocked_domains` | string[] | 否 | 排除這些網域的結果 |

## 使用場景

**適合使用：**
- 取得超出模型知識截止日期的最新資訊
- 查找當前事件和最新資料
- 搜尋最新的技術文件

## 注意事項

- 搜尋結果以 markdown 超連結格式回傳
- 使用後必須在回應末尾附上 "Sources:" 部分，列出相關 URL
- 支援網域過濾（包含/排除）
- 搜尋查詢中應使用當前年份
- 僅在美國可用

## 在 cc-viewer 中的意義

WebSearch 呼叫在請求日誌中表現為 `tool_use` / `tool_result` content block 對。`tool_result` 包含搜尋結果列表。
