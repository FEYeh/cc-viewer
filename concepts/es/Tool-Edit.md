# Edit

## Definición

Edita archivos mediante reemplazo exacto de cadenas. Reemplaza `old_string` por `new_string` en el archivo.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `file_path` | string | Sí | Ruta absoluta del archivo a modificar |
| `old_string` | string | Sí | Texto original a reemplazar |
| `new_string` | string | Sí | Nuevo texto de reemplazo (debe ser diferente de old_string) |
| `replace_all` | boolean | No | Si se reemplazan todas las coincidencias, por defecto `false` |

## Casos de uso

**Adecuado para:**
- Modificar segmentos específicos de código en archivos existentes
- Corregir bugs, actualizar lógica
- Renombrar variables (con `replace_all: true`)
- Cualquier escenario que requiera modificación precisa del contenido de un archivo

**No adecuado para:**
- Crear archivos nuevos — usar Write
- Reescrituras a gran escala — puede requerir Write para sobrescribir el archivo completo

## Notas

- Se debe haber leído el archivo previamente con Read antes de usar, de lo contrario dará error
- `old_string` debe ser único en el archivo, de lo contrario la edición falla. Si no es único, proporcionar más contexto para hacerlo único, o usar `replace_all`
- Al editar texto se debe mantener la indentación original (tab/espacios), no incluir el prefijo de número de línea de la salida de Read
- Preferir editar archivos existentes en lugar de crear nuevos
- `new_string` debe ser diferente de `old_string`

## Significado en cc-viewer

Las llamadas a Edit aparecen en el registro de solicitudes como content blocks `tool_use`, cuyo `input` contiene `old_string` y `new_string`, lo que permite rastrear qué modificaciones hizo el modelo en los archivos.
