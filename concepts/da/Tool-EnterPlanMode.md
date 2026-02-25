# EnterPlanMode

## Definition

Skifter Claude Code til planlægningstilstand, der bruges til at udforske kodebasen og designe en plan før implementering.

## Parametre

Ingen parametre.

## Brugsscenarier

**Egnet til:**
- Implementering af nye funktioner — kræver arkitekturbeslutninger
- Der findes flere mulige tilgange — kræver brugerens valg
- Kodeændringer påvirker eksisterende adfærd eller struktur
- Ændringer i flere filer — involverer potentielt 2-3 eller flere filer
- Uklare krav — nødvendigt at udforske først for at forstå omfanget
- Brugerpræferencer er vigtige — implementeringen kan have flere rimelige retninger

**Ikke egnet til:**
- Rettelser af én eller få linjer (stavefejl, åbenlyse fejl)
- Brugeren har givet meget specifikke instruktioner
- Rene forsknings-/udforskningsopgaver — brug Task (Explore-type)

## Adfærd i planlægningstilstand

Efter at være gået ind i planlægningstilstand vil Claude Code:
1. Bruge Glob-, Grep-, Read-værktøjer til at udforske kodebasen i dybden
2. Forstå eksisterende mønstre og arkitektur
3. Designe implementeringsplanen
4. Indsende planen til brugerens godkendelse
5. Bruge AskUserQuestion til afklaring om nødvendigt
6. Forlade tilstanden via ExitPlanMode, når planen er klar

## Bemærkninger

- Dette værktøj kræver brugerens samtykke for at gå ind i planlægningstilstand
- Hvis du er i tvivl om, hvorvidt planlægning er nødvendig, foretrækkes planlægning — at afstemme på forhånd er bedre end at lave om

## Betydning i cc-viewer

EnterPlanMode-kald vises i requestloggen som `tool_use` content block. Requestsekvensen efter at være gået ind i planlægningstilstand er typisk domineret af udforskende værktøjskald (Glob, Grep, Read), indtil ExitPlanMode kaldes.
