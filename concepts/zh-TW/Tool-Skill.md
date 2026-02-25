# Skill

## 定義

在主對話中執行一個技能（skill）。技能是使用者可透過 slash command（如 `/commit`、`/review-pr`）呼叫的專用能力。

## 參數

| 參數 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `skill` | string | 是 | 技能名稱（如 "commit"、"review-pr"、"pdf"） |
| `args` | string | 否 | 技能參數 |

## 使用場景

**適合使用：**
- 使用者輸入了 `/<skill-name>` 格式的 slash command
- 使用者的請求匹配某個已註冊技能的功能

**不適合使用：**
- 內建 CLI 命令（如 `/help`、`/clear`）
- 已經在執行中的技能
- 未在可用技能列表中的技能名稱

## 注意事項

- 技能被呼叫後會展開為完整的 prompt
- 支援完全限定名稱（如 `ms-office-suite:pdf`）
- 可用技能列表在 system-reminder 訊息中提供
- 看到 `<command-name>` 標籤時說明技能已載入，應直接執行而非再次呼叫此工具
- 不要在未實際呼叫工具的情況下提及某個技能

## 在 cc-viewer 中的意義

Skill 呼叫在請求日誌中表現為 `tool_use` content block。技能展開後的 prompt 會影響後續請求的 system prompt 或訊息內容。
