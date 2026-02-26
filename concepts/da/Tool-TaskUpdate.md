# TaskUpdate

## Definition

Opdaterer status, indhold eller afhængigheder for en opgave i opgavelisten.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `taskId` | string | Ja | ID på opgaven der skal opdateres |
| `status` | enum | Nej | Ny status: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | Nej | Ny titel |
| `description` | string | Nej | Ny beskrivelse |
| `activeForm` | string | Nej | Tekst i nutids-tillægsform vist under udførelse |
| `owner` | string | Nej | Ny opgaveansvarlig (agent-navn) |
| `metadata` | object | Nej | Metadata der skal flettes (sæt til null for at slette en nøgle) |
| `addBlocks` | string[] | Nej | Liste over ID'er for opgaver blokeret af denne opgave |
| `addBlockedBy` | string[] | Nej | Liste over ID'er for forudgående opgaver der blokerer denne opgave |

## Statusflow

```
pending → in_progress → completed
```

`deleted` kan nås fra enhver status og fjerner opgaven permanent.

## Brugsscenarier

**Egnet til:**
- Markere en opgave som `in_progress` når arbejdet påbegyndes
- Markere en opgave som `completed` når arbejdet er afsluttet
- Sætte afhængigheder mellem opgaver
- Opdatere opgaveindhold når kravene ændres

**Vigtige regler:**
- Markér kun som `completed` når opgaven er fuldstændigt afsluttet
- Ved fejl eller blokeringer, behold `in_progress`
- Markér ikke som `completed` ved fejlende tests, ufuldstændig implementering eller uløste fejl

## Bemærkninger

- Før opdatering bør man hente opgavens seneste status via TaskGet for at undgå forældede data
- Efter fuldførelse af en opgave, kald TaskList for at finde den næste tilgængelige opgave

## Betydning i cc-viewer

TaskUpdate er en intern opgavestyringsoperation og genererer ikke selvstændige API-requests.
