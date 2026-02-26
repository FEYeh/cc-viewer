# TaskUpdate

## Definisjon

Oppdaterer status, innhold eller avhengighetsforhold for en oppgave i oppgavelisten.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `taskId` | string | Ja | ID-en til oppgaven som skal oppdateres |
| `status` | enum | Nei | Ny status: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | Nei | Ny tittel |
| `description` | string | Nei | Ny beskrivelse |
| `activeForm` | string | Nei | Tekst i presens partisipp som vises under utførelse |
| `owner` | string | Nei | Ny oppgaveansvarlig (agent-navn) |
| `metadata` | object | Nei | Metadata som skal flettes inn (sett til null for å slette nøkkel) |
| `addBlocks` | string[] | Nei | Liste over oppgave-ID-er blokkert av denne oppgaven |
| `addBlockedBy` | string[] | Nei | Liste over forutgående oppgave-ID-er som blokkerer denne oppgaven |

## Statusflyt

```
pending → in_progress → completed
```

`deleted` kan nås fra enhver status og fjerner oppgaven permanent.

## Bruksscenarioer

**Egnet for bruk:**
- Markere oppgave som `in_progress` når arbeidet starter
- Markere oppgave som `completed` etter fullført arbeid
- Sette avhengighetsforhold mellom oppgaver
- Oppdatere oppgaveinnhold ved endrede krav

**Viktige regler:**
- Marker kun som `completed` når oppgaven er fullstendig ferdig
- Ved feil eller blokkering, behold `in_progress`
- Ikke marker som `completed` ved mislykkede tester, ufullstendig implementering eller uløste feil

## Merknader

- Før oppdatering bør du hente siste oppgavestatus via TaskGet for å unngå utdaterte data
- Etter fullføring av oppgave, kall TaskList for å finne neste tilgjengelige oppgave

## Betydning i cc-viewer

TaskUpdate er en intern oppgavebehandlingsoperasjon og produserer ikke en selvstendig API-forespørsel.
