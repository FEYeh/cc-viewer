# Read

## Définition

Lit le contenu de fichiers depuis le système de fichiers local. Supporte les fichiers texte, images, PDF et Jupyter notebook.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `file_path` | string | Oui | Chemin absolu du fichier |
| `offset` | number | Non | Numéro de ligne de départ (pour la lecture segmentée de gros fichiers) |
| `limit` | number | Non | Nombre de lignes à lire (pour la lecture segmentée de gros fichiers) |
| `pages` | string | Non | Plage de pages PDF (comme « 1-5 », « 3 », « 10-20 »), applicable uniquement aux PDF |

## Cas d'utilisation

**Adapté pour :**
- Lire des fichiers de code, fichiers de configuration et autres fichiers texte
- Visualiser des fichiers image (Claude est un modèle multimodal)
- Lire des documents PDF
- Lire des Jupyter notebooks (renvoie toutes les cellules et sorties)
- Lire plusieurs fichiers en parallèle pour obtenir du contexte

**Non adapté pour :**
- Lire des répertoires — utiliser la commande `ls` de Bash
- Exploration ouverte de la base de code — utiliser Task (type Explore)

## Notes

- Le chemin doit être absolu, pas relatif
- Par défaut, lit les 2000 premières lignes du fichier
- Les lignes dépassant 2000 caractères seront tronquées
- La sortie utilise le format `cat -n`, les numéros de ligne commencent à 1
- Les gros PDF (plus de 10 pages) doivent spécifier le paramètre `pages`, maximum 20 pages par requête
- Lire un fichier inexistant renvoie une erreur (pas de plantage)
- Plusieurs appels Read peuvent être effectués en parallèle dans un seul message

## Signification dans cc-viewer

Les appels Read apparaissent dans le journal des requêtes comme des paires de content blocks `tool_use` (appel) et `tool_result` (contenu renvoyé). Le `tool_result` contient le contenu réel du fichier, permettant d'analyser quels fichiers le modèle a lus.
