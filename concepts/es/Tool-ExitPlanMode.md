# ExitPlanMode

## Definición

Sale del modo de planificación y envía el plan al usuario para su aprobación. El contenido del plan se lee del archivo de plan escrito previamente.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `allowedPrompts` | array | No | Lista de descripciones de permisos necesarios para implementar el plan |

Cada elemento del array `allowedPrompts`:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `tool` | enum | Sí | Herramienta aplicable, actualmente solo soporta `Bash` |
| `prompt` | string | Sí | Descripción semántica de la operación (como "run tests", "install dependencies") |

## Casos de uso

**Adecuado para:**
- El plan está completo en modo de planificación, listo para enviar a aprobación del usuario
- Solo para tareas de implementación que requieren escribir código

**No adecuado para:**
- Tareas puramente de investigación/exploración — no se necesita salir del modo de planificación
- Querer preguntar al usuario "¿está bien el plan?" — esa es exactamente la función de esta herramienta, no usar AskUserQuestion para eso

## Notas

- Esta herramienta no acepta el contenido del plan como parámetro — lo lee del archivo de plan escrito previamente
- El usuario verá el contenido del archivo de plan para aprobarlo
- No usar AskUserQuestion para preguntar "¿está bien el plan?" antes de llamar a esta herramienta, es redundante
- No mencionar "plan" en las preguntas, ya que el usuario no puede ver el contenido del plan antes de ExitPlanMode

## Significado en cc-viewer

La llamada a ExitPlanMode marca el final de la fase de planificación. En el registro de solicitudes, las solicitudes después de esta llamada generalmente se convierten en operaciones de implementación (Edit, Write, Bash, etc.).
