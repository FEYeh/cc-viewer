# Bash

## Definición

Ejecuta comandos shell con configuración de tiempo de espera opcional. El directorio de trabajo persiste entre comandos, pero el estado del shell (variables de entorno, etc.) no persiste.

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `command` | string | Sí | Comando bash a ejecutar |
| `description` | string | No | Descripción breve del comando |
| `timeout` | number | No | Tiempo de espera (milisegundos), máximo 600000, por defecto 120000 |
| `run_in_background` | boolean | No | Si se ejecuta en segundo plano |

## Casos de uso

**Adecuado para:**
- Operaciones git (commit, push, branch, etc.)
- Comandos de gestión de paquetes npm/yarn
- Operaciones docker
- Comandos de compilación y construcción
- Listar contenido de directorios (`ls`)
- Otros comandos del sistema que requieren ejecución en shell

**No adecuado para:**
- Leer archivos — usar Read
- Buscar nombres de archivos — usar Glob
- Buscar contenido de archivos — usar Grep
- Editar archivos — usar Edit
- Escribir archivos — usar Write
- Mostrar información al usuario — mostrar directamente en el texto de respuesta
- Procesos de larga duración (dev server, modo watch) — recomendar al usuario ejecutar manualmente

## Notas

- Las rutas con espacios deben estar entre comillas dobles
- La salida que exceda 30000 caracteres será truncada
- Los comandos en segundo plano obtienen resultados mediante TaskOutput
- Usar preferentemente rutas absolutas, evitar `cd`
- Los comandos independientes pueden ejecutar múltiples Bash en paralelo
- Los comandos con dependencias se encadenan con `&&`
- El entorno shell se inicializa desde el profile del usuario (bash o zsh)

## Significado en cc-viewer

Las llamadas a Bash aparecen en el registro de solicitudes como pares de content blocks `tool_use` (conteniendo el comando) y `tool_result` (conteniendo la salida). La salida de la ejecución del comando puede usarse para analizar el comportamiento operativo del modelo.
