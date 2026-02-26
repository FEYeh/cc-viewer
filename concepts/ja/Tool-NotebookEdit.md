# NotebookEdit

## 定義

Jupyter notebook（.ipynb ファイル）内の特定のセルを置換、挿入、または削除します。

## パラメータ

| パラメータ | 型 | 必須 | 説明 |
|------------|------|------|------|
| `notebook_path` | string | はい | notebook ファイルの絶対パス |
| `new_source` | string | はい | セルの新しい内容 |
| `cell_id` | string | いいえ | 編集するセルの ID。挿入モードでは新しいセルがこの ID の後に挿入される |
| `cell_type` | enum | いいえ | セルタイプ：`code` または `markdown`。挿入モードでは必須 |
| `edit_mode` | enum | いいえ | 編集モード：`replace`（デフォルト）、`insert`、`delete` |

## 使用シナリオ

**適している場合：**
- Jupyter notebook 内のコードまたは markdown セルを変更
- notebook に新しいセルを追加
- notebook 内のセルを削除

## 注意事項

- `cell_number` は 0 インデックス
- `insert` モードは指定位置に新しいセルを挿入
- `delete` モードは指定位置のセルを削除
- パスは絶対パスでなければならない

## cc-viewer での意義

NotebookEdit 呼び出しはリクエストログで `tool_use` content block として表示され、notebook に対する具体的な変更操作が記録されます。
