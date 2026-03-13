---
name: plenejagov-branding
description: Use when renaming visible product branding in this monorepo to PlenejaGov, including docs, manifests, titles, environment defaults, and user-facing copy while preserving internal compatibility where needed.
---

# PlenejaGov Branding

Use this skill for branding passes in this repository.

## Workflow

1. Prioritize user-facing surfaces first:
   - `README.md`
   - `worklenz-frontend/index.html`
   - `worklenz-frontend/public/manifest.json`
   - `worklenz-frontend/src/hooks/useDoumentTItle.ts`
   - backend views and email templates
   - `.env.example` and `worklenz-backend/.env.template`
2. Keep internal identifiers stable unless the user explicitly asks for a breaking refactor.
3. Preserve working routes like `/worklenz` unless route migration is part of the request.
4. Before editing files already changed in git, inspect the diff and avoid overwriting unrelated work.

## Guardrails

- Prefer replacing visible `Worklenz` or `PlanejaGov` strings with `PlenejaGov`.
- Do not mass-rename TypeScript types, classes, or filenames unless necessary.
- If a hostname or external URL is unknown, keep compatibility instead of inventing a new production dependency.
