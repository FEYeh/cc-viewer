# TaskList

## Tanım

Görev listesindeki tüm görevleri listeler, genel ilerlemeyi ve mevcut çalışmaları görüntüler.

## Parametreler

Parametre yok.

## Dönen İçerik

Her görevin özet bilgileri:
- `id` — Görev tanımlayıcısı
- `subject` — Kısa açıklama
- `status` — Durum: `pending`, `in_progress` veya `completed`
- `owner` — Sorumlu kişi (agent ID), boş ise atanmamış
- `blockedBy` — Bu görevi engelleyen tamamlanmamış görev ID listesi

## Kullanım Senaryoları

**Kullanıma uygun:**
- Mevcut görevleri görme (durumu pending, owner'ı yok, engellenmemiş)
- Proje genel ilerlemesini kontrol etme
- Engellenen görevleri bulma
- Bir görevi tamamladıktan sonra bir sonrakini bulma

## Dikkat Edilecekler

- Görevleri ID sırasına göre işlemeyi tercih edin (en küçük ID önce), çünkü erken görevler genellikle sonraki görevler için bağlam sağlar
- `blockedBy` olan görevler bağımlılık çözülmeden sahiplenilemez
- Belirli bir görevin tam detayları için TaskGet kullanın

## cc-viewer'da Önemi

TaskList dahili görev yönetim işlemidir ve bağımsız API isteği üretmez.
