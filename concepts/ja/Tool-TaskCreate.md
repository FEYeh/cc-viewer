# TaskCreate

## 定義

構造化されたタスクリストエントリを作成し、進捗の追跡、複雑なタスクの整理、ユーザーへの作業進捗の表示に使用します。

## パラメータ

| パラメータ | 型 | 必須 | 説明 |
|------------|------|------|------|
| `subject` | string | はい | 短いタスクタイトル、命令形を使用（例："Fix authentication bug"） |
| `description` | string | はい | 詳細な説明、コンテキストと受け入れ基準を含む |
| `activeForm` | string | いいえ | 進行中に表示する現在進行形テキスト（例："Fixing authentication bug"） |
| `metadata` | object | いいえ | タスクに付加する任意のメタデータ |

## 使用シナリオ

**適している場合：**
- 複雑なマルチステップタスク（3ステップ以上）
- ユーザーが複数の TODO 項目を提供した
- 計画モードで作業を追跡
- ユーザーが明示的に todo リストの使用を要求

**適していない場合：**
- 単一の簡単なタスク
- 3ステップ以内の簡単な操作
- 純粋な会話や情報照会

## 注意事項

- すべての新規タスクの初期ステータスは `pending`
- `subject` は命令形（"Run tests"）、`activeForm` は現在進行形（"Running tests"）を使用
- 作成後に TaskUpdate で依存関係（blocks/blockedBy）を設定可能
- 作成前に TaskList を呼び出して重複タスクがないか確認すべき

## cc-viewer での意義

TaskCreate は Claude Code 内部のタスク管理操作であり、独立した API リクエストは生成しません。ただし Chat Mode ではモデルがこのツールを呼び出した tool_use block を確認できます。
