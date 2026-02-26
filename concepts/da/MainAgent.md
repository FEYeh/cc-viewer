# MainAgent

## Definition

MainAgent er den primære requestkæde i Claude Code, når det ikke er i agent team-tilstand. Hver interaktion mellem brugeren og Claude Code genererer en serie API-requests, hvor MainAgent-requests udgør den centrale samtalekæde — de bærer det komplette system prompt, værktøjsdefinitioner og beskedhistorik.

## Identifikationsmetode

I cc-viewer identificeres MainAgent via `req.mainAgent === true`, automatisk markeret af `interceptor.js` ved request-opfangning.

Betingelser for bestemmelse (alle skal være opfyldt):
- Request body indeholder feltet `system` (system prompt)
- Request body indeholder `tools`-arrayet (værktøjsdefinitioner)
- System prompten indeholder den karakteristiske tekst "Claude Code"

## Forskelle fra SubAgent

| Egenskab | MainAgent | SubAgent |
|------|-----------|----------|
| system prompt | Komplet Claude Code hoved-prompt | Forenklet opgavespecifikt prompt |
| tools-array | Indeholder alle tilgængelige værktøjer | Indeholder normalt kun de få værktøjer, der er nødvendige for opgaven |
| Beskedhistorik | Akkumulerer komplet samtale-kontekst | Indeholder kun beskeder relateret til underopgaven |
| Cache-adfærd | Har prompt caching (5 minutters TTL) | Normalt ingen cache eller mindre cache |

## Betydning i cc-viewer

- **Cache-sporing**: prompt caching-status for MainAgent-requests påvirker direkte omkostningerne. Ved at overvåge forholdet mellem `cache_creation_input_tokens` og `cache_read_input_tokens` kan man vurdere cache hit-raten
- **Analyse af cache-tab**: når en MainAgent-request viser stor cache creation (i stedet for cache read), betyder det, at cachen er gået tabt og genopbygget; cc-viewer markerer disse requests med en rød prikindikator
- **Analyse af hovedkæden**: sekvensen af MainAgent-requests afspejler hele brugerens interaktionsproces med Claude Code og er de centrale data til analyse af sessionsadfærd
- **Sessionsrekonstruktion**: cc-viewer rekonstruerer samtalevisningen (Chat Mode) gennem beskedhistorikken i MainAgent-requests
