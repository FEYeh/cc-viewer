# ExitPlanMode

## Definicja

Wychodzi z trybu planowania i przesyła plan do zatwierdzenia przez użytkownika. Treść planu jest odczytywana z wcześniej zapisanego pliku planu.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `allowedPrompts` | array | Nie | Lista opisów uprawnień wymaganych do wdrożenia planu |

Każdy element tablicy `allowedPrompts`:

| Pole | Typ | Wymagany | Opis |
|------|------|------|------|
| `tool` | enum | Tak | Odpowiednie narzędzie, obecnie obsługiwane tylko `Bash` |
| `prompt` | string | Tak | Semantyczny opis operacji (np. "run tests", "install dependencies") |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Plan w trybie planowania jest ukończony, gotowy do przesłania do zatwierdzenia przez użytkownika
- Tylko dla zadań wdrożeniowych wymagających pisania kodu

**Nieodpowiednie zastosowanie:**
- Czyste zadania badawcze/eksploracyjne — nie wymagają wyjścia z trybu planowania
- Chcesz zapytać użytkownika „czy plan jest OK?" — to właśnie funkcja tego narzędzia, nie używaj AskUserQuestion do tego

## Uwagi

- To narzędzie nie przyjmuje treści planu jako parametru — odczytuje ją z wcześniej zapisanego pliku planu
- Użytkownik zobaczy zawartość pliku planu do zatwierdzenia
- Nie pytaj za pomocą AskUserQuestion „czy plan jest OK" przed wywołaniem tego narzędzia — to byłoby duplikowanie
- Nie wspominaj o „planie" w pytaniach, ponieważ użytkownik nie widzi treści planu przed ExitPlanMode

## Znaczenie w cc-viewer

Wywołanie ExitPlanMode oznacza koniec fazy planowania. W logach żądań, żądania po tym wywołaniu zazwyczaj przechodzą do operacji wdrożeniowych (Edit, Write, Bash itp.).
