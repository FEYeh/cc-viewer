# Grep

## Tanım

ripgrep tabanlı güçlü içerik arama aracı. Düzenli ifadeler, dosya türü filtreleme ve çoklu çıktı modlarını destekler.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `pattern` | string | Evet | Düzenli ifade arama kalıbı |
| `path` | string | Hayır | Arama yolu (dosya veya dizin), varsayılan mevcut çalışma dizini |
| `glob` | string | Hayır | Dosya adı filtresi (örn. `*.js`, `*.{ts,tsx}`) |
| `type` | string | Hayır | Dosya türü filtresi (örn. `js`, `py`, `rust`), glob'dan daha verimli |
| `output_mode` | enum | Hayır | Çıktı modu: `files_with_matches` (varsayılan), `content`, `count` |
| `-i` | boolean | Hayır | Büyük/küçük harf duyarsız arama |
| `-n` | boolean | Hayır | Satır numaralarını göster (yalnızca content modu), varsayılan true |
| `-A` | number | Hayır | Eşleşmeden sonra gösterilecek satır sayısı |
| `-B` | number | Hayır | Eşleşmeden önce gösterilecek satır sayısı |
| `-C` / `context` | number | Hayır | Eşleşme öncesi ve sonrası gösterilecek satır sayısı |
| `head_limit` | number | Hayır | Çıktı girdi sayısını sınırla, varsayılan 0 (sınırsız) |
| `offset` | number | Hayır | İlk N sonucu atla |
| `multiline` | boolean | Hayır | Çok satırlı eşleştirme modunu etkinleştir, varsayılan false |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Kod tabanında belirli dize veya kalıp arama
- Fonksiyon/değişken kullanım yerlerini bulma
- Dosya türüne göre arama sonuçlarını filtreleme
- Eşleşme sayısını sayma

**Kullanıma uygun değil:**
- Dosya adına göre dosya bulma — Glob kullanılmalıdır
- Birden fazla tur gerektiren açık uçlu keşif — Task (Explore türü) kullanılmalıdır

## Dikkat Edilecekler

- ripgrep sözdizimi kullanır (grep değil), süslü parantez gibi özel karakterler kaçış gerektirir
- `files_with_matches` modu yalnızca dosya yollarını döndürür, en verimli moddur
- `content` modu eşleşen satır içeriklerini döndürür, bağlam satırlarını destekler
- Çok satırlı eşleştirme için `multiline: true` ayarlanmalıdır
- Bash'teki `grep` veya `rg` komutu yerine her zaman Grep aracını tercih edin

## cc-viewer'da Önemi

Grep çağrıları istek günlüğünde `tool_use` / `tool_result` content block çifti olarak görünür. `tool_result` arama sonuçlarını içerir.
