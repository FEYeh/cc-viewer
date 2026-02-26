# WebFetch

## Definición

Obtiene el contenido de una página web de una URL especificada, convierte el HTML a markdown y procesa el contenido con un modelo de IA según el prompt.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `url` | string (URI) | Sí | URL completa a obtener |
| `prompt` | string | Sí | Describe qué información extraer de la página |

## Casos de uso

**Adecuado para:**
- Obtener contenido de páginas web públicas
- Consultar documentación en línea
- Extraer información específica de páginas web

**No adecuado para:**
- URLs que requieren autenticación (Google Docs, Confluence, Jira, GitHub, etc.) — buscar primero herramientas MCP dedicadas
- URLs de GitHub — preferir usar el CLI `gh`

## Notas

- La URL debe ser una URL válida completa
- HTTP se actualiza automáticamente a HTTPS
- Los resultados pueden ser resumidos si el contenido es demasiado grande
- Incluye caché con auto-limpieza de 15 minutos
- Cuando la URL redirige a un host diferente, la herramienta devuelve la URL de redirección y se necesita hacer una nueva solicitud con la nueva URL
- Si hay una herramienta web fetch proporcionada por MCP disponible, preferir usar esa

## Significado en cc-viewer

Las llamadas a WebFetch aparecen en el registro de solicitudes como pares de content blocks `tool_use` / `tool_result`. El `tool_result` contiene el resumen del contenido web procesado por IA.
