# MainAgent

## 定義

MainAgent は、Claude Code が非 agent team 状態における主幹リクエストチェーンです。ユーザーと Claude Code のやり取りのたびに一連の API リクエストが生成され、その中で MainAgent リクエストがコア会話チェーンを構成します。これらは完全な system prompt、ツール定義、メッセージ履歴を含みます。

## 識別方法

cc-viewer では、MainAgent は `req.mainAgent === true` で識別され、`interceptor.js` がリクエストキャプチャ時に自動的にマーキングします。

判定条件（すべて満たす）：
- リクエストボディに `system` フィールド（system prompt）が含まれる
- リクエストボディに `tools` 配列（ツール定義）が含まれる
- system prompt に "Claude Code" の特徴テキストが含まれる

## SubAgent との違い

| 特徴 | MainAgent | SubAgent |
|------|-----------|----------|
| system prompt | 完全な Claude Code メインプロンプト | 簡潔なタスク専用プロンプト |
| tools 配列 | 利用可能なすべてのツールを含む | 通常タスクに必要な少数のツールのみ |
| メッセージ履歴 | 完全な会話コンテキストを蓄積 | サブタスク関連のメッセージのみ |
| キャッシュ動作 | prompt caching あり（5分 TTL） | 通常キャッシュなし、またはキャッシュが小さい |

## cc-viewer での意義

- **キャッシュ追跡**：MainAgent リクエストの prompt caching 状態はコストに直接影響します。`cache_creation_input_tokens` と `cache_read_input_tokens` の比率を監視することで、キャッシュヒット率を判断できます
- **キャッシュロス分析**：MainAgent リクエストで大量の cache creation（cache read ではなく）が発生した場合、キャッシュロスと再構築を意味し、cc-viewer は赤い丸のインジケーターでこれらのリクエストをマーキングします
- **メインチェーン分析**：MainAgent リクエストシーケンスはユーザーと Claude Code の完全なインタラクションプロセスを反映し、セッション行動分析のコアデータです
- **セッション再構築**：cc-viewer は MainAgent リクエストのメッセージ履歴を通じて会話ビュー（Chat Mode）を再構築します
