# Write

## Tanım

İçeriği yerel dosya sistemine yazar. Dosya zaten mevcutsa üzerine yazar.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `file_path` | string | Evet | Dosyanın mutlak yolu (mutlak yol olmalıdır) |
| `content` | string | Evet | Yazılacak içerik |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Yeni dosya oluşturma
- Dosya içeriğinin tamamen yeniden yazılması gerektiğinde

**Kullanıma uygun değil:**
- Dosyadaki kısmi içeriği değiştirme — Edit kullanılmalıdır
- Kullanıcı açıkça istemediği sürece proaktif olarak belge dosyaları (*.md) veya README oluşturulmamalıdır

## Dikkat Edilecekler

- Hedef dosya zaten mevcutsa, önce Read ile okunmuş olmalıdır, aksi takdirde başarısız olur
- Mevcut dosyanın tüm içeriğini üzerine yazar
- Mevcut dosyaları düzenlemek için Edit'i tercih edin; Write yalnızca yeni dosya oluşturma veya tamamen yeniden yazma için kullanılır

## cc-viewer'da Önemi

Write çağrıları istek günlüğünde `tool_use` content block olarak görünür; `input.content` yazılan tam içeriği içerir.
