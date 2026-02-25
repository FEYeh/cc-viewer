# TaskList

## Definición

Lista todas las tareas en la lista de tareas para ver el progreso general y el trabajo disponible.

## Parámetros

Sin parámetros.

## Contenido devuelto

Información resumida de cada tarea:
- `id` — Identificador de la tarea
- `subject` — Descripción breve
- `status` — Estado: `pending`, `in_progress` o `completed`
- `owner` — Responsable (agent ID), vacío indica no asignado
- `blockedBy` — Lista de IDs de tareas incompletas que bloquean esta tarea

## Casos de uso

**Adecuado para:**
- Ver qué tareas están disponibles (estado pending, sin owner, no bloqueadas)
- Verificar el progreso general del proyecto
- Encontrar tareas bloqueadas
- Buscar la siguiente tarea después de completar una

## Notas

- Preferir procesar tareas en orden de ID (ID más bajo primero), ya que las tareas anteriores generalmente proporcionan contexto para las posteriores
- Las tareas con `blockedBy` no pueden ser reclamadas hasta que se resuelvan las dependencias
- Usar TaskGet para obtener los detalles completos de una tarea específica

## Significado en cc-viewer

TaskList es una operación interna de gestión de tareas, no produce solicitudes API independientes.
