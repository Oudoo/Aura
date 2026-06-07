## LAST_AGENT
Claude Code

## BRANCH
main (pushed directly per owner's standing instruction; Hostinger auto-deploy)

## LAST_COMMIT
7c0e4c1 fix(auth,cdn): cross-runtime Web Crypto + stop CDN pinning stale HTML

## UPDATED
2026-06-07T05:25:00+03:00

## GOAL
Get getaura.business public site + admin/ERP dashboard demo-ready. Code is done;
the live Hostinger Node app is DOWN and must be brought back up.

## CURRENT_STATE (code — all pushed to main, verified locally)
- Design REVERTED to pre-redesign (Navbar, Footer, page, about, suites). All
  ideas/features preserved (LegacyVsAuraSlider, InteractiveArchitectureBuilder,
  HeroDiagnosisForm, methodology, submitAuditForm CRM capture).
- auth.ts: tolerant of quoted/whitespace/"$"-mangled ADMIN_PASSWORD_HASH; falls
  back to plaintext ADMIN_PASSWORD; getSubtle() makes Web Crypto work on Node 18
  (lazy node:crypto.webcrypto fallback, Edge-bundle-safe via computed specifier).
- next.config.ts: headers() forces short revalidating cache on non-/_next/ routes
  (was pinned at s-maxage=31536000 → CDN served ~40h-old HTML).
- Verified: typecheck clean, eslint clean, 8/8 tests, build exit 0.

## BLOCKER (live infra — NOT code)
The Hostinger Node app is DOWN. Every origin request (cache-busted homepage,
/api/*, /audit, random 404) returns a Hostinger hpanel 503 error page (807 bytes,
headers: platform=hostinger, panel=hpanel). Only the CDN-cached old homepage
serves 200. So: app not running / failed build or start, OR site is misconfigured
as static hosting instead of a Node.js app.
Hostinger MCP is LOCKED OUT (401 Unauthenticated) because the session's
HOSTINGER_API_TOKEN is the OLD rotated token.

## NEXT_STEP (fresh session, after owner updates HOSTINGER_API_TOKEN env var)
1. mcp__hostinger-mcp__hosting_listJsDeployments(domain="getaura.business") — check
   deploy state (pending/running/completed/failed).
2. mcp__hostinger-mcp__hosting_showJsDeploymentLogs — read why build/start failed.
3. Confirm hosting TYPE is a Node.js app (not static), Node version >= 20, and the
   start command is `npm start` (runs scripts/start.mjs → prisma db push + next start).
4. Confirm/set env vars: DATABASE_URL, AUTH_SECRET, NEXT_PUBLIC_SITE_URL, and
   ADMIN_PASSWORD=AuraDemo2026 (DELETE the broken ADMIN_PASSWORD_HASH for the demo).
5. Redeploy (hosting_deployJsApplication if needed), then purge/verify CDN, and
   curl /admin/login + submit login to confirm end-to-end.

## FILES
- src/lib/auth.ts
- next.config.ts
- src/middleware.ts (Next 16 wants rename to proxy.ts — future cleanup)
- scripts/start.mjs
- src/app/page.tsx, about/page.tsx, suites/page.tsx, components/Navbar.tsx, Footer.tsx
