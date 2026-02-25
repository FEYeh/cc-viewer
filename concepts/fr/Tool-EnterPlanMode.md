# EnterPlanMode

## Définition

Bascule Claude Code en mode planification, utilisé pour explorer la base de code et concevoir un plan avant l'implémentation.

## Paramètres

Aucun paramètre.

## Cas d'utilisation

**Adapté pour :**
- Implémentation de nouvelles fonctionnalités — nécessite des décisions d'architecture
- Plusieurs approches viables existent — nécessite le choix de l'utilisateur
- Les modifications de code affectent le comportement ou la structure existante
- Changements dans plusieurs fichiers — impliquant potentiellement 2-3 fichiers ou plus
- Exigences peu claires — besoin d'explorer d'abord pour comprendre la portée
- Les préférences de l'utilisateur sont importantes — l'implémentation peut avoir plusieurs directions raisonnables

**Non adapté pour :**
- Corrections d'une ligne ou de quelques lignes (fautes de frappe, bugs évidents)
- L'utilisateur a déjà donné des instructions très spécifiques
- Tâches purement de recherche/exploration — utiliser Task (type Explore)

## Comportement en mode planification

Après être entré en mode planification, Claude Code :
1. Utilise les outils Glob, Grep, Read pour explorer la base de code en profondeur
2. Comprend les patterns et l'architecture existants
3. Conçoit un plan d'implémentation
4. Soumet le plan à l'utilisateur pour approbation
5. Peut utiliser AskUserQuestion si des clarifications sont nécessaires
6. Sort via ExitPlanMode lorsque le plan est prêt

## Notes

- Cet outil nécessite le consentement de l'utilisateur pour entrer en mode planification
- En cas de doute sur la nécessité de planifier, il est préférable de planifier — s'aligner en amont est mieux que de refaire

## Signification dans cc-viewer

Les appels à EnterPlanMode apparaissent dans le journal des requêtes comme des content blocks `tool_use`. Après l'entrée en mode planification, la séquence de requêtes consiste généralement principalement en appels d'outils exploratoires (Glob, Grep, Read), jusqu'à ce que ExitPlanMode soit appelé.
