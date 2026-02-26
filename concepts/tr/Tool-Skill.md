# Skill

## Tanım

Ana konuşmada bir beceri (skill) çalıştırır. Beceriler, kullanıcının slash command (örn. `/commit`, `/review-pr`) aracılığıyla çağırabileceği özel yeteneklerdir.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `skill` | string | Evet | Beceri adı (örn. "commit", "review-pr", "pdf") |
| `args` | string | Hayır | Beceri parametreleri |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Kullanıcı `/<skill-name>` formatında slash command girdiğinde
- Kullanıcının isteği kayıtlı bir becerinin işlevselliğiyle eşleştiğinde

**Kullanıma uygun değil:**
- Yerleşik CLI komutları (örn. `/help`, `/clear`)
- Zaten çalışmakta olan bir beceri
- Kullanılabilir beceri listesinde olmayan beceri adları

## Dikkat Edilecekler

- Beceri çağrıldıktan sonra tam bir prompt'a genişletilir
- Tam nitelikli adları destekler (örn. `ms-office-suite:pdf`)
- Kullanılabilir beceri listesi system-reminder mesajlarında sağlanır
- `<command-name>` etiketi görüldüğünde beceri zaten yüklenmiş demektir, bu aracı tekrar çağırmak yerine doğrudan çalıştırılmalıdır
- Aracı gerçekten çağırmadan bir beceriden bahsetmeyin

## cc-viewer'da Önemi

Skill çağrıları istek günlüğünde `tool_use` content block olarak görünür. Beceri genişletildikten sonraki prompt, sonraki isteklerin system prompt'unu veya mesaj içeriğini etkiler.
