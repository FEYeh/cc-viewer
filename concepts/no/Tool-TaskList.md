# TaskList

## Definisjon

Lister alle oppgaver i oppgavelisten for å se samlet fremdrift og tilgjengelig arbeid.

## Parametere

Ingen parametere.

## Returnert innhold

Sammendragsinformasjon for hver oppgave:
- `id` — Oppgaveidentifikator
- `subject` — Kort beskrivelse
- `status` — Status: `pending`, `in_progress` eller `completed`
- `owner` — Ansvarlig (agent-ID), tom betyr ikke tildelt
- `blockedBy` — Liste over uferdige oppgave-ID-er som blokkerer denne oppgaven

## Bruksscenarioer

**Egnet for bruk:**
- Se hvilke oppgaver som er tilgjengelige (status pending, ingen owner, ikke blokkert)
- Sjekke samlet prosjektfremdrift
- Finne blokkerte oppgaver
- Finne neste oppgave etter å ha fullført en

## Merknader

- Foretrekk å behandle oppgaver i ID-rekkefølge (lavest ID først), da tidlige oppgaver vanligvis gir kontekst for senere oppgaver
- Oppgaver med `blockedBy` kan ikke tas før avhengigheten er løst
- Bruk TaskGet for å hente fullstendige detaljer for en spesifikk oppgave

## Betydning i cc-viewer

TaskList er en intern oppgavebehandlingsoperasjon og produserer ikke en selvstendig API-forespørsel.
