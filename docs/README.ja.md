# CC-Viewer

Claude Code リクエスト監視システム。Claude Code のすべての API リクエストとレスポンスをリアルタイムでキャプチャし、視覚化します。Vibe Coding 中に Context を監視し、レビューやデバッグに役立ちます。

[简体中文](./README.zh.md) | [English](../README.md) | [繁體中文](./README.zh-TW.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Español](./README.es.md) | [Français](./README.fr.md) | [Italiano](./README.it.md) | [Dansk](./README.da.md) | [Polski](./README.pl.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md) | [Norsk](./README.no.md) | [Português (Brasil)](./README.pt-BR.md) | [ไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Українська](./README.uk.md)

## 使用方法

```bash
npm install -g cc-viewer
```

インストール後、実行：

```bash
ccv
```

このコマンドは、ローカルにインストールされた Claude Code を自動的に監視用に設定し、shell 設定ファイル（`~/.zshrc` または `~/.bashrc`）に自動修復 hook を追加します。その後、Claude Code を通常通り使用し、ブラウザで `http://localhost:7008` を開いて監視インターフェースを確認してください。

Claude Code の更新後、手動操作は不要です。次回 `claude` を実行すると、自動的に検出して再設定します。

### アンインストール

```bash
ccv --uninstall
```

## 機能

### リクエスト監視（Raw モード）

- Claude Code からのすべての API リクエストをリアルタイムキャプチャ（ストリーミングレスポンス含む）
- 左パネルにリクエストメソッド、URL、所要時間、ステータスコードを表示
- Main Agent と Sub Agent リクエストを自動識別・ラベリング（サブタイプ：Bash、Task、Plan、General）
- リクエストリストが選択項目に自動スクロール（モード切替時は中央表示、手動クリック時は最寄りにスクロール）
- 右パネルで Request / Response タブ切り替え対応
- Request Body の `messages`、`system`、`tools` はデフォルトで1階層展開
- Response Body はデフォルトで全展開
- JSON ビューとプレーンテキストビューの切り替え対応
- JSON コンテンツのワンクリックコピー
- MainAgent リクエストで Body Diff JSON をサポート、前回の MainAgent リクエストとの差分を折りたたみ表示（変更/追加フィールドのみ）
- Diff セクションは JSON/テキストビューの切り替えおよびワンクリックコピーに対応
- 「Diff を展開」設定：有効にすると、MainAgent リクエストで Diff セクションが自動展開されます
- Body Diff JSON ツールチップは閉じることができ、閉じるとサーバー側に設定が保存され、再表示されません
- 機密ヘッダー（`x-api-key`、`authorization`）は JSONL ログファイルで自動的にマスクされ、認証情報の漏洩を防止
- リクエストごとにインラインで Token 使用量統計を表示（入力/出力 Token、キャッシュ作成/読み取り、ヒット率）
- Claude Code Router（CCR）およびその他のプロキシ環境に対応 — APIパスパターンによるフォールバックマッチング

### チャットモード

右上の「チャットモード」ボタンをクリックして、Main Agent の完全な会話履歴をチャットインターフェースに解析：

