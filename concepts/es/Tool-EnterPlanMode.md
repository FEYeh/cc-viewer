# EnterPlanMode

## Definición

Cambia Claude Code al modo de planificación, utilizado para explorar la base de código y diseñar un plan antes de la implementación.

## Parámetros

Sin parámetros.

## Casos de uso

**Adecuado para:**
- Implementación de nuevas funcionalidades — requiere decisiones de arquitectura
- Existen múltiples enfoques viables — requiere que el usuario elija
- Las modificaciones de código afectan el comportamiento o la estructura existente
- Cambios en múltiples archivos — posiblemente involucra 2-3 o más archivos
- Requisitos poco claros — necesita explorar primero para entender el alcance
- Las preferencias del usuario son importantes — la implementación puede tener múltiples direcciones razonables

**No adecuado para:**
- Correcciones de una línea o pocas líneas (errores tipográficos, bugs obvios)
- El usuario ya dio instrucciones muy específicas
- Tareas puramente de investigación/exploración — usar Task (tipo Explore)

## Comportamiento en modo de planificación

Después de entrar en modo de planificación, Claude Code:
1. Usa las herramientas Glob, Grep, Read para explorar la base de código en profundidad
2. Comprende los patrones y la arquitectura existentes
3. Diseña un plan de implementación
4. Envía el plan al usuario para aprobación
5. Puede usar AskUserQuestion si necesita aclaraciones
6. Sale mediante ExitPlanMode cuando el plan está listo

## Notas

- Esta herramienta requiere el consentimiento del usuario para entrar en modo de planificación
- Si no está seguro de si se necesita planificación, es preferible planificar — alinear de antemano es mejor que rehacer

## Significado en cc-viewer

Las llamadas a EnterPlanMode aparecen en el registro de solicitudes como content blocks `tool_use`. Después de entrar en modo de planificación, la secuencia de solicitudes generalmente consiste principalmente en llamadas a herramientas exploratorias (Glob, Grep, Read), hasta que se llama a ExitPlanMode.
