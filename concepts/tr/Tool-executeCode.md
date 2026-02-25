# executeCode (mcp__ide__executeCode)

## Tanım

Mevcut notebook dosyasının Jupyter kernel'ında Python kodu çalıştırır.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `code` | string | Evet | Çalıştırılacak Python kodu |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Jupyter notebook ortamında kod çalıştırma
- Kod parçacıklarını test etme
- Veri analizi ve hesaplama

**Kullanıma uygun değil:**
- Jupyter dışı ortamda kod çalıştırma — Bash kullanılmalıdır
- Dosya değiştirme — Edit veya Write kullanılmalıdır

## Dikkat Edilecekler

- Bu bir MCP (Model Context Protocol) aracıdır ve IDE entegrasyonu tarafından sağlanır
- Kod mevcut Jupyter kernel'ında çalıştırılır, durum çağrılar arasında kalıcıdır
- Kullanıcı açıkça istemediği sürece değişken tanımlamaktan veya kernel durumunu değiştirmekten kaçınılmalıdır
- Kernel yeniden başlatıldığında durum kaybolur

## cc-viewer'da Önemi

executeCode bir MCP aracıdır ve istek günlüğünün `tools` dizisinde `mcp__ide__executeCode` adıyla görünür. Çağrıları ve dönüşleri standart `tool_use` / `tool_result` kalıbını izler. MCP araçlarının eklenmesi veya kaldırılması tools dizisinin değişmesine neden olur ve önbellek yeniden oluşturmayı tetikleyebilir.
