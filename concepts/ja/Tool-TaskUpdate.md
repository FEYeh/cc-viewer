# TaskUpdate

## 定義

タスクリスト内の特定タスクのステータス、内容、または依存関係を更新します。

## パラメータ

| パラメータ | 型 | 必須 | 説明 |
|------------|------|------|------|
| `taskId` | string | はい | 更新するタスクの ID |
| `status` | enum | いいえ | 新しいステータス：`pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | いいえ | 新しいタイトル |
| `description` | string | いいえ | 新しい説明 |
| `activeForm` | string | いいえ | 進行中に表示する現在進行形テキスト |
| `owner` | string | いいえ | 新しいタスク担当者（agent 名） |
| `metadata` | object | いいえ | マージするメタデータ（null に設定するとキーを削除） |
| `addBlocks` | string[] | いいえ | このタスクによってブロックされるタスク ID のリスト |
| `addBlockedBy` | string[] | いいえ | このタスクをブロックする前提タスク ID のリスト |

## ステータス遷移

```
pending → in_progress → completed
```

`deleted` は任意のステータスから遷移可能で、タスクを永久に削除します。

## 使用シナリオ

**適している場合：**
- 作業開始時にタスクを `in_progress` にマーク
- 作業完了後にタスクを `completed` にマーク
- タスク間の依存関係を設定
- 要件変更時にタスク内容を更新

**重要なルール：**
- タスクを完全に完了した場合のみ `completed` にマーク
- エラーやブロックに遭遇した場合は `in_progress` を維持
- テスト失敗、実装不完全、未解決エラーがある場合は `completed` にマークしてはならない

## 注意事項

- 更新前に TaskGet でタスクの最新ステータスを取得し、古いデータを避ける
- タスク完了後に TaskList を呼び出して次の利用可能なタスクを検索

## cc-viewer での意義

TaskUpdate は内部タスク管理操作であり、独立した API リクエストは生成しません。
