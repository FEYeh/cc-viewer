# AskUserQuestion

## Tanım

Yürütme sırasında kullanıcıya soru sorarak açıklama alma, varsayımları doğrulama veya karar isteme amacıyla kullanılır.

## Parametreler

| Parametre | Tür | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `questions` | array | Evet | Soru listesi (1-4 soru) |
| `answers` | object | Hayır | Kullanıcıdan toplanan yanıtlar |
| `annotations` | object | Hayır | Her soru için notlar (örn. önizleme seçimi açıklamaları) |
| `metadata` | object | Hayır | İzleme ve analiz için meta veriler |

Her `question` nesnesi:

| Alan | Tür | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `question` | string | Evet | Tam soru metni, soru işaretiyle bitmelidir |
| `header` | string | Evet | Kısa etiket (en fazla 12 karakter), etiket çipi olarak gösterilir |
| `options` | array | Evet | 2-4 seçenek |
| `multiSelect` | boolean | Evet | Çoklu seçime izin verilip verilmediği |

Her `option` nesnesi:

| Alan | Tür | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `label` | string | Evet | Seçenek görüntüleme metni (1-5 kelime) |
| `description` | string | Evet | Seçenek açıklaması |
| `markdown` | string | Hayır | Önizleme içeriği (ASCII düzeni, kod parçacıkları vb. için görsel karşılaştırma) |

## Kullanım Senaryoları

**Kullanıma uygun:**
- Kullanıcı tercihlerini veya gereksinimlerini toplama
- Belirsiz talimatları netleştirme
- Uygulama sürecinde karar alma
- Kullanıcıya yön seçenekleri sunma

**Kullanıma uygun değil:**
- "Plan uygun mu?" diye sormak — ExitPlanMode kullanılmalıdır

## Dikkat Edilecekler

- Kullanıcı her zaman "Other" seçerek özel girdi sağlayabilir
- Önerilen seçenek ilk sıraya konulmalı ve label sonuna "(Recommended)" eklenmelidir
- `markdown` önizlemesi yalnızca tek seçimli sorularda desteklenir
- `markdown` içeren seçenekler yan yana düzene geçer
- Planlama modunda, planı kesinleştirmeden önce gereksinimleri netleştirmek için kullanılır

## cc-viewer'da Önemi

AskUserQuestion çağrısı istek günlüğünde `tool_use` content block olarak görünür ve soru ile seçenek tanımlarını içerir. Kullanıcının yanıtı sonraki isteklerin mesaj geçmişinde yer alır.
