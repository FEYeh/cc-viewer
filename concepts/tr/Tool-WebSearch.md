# WebSearch

## Tanım

Arama motoru sorgusu çalıştırır ve güncel bilgi almak için arama sonuçlarını döndürür.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `query` | string | Evet | Arama sorgusu (en az 2 karakter) |
| `allowed_domains` | string[] | Hayır | Yalnızca bu alan adlarından sonuçları dahil et |
| `blocked_domains` | string[] | Hayır | Bu alan adlarından sonuçları hariç tut |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Modelin bilgi kesme tarihini aşan güncel bilgileri alma
- Güncel olayları ve en son verileri bulma
- En güncel teknik belgeleri arama

## Dikkat Edilecekler

- Arama sonuçları markdown köprü formatında döndürülür
- Kullanımdan sonra yanıtın sonuna "Sources:" bölümü eklenmeli ve ilgili URL'ler listelenmelidir
- Alan adı filtrelemeyi destekler (dahil etme/hariç tutma)
- Arama sorgusunda güncel yıl kullanılmalıdır
- Yalnızca ABD'de kullanılabilir

## cc-viewer'da Önemi

WebSearch çağrıları istek günlüğünde `tool_use` / `tool_result` content block çifti olarak görünür. `tool_result` arama sonuçları listesini içerir.
