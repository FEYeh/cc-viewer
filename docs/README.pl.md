# CC-Viewer

System monitorowania zapytań dla Claude Code, który przechwytuje i wizualizuje wszystkie zapytania i odpowiedzi API w czasie rzeczywistym. Pomaga programistom monitorować ich Context do przeglądania i debugowania podczas Vibe Coding.

[简体中文](../README.md) | [繁體中文](./README.zh-TW.md) | [한국어](./README.ko.md) | [日本語](./README.ja.md) | [Deutsch](./README.de.md) | [Español](./README.es.md) | [Français](./README.fr.md) | [Italiano](./README.it.md) | [Dansk](./README.da.md) | [Polski](./README.pl.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md) | [Norsk](./README.no.md) | [Português (Brasil)](./README.pt-BR.md) | [ไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Українська](./README.uk.md)

## Użycie

```bash
npm install -g cc-viewer
```

Po instalacji uruchom:

```bash
ccv
```

Ta komenda automatycznie wstrzykuje skrypt monitorujący do lokalnie zainstalowanego Claude Code i dodaje hook automatycznego ponownego wstrzykiwania do konfiguracji powłoki (`~/.zshrc` lub `~/.bashrc`). Następnie używaj Claude Code jak zwykle i otwórz `http://localhost:7008` w przeglądarce, aby zobaczyć interfejs monitorowania.

Po aktualizacji Claude Code nie jest wymagane żadne ręczne działanie — przy następnym uruchomieniu `claude` automatycznie wykryje i ponownie wstrzyknie.

### Odinstalowanie

```bash
ccv --uninstall
```

Czyści wstrzyknięcie cli.js i hook konfiguracji powłoki w jednym kroku.

## Funkcje

### Monitorowanie zapytań (Raw Mode)

- Przechwytywanie w czasie rzeczywistym wszystkich zapytań API z Claude Code, w tym odpowiedzi strumieniowych
- Lewy panel pokazuje metodę zapytania, URL, czas trwania i kod statusu
- Automatycznie identyfikuje i oznacza zapytania Main Agent i Sub Agent
- Prawy panel obsługuje przełączanie zakładek Request / Response
- Request Body domyślnie rozwija `messages`, `system`, `tools` o jeden poziom
- Response Body domyślnie w pełni rozwinięte
- Przełączanie między widokiem JSON a widokiem zwykłego tekstu
- Kopiowanie zawartości JSON jednym kliknięciem

### Chat Mode

Kliknij przycisk "Chat mode" w prawym górnym rogu, aby przetworzyć pełną historię konwersacji Main Agent na interfejs czatu:

- Wiadomości użytkownika wyrównane do lewej (niebieskie dymki)
- Odpowiedzi Main Agent wyrównane do lewej (ciemnoszare dymki) z renderowaniem Markdown
- Wyniki wywołań narzędzi wyświetlane inline w odpowiedniej wiadomości Assistant
- Bloki `thinking` domyślnie zwinięte, kliknij aby rozwinąć
- `tool_use` wyświetlane jako kompaktowe karty wywołań narzędzi (Bash, Read, Edit, Write, Glob, Grep, Task mają dedykowane wyświetlanie)
- Wiadomości wyboru użytkownika (AskUserQuestion) wyświetlane w formacie pytanie-odpowiedź
- Tagi wstrzyknięcia systemowego (`<system-reminder>`, `<project-reminder>`, itp.) automatycznie zwinięte
- Tekst wstrzyknięty przez system automatycznie filtrowany, pokazuje tylko rzeczywiste dane wejściowe użytkownika
- Wyświetlanie podzielone na wiele sesji (automatycznie segmentowane po `/compact`, `/clear`, itp.)
- Każda wiadomość pokazuje znacznik czasu z dokładnością do sekundy

### Token Stats

Panel po najechaniu w obszarze nagłówka:

- Liczba Token pogrupowana według modelu (wejście/wyjście)
- Liczba tworzenia/odczytów Cache i współczynnik trafień Cache
- Odliczanie wygaśnięcia Cache Main Agent

### Zarządzanie logami

Przez menu rozwijane CC-Viewer w lewym górnym rogu:

- Importuj lokalne logi: przeglądaj historyczne pliki logów, pogrupowane według projektu, otwiera w nowym oknie
- Zapisz bieżący log: pobierz bieżący plik logu monitorowania JSONL
- Eksportuj prompty użytkownika: wyodrębnij i wyświetl wszystkie dane wejściowe użytkownika, z rozwijanym widokiem system-reminder

### Obsługa wielu języków

CC-Viewer obsługuje 18 języków, automatycznie przełączając się na podstawie ustawień regionalnych systemu:

简体中文 | English | 繁體中文 | 한국어 | Deutsch | Español | Français | Italiano | Dansk | 日本語 | Polski | Русский | العربية | Norsk | Português (Brasil) | ไทย | Türkçe | Українська

## License

MIT
