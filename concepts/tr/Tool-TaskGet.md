# TaskGet

## Tanım

Görev ID'si ile görevin tam detaylarını alır.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `taskId` | string | Evet | Alınacak görev ID'si |

## Dönen İçerik

- `subject` — Görev başlığı
- `description` — Ayrıntılı gereksinimler ve bağlam
- `status` — Durum: `pending`, `in_progress` veya `completed`
- `blocks` — Bu görev tarafından engellenen görev listesi
- `blockedBy` — Bu görevi engelleyen ön koşul görev listesi

## Kullanım Senaryoları

**Kullanıma uygun:**
- Çalışmaya başlamadan önce görevin tam açıklamasını ve bağlamını alma
- Görev bağımlılıklarını anlama
- Görev atandıktan sonra tam gereksinimleri alma

## Dikkat Edilecekler

- Görevi aldıktan sonra çalışmaya başlamadan önce `blockedBy` listesinin boş olup olmadığı kontrol edilmelidir
- Tüm görevlerin özet bilgilerini görmek için TaskList kullanın

## cc-viewer'da Önemi

TaskGet dahili görev yönetim işlemidir ve bağımsız API isteği üretmez.
