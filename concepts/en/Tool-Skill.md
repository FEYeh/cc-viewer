# Skill

## Definition

Executes a skill within the main conversation. Skills are specialized capabilities that users can invoke via slash commands (e.g., `/commit`, `/review-pr`).

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `skill` | string | Yes | Skill name (e.g., "commit", "review-pr", "pdf") |
| `args` | string | No | Skill arguments |

## Use Cases

**Good for:**
- When the user enters a slash command in the `/<skill-name>` format
- When the user's request matches the functionality of a registered skill

**Not good for:**
- Built-in CLI commands (e.g., `/help`, `/clear`)
- A skill that is already running
- Skill names not in the available skills list

## Notes

- Once invoked, the skill expands into a full prompt
- Supports fully qualified names (e.g., `ms-office-suite:pdf`)
- The available skills list is provided in system-reminder messages
- When you see a `<command-name>` tag, it means the skill is already loaded — execute it directly rather than calling this tool again
- Do not mention a skill without actually calling the tool

## Significance in cc-viewer

Skill calls appear in request logs as `tool_use` content blocks. The prompt expanded from the skill affects the system prompt or message content of subsequent requests.
