# TaskUpdate

## Tanım

Görev listesindeki bir görevin durumunu, içeriğini veya bağımlılık ilişkilerini günceller.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `taskId` | string | Evet | Güncellenecek görev ID'si |
| `status` | enum | Hayır | Yeni durum: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | Hayır | Yeni başlık |
| `description` | string | Hayır | Yeni açıklama |
| `activeForm` | string | Hayır | Devam ederken gösterilen şimdiki zaman metni |
| `owner` | string | Hayır | Yeni görev sorumlusu (agent adı) |
| `metadata` | object | Hayır | Birleştirilecek meta veriler (null olarak ayarlamak anahtarı siler) |
| `addBlocks` | string[] | Hayır | Bu görev tarafından engellenen görev ID listesi |
| `addBlockedBy` | string[] | Hayır | Bu görevi engelleyen ön koşul görev ID listesi |

## Durum Geçişi

```
pending → in_progress → completed
```

`deleted` herhangi bir durumdan geçilebilir ve görevi kalıcı olarak kaldırır.

## Kullanım Senaryoları

**Kullanıma uygun:**
- Çalışmaya başlarken görevi `in_progress` olarak işaretleme
- Çalışma tamamlandığında görevi `completed` olarak işaretleme
- Görevler arası bağımlılık ilişkilerini ayarlama
- Gereksinimler değiştiğinde görev içeriğini güncelleme

**Önemli kurallar:**
- Yalnızca görev tamamen tamamlandığında `completed` olarak işaretleyin
- Hata veya engelle karşılaşıldığında `in_progress` olarak bırakın
- Test başarısız, uygulama eksik veya çözülmemiş hatalarla karşılaşıldığında `completed` olarak işaretlemeyin

## Dikkat Edilecekler

- Güncellemeden önce TaskGet ile görevin en son durumunu alın, eski verileri önleyin
- Görevi tamamladıktan sonra TaskList ile bir sonraki mevcut görevi bulun

## cc-viewer'da Önemi

TaskUpdate dahili görev yönetim işlemidir ve bağımsız API isteği üretmez.