- ユーザーメッセージ右揃え（青い吹き出し）、Main Agent の返信左揃え（ダークの吹き出し）、Markdown レンダリング対応
- `/compact` メッセージを自動検出し折りたたみ表示、クリックで完全なサマリーを展開
- ツール呼び出し結果が対応する Assistant メッセージ内にインライン表示
- `thinking` ブロックはデフォルトで折りたたみ、Markdown でレンダリング、クリックで展開；ワンクリック翻訳対応
- `tool_use` はコンパクトなツール呼び出しカードとして表示（Bash、Read、Edit、Write、Glob、Grep、Task 等に専用表示）
- Task（SubAgent）ツール結果を Markdown でレンダリング
- ユーザー選択メッセージ（AskUserQuestion）は Q&A 形式で表示
- システムタグ（`<system-reminder>`、`<project-reminder>` 等）自動折りたたみ
- Skill 読み込みメッセージを自動検出して折りたたみ表示、Skill 名を表示；クリックで完全なドキュメントを展開（Markdown レンダリング）
- Skills reminder を自動検出して折りたたみ表示
- システムテキスト自動フィルタリング、実際のユーザー入力のみ表示
- マルチ session 分割表示（`/compact`、`/clear` 等の操作後に自動分割）
- 各メッセージに秒単位の正確なタイムスタンプを表示、API リクエストのタイミングから算出
- 各メッセージに「リクエストを表示」リンクがあり、対応する API リクエストの Raw モードにジャンプ可能
- 双方向モード同期：チャットモードに切り替えると選択中のリクエストに対応する会話にスクロール、Raw モードに戻ると選択中のリクエストにスクロール
- 設定パネル：ツール結果と thinking ブロックのデフォルト折りたたみ状態を切り替え
- グローバル設定：無関係なリクエスト（count_tokens、ハートビート）のフィルタリング切り替え

### 翻訳

- thinking ブロックと Assistant メッセージのワンクリック翻訳対応
- Claude Haiku API ベース、`x-api-key` 認証のみ使用（OAuth セッショントークンはコンテキスト汚染防止のため除外）
- mainAgent リクエストから haiku モデル名を自動キャプチャ；デフォルトは `claude-haiku-4-5-20251001`
- 翻訳結果は自動キャッシュ、再クリックで原文に切替
- 翻訳中はローディングスピナーアニメーション表示
- リクエスト詳細の `authorization` ヘッダー横の (?) アイコンからコンテキスト汚染の説明ドキュメントを参照可能

### Token 消費統計

ヘッダー領域のホバーパネル：

- モデル別 input/output token 数量のグループ統計
- Cache creation/read 数量およびキャッシュヒット率の表示
- キャッシュリビルド統計を理由別にグループ表示（TTL 期限切れ、system/tools/model 変更、メッセージ切り詰め/変更、キー変更）、回数および cache_creation トークン数を含む
- ツール使用統計：ツールごとの呼び出し回数を頻度順に表示
- Skill 使用統計：Skill ごとの呼び出し回数を頻度順に表示
- コンセプトヘルプ (?) アイコン：クリックで MainAgent、CacheRebuild、各ツールの内蔵ドキュメントを表示
- Main Agent キャッシュ有効期限カウントダウン

### ログ管理

左上の CC-Viewer ドロップダウンメニュー：

- ローカルログのインポート：プロジェクト別にグループ化された履歴ログファイルを閲覧、新しいウィンドウで開く
- ローカル JSONL ファイルの読み込み：ローカルの `.jsonl` ファイルを直接選択して読み込み（最大 500MB）
- 現在のログをダウンロード：現在監視中の JSONL ログファイルをダウンロード
- ログ結合：複数の JSONL ログファイルを1つのセッションに結合して統合分析
- ユーザー Prompt を表示：すべてのユーザー入力を抽出し、3つの表示モードで表示 — 原文モード（元のコンテンツ）、コンテキストモード（システムタグ折りたたみ可能）、Text モード（プレーンテキスト）；スラッシュコマンド（`/model`、`/context` など）は独立エントリとして表示；コマンド関連タグは Prompt コンテンツから自動非表示
- Prompt を TXT にエクスポート：ユーザー Prompt（テキストのみ、システムタグを除く）をローカルの `.txt` ファイルにエクスポート

### 多言語サポート

CC-Viewer は 18 言語をサポートし、システムロケールに基づいて自動切り替えします：

简体中文 | English | 繁體中文 | 한국어 | Deutsch | Español | Français | Italiano | Dansk | 日本語 | Polski | Русский | العربية | Norsk | Português (Brasil) | ไทย | Türkçe | Українська

## License

MIT
