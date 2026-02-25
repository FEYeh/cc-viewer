# EnterPlanMode

## Tanım

Claude Code'u planlama moduna geçirir; uygulamadan önce kod tabanını keşfetmek ve plan tasarlamak için kullanılır.

## Parametreler

Parametre yok.

## Kullanım Senaryoları

**Kullanıma uygun:**
- Yeni özellik uygulaması — mimari kararlar gerektirir
- Birden fazla uygulanabilir yaklaşım var — kullanıcı seçimi gerektirir
- Kod değişikliği mevcut davranışı veya yapıyı etkiler
- Çoklu dosya değişikliği — 2-3'ten fazla dosya etkilenebilir
- Gereksinimler belirsiz — önce keşfedip kapsamı anlamak gerekir
- Kullanıcı tercihi önemli — uygulama birden fazla makul yönde olabilir

**Kullanıma uygun değil:**
- Tek satır veya az satırlık düzeltmeler (yazım hatası, belirgin bug)
- Kullanıcı çok spesifik talimatlar vermiş
- Salt araştırma/keşif görevi — Task (Explore türü) kullanılmalıdır

## Planlama Modundaki Davranış

Planlama moduna girdikten sonra Claude Code:
1. Glob, Grep, Read araçlarını kullanarak kod tabanını derinlemesine keşfeder
2. Mevcut kalıpları ve mimariyi anlar
3. Uygulama planı tasarlar
4. Planı kullanıcı onayına sunar
5. Gerekirse AskUserQuestion ile açıklama isteyebilir
6. Plan hazır olduğunda ExitPlanMode ile çıkar

## Dikkat Edilecekler

- Bu araç, planlama moduna girmek için kullanıcı onayı gerektirir
- Planlama gerekip gerekmediğinden emin değilseniz, planlamayı tercih edin — önceden uyum sağlamak yeniden çalışmaktan iyidir

## cc-viewer'da Önemi

EnterPlanMode çağrısı istek günlüğünde `tool_use` content block olarak görünür. Planlama moduna girdikten sonraki istek dizisi genellikle keşif amaçlı araç çağrılarından (Glob, Grep, Read) oluşur ve ExitPlanMode çağrılana kadar devam eder.
