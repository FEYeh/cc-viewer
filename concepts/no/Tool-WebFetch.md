# WebFetch

## Definisjon

Henter innhold fra en spesifisert URL, konverterer HTML til markdown og behandler innholdet med en AI-modell basert på promptet.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `url` | string (URI) | Ja | Fullstendig URL som skal hentes |
| `prompt` | string | Ja | Beskrivelse av hvilken informasjon som skal trekkes ut fra siden |

## Bruksscenarioer

**Egnet for bruk:**
- Hente innhold fra offentlige nettsider
- Slå opp nettbasert dokumentasjon
- Trekke ut spesifikk informasjon fra nettsider

**Ikke egnet for bruk:**
- URL-er som krever autentisering (Google Docs, Confluence, Jira, GitHub osv.) — søk først etter et dedikert MCP-verktøy
- GitHub-URL-er — foretrekk `gh` CLI

## Merknader

- URL-en må være en fullstendig gyldig URL
- HTTP oppgraderes automatisk til HTTPS
- Resultater kan bli oppsummert når innholdet er for stort
- Inkluderer en selvrensende 15-minutters cache
- Når URL-en omdirigerer til en annen vert, returnerer verktøyet den omdirigerte URL-en, og du må sende en ny forespørsel med den nye URL-en
- Hvis et MCP-levert web fetch-verktøy er tilgjengelig, foretrekk det

## Betydning i cc-viewer

WebFetch-kall vises i forespørselsloggen som et par av `tool_use` / `tool_result` content blocks. `tool_result` inneholder AI-behandlet sammendrag av nettsideinnholdet.
