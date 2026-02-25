# TaskGet

## Definition

Henter de komplette detaljer for en opgave via dens ID.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `taskId` | string | Ja | ID på opgaven der skal hentes |

## Returneret indhold

- `subject` — Opgavetitel
- `description` — Detaljerede krav og kontekst
- `status` — Status: `pending`, `in_progress` eller `completed`
- `blocks` — Liste over opgaver blokeret af denne opgave
- `blockedBy` — Liste over forudgående opgaver der blokerer denne opgave

## Brugsscenarier

**Egnet til:**
- Hente den komplette beskrivelse og kontekst for en opgave, før arbejdet påbegyndes
- Forstå opgavens afhængigheder
- Hente komplette krav efter at være blevet tildelt en opgave

## Bemærkninger

- Efter hentning af opgaven bør man kontrollere, at `blockedBy`-listen er tom, før arbejdet påbegyndes
- Brug TaskList til at se resuméinformation for alle opgaver

## Betydning i cc-viewer

TaskGet er en intern opgavestyringsoperation og genererer ikke selvstændige API-requests.
