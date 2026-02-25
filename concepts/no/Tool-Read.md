# Read

## Definisjon

Leser filinnhold fra det lokale filsystemet. Støtter tekstfiler, bilder, PDF og Jupyter notebook.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `file_path` | string | Ja | Absolutt sti til filen |
| `offset` | number | Nei | Startlinjenummer (for segmentert lesing av store filer) |
| `limit` | number | Nei | Antall linjer å lese (for segmentert lesing av store filer) |
| `pages` | string | Nei | PDF-sideområde (f.eks. "1-5", "3", "10-20"), gjelder kun for PDF |

## Bruksscenarioer

**Egnet for bruk:**
- Lese kodefiler, konfigurasjonsfiler og andre tekstfiler
- Vise bildefiler (Claude er en multimodal modell)
- Lese PDF-dokumenter
- Lese Jupyter notebook (returnerer alle celler med utdata)
- Lese flere filer parallelt for å få kontekst

**Ikke egnet for bruk:**
- Lese kataloger — bruk `ls`-kommandoen i Bash
- Åpen kodebaseutforskning — bruk Task (Explore-type)

## Merknader

- Stien må være absolutt, ikke relativ
- Leser som standard de første 2000 linjene i filen
- Linjer over 2000 tegn blir avkortet
- Utdata bruker `cat -n`-format, linjenumre starter fra 1
- Store PDF-er (over 10 sider) må spesifisere `pages`-parameteren, maks 20 sider per gang
- Lesing av en ikke-eksisterende fil returnerer feil (krasjer ikke)
- Kan kalle flere Read parallelt i en enkelt melding

## Betydning i cc-viewer

Read-kall vises i forespørselsloggen som et par av `tool_use` (kall) og `tool_result` (returnert innhold) content blocks. `tool_result` inneholder det faktiske filinnholdet og kan brukes til å analysere hvilke filer modellen har lest.
