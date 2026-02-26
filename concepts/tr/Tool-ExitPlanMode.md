# ExitPlanMode

## Tanım

Planlama modundan çıkar ve planı kullanıcı onayına sunar. Plan içeriği daha önce yazılmış plan dosyasından okunur.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `allowedPrompts` | array | Hayır | Uygulama planının gerektirdiği izin açıklamaları listesi |

`allowedPrompts` dizisindeki her öğe:

| Alan | Tür | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `tool` | enum | Evet | Uygulanacak araç, şu anda yalnızca `Bash` desteklenir |
| `prompt` | string | Evet | İşlemin anlamsal açıklaması (örn. "run tests", "install dependencies") |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Planlama modunda plan tamamlandı, kullanıcı onayına sunulmaya hazır
- Yalnızca kod yazılması gereken uygulama görevleri için

**Kullanıma uygun değil:**
- Salt araştırma/keşif görevi — planlama modundan çıkmaya gerek yok
- Kullanıcıya "Plan uygun mu?" diye sormak — bu tam olarak bu aracın işlevidir, AskUserQuestion kullanmayın

## Dikkat Edilecekler

- Bu araç plan içeriğini parametre olarak kabul etmez — daha önce yazılmış plan dosyasından okur
- Kullanıcı onay için plan dosyasının içeriğini görecektir
- Bu aracı çağırmadan önce AskUserQuestion ile "plan uygun mu?" diye sormayın, bu tekrardır
- Sorularda "plan"dan bahsetmeyin, çünkü kullanıcı ExitPlanMode'dan önce plan içeriğini göremez

## cc-viewer'da Önemi

ExitPlanMode çağrısı planlama aşamasının sonunu işaret eder. İstek günlüğünde bu çağrıdan sonraki istekler genellikle uygulama işlemlerine (Edit, Write, Bash vb.) dönüşür.
