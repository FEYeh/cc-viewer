# Read

## Definición

Lee el contenido de archivos del sistema de archivos local. Soporta archivos de texto, imágenes, PDF y Jupyter notebook.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `file_path` | string | Sí | Ruta absoluta del archivo |
| `offset` | number | No | Número de línea inicial (para lectura segmentada de archivos grandes) |
| `limit` | number | No | Número de líneas a leer (para lectura segmentada de archivos grandes) |
| `pages` | string | No | Rango de páginas PDF (como "1-5", "3", "10-20"), solo aplicable a PDF |

## Casos de uso

**Adecuado para:**
- Leer archivos de código, archivos de configuración y otros archivos de texto
- Ver archivos de imagen (Claude es un modelo multimodal)
- Leer documentos PDF
- Leer Jupyter notebooks (devuelve todas las celdas y salidas)
- Leer múltiples archivos en paralelo para obtener contexto

**No adecuado para:**
- Leer directorios — usar el comando `ls` de Bash
- Exploración abierta de la base de código — usar Task (tipo Explore)

## Notas

- La ruta debe ser absoluta, no relativa
- Por defecto lee las primeras 2000 líneas del archivo
- Las líneas que excedan 2000 caracteres serán truncadas
- La salida usa formato `cat -n`, los números de línea comienzan en 1
- Los PDF grandes (más de 10 páginas) deben especificar el parámetro `pages`, máximo 20 páginas por vez
- Leer un archivo inexistente devuelve un error (no se bloquea)
- Se pueden hacer múltiples llamadas Read en paralelo en un solo mensaje

## Significado en cc-viewer

Las llamadas a Read aparecen en el registro de solicitudes como pares de content blocks `tool_use` (llamada) y `tool_result` (contenido devuelto). El `tool_result` contiene el contenido real del archivo, lo que permite analizar qué archivos leyó el modelo.
