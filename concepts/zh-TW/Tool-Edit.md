# Edit

## 定義

透過精確的字串替換來編輯檔案。將檔案中的 `old_string` 替換為 `new_string`。

## 參數

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `file_path` | string | 是 | 要修改的檔案的絕對路徑 |
| `old_string` | string | 是 | 要替換的原始文字 |
| `new_string` | string | 是 | 替換後的新文字（必須與 old_string 不同） |
| `replace_all` | boolean | 否 | 是否替換所有匹配項，預設 `false` |

## 使用場景

**適合使用：**
- 修改現有檔案中的特定程式碼段
- 修復 bug、更新邏輯
- 重新命名變數（配合 `replace_all: true`）
- 任何需要精確修改檔案內容的場景

**不適合使用：**
- 建立新檔案——應使用 Write
- 大規模重寫——可能需要 Write 覆寫整個檔案

## 注意事項

- 使用前必須先透過 Read 讀取過該檔案，否則會報錯
- `old_string` 在檔案中必須是唯一的，否則編輯失敗。如果不唯一，需要提供更多上下文使其唯一，或使用 `replace_all`
- 編輯文字時必須保持原始縮排（tab/空格），不要包含 Read 輸出中的行號前綴
- 優先編輯現有檔案，而非建立新檔案
- `new_string` 必須與 `old_string` 不同

## 在 cc-viewer 中的意義

Edit 呼叫在請求日誌中表現為 `tool_use` content block，其 `input` 包含 `old_string` 和 `new_string`，可用於追蹤模型對檔案做了哪些修改。
