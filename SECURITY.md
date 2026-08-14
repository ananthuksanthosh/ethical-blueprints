# Security Policy

This repository hosts a public, static personal portfolio (React + Vite + TanStack Start).
It has no user accounts, no database, and no custom backend.

## Security controls implemented

- **HTTPS only.** All external resources (Google Fonts, Formspree) are loaded over HTTPS.
  There is no mixed content. `upgrade-insecure-requests` is set in production.
- **Content Security Policy.** A restrictive CSP is applied at the response layer
  (`src/lib/security-headers.ts`, mirrored in `public/_headers` for static hosts).
  Only `'self'`, Google Fonts, and the Formspree endpoint are allowed. No wildcard
  `default-src *` / `script-src *`.
- **Security headers.** `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive `Permissions-Policy`,
  `Cross-Origin-Opener-Policy: same-origin`, and `Strict-Transport-Security`
  (HTTPS responses only).
- **Clickjacking protection.** `frame-ancestors` limits framing to the site itself and the
  Lovable preview/editor origins; arbitrary third-party framing is blocked.
- **No third-party tracking.** No analytics, ads, fingerprinting, or session-recording scripts.

## Hosting configuration

Security headers must be enforced by the hosting layer for purely static deployments:

- **Cloudflare Pages / Netlify:** `public/_headers` is picked up automatically.
- **Vercel:** add an equivalent `headers` entry in `vercel.json` using the same directives.
- **GitHub Pages:** custom response headers are **not** supported. GitHub Pages serves HTTPS,
  but CSP and the other headers cannot be enforced there. Use a host that supports custom
  headers if header enforcement is required.
- **Server-rendered deployment (default here):** headers are applied in `src/server.ts`.

## Contact form security

- The form posts directly to Formspree (`https://formspree.io/f/<public form id>`).
  Only the **public** form ID is present in the source; no Formspree private credentials exist
  in this repository.
- Client-side validation (Zod) enforces required fields and maximum lengths for
  name, email, subject, and message.
- A hidden honeypot field plus Formspree's own spam filtering handle bot submissions.
- Duplicate submissions are prevented while a request is in flight; user input is preserved
  if a submission fails.
- All content is rendered as text by React. `dangerouslySetInnerHTML` is never used for
  contact-form data.
- Errors shown to visitors are short and generic — no stack traces, file paths, or raw
  API responses.

## Secrets

No passwords, API secrets, cloud access keys, tokens, or private environment variables
belong in this repository. Only public configuration required by the browser
(such as the public Formspree form ID) may appear in the source.

Recommended repository settings: enable **Dependabot** (`.github/dependabot.yml` is included),
**secret scanning with push protection**, and **code scanning (CodeQL)**.

## Reporting a security issue

Please report suspected vulnerabilities privately via GitHub's
**Security → Report a vulnerability** (private vulnerability reporting) on this repository,
or through the contact form on the site. Please do not open a public issue with exploit
details. Include steps to reproduce and the expected impact; a response can be expected
within a reasonable timeframe.
