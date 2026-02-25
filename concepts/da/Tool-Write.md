# Write

## Definition

Skriver indhold til det lokale filsystem. Hvis filen allerede eksisterer, overskrives den.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `file_path` | string | Ja | Absolut sti til filen (skal være absolut) |
| `content` | string | Ja | Indhold der skal skrives |

## Brugsscenarier

**Egnet til:**
- Oprette nye filer
- Når filindholdet skal omskrives fuldstændigt

**Ikke egnet til:**
- Ændre delvist indhold i en fil — brug Edit
- Opret ikke proaktivt dokumentationsfiler (*.md) eller README, medmindre brugeren udtrykkeligt beder om det

## Bemærkninger

- Hvis målfilen allerede eksisterer, skal den først læses via Read, ellers fejler operationen
- Overskriver alt eksisterende filindhold
- Foretræk Edit til redigering af eksisterende filer, Write er kun til oprettelse af nye filer eller fuldstændig omskrivning

## Betydning i cc-viewer

Write-kald vises i requestloggen som `tool_use` content block, hvis `input.content` indeholder det komplette skrevne indhold.
