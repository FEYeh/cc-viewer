# WebFetch

## Definicja

Pobiera zawartość strony internetowej pod podanym URL, konwertuje HTML na markdown i przetwarza zawartość za pomocą modelu AI zgodnie z promptem.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `url` | string (URI) | Tak | Pełny URL do pobrania |
| `prompt` | string | Tak | Opis informacji do wyodrębnienia ze strony |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Pobieranie zawartości publicznych stron internetowych
- Przeglądanie dokumentacji online
- Wyodrębnianie określonych informacji ze stron internetowych

**Nieodpowiednie zastosowanie:**
- URL wymagające uwierzytelnienia (Google Docs, Confluence, Jira, GitHub itp.) — należy najpierw poszukać dedykowanego narzędzia MCP
- URL GitHub — preferuj użycie `gh` CLI

## Uwagi

- URL musi być pełnym, prawidłowym URL
- HTTP jest automatycznie aktualizowane do HTTPS
- Zbyt duża zawartość może zostać podsumowana
- Zawiera 15-minutowy samoczyszczący się cache
- Gdy URL przekierowuje na inny host, narzędzie zwraca URL przekierowania — należy ponowić żądanie z nowym URL
- Jeśli dostępne jest narzędzie web fetch dostarczane przez MCP, preferuj jego użycie

## Znaczenie w cc-viewer

Wywołania WebFetch w logach żądań pojawiają się jako pary bloków content `tool_use` / `tool_result`. `tool_result` zawiera podsumowanie zawartości strony przetworzone przez AI.
