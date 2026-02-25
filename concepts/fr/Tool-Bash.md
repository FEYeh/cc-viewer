# Bash

## Définition

Exécute des commandes shell avec une configuration de délai d'attente optionnelle. Le répertoire de travail persiste entre les commandes, mais l'état du shell (variables d'environnement, etc.) ne persiste pas.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `command` | string | Oui | Commande bash à exécuter |
| `description` | string | Non | Description brève de la commande |
| `timeout` | number | Non | Délai d'attente (millisecondes), maximum 600000, par défaut 120000 |
| `run_in_background` | boolean | Non | Si la commande s'exécute en arrière-plan |

## Cas d'utilisation

**Adapté pour :**
- Opérations git (commit, push, branch, etc.)
- Commandes de gestion de paquets npm/yarn
- Opérations docker
- Commandes de compilation et de build
- Lister le contenu des répertoires (`ls`)
- Autres commandes système nécessitant une exécution shell

**Non adapté pour :**
- Lire des fichiers — utiliser Read
- Rechercher des noms de fichiers — utiliser Glob
- Rechercher du contenu de fichiers — utiliser Grep
- Éditer des fichiers — utiliser Edit
- Écrire des fichiers — utiliser Write
- Afficher des informations à l'utilisateur — afficher directement dans le texte de réponse
- Processus de longue durée (dev server, mode watch) — recommander à l'utilisateur d'exécuter manuellement

## Notes

- Les chemins contenant des espaces doivent être entre guillemets doubles
- La sortie dépassant 30000 caractères sera tronquée
- Les commandes en arrière-plan obtiennent leurs résultats via TaskOutput
- Utiliser de préférence des chemins absolus, éviter `cd`
- Les commandes indépendantes peuvent exécuter plusieurs Bash en parallèle
- Les commandes avec des dépendances sont chaînées avec `&&`
- L'environnement shell est initialisé à partir du profile de l'utilisateur (bash ou zsh)

## Signification dans cc-viewer

Les appels Bash apparaissent dans le journal des requêtes comme des paires de content blocks `tool_use` (contenant la commande) et `tool_result` (contenant la sortie). La sortie de l'exécution de la commande peut être utilisée pour analyser le comportement opérationnel du modèle.
