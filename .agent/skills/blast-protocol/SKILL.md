---
name: blast-protocol
description: Implements the B.L.A.S.T. (Blueprint, Link, Architect, Stylize, Trigger) protocol and A.N.T. architecture for deterministic automation.
---

# B.L.A.S.T. Protocol

## When to use this skill
- Use for every new project initialization.
- Use when building deterministic, self-healing automation.

## Workflow
1. **Initialize Memory**: Create `task_plan.md`, `findings.md`, `progress.md`, and `claude.md`.
2. **Blueprint**: Ask Discovery questions, define JSON schema in `claude.md`.
3. **Link**: Verify API/Credentials, build minimal test scripts in `tools/`.
4. **Architect**: Separate into Layer 1 (SOPs in `architecture/`), Layer 2 (Navigation), Layer 3 (Tools in `tools/`).
5. **Stylize**: Refine payload (Email/Slack/UI).
6. **Trigger**: Deploy and automate.

## Instructions
- **Data-First**: Define schemas before coding.
- **Self-Annealing**: Analyze failures, patch scripts, update SOPs.
- **Intermediates**: Always use `.tmp/` for scratch data.

## Resources
- [Project Constitution](claude.md)
