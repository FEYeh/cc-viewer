# WebFetch

## Tanım

Belirtilen URL'nin web sayfası içeriğini çeker, HTML'yi markdown'a dönüştürür ve prompt'a göre AI modeli ile içeriği işler.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `url` | string (URI) | Evet | Çekilecek tam URL |
| `prompt` | string | Evet | Sayfadan hangi bilginin çıkarılacağını açıklar |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Herkese açık web sayfalarının içeriğini alma
- Çevrimiçi belgelere başvurma
- Web sayfasından belirli bilgileri çıkarma

**Kullanıma uygun değil:**
- Kimlik doğrulama gerektiren URL'ler (Google Docs, Confluence, Jira, GitHub vb.) — önce özel MCP aracı aranmalıdır
- GitHub URL'leri — öncelikle `gh` CLI kullanılmalıdır

## Dikkat Edilecekler

- URL tam ve geçerli bir URL olmalıdır
- HTTP otomatik olarak HTTPS'ye yükseltilir
- İçerik çok büyükse sonuçlar özetlenebilir
- 15 dakikalık otomatik temizlenen önbellek içerir
- URL farklı bir ana bilgisayara yönlendirildiğinde, araç yönlendirme URL'sini döndürür ve yeni URL ile tekrar istek yapılması gerekir
- MCP tarafından sağlanan web fetch aracı mevcutsa, onu tercih edin

## cc-viewer'da Önemi

WebFetch çağrıları istek günlüğünde `tool_use` / `tool_result` content block çifti olarak görünür. `tool_result` AI tarafından işlenmiş web sayfası içerik özetini içerir.
