# ExitPlanMode

## Définition

Quitte le mode planification et soumet le plan à l'utilisateur pour approbation. Le contenu du plan est lu à partir du fichier de plan écrit précédemment.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `allowedPrompts` | array | Non | Liste des descriptions de permissions nécessaires pour implémenter le plan |

Chaque élément du tableau `allowedPrompts` :

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `tool` | enum | Oui | Outil applicable, actuellement seul `Bash` est supporté |
| `prompt` | string | Oui | Description sémantique de l'opération (comme « run tests », « install dependencies ») |

## Cas d'utilisation

**Adapté pour :**
- Le plan est terminé en mode planification, prêt à être soumis pour approbation de l'utilisateur
- Uniquement pour les tâches d'implémentation nécessitant l'écriture de code

**Non adapté pour :**
- Tâches purement de recherche/exploration — pas besoin de quitter le mode planification
- Vouloir demander à l'utilisateur « le plan est-il correct ? » — c'est exactement la fonction de cet outil, ne pas utiliser AskUserQuestion pour cela

## Notes

- Cet outil n'accepte pas le contenu du plan comme paramètre — il le lit à partir du fichier de plan écrit précédemment
- L'utilisateur verra le contenu du fichier de plan pour l'approuver
- Ne pas utiliser AskUserQuestion pour demander « le plan est-il correct ? » avant d'appeler cet outil, c'est redondant
- Ne pas mentionner « plan » dans les questions, car l'utilisateur ne peut pas voir le contenu du plan avant ExitPlanMode

## Signification dans cc-viewer

L'appel à ExitPlanMode marque la fin de la phase de planification. Dans le journal des requêtes, les requêtes après cet appel se transforment généralement en opérations d'implémentation (Edit, Write, Bash, etc.).
