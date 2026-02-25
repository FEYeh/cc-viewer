# executeCode (mcp__ide__executeCode)

## Définition

Exécute du code Python dans le kernel Jupyter du fichier notebook actuel.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `code` | string | Oui | Code Python à exécuter |

## Cas d'utilisation

**Adapté pour :**
- Exécuter du code dans un environnement Jupyter notebook
- Tester des extraits de code
- Analyse de données et calculs

**Non adapté pour :**
- Exécution de code hors environnement Jupyter — utiliser Bash
- Modifier des fichiers — utiliser Edit ou Write

## Notes

- C'est un outil MCP (Model Context Protocol), fourni par l'intégration IDE
- Le code s'exécute dans le kernel Jupyter actuel, l'état persiste entre les appels
- Sauf demande explicite de l'utilisateur, éviter de déclarer des variables ou de modifier l'état du kernel
- L'état est perdu au redémarrage du kernel

## Signification dans cc-viewer

executeCode est un outil MCP qui apparaît dans le tableau `tools` du journal des requêtes sous le nom `mcp__ide__executeCode`. Ses appels et retours suivent le modèle standard `tool_use` / `tool_result`. L'ajout/suppression d'outils MCP entraîne des changements dans le tableau tools, ce qui peut déclencher la reconstruction du cache.
