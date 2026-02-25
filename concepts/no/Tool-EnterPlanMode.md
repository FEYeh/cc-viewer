# EnterPlanMode

## Definisjon

Bytter Claude Code til planleggingsmodus, for å utforske kodebasen og designe løsninger før implementering.

## Parametere

Ingen parametere.

## Bruksscenarioer

**Egnet for bruk:**
- Implementering av nye funksjoner — krever arkitekturbeslutninger
- Det finnes flere mulige løsninger — krever brukervalg
- Kodeendringer påvirker eksisterende atferd eller struktur
- Endringer i flere filer — kan involvere mer enn 2–3 filer
- Uklare krav — trenger utforskning først for å forstå omfanget
- Brukerpreferanser er viktige — implementeringen kan ha flere rimelige retninger

**Ikke egnet for bruk:**
- Enkeltlinje- eller fålinjefikser (skrivefeil, åpenbare feil)
- Brukeren har gitt svært spesifikke instruksjoner
- Rene forsknings-/utforskningsoppgaver — bruk Task (Explore-type)

## Atferd i planleggingsmodus

Etter å ha gått inn i planleggingsmodus vil Claude Code:
1. Bruke Glob-, Grep- og Read-verktøy for å utforske kodebasen grundig
2. Forstå eksisterende mønstre og arkitektur
3. Designe implementeringsplan
4. Sende planen til brukeren for godkjenning
5. Bruke AskUserQuestion for avklaring ved behov
6. Gå ut via ExitPlanMode når planen er klar

## Merknader

- Dette verktøyet krever brukersamtykke for å gå inn i planleggingsmodus
- Hvis du er usikker på om planlegging er nødvendig, foretrekk planlegging — å justere på forhånd er bedre enn å gjøre om

## Betydning i cc-viewer

EnterPlanMode-kall vises i forespørselsloggen som `tool_use` content block. Etter å ha gått inn i planleggingsmodus består forespørselssekvensene vanligvis hovedsakelig av utforskende verktøykall (Glob, Grep, Read), inntil ExitPlanMode kalles.
