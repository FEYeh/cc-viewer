# NotebookEdit

## Tanım

Jupyter notebook (.ipynb dosyası) içindeki belirli bir hücreyi değiştirme, ekleme veya silme işlemi yapar.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `notebook_path` | string | Evet | Notebook dosyasının mutlak yolu |
| `new_source` | string | Evet | Hücrenin yeni içeriği |
| `cell_id` | string | Hayır | Düzenlenecek hücre ID'si. Ekleme modunda yeni hücre bu ID'den sonra eklenir |
| `cell_type` | enum | Hayır | Hücre türü: `code` veya `markdown`. Ekleme modunda zorunludur |
| `edit_mode` | enum | Hayır | Düzenleme modu: `replace` (varsayılan), `insert`, `delete` |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Jupyter notebook'taki kod veya markdown hücrelerini değiştirme
- Notebook'a yeni hücre ekleme
- Notebook'tan hücre silme

## Dikkat Edilecekler

- `cell_number` 0 indekslidir
- `insert` modu belirtilen konuma yeni hücre ekler
- `delete` modu belirtilen konumdaki hücreyi siler
- Yol mutlak yol olmalıdır

## cc-viewer'da Önemi

NotebookEdit çağrıları istek günlüğünde `tool_use` content block olarak görünür ve notebook üzerindeki belirli değişiklik işlemlerini kaydeder.
