# TaskCreate

## Définition

Crée des entrées structurées dans la liste de tâches pour suivre la progression, organiser des tâches complexes et montrer l'avancement du travail à l'utilisateur.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `subject` | string | Oui | Titre bref de la tâche, utiliser la forme impérative (comme « Fix authentication bug ») |
| `description` | string | Oui | Description détaillée, incluant le contexte et les critères d'acceptation |
| `activeForm` | string | Non | Texte au participe présent affiché quand la tâche est en cours (comme « Fixing authentication bug ») |
| `metadata` | object | Non | Métadonnées arbitraires attachées à la tâche |

## Cas d'utilisation

**Adapté pour :**
- Tâches complexes multi-étapes (plus de 3 étapes)
- L'utilisateur a fourni plusieurs éléments à faire
- Suivre le travail en mode planification
- L'utilisateur demande explicitement d'utiliser une liste de tâches

**Non adapté pour :**
- Une seule tâche simple
- Opérations simples de 3 étapes ou moins
- Requêtes purement conversationnelles ou informatives

## Notes

- Toutes les nouvelles tâches ont le statut initial `pending`
- `subject` utilise la forme impérative (« Run tests »), `activeForm` utilise le participe présent (« Running tests »)
- Après la création de la tâche, les relations de dépendance (blocks/blockedBy) peuvent être établies via TaskUpdate
- Avant de créer, appeler TaskList pour vérifier s'il y a des tâches en double

## Signification dans cc-viewer

TaskCreate est une opération interne de gestion de tâches de Claude Code, elle ne produit pas de requêtes API indépendantes. Cependant, dans le Chat Mode, on peut voir le bloc tool_use où le modèle appelle cet outil.
