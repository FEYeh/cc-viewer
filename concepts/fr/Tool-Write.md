# Write

## Définition

Écrit du contenu dans le système de fichiers local. Si le fichier existe déjà, il est écrasé.

## Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `file_path` | string | Oui | Chemin absolu du fichier (doit être un chemin absolu) |
| `content` | string | Oui | Contenu à écrire |

## Cas d'utilisation

**Adapté pour :**
- Créer de nouveaux fichiers
- Quand il faut réécrire complètement le contenu d'un fichier

**Non adapté pour :**
- Modifier du contenu partiel d'un fichier — utiliser Edit
- Ne pas créer proactivement des fichiers de documentation (*.md) ou README, sauf si l'utilisateur le demande explicitement

## Notes

- Si le fichier cible existe déjà, il doit d'abord être lu avec Read, sinon l'opération échouera
- Écrase tout le contenu du fichier existant
- Préférer Edit pour éditer des fichiers existants, Write uniquement pour créer de nouveaux fichiers ou des réécritures complètes

## Signification dans cc-viewer

Les appels Write apparaissent dans le journal des requêtes comme des content blocks `tool_use`, dont `input.content` contient le contenu complet écrit.
