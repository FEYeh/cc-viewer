# Skill

## Definicja

Wykonuje umiejętność (skill) w głównej rozmowie. Umiejętności to specjalizowane zdolności, które użytkownik może wywoływać za pomocą slash command (np. `/commit`, `/review-pr`).

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `skill` | string | Tak | Nazwa umiejętności (np. "commit", "review-pr", "pdf") |
| `args` | string | Nie | Argumenty umiejętności |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Użytkownik wpisał slash command w formacie `/<skill-name>`
- Żądanie użytkownika pasuje do funkcjonalności zarejestrowanej umiejętności

**Nieodpowiednie zastosowanie:**
- Wbudowane polecenia CLI (np. `/help`, `/clear`)
- Umiejętność już jest w trakcie wykonywania
- Nazwa umiejętności nie znajduje się na liście dostępnych umiejętności

## Uwagi

- Po wywołaniu umiejętność rozwija się w pełny prompt
- Obsługuje w pełni kwalifikowane nazwy (np. `ms-office-suite:pdf`)
- Lista dostępnych umiejętności jest podawana w wiadomościach system-reminder
- Gdy widoczny jest tag `<command-name>`, oznacza to, że umiejętność została załadowana — należy ją bezpośrednio wykonać, a nie ponownie wywoływać to narzędzie
- Nie wspominaj o umiejętności bez faktycznego wywołania narzędzia

## Znaczenie w cc-viewer

Wywołanie Skill w logach żądań pojawia się jako blok content `tool_use`. Prompt rozwinięty z umiejętności wpływa na system prompt lub zawartość wiadomości kolejnych żądań.
