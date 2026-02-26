# TaskCreate

## Definición

Crea entradas estructuradas en la lista de tareas para rastrear el progreso, organizar tareas complejas y mostrar el avance del trabajo al usuario.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `subject` | string | Sí | Título breve de la tarea, usar forma imperativa (como "Fix authentication bug") |
| `description` | string | Sí | Descripción detallada, incluyendo contexto y criterios de aceptación |
| `activeForm` | string | No | Texto en gerundio mostrado cuando está en progreso (como "Fixing authentication bug") |
| `metadata` | object | No | Metadatos arbitrarios adjuntos a la tarea |

## Casos de uso

**Adecuado para:**
- Tareas complejas de múltiples pasos (más de 3 pasos)
- El usuario proporcionó múltiples elementos pendientes
- Rastrear trabajo en modo de planificación
- El usuario solicita explícitamente usar una lista de tareas

**No adecuado para:**
- Una sola tarea simple
- Operaciones simples de 3 pasos o menos
- Consultas puramente conversacionales o informativas

## Notas

- Todas las tareas nuevas tienen estado inicial `pending`
- `subject` usa forma imperativa ("Run tests"), `activeForm` usa gerundio ("Running tests")
- Después de crear la tarea, se pueden establecer relaciones de dependencia (blocks/blockedBy) mediante TaskUpdate
- Antes de crear, se debe llamar a TaskList para verificar si hay tareas duplicadas

## Significado en cc-viewer

TaskCreate es una operación interna de gestión de tareas de Claude Code, no produce solicitudes API independientes. Sin embargo, en el Chat Mode se puede ver el bloque tool_use donde el modelo llama a esta herramienta.
