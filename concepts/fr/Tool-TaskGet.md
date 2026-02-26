# TaskGet

## Définition

Obtient les détails complets d'une tâche via son ID.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `taskId` | string | Oui | ID de la tâche à obtenir |

## Contenu renvoyé

- `subject` — Titre de la tâche
- `description` — Exigences détaillées et contexte
- `status` — Statut : `pending`, `in_progress` ou `completed`
- `blocks` — Liste des tâches bloquées par cette tâche
- `blockedBy` — Liste des tâches préalables qui bloquent cette tâche

## Cas d'utilisation

**Adapté pour :**
- Obtenir la description complète et le contexte d'une tâche avant de commencer à travailler
- Comprendre les relations de dépendance d'une tâche
- Obtenir les exigences complètes après avoir été assigné à une tâche

## Notes

- Après avoir obtenu la tâche, vérifier si la liste `blockedBy` est vide avant de commencer à travailler
- Utiliser TaskList pour voir les informations résumées de toutes les tâches

## Signification dans cc-viewer

TaskGet est une opération interne de gestion de tâches, elle ne produit pas de requêtes API indépendantes.
