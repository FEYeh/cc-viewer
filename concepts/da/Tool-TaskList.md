# TaskList

## Definition

Lister alle opgaver i opgavelisten for at se den samlede fremdrift og tilgængeligt arbejde.

## Parametre

Ingen parametre.

## Returneret indhold

Resuméinformation for hver opgave:
- `id` — Opgaveidentifikator
- `subject` — Kort beskrivelse
- `status` — Status: `pending`, `in_progress` eller `completed`
- `owner` — Ansvarlig (agent-ID), tom betyder ikke tildelt
- `blockedBy` — Liste over ID'er for ufuldførte opgaver der blokerer denne opgave

## Brugsscenarier

**Egnet til:**
- Se hvilke opgaver der er tilgængelige (status pending, ingen owner, ikke blokeret)
- Kontrollere projektets samlede fremdrift
- Finde blokerede opgaver
- Finde den næste opgave efter at have fuldført en

## Bemærkninger

- Behandl opgaver fortrinsvis i ID-rækkefølge (laveste ID først), da tidlige opgaver typisk giver kontekst til efterfølgende opgaver
- Opgaver med `blockedBy` kan ikke påtages, før afhængighederne er løst
- Brug TaskGet til at hente komplette detaljer for en specifik opgave

## Betydning i cc-viewer

TaskList er en intern opgavestyringsoperation og genererer ikke selvstændige API-requests.
