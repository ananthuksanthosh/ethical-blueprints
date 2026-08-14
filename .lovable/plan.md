# Premium Cybersecurity Portfolio — Ananthu K Santhosh

A single-page, dark-first portfolio built to recruiter standards: black + electric blue, large confident typography, generous spacing, and subtle security-themed motion. Tone target: roughly 80% professional/corporate, 20% cybersecurity aesthetic — never a "hacker site". Positioning throughout is a technically serious BCA student and aspiring cybersecurity professional with genuine hands-on academic and lab experience, never a senior security career. No invented facts anywhere — everything unknown ships as a clearly marked editable placeholder. No custom cursor, no Matrix rain, no hooded-hacker or skull imagery, no fake hacking terminal, no GitHub contribution graph, no screenshots in labs.

## Page flow

Loading screen → Navigation → Hero → Focus Areas / Stats → About → Skills → Featured Projects → Security Research & Labs → Experience → Education → Contact → Footer.

Certifications is scaffolded (data file + section component ready) but not rendered, so it can be switched on later with one flag.

## Sections

**Loading screen** — brief terminal boot sequence (`initializing security portfolio... → access granted.`), ~1.2s max, auto-dismisses, skipped entirely under reduced motion, never traps focus.

**Navigation** — sticky glass bar that firms up on scroll. HOME / ABOUT / SKILLS / PROJECTS / LABS / EXPERIENCE / CONTACT with an active-section indicator, smooth scrolling, mobile hamburger sheet, theme toggle, GitHub + LinkedIn icons, and a "Get In Touch" CTA.

**Hero** — "Think Like an Attacker. Build Like a Defender." with the sub-line "Ethical Hacking. Cloud Security. IoT Security.", a grounded 3–4 line description, two CTAs, and a small terminal tag (`~/security/portfolio`). Right side: an original animated SVG/canvas network visualization — nodes, links, a soft shield form, slow traffic pulses, faint grid. No photo, no hacker clichés, static frame under reduced motion.

**Focus Areas / Stats** — count-up figures pulled from a data file: security project count (derived from the projects array), labs count (derived from the labs array), 240 hours internship, 3 primary domains. Derived counts mean the numbers can never drift out of sync.

**About** — "About Me / Learning. Testing. Securing." Two-column asymmetric layout: specific cybersecurity narrative (BCA student, hands-on labs, Linux, networking, tooling) plus a compact trait/interest panel covering pentesting, ethical hacking, SOC/analyst, and broader IT directions.

**Skills** — five grouped panels (Cybersecurity, Security Tools, Cloud, Development, DevOps) as tag clusters with hover lift. No percentage bars, no logo wall.

**Featured Projects** — six cards from a typed data model: MEDOX, Metasploitable2 ethical hacking lab (explicitly labelled a controlled lab environment), IoT security lab, AWS cloud security labs, CloudTrail + Splunk monitoring, SYN Recon (editable placeholder description). Each card: name, category, short description, technology tags, GitHub when one exists, live demo when one exists, and a "View details" action. Category filter (All / Cybersecurity / Cloud / IoT / Development / DevOps), a deliberately understated search across name, description, technology, and category, subtle animated re-layout. Cards with no repo or demo show "Documentation coming soon" — never a fabricated URL. Card shape already supports a future detail page/modal.

**Security Research & Labs** — concise recruiter-friendly lab cards: title, category, summary, tools, concepts. No screenshots, no long write-ups.

**Experience** — timeline with IPSR Solutions Ltd., AI-Integrated Cloud, DevOps & Cybersecurity Intern, 8 weeks / 240 hours, exposure areas and the MEDOX capstone. Framed as an internship, not employment.

**Education** — BCA, Marian College Kuttikkanam (Autonomous); graduation year is a `TODO` config value rendered as "Expected: TBD" until filled.

**Contact** — "Let's Connect", validated form (name, email, subject, message) with zod, honeypot, and clear inline errors. Posts to a Formspree endpoint read from an env var; with no endpoint set the form validates and shows a friendly "contact channel not configured yet" state rather than failing silently. Email, GitHub, LinkedIn shown; email is a placeholder constant. No phone.

**Footer** — name, title, the three domains, links, © 2026 line. Minimal.

## Placeholders you'll fill later (all in one file)

- Contact email
- Expected graduation year
- Resume path (View / Download buttons render a "Resume coming soon" state until set)
- Formspree endpoint (env var)
- SYN Recon description

## Technical notes

- TanStack Start route at `/` (replaces the placeholder index), section components under `src/components/portfolio/`, all content in `src/data/` (`site.ts`, `projects.ts`, `labs.ts`, `skills.ts`, `experience.ts`, `certifications.ts` stub).
- Design tokens (near-black surfaces, electric blue accent, glow, borders) defined in `src/styles.css` for both themes; no hardcoded color utilities in components.
- Theme: class-based dark/light, dark default, persisted, system-preference aware, with an inline pre-hydration script so there's no flash.
- Typography: Space Grotesk display + Inter body, loaded via `<link>` in the root route head.
- Motion via CSS transitions + IntersectionObserver reveals (no heavy animation library), all gated behind `prefers-reduced-motion`.
- SEO: route `head()` with the exact title, a natural meta description, Open Graph + Twitter tags, canonical, and Person JSON-LD. Semantic landmarks, single H1, visible focus rings, labeled form fields.
- No GitHub API contribution graph; GitHub links only, no fabricated repos.
- After building, I'll review the rendered site at desktop and mobile widths and refine spacing, hierarchy, and animation timing.
