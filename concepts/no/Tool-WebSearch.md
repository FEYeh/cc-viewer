# WebSearch

## Definisjon

Utfører søkemotorforespørsler og returnerer søkeresultater for å hente oppdatert informasjon.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `query` | string | Ja | Søkeforespørsel (minst 2 tegn) |
| `allowed_domains` | string[] | Nei | Inkluder kun resultater fra disse domenene |
| `blocked_domains` | string[] | Nei | Ekskluder resultater fra disse domenene |

## Bruksscenarioer

**Egnet for bruk:**
- Hente oppdatert informasjon utover modellens kunnskapsgrense
- Søke etter aktuelle hendelser og nyeste data
- Søke etter nyeste teknisk dokumentasjon

## Merknader

- Søkeresultater returneres i markdown-hyperlenkformat
- Etter bruk må du legge til en "Sources:"-seksjon på slutten av responsen med relevante URL-er
- Støtter domenefiltrering (inkluder/ekskluder)
- Bruk gjeldende årstall i søkeforespørsler
- Kun tilgjengelig i USA

## Betydning i cc-viewer

WebSearch-kall vises i forespørselsloggen som et par av `tool_use` / `tool_result` content blocks. `tool_result` inneholder listen over søkeresultater.
