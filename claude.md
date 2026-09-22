# Project Constitution (B.L.A.S.T. / A.N.T.)

## 📜 Behavioral Rules
1. **B.L.A.S.T. Protocol:** Blueprint, Link, Architect, Stylize, Trigger.
2. **A.N.T. Architecture:** Layer 1 (SOP), Layer 2 (Navigation), Layer 3 (Tools).
3. **Data-First:** Schema defined before coding.
4. **Target Audience:** HR Hiring Managers. Tone: Professional, Helpful, Efficient.
5. **Skill Standard:** `.agent/skills/` directory with `SKILL.md`.

## 🏗️ Architectural Invariants
- Use `/` for paths.
- Store intermediates in `.tmp/`.
- Final payload: GoHighLevel CRM + AI Report Email.

## 📊 Data Schema (AI HR Audit)
### Input (Audit Questions)
```json
{
  "company_name": "string",
  "contact_email": "string",
  "team_size": "number",
  "hiring_pain_points": ["string"],
  "current_hr_tech": ["string"],
  "audit_responses": {
    "q1": "boolean/string",
    "q2": "..."
  }
}
```
### Output (Audit Report)
```json
{
  "score": "number",
  "summary": "string",
  "recommendations": ["string"],
  "upsell_strategy": "string"
}
```
