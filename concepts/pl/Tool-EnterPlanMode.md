# EnterPlanMode

## Definicja

Przełącza Claude Code w tryb planowania, służący do eksploracji bazy kodu i projektowania planu przed wdrożeniem.

## Parametry

Brak parametrów.

## Scenariusze użycia

**Odpowiednie zastosowanie:**
- Implementacja nowych funkcji — wymagane decyzje architektoniczne
- Istnieje wiele możliwych rozwiązań — wymagany wybór użytkownika
- Zmiany w kodzie wpływają na istniejące zachowanie lub strukturę
- Zmiany w wielu plikach — potencjalnie 2-3 lub więcej plików
- Niejasne wymagania — konieczna eksploracja przed zrozumieniem zakresu
- Preferencje użytkownika są istotne — implementacja może mieć wiele rozsądnych kierunków

**Nieodpowiednie zastosowanie:**
- Poprawki jednej lub kilku linii (literówki, oczywiste błędy)
- Użytkownik podał bardzo konkretne instrukcje
- Czyste zadania badawcze/eksploracyjne — należy użyć Task (typ Explore)

## Zachowanie w trybie planowania

Po wejściu w tryb planowania Claude Code:
1. Używa narzędzi Glob, Grep, Read do dogłębnej eksploracji bazy kodu
2. Rozumie istniejące wzorce i architekturę
3. Projektuje plan wdrożenia
4. Przesyła plan do zatwierdzenia przez użytkownika
5. W razie potrzeby wyjaśnień może użyć AskUserQuestion
6. Gdy plan jest gotowy, wychodzi przez ExitPlanMode

## Uwagi

- To narzędzie wymaga zgody użytkownika na wejście w tryb planowania
- W razie wątpliwości, czy planowanie jest potrzebne, lepiej planować — wcześniejsze uzgodnienie jest lepsze niż przerabianie

## Znaczenie w cc-viewer

Wywołanie EnterPlanMode w logach żądań pojawia się jako blok content `tool_use`. Po wejściu w tryb planowania sekwencja żądań zazwyczaj składa się głównie z eksploracyjnych wywołań narzędzi (Glob, Grep, Read), aż do wywołania ExitPlanMode.
