# Bash

## Definisjon

Kjører shell-kommandoer, med støtte for valgfri tidsavbrudd. Arbeidskatalogen vedvarer mellom kommandoer, men shell-tilstand (miljøvariabler osv.) vedvarer ikke.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `command` | string | Ja | Bash-kommandoen som skal kjøres |
| `description` | string | Nei | Kort beskrivelse av kommandoen |
| `timeout` | number | Nei | Tidsavbrudd (millisekunder), maks 600000, standard 120000 |
| `run_in_background` | boolean | Nei | Om den skal kjøres i bakgrunnen |

## Bruksscenarioer

**Egnet for bruk:**
- git-operasjoner (commit, push, branch osv.)
- npm/yarn og andre pakkebehandlingskommandoer
- docker-operasjoner
- Kompilerings- og byggekommandoer
- Liste kataloginnhold (`ls`)
- Andre systemkommandoer som krever shell-kjøring

**Ikke egnet for bruk:**
- Lese filer — bruk Read
- Søke etter filnavn — bruk Glob
- Søke i filinnhold — bruk Grep
- Redigere filer — bruk Edit
- Skrive filer — bruk Write
- Vise informasjon til brukeren — skriv direkte i responsteksten
- Langvarige prosesser (dev server, watch-modus) — anbefal brukeren å kjøre manuelt

## Merknader

- Stier med mellomrom må omsluttes med doble anførselstegn
- Utdata over 30 000 tegn blir avkortet
- Resultater fra bakgrunnskommandoer hentes via TaskOutput
- Bruk helst absolutte stier, unngå `cd`
- Uavhengige kommandoer kan kalle flere Bash parallelt
- Avhengige kommandoer lenkes med `&&`
- Shell-miljøet initialiseres fra brukerens profil (bash eller zsh)

## Betydning i cc-viewer

Bash-kall vises i forespørselsloggen som et par av `tool_use` (inneholder kommandoen) og `tool_result` (inneholder utdata) content blocks. Kommandoutdata kan brukes til å analysere modellens operasjonsatferd.
