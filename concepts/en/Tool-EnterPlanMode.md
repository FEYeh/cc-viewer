# EnterPlanMode

## Definition

Switches Claude Code into plan mode for exploring the codebase and designing an implementation plan before execution.

## Parameters

No parameters.

## Use Cases

**Good for:**
- New feature implementation — requires architectural decisions
- Multiple viable approaches exist — requires user selection
- Code changes affect existing behavior or structure
- Multi-file changes — potentially involving 2-3 or more files
- Requirements are unclear — need to explore first to understand scope
- User preferences matter — implementation can go in multiple reasonable directions

**Not good for:**
- Single-line or few-line fixes (typos, obvious bugs)
- The user has given very specific instructions
- Pure research/exploration tasks — use Task (Explore type) instead

## Behavior in Plan Mode

After entering plan mode, Claude Code will:
1. Use Glob, Grep, and Read tools to deeply explore the codebase
2. Understand existing patterns and architecture
3. Design an implementation plan
4. Submit the plan for user approval
5. Use AskUserQuestion if clarification is needed
6. Exit via ExitPlanMode when the plan is ready

## Notes

- This tool requires user consent to enter plan mode
- When unsure whether planning is needed, lean toward planning — aligning upfront is better than rework

## Significance in cc-viewer

EnterPlanMode calls appear in request logs as `tool_use` content blocks. The request sequence after entering plan mode is typically dominated by exploratory tool calls (Glob, Grep, Read) until ExitPlanMode is called.
