# Skill

## Definition

Udfører en skill i hovedsamtalen. Skills er specialiserede evner, som brugeren kan kalde via slash commands (f.eks. `/commit`, `/review-pr`).

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `skill` | string | Ja | Skill-navn (f.eks. "commit", "review-pr", "pdf") |
| `args` | string | Nej | Skill-argumenter |

## Brugsscenarier

**Egnet til:**
- Brugeren har indtastet en slash command i formatet `/<skill-name>`
- Brugerens anmodning matcher funktionaliteten af en registreret skill

**Ikke egnet til:**
- Indbyggede CLI-kommandoer (f.eks. `/help`, `/clear`)
- En skill der allerede kører
- Skill-navne der ikke er i listen over tilgængelige skills

## Bemærkninger

- Efter kald udvides skillen til et komplet prompt
- Understøtter fuldt kvalificerede navne (f.eks. `ms-office-suite:pdf`)
- Listen over tilgængelige skills leveres i system-reminder-beskeder
- Når du ser et `<command-name>`-tag, betyder det, at skillen er indlæst og skal udføres direkte uden at kalde dette værktøj igen
- Nævn ikke en skill uden faktisk at have kaldt værktøjet

## Betydning i cc-viewer

Skill-kald vises i requestloggen som `tool_use` content block. Det udvidede prompt fra skillen påvirker system prompten eller beskedindholdet i efterfølgende requests.
