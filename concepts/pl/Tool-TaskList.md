# TaskList

## Definicja

Wyświetla listę wszystkich zadań na liście zadań, umożliwiając przegląd ogólnego postępu i dostępnej pracy.

## Parametry

Brak parametrów.

## Zwracana zawartość

Podsumowanie każdego zadania:
- `id` — identyfikator zadania
- `subject` — krótki opis
- `status` — status: `pending`, `in_progress` lub `completed`
- `owner` — odpowiedzialny (ID agenta), puste oznacza nieprzydzielone
- `blockedBy` — lista ID nieukończonych zadań blokujących to zadanie

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Sprawdzanie dostępnych zadań (status pending, brak owner, niezablokowane)
- Sprawdzanie ogólnego postępu projektu
- Wyszukiwanie zablokowanych zadań
- Wyszukiwanie następnego zadania po ukończeniu bieżącego

## Uwagi

- Preferuj przetwarzanie zadań w kolejności ID (najniższe ID najpierw), ponieważ wcześniejsze zadania zazwyczaj dostarczają kontekst dla późniejszych
- Zadania z `blockedBy` nie mogą być podjęte przed usunięciem zależności
- Użyj TaskGet, aby uzyskać pełne szczegóły konkretnego zadania

## Znaczenie w cc-viewer

TaskList to wewnętrzna operacja zarządzania zadaniami, nie generuje niezależnego żądania API.
