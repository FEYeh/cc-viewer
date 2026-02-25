# Read

## Definicja

Odczytuje zawartość pliku z lokalnego systemu plików. Obsługuje pliki tekstowe, obrazy, PDF i Jupyter notebook.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `file_path` | string | Tak | Bezwzględna ścieżka do pliku |
| `offset` | number | Nie | Numer linii początkowej (do segmentowego odczytu dużych plików) |
| `limit` | number | Nie | Liczba linii do odczytu (do segmentowego odczytu dużych plików) |
| `pages` | string | Nie | Zakres stron PDF (np. "1-5", "3", "10-20"), dotyczy tylko PDF |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Odczyt plików kodu, plików konfiguracyjnych i innych plików tekstowych
- Przeglądanie plików graficznych (Claude jest modelem multimodalnym)
- Odczyt dokumentów PDF
- Odczyt Jupyter notebook (zwraca wszystkie komórki z wyjściem)
- Równoległy odczyt wielu plików w celu uzyskania kontekstu

**Nieodpowiednie zastosowanie:**
- Odczyt katalogów — należy użyć polecenia `ls` w Bash
- Otwarta eksploracja bazy kodu — należy użyć Task (typ Explore)

## Uwagi

- Ścieżka musi być bezwzględna, nie może być względna
- Domyślnie odczytuje pierwsze 2000 linii pliku
- Linie przekraczające 2000 znaków zostaną obcięte
- Wyjście używa formatu `cat -n`, numery linii zaczynają się od 1
- Duże pliki PDF (ponad 10 stron) muszą mieć określony parametr `pages`, maksymalnie 20 stron na raz
- Odczyt nieistniejącego pliku zwróci błąd (nie spowoduje awarii)
- Można równolegle wywoływać wiele Read w jednej wiadomości

## Znaczenie w cc-viewer

Wywołania Read w logach żądań pojawiają się jako pary bloków content `tool_use` (wywołanie) i `tool_result` (zwrócona zawartość). `tool_result` zawiera faktyczną zawartość pliku, co pozwala analizować, które pliki model odczytał.
