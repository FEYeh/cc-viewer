# WebFetch

## Definition

Henter indholdet af en webside fra den angivne URL, konverterer HTML til markdown og behandler indholdet med en AI-model baseret på prompten.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `url` | string (URI) | Ja | Komplet URL der skal hentes |
| `prompt` | string | Ja | Beskriver hvilken information der skal udtrækkes fra siden |

## Brugsscenarier

**Egnet til:**
- Hente indhold fra offentlige websider
- Slå op i onlinedokumentation
- Udtrække specifik information fra en webside

**Ikke egnet til:**
- URL'er der kræver autentificering (Google Docs, Confluence, Jira, GitHub osv.) — søg først efter et dedikeret MCP-værktøj
- GitHub-URL'er — foretræk brug af `gh` CLI

## Bemærkninger

- URL'en skal være en komplet gyldig URL
- HTTP opgraderes automatisk til HTTPS
- Resultater kan blive opsummeret, hvis indholdet er for stort
- Inkluderer en selvrensende 15-minutters cache
- Når URL'en omdirigerer til en anden vært, returnerer værktøjet omdirigerings-URL'en, og der skal foretages en ny anmodning med den nye URL
- Hvis et MCP-leveret web fetch-værktøj er tilgængeligt, foretræk det

## Betydning i cc-viewer

WebFetch-kald vises i requestloggen som `tool_use` / `tool_result` content block-par. `tool_result` indeholder det AI-behandlede resumé af webindholdet.
