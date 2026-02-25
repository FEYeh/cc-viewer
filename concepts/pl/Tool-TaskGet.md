# TaskGet

## Definicja

Pobiera pełne szczegóły zadania na podstawie jego ID.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `taskId` | string | Tak | ID zadania do pobrania |

## Zwracana zawartość

- `subject` — tytuł zadania
- `description` — szczegółowe wymagania i kontekst
- `status` — status: `pending`, `in_progress` lub `completed`
- `blocks` — lista zadań zablokowanych przez to zadanie
- `blockedBy` — lista zadań poprzedzających, które blokują to zadanie

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Pobranie pełnego opisu i kontekstu zadania przed rozpoczęciem pracy
- Zrozumienie zależności zadania
- Pobranie pełnych wymagań po przydzieleniu zadania

## Uwagi

- Po pobraniu zadania należy sprawdzić, czy lista `blockedBy` jest pusta, zanim rozpocznie się pracę
- Użyj TaskList, aby zobaczyć podsumowanie wszystkich zadań

## Znaczenie w cc-viewer

TaskGet to wewnętrzna operacja zarządzania zadaniami, nie generuje niezależnego żądania API.
