# AskUserQuestion

## Definición

Hace preguntas al usuario durante la ejecución para obtener aclaraciones, verificar suposiciones o solicitar decisiones.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `questions` | array | Sí | Lista de preguntas (1-4 preguntas) |
| `answers` | object | No | Respuestas recopiladas del usuario |
| `annotations` | object | No | Anotaciones para cada pregunta (como notas de vista previa de selección) |
| `metadata` | object | No | Metadatos para seguimiento y análisis |

Cada objeto `question`:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `question` | string | Sí | Texto completo de la pregunta, debe terminar con signo de interrogación |
| `header` | string | Sí | Etiqueta corta (máximo 12 caracteres), se muestra como chip de etiqueta |
| `options` | array | Sí | 2-4 opciones |
| `multiSelect` | boolean | Sí | Si se permite selección múltiple |

Cada objeto `option`:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `label` | string | Sí | Texto de visualización de la opción (1-5 palabras) |
| `description` | string | Sí | Descripción de la opción |
| `markdown` | string | No | Contenido de vista previa (para comparación visual de diseños ASCII, fragmentos de código, etc.) |

## Casos de uso

**Adecuado para:**
- Recopilar preferencias o requisitos del usuario
- Aclarar instrucciones ambiguas
- Obtener decisiones durante la implementación
- Ofrecer opciones de dirección al usuario

**No adecuado para:**
- Preguntar "¿está bien el plan?" — se debe usar ExitPlanMode

## Notas

- El usuario siempre puede seleccionar "Other" para proporcionar una entrada personalizada
- La opción recomendada se coloca en primer lugar, con "(Recommended)" al final del label
- La vista previa `markdown` solo es compatible con preguntas de selección única
- Las opciones con `markdown` cambian a un diseño lado a lado
- En modo de planificación, se usa para aclarar requisitos antes de definir el plan

## Significado en cc-viewer

Las llamadas a AskUserQuestion aparecen en el registro de solicitudes como content blocks `tool_use`, conteniendo las definiciones de preguntas y opciones. Las respuestas del usuario aparecen en el historial de mensajes de solicitudes posteriores.
