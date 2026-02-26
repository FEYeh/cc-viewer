# Write

## Definición

Escribe contenido en el sistema de archivos local. Si el archivo ya existe, lo sobrescribe.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `file_path` | string | Sí | Ruta absoluta del archivo (debe ser ruta absoluta) |
| `content` | string | Sí | Contenido a escribir |

## Casos de uso

**Adecuado para:**
- Crear archivos nuevos
- Cuando se necesita reescribir completamente el contenido de un archivo

**No adecuado para:**
- Modificar contenido parcial de un archivo — usar Edit
- No se deben crear proactivamente archivos de documentación (*.md) o README, a menos que el usuario lo solicite explícitamente

## Notas

- Si el archivo de destino ya existe, se debe leer primero con Read, de lo contrario fallará
- Sobrescribe todo el contenido del archivo existente
- Preferir usar Edit para editar archivos existentes, Write solo para crear archivos nuevos o reescrituras completas

## Significado en cc-viewer

Las llamadas a Write aparecen en el registro de solicitudes como content blocks `tool_use`, cuyo `input.content` contiene el contenido completo escrito.
