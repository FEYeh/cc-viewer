# Grep

## Definicja

Potężne narzędzie do wyszukiwania zawartości oparte na ripgrep. Obsługuje wyrażenia regularne, filtrowanie typów plików i wiele trybów wyjścia.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `pattern` | string | Tak | Wzorzec wyszukiwania wyrażenia regularnego |
| `path` | string | Nie | Ścieżka wyszukiwania (plik lub katalog), domyślnie bieżący katalog roboczy |
| `glob` | string | Nie | Filtr nazw plików (np. `*.js`, `*.{ts,tsx}`) |
| `type` | string | Nie | Filtr typu pliku (np. `js`, `py`, `rust`), wydajniejszy niż glob |
| `output_mode` | enum | Nie | Tryb wyjścia: `files_with_matches` (domyślny), `content`, `count` |
| `-i` | boolean | Nie | Wyszukiwanie bez rozróżniania wielkości liter |
| `-n` | boolean | Nie | Wyświetlanie numerów linii (tylko tryb content), domyślnie true |
| `-A` | number | Nie | Liczba linii wyświetlanych po dopasowaniu |
| `-B` | number | Nie | Liczba linii wyświetlanych przed dopasowaniem |
| `-C` / `context` | number | Nie | Liczba linii wyświetlanych przed i po dopasowaniu |
| `head_limit` | number | Nie | Limit liczby wyników, domyślnie 0 (bez limitu) |
| `offset` | number | Nie | Pominięcie pierwszych N wyników |
| `multiline` | boolean | Nie | Włączenie trybu dopasowywania wieloliniowego, domyślnie false |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Wyszukiwanie określonych ciągów znaków lub wzorców w bazie kodu
- Znajdowanie miejsc użycia funkcji/zmiennych
- Filtrowanie wyników wyszukiwania według typu pliku
- Zliczanie dopasowań

**Nieodpowiednie zastosowanie:**
- Wyszukiwanie plików według nazwy — należy użyć Glob
- Otwarta eksploracja wymagająca wielu rund wyszukiwania — należy użyć Task (typ Explore)

## Uwagi

- Używa składni ripgrep (nie grep), znaki specjalne jak nawiasy klamrowe wymagają escapowania
- Tryb `files_with_matches` zwraca tylko ścieżki plików, najwydajniejszy
- Tryb `content` zwraca zawartość pasujących linii, obsługuje linie kontekstowe
- Dopasowywanie wieloliniowe wymaga ustawienia `multiline: true`
- Zawsze preferuj narzędzie Grep zamiast poleceń `grep` lub `rg` w Bash

## Znaczenie w cc-viewer

Wywołania Grep w logach żądań pojawiają się jako pary bloków content `tool_use` / `tool_result`. `tool_result` zawiera wyniki wyszukiwania.
