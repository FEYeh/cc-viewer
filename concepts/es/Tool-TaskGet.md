# TaskGet

## Definición

Obtiene los detalles completos de una tarea mediante su ID.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `taskId` | string | Sí | ID de la tarea a obtener |

## Contenido devuelto

- `subject` — Título de la tarea
- `description` — Requisitos detallados y contexto
- `status` — Estado: `pending`, `in_progress` o `completed`
- `blocks` — Lista de tareas bloqueadas por esta tarea
- `blockedBy` — Lista de tareas previas que bloquean esta tarea

## Casos de uso

**Adecuado para:**
- Obtener la descripción completa y el contexto de una tarea antes de comenzar a trabajar
- Entender las relaciones de dependencia de una tarea
- Obtener los requisitos completos después de ser asignado a una tarea

## Notas

- Después de obtener la tarea, se debe verificar si la lista `blockedBy` está vacía antes de comenzar a trabajar
- Usar TaskList para ver la información resumida de todas las tareas

## Significado en cc-viewer

TaskGet es una operación interna de gestión de tareas, no produce solicitudes API independientes.
