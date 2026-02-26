# WebFetch

## Définition

Récupère le contenu d'une page web à partir d'une URL spécifiée, convertit le HTML en markdown et traite le contenu avec un modèle d'IA selon le prompt.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `url` | string (URI) | Oui | URL complète à récupérer |
| `prompt` | string | Oui | Décrit quelles informations extraire de la page |

## Cas d'utilisation

**Adapté pour :**
- Récupérer le contenu de pages web publiques
- Consulter la documentation en ligne
- Extraire des informations spécifiques de pages web

**Non adapté pour :**
- URLs nécessitant une authentification (Google Docs, Confluence, Jira, GitHub, etc.) — chercher d'abord des outils MCP dédiés
- URLs GitHub — préférer utiliser le CLI `gh`

## Notes

- L'URL doit être une URL valide complète
- HTTP est automatiquement mis à niveau vers HTTPS
- Les résultats peuvent être résumés si le contenu est trop volumineux
- Inclut un cache auto-nettoyant de 15 minutes
- Quand l'URL redirige vers un hôte différent, l'outil renvoie l'URL de redirection et il faut refaire la requête avec la nouvelle URL
- Si un outil web fetch fourni par MCP est disponible, préférer l'utiliser

## Signification dans cc-viewer

Les appels WebFetch apparaissent dans le journal des requêtes comme des paires de content blocks `tool_use` / `tool_result`. Le `tool_result` contient le résumé du contenu web traité par l'IA.
