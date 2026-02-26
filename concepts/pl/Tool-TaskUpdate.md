# TaskUpdate

## Definicja

Aktualizuje status, zawartość lub zależności zadania na liście zadań.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `taskId` | string | Tak | ID zadania do aktualizacji |
| `status` | enum | Nie | Nowy status: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | Nie | Nowy tytuł |
| `description` | string | Nie | Nowy opis |
| `activeForm` | string | Nie | Tekst w czasie teraźniejszym ciągłym wyświetlany podczas wykonywania |
| `owner` | string | Nie | Nowy odpowiedzialny za zadanie (nazwa agenta) |
| `metadata` | object | Nie | Metadane do scalenia (ustawienie na null usuwa klucz) |
| `addBlocks` | string[] | Nie | Lista ID zadań zablokowanych przez to zadanie |
| `addBlockedBy` | string[] | Nie | Lista ID zadań poprzedzających, które blokują to zadanie |

## Przepływ statusów

```
pending → in_progress → completed
```

`deleted` może być ustawiony z dowolnego statusu, trwale usuwa zadanie.

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Oznaczanie zadania jako `in_progress` przy rozpoczęciu pracy
- Oznaczanie zadania jako `completed` po zakończeniu pracy
- Ustawianie zależności między zadaniami
- Aktualizacja zawartości zadania przy zmianie wymagań

**Ważne zasady:**
- Oznaczaj jako `completed` tylko po pełnym ukończeniu zadania
- W przypadku błędów lub blokad zachowaj status `in_progress`
- Nie oznaczaj jako `completed` gdy testy nie przechodzą, implementacja jest niepełna lub wystąpiły nierozwiązane błędy

## Uwagi

- Przed aktualizacją należy pobrać najnowszy stan zadania przez TaskGet, aby uniknąć przestarzałych danych
- Po ukończeniu zadania wywołaj TaskList, aby znaleźć następne dostępne zadanie

## Znaczenie w cc-viewer

TaskUpdate to wewnętrzna operacja zarządzania zadaniami, nie generuje niezależnego żądania API.
