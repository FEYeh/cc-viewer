# MainAgent

## 定義

MainAgent 是 Claude Code 在非 agent team 狀態下的主幹請求鏈路。每一次使用者與 Claude Code 的互動，都會產生一系列 API 請求，其中 MainAgent 請求構成了核心對話鏈路——它們攜帶完整的 system prompt、工具定義和訊息歷史。

## 識別方式

在 cc-viewer 中，MainAgent 透過 `req.mainAgent === true` 標識，由 `interceptor.js` 在請求擷取時自動標記。

判定條件（滿足全部）：
- 請求體包含 `system` 欄位（system prompt）
- 請求體包含 `tools` 陣列（工具定義）
- system prompt 中包含 "Claude Code" 特徵文字

## 與 SubAgent 的區別

| 特徵 | MainAgent | SubAgent |
|------|-----------|----------|
| system prompt | 完整的 Claude Code 主 prompt | 精簡的任務專用 prompt |
| tools 陣列 | 包含全部可用工具 | 通常只包含任務所需的少量工具 |
| 訊息歷史 | 累積完整對話上下文 | 僅包含子任務相關訊息 |
| 快取行為 | 有 prompt caching（5 分鐘 TTL） | 通常無快取或快取較小 |

## 在 cc-viewer 中的意義

- **快取追蹤**：MainAgent 請求的 prompt caching 狀態直接影響費用。透過監控 `cache_creation_input_tokens` 與 `cache_read_input_tokens` 的比例，可以判斷快取命中率
- **快取遺失分析**：當 MainAgent 請求出現大量 cache creation（而非 cache read），說明快取遺失並被重建，cc-viewer 會透過紅色圓點指示器標記這些請求
- **主鏈路分析**：MainAgent 請求序列反映了使用者與 Claude Code 的完整互動過程，是分析會話行為的核心資料
- **會話重建**：cc-viewer 透過 MainAgent 請求的訊息歷史重建對話檢視（Chat Mode）
