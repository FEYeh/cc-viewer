# TaskCreate

## Definicja

Tworzy strukturalny wpis na liście zadań, służący do śledzenia postępu, organizacji złożonych zadań i prezentowania użytkownikowi postępu prac.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `subject` | string | Tak | Krótki tytuł zadania w trybie rozkazującym (np. "Fix authentication bug") |
| `description` | string | Tak | Szczegółowy opis, zawierający kontekst i kryteria akceptacji |
| `activeForm` | string | Nie | Tekst w czasie teraźniejszym ciągłym wyświetlany podczas wykonywania (np. "Fixing authentication bug") |
| `metadata` | object | Nie | Dowolne metadane dołączone do zadania |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Złożone wieloetapowe zadania (ponad 3 kroki)
- Użytkownik podał wiele elementów do wykonania
- Śledzenie pracy w trybie planowania
- Użytkownik wyraźnie poprosił o użycie listy todo

**Nieodpowiednie zastosowanie:**
- Pojedyncze proste zadanie
- Proste operacje w mniej niż 3 krokach
- Czysta rozmowa lub zapytanie informacyjne

## Uwagi

- Wszystkie nowo utworzone zadania mają początkowy status `pending`
- `subject` używa trybu rozkazującego ("Run tests"), `activeForm` używa czasu teraźniejszego ciągłego ("Running tests")
- Po utworzeniu zadania można ustawić zależności (blocks/blockedBy) za pomocą TaskUpdate
- Przed utworzeniem należy wywołać TaskList, aby sprawdzić, czy nie ma duplikatów

## Znaczenie w cc-viewer

TaskCreate to wewnętrzna operacja zarządzania zadaniami Claude Code, nie generuje niezależnego żądania API. Jednak w Chat Mode można zobaczyć blok tool_use, w którym model wywołuje to narzędzie.
