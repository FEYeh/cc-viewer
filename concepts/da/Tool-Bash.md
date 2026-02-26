# Bash

## Definition

Udfører shell-kommandoer med valgfri timeout-indstilling. Arbejdsmappen bevares mellem kommandoer, men shell-tilstanden (miljøvariabler osv.) bevares ikke.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `command` | string | Ja | Bash-kommandoen der skal udføres |
| `description` | string | Nej | Kort beskrivelse af kommandoen |
| `timeout` | number | Nej | Timeout i millisekunder, maks. 600000, standard 120000 |
| `run_in_background` | boolean | Nej | Om den skal køre i baggrunden |

## Brugsscenarier

**Egnet til:**
- Git-operationer (commit, push, branch osv.)
- npm/yarn og andre pakkehåndteringskommandoer
- Docker-operationer
- Kompilerings- og build-kommandoer
- Liste mappeindhold (`ls`)
- Andre systemkommandoer der kræver shell-udførelse

**Ikke egnet til:**
- Læse filer — brug Read
- Søge filnavne — brug Glob
- Søge filindhold — brug Grep
- Redigere filer — brug Edit
- Skrive filer — brug Write
- Vise information til brugeren — skriv direkte i svarteksten
- Langvarige processer (dev server, watch-tilstand) — anbefal brugeren at køre dem manuelt

## Bemærkninger

- Stier med mellemrum skal omsluttes af dobbelte anførselstegn
- Output over 30000 tegn afkortes
- Baggrundskommandoer henter resultater via TaskOutput
- Brug helst absolutte stier, undgå `cd`
- Uafhængige kommandoer kan kaldes parallelt med flere Bash
- Kommandoer med afhængigheder kædes sammen med `&&`
- Shell-miljøet initialiseres fra brugerens profil (bash eller zsh)

## Betydning i cc-viewer

Bash-kald vises i requestloggen som `tool_use` (indeholder kommandoen) og `tool_result` (indeholder output) content block-par. Kommandoudførelsens output kan bruges til at analysere modellens operationelle adfærd.
