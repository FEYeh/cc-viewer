# TaskCreate

## 定義

建立結構化的任務列表條目，用於追蹤進度、組織複雜任務，並向使用者展示工作進展。

## 參數

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `subject` | string | 是 | 簡短的任務標題，使用祈使句（如 "Fix authentication bug"） |
| `description` | string | 是 | 詳細描述，包含上下文和驗收標準 |
| `activeForm` | string | 否 | 進行中時顯示的現在進行式文字（如 "Fixing authentication bug"） |
| `metadata` | object | 否 | 附加到任務的任意中繼資料 |

## 使用場景

**適合使用：**
- 複雜的多步驟任務（3 步以上）
- 使用者提供了多個待辦事項
- 在規劃模式中追蹤工作
- 使用者明確要求使用 todo 列表

**不適合使用：**
- 單一簡單任務
- 3 步以內的簡單操作
- 純對話或資訊查詢

## 注意事項

- 所有新建任務的初始狀態為 `pending`
- `subject` 使用祈使句（"Run tests"），`activeForm` 使用現在進行式（"Running tests"）
- 建立任務後可透過 TaskUpdate 設定依賴關係（blocks/blockedBy）
- 建立前應先呼叫 TaskList 檢查是否有重複任務

## 在 cc-viewer 中的意義

TaskCreate 是 Claude Code 內部的任務管理操作，不產生獨立的 API 請求。但在 Chat Mode 中可以看到模型呼叫此工具的 tool_use block。
