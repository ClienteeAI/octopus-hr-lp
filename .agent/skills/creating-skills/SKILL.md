---
name: creating-skills
description: Generates high-quality Antigravity skills following strict structural and documentation standards. Use when the user requests a new skill or automation module.
---

# Creating Skills

## When to use this skill
- Use this skill when the user asks to create a new "Skill" or a persistent automation module in the `.agent/skills/` directory.
- Use when designing specialized behaviors for the agent.

## Workflow
- [ ] **Define Name**: Use gerund form (e.g., `managing-logs`).
- [ ] **Create Directory**: `<skill-name>/` in `.agent/skills/`.
- [ ] **Write SKILL.md**: Include YAML frontmatter, title, usage, and logic.
- [ ] **Add Resources**: Use `scripts/`, `examples/`, or `resources/` for secondary data.
- [ ] **Validate**: Ensure path separators are forward slashes `/`.

## Instructions
- **Conciseness**: Focus on unique logic; do not explain basics.
- **Progressive Disclosure**: Keep `SKILL.md` < 500 lines. Link to secondary files for detail.
- **Degrees of Freedom**: Use bullet points for heuristics, code blocks for templates, and specific commands for fragile operations.

## Resources
- [See SKILL_CREATOR.md](SKILL.md)
