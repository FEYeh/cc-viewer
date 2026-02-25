# TaskUpdate

## Définition

Met à jour le statut, le contenu ou les relations de dépendance d'une tâche dans la liste de tâches.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `taskId` | string | Oui | ID de la tâche à mettre à jour |
| `status` | enum | Non | Nouveau statut : `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | Non | Nouveau titre |
| `description` | string | Non | Nouvelle description |
| `activeForm` | string | Non | Texte au participe présent affiché quand la tâche est en cours |
| `owner` | string | Non | Nouveau responsable de la tâche (nom de l'agent) |
| `metadata` | object | Non | Métadonnées à fusionner (définir à null pour supprimer une clé) |
| `addBlocks` | string[] | Non | Liste des IDs de tâches bloquées par cette tâche |
| `addBlockedBy` | string[] | Non | Liste des IDs de tâches préalables qui bloquent cette tâche |

## Flux de statuts

```
pending → in_progress → completed
```

`deleted` peut être atteint depuis n'importe quel statut, supprime définitivement la tâche.

## Cas d'utilisation

**Adapté pour :**
- Marquer une tâche comme `in_progress` au début du travail
- Marquer une tâche comme `completed` à la fin du travail
- Établir des relations de dépendance entre les tâches
- Mettre à jour le contenu de la tâche quand les exigences changent

**Règles importantes :**
- Ne marquer comme `completed` que lorsque la tâche est entièrement terminée
- Garder comme `in_progress` en cas d'erreurs ou de blocages
- Ne pas marquer comme `completed` quand les tests échouent, l'implémentation est partielle ou des erreurs non résolues existent

## Notes

- Avant de mettre à jour, obtenir le statut le plus récent de la tâche via TaskGet pour éviter les données obsolètes
- Après avoir terminé une tâche, appeler TaskList pour trouver la prochaine tâche disponible

## Signification dans cc-viewer

TaskUpdate est une opération interne de gestion de tâches, elle ne produit pas de requêtes API indépendantes.
