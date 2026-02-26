# TaskUpdate

## 定義

更新任務列表中某個任務的狀態、內容或依賴關係。

## 參數

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `taskId` | string | 是 | 要更新的任務 ID |
| `status` | enum | 否 | 新狀態：`pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | 否 | 新標題 |
| `description` | string | 否 | 新描述 |
| `activeForm` | string | 否 | 進行中時顯示的現在進行式文字 |
| `owner` | string | 否 | 新的任務負責人（agent 名稱） |
| `metadata` | object | 否 | 要合併的中繼資料（設為 null 可刪除鍵） |
| `addBlocks` | string[] | 否 | 被此任務阻塞的任務 ID 列表 |
| `addBlockedBy` | string[] | 否 | 阻塞此任務的前置任務 ID 列表 |

## 狀態流轉

```
pending → in_progress → completed
```

`deleted` 可從任何狀態轉入，永久移除任務。

## 使用場景

**適合使用：**
- 開始工作時標記任務為 `in_progress`
- 完成工作後標記任務為 `completed`
- 設定任務間的依賴關係
- 需求變更時更新任務內容

**重要規則：**
- 只有在完全完成任務時才標記為 `completed`
- 遇到錯誤或阻塞時保持 `in_progress`
- 測試失敗、實作不完整、遇到未解決錯誤時不得標記為 `completed`

## 注意事項

- 更新前應先透過 TaskGet 取得任務最新狀態，避免過期資料
- 完成任務後呼叫 TaskList 查找下一個可用任務

## 在 cc-viewer 中的意義

TaskUpdate 是內部任務管理操作，不產生獨立的 API 請求。
