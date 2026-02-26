# TaskCreate

## Tanım

İlerlemeyi izlemek, karmaşık görevleri organize etmek ve kullanıcıya çalışma ilerlemesini göstermek için yapılandırılmış görev listesi girdisi oluşturur.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `subject` | string | Evet | Kısa görev başlığı, emir kipi kullanılır (örn. "Fix authentication bug") |
| `description` | string | Evet | Bağlam ve kabul kriterleri dahil ayrıntılı açıklama |
| `activeForm` | string | Hayır | Devam ederken gösterilen şimdiki zaman metni (örn. "Fixing authentication bug") |
| `metadata` | object | Hayır | Göreve eklenen rastgele meta veriler |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Karmaşık çok adımlı görevler (3 adımdan fazla)
- Kullanıcı birden fazla yapılacak iş sağladığında
- Planlama modunda çalışmayı izleme
- Kullanıcı açıkça todo listesi kullanılmasını istediğinde

**Kullanıma uygun değil:**
- Tek basit görev
- 3 adımdan az basit işlemler
- Salt konuşma veya bilgi sorgusu

## Dikkat Edilecekler

- Tüm yeni görevlerin başlangıç durumu `pending`'dir
- `subject` emir kipi kullanır ("Run tests"), `activeForm` şimdiki zaman kullanır ("Running tests")
- Oluşturulduktan sonra TaskUpdate ile bağımlılık ilişkileri (blocks/blockedBy) ayarlanabilir
- Oluşturmadan önce TaskList ile mükerrer görev olup olmadığı kontrol edilmelidir

## cc-viewer'da Önemi

TaskCreate, Claude Code'un dahili görev yönetim işlemidir ve bağımsız API isteği üretmez. Ancak Chat Mode'da modelin bu aracı çağırdığı tool_use block görülebilir.
