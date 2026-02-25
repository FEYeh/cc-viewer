# AskUserQuestion

## Définition

Pose des questions à l'utilisateur pendant l'exécution pour obtenir des clarifications, vérifier des hypothèses ou demander des décisions.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `questions` | array | Oui | Liste de questions (1-4 questions) |
| `answers` | object | Non | Réponses collectées auprès de l'utilisateur |
| `annotations` | object | Non | Annotations pour chaque question (comme les notes de prévisualisation de sélection) |
| `metadata` | object | Non | Métadonnées pour le suivi et l'analyse |

Chaque objet `question` :

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `question` | string | Oui | Texte complet de la question, doit se terminer par un point d'interrogation |
| `header` | string | Oui | Étiquette courte (maximum 12 caractères), affichée comme chip d'étiquette |
| `options` | array | Oui | 2-4 options |
| `multiSelect` | boolean | Oui | Si la sélection multiple est autorisée |

Chaque objet `option` :

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `label` | string | Oui | Texte d'affichage de l'option (1-5 mots) |
| `description` | string | Oui | Description de l'option |
| `markdown` | string | Non | Contenu de prévisualisation (pour la comparaison visuelle de mises en page ASCII, extraits de code, etc.) |

## Cas d'utilisation

**Adapté pour :**
- Collecter les préférences ou exigences de l'utilisateur
- Clarifier des instructions ambiguës
- Obtenir des décisions pendant l'implémentation
- Offrir des choix de direction à l'utilisateur

**Non adapté pour :**
- Demander « le plan est-il correct ? » — utiliser ExitPlanMode

## Notes

- L'utilisateur peut toujours sélectionner « Other » pour fournir une entrée personnalisée
- L'option recommandée est placée en premier, avec « (Recommended) » à la fin du label
- La prévisualisation `markdown` n'est compatible qu'avec les questions à sélection unique
- Les options avec `markdown` passent à une disposition côte à côte
- En mode planification, utilisé pour clarifier les exigences avant de définir le plan

## Signification dans cc-viewer

Les appels à AskUserQuestion apparaissent dans le journal des requêtes comme des content blocks `tool_use`, contenant les définitions de questions et d'options. Les réponses de l'utilisateur apparaissent dans l'historique des messages des requêtes suivantes.
