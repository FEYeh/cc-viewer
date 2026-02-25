# WebSearch

## Definicja

Wykonuje zapytanie do wyszukiwarki, zwracając wyniki wyszukiwania w celu uzyskania aktualnych informacji.

## Parametry

| Parametr | Typ | Wymagany | Opis |
|------|------|------|------|
| `query` | string | Tak | Zapytanie wyszukiwania (minimum 2 znaki) |
| `allowed_domains` | string[] | Nie | Uwzględnij tylko wyniki z tych domen |
| `blocked_domains` | string[] | Nie | Wyklucz wyniki z tych domen |

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Uzyskiwanie najnowszych informacji wykraczających poza datę odcięcia wiedzy modelu
- Wyszukiwanie bieżących wydarzeń i najnowszych danych
- Wyszukiwanie najnowszej dokumentacji technicznej

## Uwagi

- Wyniki wyszukiwania są zwracane w formacie hiperłączy markdown
- Po użyciu należy dołączyć sekcję "Sources:" na końcu odpowiedzi z listą odpowiednich URL
- Obsługuje filtrowanie domen (uwzględnianie/wykluczanie)
- W zapytaniach wyszukiwania należy używać bieżącego roku
- Dostępne tylko w USA

## Znaczenie w cc-viewer

Wywołania WebSearch w logach żądań pojawiają się jako pary bloków content `tool_use` / `tool_result`. `tool_result` zawiera listę wyników wyszukiwania.
