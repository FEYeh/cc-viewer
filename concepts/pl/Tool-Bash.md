# Bash

## Definicja

Wykonuje polecenia shell z opcjonalnym ustawieniem limitu czasu. Katalog roboczy jest zachowywany między poleceniami, ale stan shell (zmienne środowiskowe itp.) nie jest zachowywany.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `command` | string | Tak | Polecenie bash do wykonania |
| `description` | string | Nie | Krótki opis polecenia |
| `timeout` | number | Nie | Limit czasu (milisekundy), maks. 600000, domyślnie 120000 |
| `run_in_background` | boolean | Nie | Czy uruchomić w tle |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Operacje git (commit, push, branch itp.)
- Polecenia menedżerów pakietów npm/yarn
- Operacje docker
- Polecenia kompilacji i budowania
- Wyświetlanie zawartości katalogów (`ls`)
- Inne polecenia systemowe wymagające wykonania w shell

**Nieodpowiednie zastosowanie:**
- Odczyt plików — należy użyć Read
- Wyszukiwanie nazw plików — należy użyć Glob
- Wyszukiwanie zawartości plików — należy użyć Grep
- Edycja plików — należy użyć Edit
- Zapis plików — należy użyć Write
- Wyświetlanie informacji użytkownikowi — bezpośrednio w tekście odpowiedzi
- Długo działające procesy (dev server, tryb watch) — zalecane ręczne uruchomienie przez użytkownika

## Uwagi

- Ścieżki zawierające spacje muszą być ujęte w podwójne cudzysłowy
- Wyjście przekraczające 30000 znaków zostanie obcięte
- Wyniki poleceń uruchomionych w tle pobiera się przez TaskOutput
- Należy używać ścieżek bezwzględnych, unikać `cd`
- Niezależne polecenia mogą być wywoływane równolegle w wielu Bash
- Polecenia z zależnościami łączy się za pomocą `&&`
- Środowisko shell jest inicjalizowane z profilu użytkownika (bash lub zsh)

## Znaczenie w cc-viewer

Wywołania Bash w logach żądań pojawiają się jako pary bloków content `tool_use` (zawierające polecenie) i `tool_result` (zawierające wyjście). Wyjście wykonania polecenia może być wykorzystane do analizy zachowania modelu.
