# TaskGet

## Definisjon

Henter fullstendige detaljer for en oppgave via oppgave-ID.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `taskId` | string | Ja | ID-en til oppgaven som skal hentes |

## Returnert innhold

- `subject` — Oppgavetittel
- `description` — Detaljerte krav og kontekst
- `status` — Status: `pending`, `in_progress` eller `completed`
- `blocks` — Liste over oppgaver blokkert av denne oppgaven
- `blockedBy` — Liste over forutgående oppgaver som blokkerer denne oppgaven

## Bruksscenarioer

**Egnet for bruk:**
- Hente fullstendig beskrivelse og kontekst før arbeidet starter
- Forstå oppgavens avhengighetsforhold
- Hente fullstendige krav etter å ha blitt tildelt en oppgave

## Merknader

- Etter å ha hentet oppgaven bør du sjekke at `blockedBy`-listen er tom før du starter arbeidet
- Bruk TaskList for å se sammendragsinformasjon for alle oppgaver

## Betydning i cc-viewer

TaskGet er en intern oppgavebehandlingsoperasjon og produserer ikke en selvstendig API-forespørsel.
