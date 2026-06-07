## LAST_AGENT
Claude Code

## BRANCH
main (pushed directly per owner's standing instruction; auto-deploys to Hostinger)

## LAST_COMMIT
6bade9a revert(ui): restore previous marketing design; harden admin auth

## UPDATED
2026-06-07T05:10:00+03:00

## GOAL
Get the public marketing site + admin/ERP dashboard demo-ready. Roll back the
bold editorial redesign to the previous design (keep all section ideas/features)
until a Framer-based UI template is supplied. Fix admin login lockout.

## CURRENT_STATE
- Design REVERTED to pre-redesign (commit 4eb6876) for: Navbar, Footer, page.tsx,
  about, suites. globals.css kept (superset; text-gradient used by auditFramework).
  All ideas/features preserved: LegacyVsAuraSlider, InteractiveArchitectureBuilder,
  HeroDiagnosisForm, methodology, CRM lead capture (submitAuditForm).
- AUTH HARDENED (src/lib/auth.ts): ADMIN_PASSWORD_HASH is now trimmed and has
  surrounding quotes stripped; a malformed hash (e.g. "$" expanded by an env panel)
  falls through to the plaintext ADMIN_PASSWORD fallback instead of hard-failing.
- hash-password.mjs now prints a panel-safe raw value (no quotes) + "$" warning.
- Audit: typecheck clean, eslint clean, 8/8 tests, production build 15/15 routes.

## BLOCKER
- Admin login: both prior passwords failed because the ADMIN_PASSWORD_HASH value in
  Hostinger is mangled (quotes kept, or "$" shell-expanded). Both hashes were
  verified mathematically correct, so the fault is env-side, not the hash.
- Hostinger MCP returns "Unauthenticated": the session's HOSTINGER_API_TOKEN is the
  OLD (rotated) token. Must be updated in the Claude Code web environment settings.

## NEXT_STEP
1. In Hostinger env vars: DELETE ADMIN_PASSWORD_HASH, SET ADMIN_PASSWORD=AuraDemo2026
   (plaintext, no "$"), then redeploy/restart. Login code = AuraDemo2026.
   Post-demo: regenerate a proper hash and paste the RAW value (no quotes).
2. Update HOSTINGER_API_TOKEN in the Claude Code environment settings to re-enable MCP.
3. Awaiting Framer "Arqos Portfolio" template (user to upload zip) to build the new UI.

## FILES
- src/lib/auth.ts
- scripts/hash-password.mjs
- src/app/page.tsx
- src/app/about/page.tsx
- src/app/suites/page.tsx
- src/components/Navbar.tsx
- src/components/Footer.tsx
