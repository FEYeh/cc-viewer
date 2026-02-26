# Edit

## Tanım

Kesin dize değiştirme yoluyla dosya düzenler. Dosyadaki `old_string`'i `new_string` ile değiştirir.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `file_path` | string | Evet | Değiştirilecek dosyanın mutlak yolu |
| `old_string` | string | Evet | Değiştirilecek orijinal metin |
| `new_string` | string | Evet | Değiştirme sonrası yeni metin (old_string'den farklı olmalıdır) |
| `replace_all` | boolean | Hayır | Tüm eşleşmelerin değiştirilip değiştirilmeyeceği, varsayılan `false` |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Mevcut dosyadaki belirli kod bölümlerini değiştirme
- Hata düzeltme, mantık güncelleme
- Değişken yeniden adlandırma (`replace_all: true` ile birlikte)
- Dosya içeriğinin kesin değişiklik gerektirdiği tüm senaryolar

**Kullanıma uygun değil:**
- Yeni dosya oluşturma — Write kullanılmalıdır
- Büyük ölçekli yeniden yazma — dosyanın tamamını üzerine yazmak için Write gerekebilir

## Dikkat Edilecekler

- Kullanmadan önce dosya Read ile okunmuş olmalıdır, aksi takdirde hata verir
- `old_string` dosyada benzersiz olmalıdır, aksi takdirde düzenleme başarısız olur. Benzersiz değilse, daha fazla bağlam sağlayarak benzersiz hale getirin veya `replace_all` kullanın
- Metin düzenlerken orijinal girintileme (tab/boşluk) korunmalıdır, Read çıktısındaki satır numarası önekini dahil etmeyin
- Yeni dosya oluşturmak yerine mevcut dosyayı düzenlemeyi tercih edin
- `new_string`, `old_string`'den farklı olmalıdır

## cc-viewer'da Önemi

Edit çağrıları istek günlüğünde `tool_use` content block olarak görünür; `input` alanı `old_string` ve `new_string` içerir ve modelin dosyada hangi değişiklikleri yaptığını izlemek için kullanılabilir.
