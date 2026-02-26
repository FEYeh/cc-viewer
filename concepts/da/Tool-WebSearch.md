# WebSearch

## Definition

Udfører en søgemaskineforespørgsel og returnerer søgeresultater til at hente aktuel information.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `query` | string | Ja | Søgeforespørgsel (mindst 2 tegn) |
| `allowed_domains` | string[] | Nej | Inkluder kun resultater fra disse domæner |
| `blocked_domains` | string[] | Nej | Ekskluder resultater fra disse domæner |

## Brugsscenarier

**Egnet til:**
- Hente aktuel information ud over modellens videns-cutoff-dato
- Søge efter aktuelle begivenheder og nyeste data
- Søge efter den nyeste tekniske dokumentation

## Bemærkninger

- Søgeresultater returneres i markdown-hyperlinkformat
- Efter brug skal der tilføjes en "Sources:"-sektion i slutningen af svaret med relevante URL'er
- Understøtter domænefiltrering (inklusion/eksklusion)
- Brug det aktuelle år i søgeforespørgsler
- Kun tilgængelig i USA

## Betydning i cc-viewer

WebSearch-kald vises i requestloggen som `tool_use` / `tool_result` content block-par. `tool_result` indeholder listen over søgeresultater.
