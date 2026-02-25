# WebSearch

## Definición

Ejecuta consultas en motores de búsqueda y devuelve resultados de búsqueda para obtener información actualizada.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `query` | string | Sí | Consulta de búsqueda (mínimo 2 caracteres) |
| `allowed_domains` | string[] | No | Solo incluir resultados de estos dominios |
| `blocked_domains` | string[] | No | Excluir resultados de estos dominios |

## Casos de uso

**Adecuado para:**
- Obtener información actualizada más allá de la fecha de corte del conocimiento del modelo
- Buscar eventos actuales y datos recientes
- Buscar la documentación técnica más reciente

## Notas

- Los resultados de búsqueda se devuelven en formato de hipervínculos markdown
- Después de usar, se debe incluir una sección "Sources:" al final de la respuesta, listando las URLs relevantes
- Soporta filtrado de dominios (incluir/excluir)
- Se debe usar el año actual en las consultas de búsqueda
- Solo disponible en Estados Unidos

## Significado en cc-viewer

Las llamadas a WebSearch aparecen en el registro de solicitudes como pares de content blocks `tool_use` / `tool_result`. El `tool_result` contiene la lista de resultados de búsqueda.
