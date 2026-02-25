# AskUserQuestion

## Definicja

Zadaje pytanie użytkownikowi podczas wykonywania, w celu uzyskania wyjaśnienia, weryfikacji założeń lub uzyskania decyzji.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `questions` | array | Tak | Lista pytań (1-4 pytania) |
| `answers` | object | Nie | Odpowiedzi zebrane od użytkownika |
| `annotations` | object | Nie | Adnotacje do każdego pytania (np. uwagi do podglądu wyboru) |
| `metadata` | object | Nie | Metadane do śledzenia i analizy |

Każdy obiekt `question`:

| Pole | Typ | Wymagany | Opis |
|------|------|------|------|
| `question` | string | Tak | Pełny tekst pytania, powinien kończyć się znakiem zapytania |
| `header` | string | Tak | Krótka etykieta (maks. 12 znaków), wyświetlana jako chip etykiety |
| `options` | array | Tak | 2-4 opcje |
| `multiSelect` | boolean | Tak | Czy dozwolony jest wielokrotny wybór |

Każdy obiekt `option`:

| Pole | Typ | Wymagany | Opis |
|------|------|------|------|
| `label` | string | Tak | Tekst wyświetlany opcji (1-5 słów) |
| `description` | string | Tak | Opis opcji |
| `markdown` | string | Nie | Zawartość podglądu (do wizualnego porównania układów ASCII, fragmentów kodu itp.) |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Zbieranie preferencji lub wymagań użytkownika
- Wyjaśnianie niejasnych instrukcji
- Uzyskiwanie decyzji podczas wdrażania
- Oferowanie użytkownikowi wyboru kierunku

**Nieodpowiednie zastosowanie:**
- Pytanie „czy plan jest OK?" — należy użyć ExitPlanMode

## Uwagi

- Użytkownik zawsze może wybrać "Other" i podać własne dane wejściowe
- Rekomendowana opcja powinna być na pierwszym miejscu, z "(Recommended)" na końcu etykiety
- Podgląd `markdown` jest obsługiwany tylko dla pytań jednokrotnego wyboru
- Opcje z `markdown` przełączają się na układ obok siebie (lewo-prawo)
- W trybie planowania służy do wyjaśniania wymagań przed ustaleniem planu

## Znaczenie w cc-viewer

Wywołanie AskUserQuestion w logach żądań pojawia się jako blok content `tool_use`, zawierający definicje pytań i opcji. Odpowiedź użytkownika pojawia się w historii wiadomości kolejnych żądań.
