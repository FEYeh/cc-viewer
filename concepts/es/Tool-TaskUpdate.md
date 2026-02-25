# TaskUpdate

## Definición

Actualiza el estado, contenido o relaciones de dependencia de una tarea en la lista de tareas.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `taskId` | string | Sí | ID de la tarea a actualizar |
| `status` | enum | No | Nuevo estado: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | No | Nuevo título |
| `description` | string | No | Nueva descripción |
| `activeForm` | string | No | Texto en gerundio mostrado cuando está en progreso |
| `owner` | string | No | Nuevo responsable de la tarea (nombre del agent) |
| `metadata` | object | No | Metadatos a fusionar (establecer como null para eliminar una clave) |
| `addBlocks` | string[] | No | Lista de IDs de tareas bloqueadas por esta tarea |
| `addBlockedBy` | string[] | No | Lista de IDs de tareas previas que bloquean esta tarea |

## Flujo de estados

```
pending → in_progress → completed
```

`deleted` puede ser alcanzado desde cualquier estado, elimina permanentemente la tarea.

## Casos de uso

**Adecuado para:**
- Marcar una tarea como `in_progress` al comenzar a trabajar
- Marcar una tarea como `completed` al terminar el trabajo
- Establecer relaciones de dependencia entre tareas
- Actualizar el contenido de la tarea cuando cambian los requisitos

**Reglas importantes:**
- Solo marcar como `completed` cuando la tarea está completamente terminada
- Mantener como `in_progress` cuando se encuentran errores o bloqueos
- No marcar como `completed` cuando las pruebas fallan, la implementación es parcial o hay errores sin resolver

## Notas

- Antes de actualizar, se debe obtener el estado más reciente de la tarea mediante TaskGet para evitar datos obsoletos
- Después de completar una tarea, llamar a TaskList para encontrar la siguiente tarea disponible

## Significado en cc-viewer

TaskUpdate es una operación interna de gestión de tareas, no produce solicitudes API independientes.
