# TaskOutput

## Tanım

Çalışan veya tamamlanmış arka plan görevinin çıktısını alır. Arka plan shell'leri, asenkron agent'lar ve uzak oturumlar için uygundur.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `task_id` | string | Evet | Görev ID'si |
| `block` | boolean | Evet | Görev tamamlanana kadar beklenip beklenmeyeceği, varsayılan `true` |
| `timeout` | number | Evet | Maksimum bekleme süresi (milisaniye), varsayılan 30000, maksimum 600000 |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Task (`run_in_background: true`) ile başlatılan arka plan agent'ının ilerlemesini kontrol etme
- Arka plan Bash komutunun çalıştırma sonucunu alma
- Asenkron görevin tamamlanmasını bekleyip çıktısını alma

**Kullanıma uygun değil:**
- Ön plan görevleri — ön plan görevleri doğrudan sonuç döndürür, bu araca gerek yoktur

## Dikkat Edilecekler

- `block: true` görev tamamlanana veya zaman aşımına uğrayana kadar engeller
- `block: false` mevcut durumu engellemeden kontrol etmek için kullanılır
- Görev ID'si `/tasks` komutuyla bulunabilir
- Tüm görev türleri için geçerlidir: arka plan shell, asenkron agent, uzak oturum

## cc-viewer'da Önemi

TaskOutput çağrısı kendisi API isteği üretmez; Claude Code'un dahili görev yönetim işlemidir ve istek günlüğünde görünmez.
