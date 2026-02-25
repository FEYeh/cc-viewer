# Read

## Tanım

Yerel dosya sisteminden dosya içeriğini okur. Metin dosyaları, resimler, PDF ve Jupyter notebook destekler.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `file_path` | string | Evet | Dosyanın mutlak yolu |
| `offset` | number | Hayır | Başlangıç satır numarası (büyük dosyalar için parçalı okuma) |
| `limit` | number | Hayır | Okunacak satır sayısı (büyük dosyalar için parçalı okuma) |
| `pages` | string | Hayır | PDF sayfa aralığı (örn. "1-5", "3", "10-20"), yalnızca PDF için |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Kod dosyaları, yapılandırma dosyaları gibi metin dosyalarını okuma
- Resim dosyalarını görüntüleme (Claude çok modlu bir modeldir)
- PDF belgeleri okuma
- Jupyter notebook okuma (tüm hücreleri ve çıktıları döndürür)
- Bağlam elde etmek için birden fazla dosyayı paralel okuma

**Kullanıma uygun değil:**
- Dizin okuma — Bash'in `ls` komutu kullanılmalıdır
- Açık uçlu kod tabanı keşfi — Task (Explore türü) kullanılmalıdır

## Dikkat Edilecekler

- Yol mutlak yol olmalıdır, göreli yol kullanılamaz
- Varsayılan olarak dosyanın ilk 2000 satırını okur
- 2000 karakteri aşan satırlar kesilir
- Çıktı `cat -n` formatında, satır numaraları 1'den başlar
- Büyük PDF'ler (10 sayfadan fazla) için `pages` parametresi belirtilmelidir, her seferinde en fazla 20 sayfa
- Var olmayan bir dosyayı okumak hata döndürür (çökmez)
- Tek mesajda birden fazla Read paralel olarak çağrılabilir

## cc-viewer'da Önemi

Read çağrıları istek günlüğünde `tool_use` (çağrı) ve `tool_result` (dönen içerik) content block çifti olarak görünür. `tool_result` dosyanın gerçek içeriğini içerir ve modelin hangi dosyaları okuduğunu analiz etmek için kullanılabilir.
