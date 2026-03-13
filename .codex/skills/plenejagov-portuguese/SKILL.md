---
name: plenejagov-portuguese
description: Use when making this monorepo effectively Portuguese-first, especially by promoting pt resources, setting pt defaults, and reducing exposure of unfinished non-Portuguese paths.
---

# PlenejaGov Portuguese First

Use this skill for localization passes in this repository.

## Workflow

1. Make Portuguese the real default:
   - `worklenz-frontend/src/i18n.ts`
   - `worklenz-frontend/src/features/i18n/localesSlice.ts`
   - language selectors in setup and navbar
2. Reuse existing `worklenz-frontend/public/locales/pt` resources before adding new strings.
3. Translate fallback copy and hardcoded UI strings on high-traffic pages first.
4. Leave large translation sweeps for targeted passes instead of risky bulk replacements.

## Guardrails

- Favor Portuguese labels and defaults over removing i18n infrastructure.
- If a screen already has `t(...)`, prefer fixing the `pt` resource or the default language, not adding more hardcoded English.
- Keep compatibility with existing storage keys like `i18nextLng` unless the user asks for migration.
