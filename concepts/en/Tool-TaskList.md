# TaskList

## Definition

Lists all tasks in the task list to view overall progress and available work.

## Parameters

No parameters.

## Return Content

Summary information for each task:
- `id` — Task identifier
- `subject` — Short description
- `status` — Status: `pending`, `in_progress`, or `completed`
- `owner` — Owner (agent ID), empty means unassigned
- `blockedBy` — List of incomplete task IDs blocking this task

## Use Cases

**Good for:**
- Viewing available tasks (status is pending, no owner, not blocked)
- Checking overall project progress
- Finding blocked tasks
- Finding the next task after completing one

## Notes

- Prefer processing tasks in ID order (lowest ID first), as earlier tasks usually provide context for later ones
- Tasks with `blockedBy` cannot be claimed until dependencies are resolved
- Use TaskGet to get full details of a specific task

## Significance in cc-viewer

TaskList is an internal task management operation and does not produce independent API requests.
