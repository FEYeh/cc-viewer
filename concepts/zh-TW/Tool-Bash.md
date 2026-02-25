# Bash

## 定義

執行 shell 命令，支援可選的逾時設定。工作目錄在命令間持久化，但 shell 狀態（環境變數等）不持久化。

## 參數

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `command` | string | 是 | 要執行的 bash 命令 |
| `description` | string | 否 | 命令的簡短描述 |
| `timeout` | number | 否 | 逾時時間（毫秒），最大 600000，預設 120000 |
| `run_in_background` | boolean | 否 | 是否背景執行 |

## 使用場景

**適合使用：**
- git 操作（commit、push、branch 等）
- npm/yarn 等套件管理命令
- docker 操作
- 編譯、建置命令
- 列出目錄內容（`ls`）
- 其他需要 shell 執行的系統命令

**不適合使用：**
- 讀取檔案——應使用 Read
- 搜尋檔案名稱——應使用 Glob
- 搜尋檔案內容——應使用 Grep
- 編輯檔案——應使用 Edit
- 寫入檔案——應使用 Write
- 向使用者輸出資訊——直接在回應文字中輸出
- 長時間執行的程序（dev server、watch 模式）——建議使用者手動執行

## 注意事項

- 包含空格的路徑必須用雙引號包裹
- 輸出超過 30000 字元會被截斷
- 背景執行的命令透過 TaskOutput 取得結果
- 盡量使用絕對路徑，避免 `cd`
- 獨立命令可以並行呼叫多個 Bash
- 有依賴關係的命令用 `&&` 鏈接
- Shell 環境從使用者的 profile（bash 或 zsh）初始化

## 在 cc-viewer 中的意義

Bash 呼叫在請求日誌中表現為 `tool_use`（包含命令）和 `tool_result`（包含輸出）content block 對。命令執行的輸出可用於分析模型的操作行為。
