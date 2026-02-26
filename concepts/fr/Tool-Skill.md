# Skill

## Définition

Exécute une compétence (skill) dans la conversation principale. Les compétences sont des capacités spécialisées que l'utilisateur peut invoquer via des slash commands (comme `/commit`, `/review-pr`).

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `skill` | string | Oui | Nom de la compétence (comme « commit », « review-pr », « pdf ») |
| `args` | string | Non | Arguments de la compétence |

## Cas d'utilisation

**Adapté pour :**
- L'utilisateur a saisi un slash command au format `/<skill-name>`
- La demande de l'utilisateur correspond à la fonctionnalité d'une compétence enregistrée

**Non adapté pour :**
- Commandes CLI intégrées (comme `/help`, `/clear`)
- Une compétence déjà en cours d'exécution
- Noms de compétences absents de la liste des compétences disponibles

## Notes

- Après invocation, la compétence se déploie en un prompt complet
- Supporte les noms pleinement qualifiés (comme `ms-office-suite:pdf`)
- La liste des compétences disponibles est fournie dans les messages system-reminder
- Quand on voit une balise `<command-name>`, cela signifie que la compétence est déjà chargée et doit être exécutée directement plutôt que de rappeler cet outil
- Ne pas mentionner une compétence sans avoir réellement appelé l'outil

## Signification dans cc-viewer

Les appels Skill apparaissent dans le journal des requêtes comme des content blocks `tool_use`. Le prompt déployé de la compétence affecte le system prompt ou le contenu des messages des requêtes suivantes.
