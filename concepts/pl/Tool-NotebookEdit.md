# NotebookEdit

## Definicja

Zastępuje, wstawia lub usuwa określoną komórkę w Jupyter notebook (plik .ipynb).

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `notebook_path` | string | Tak | Bezwzględna ścieżka do pliku notebook |
| `new_source` | string | Tak | Nowa zawartość komórki |
| `cell_id` | string | Nie | ID komórki do edycji. W trybie wstawiania nowa komórka jest wstawiana po tym ID |
| `cell_type` | enum | Nie | Typ komórki: `code` lub `markdown`. Wymagany w trybie wstawiania |
| `edit_mode` | enum | Nie | Tryb edycji: `replace` (domyślny), `insert`, `delete` |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Modyfikacja komórek kodu lub markdown w Jupyter notebook
- Dodawanie nowych komórek do notebook
- Usuwanie komórek z notebook

## Uwagi

- `cell_number` jest indeksowany od 0
- Tryb `insert` wstawia nową komórkę w określonej pozycji
- Tryb `delete` usuwa komórkę w określonej pozycji
- Ścieżka musi być bezwzględna

## Znaczenie w cc-viewer

Wywołanie NotebookEdit w logach żądań pojawia się jako blok content `tool_use`, rejestrujący konkretne operacje modyfikacji notebook.
