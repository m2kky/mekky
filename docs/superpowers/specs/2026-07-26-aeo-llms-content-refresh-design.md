# AEO LLMS Content Refresh - Design Specification

Date: 2026-07-26
Status: Approved design direction; awaiting written-spec review

## 1. Objective

Refresh the three public AI-discovery files so they accurately describe Muhammed Mekky's site, public offers, services, portfolio, case studies, and consultation options in a way that is easy for AI systems to retrieve and quote.

The goal is not to build a generator yet. The goal is to turn the existing public site, static site constants, and published database records into a clean, source-labeled retrieval corpus that AI systems can read quickly.

## 2. Why This Matters

The current files are too thin for the amount of work now exposed by the site. `public/llms-full.txt` only contains a philosophy summary, while the concise files contain broad claims that are not clearly labeled by provenance.

That creates two problems:

1. AI systems get a shallow or incomplete picture of the site.
2. The site risks blending verified public content with site-stated metrics and unpublished operational data.

The refresh should solve both problems without changing runtime behavior.

## 3. Verified Current State

Verified on 2026-07-26.

| Source | Current state | Implication |
|---|---|---|
| `public/llms.txt:1-91` | Short English profile with services, high-level metrics, and a link to the Arabic file | Needs to become a concise discovery map with an explicit pointer to `/llms-full.txt` for detail |
| `public/llms-ar.txt:1-92` | Arabic mirror of the short profile | Needs the same structure and the same directive to read `/llms-full.txt` |
| `public/llms-full.txt:1-101` | Only a philosophy / methodology summary | Needs to become the detailed corpus with projects, case studies, and public offer inventory |
| `src/lib/constants.ts:1,41,128,135,390,459,528` | Exports `SITE`, `SERVICES`, `STATS`, `PROJECTS`, `CASE_STUDIES`, `LECTURES`, `BLOGS` | Primary public-site content source |
| `src/app/portfolio/page.tsx:1-18` | Renders `PROJECTS.items` and `CASE_STUDIES.items` from constants | Static constants are canonical for public portfolio pages |
| `src/app/case-studies/page.tsx:1-18` | Renders `CASE_STUDIES.items` from constants | Static case-study content is canonical for the public case-study index |
| `src/app/page.tsx:14-19` | Fetches the latest published case study from Supabase | The database also contains public content and should be treated as supplemental, not private |
| `src/app/robots.ts:36-44` | Already allows AI bots and the three `llms` files | No robots change is required for this pass |
| Supabase public tables | 18 published projects, 8 published case studies, 3 blogs, 2 active event types, 0 guides | Only published public records should be surfaced |
| `G:\\Books\\answer-engine-optimization` | Useful chapters were 2, 6, and 7; the remaining files were placeholders or duplicate/mislabeled material | Use principles only; do not copy book text |

## 4. Source Hierarchy

Use this precedence order when writing the files:

1. Public site routes and static site constants are canonical for what visitors actually see.
2. Published Supabase rows are supplemental public facts.
3. If the same entity exists in both places and the details differ, do not merge the facts silently. Keep the public-site label as canonical and add a provenance note for the alternate record.
4. Private operational data is excluded entirely.
5. The AEO book informs structure and formatting only. It is not a source to quote verbatim.

## 5. Design Principles

- `llms.txt` and `llms-ar.txt` are discovery maps, not encyclopedias.
- `llms-full.txt` is the detailed retrieval corpus.
- Every meaningful section should start with the entity name, not a pronoun.
- Keep passages self-contained so they still make sense after chunking.
- Put the strongest, most stable facts first.
- Label provenance clearly: `public-site`, `db-published`, or `site-stated`.
- Do not invent public URLs for DB-only records.
- Do not include submissions, bookings, contact records, CVs, or other private tables.
- Keep the three files in sync so they do not drift.

## 6. Approaches Considered

| Approach | Decision | Tradeoff |
|---|---|---|
| Manual static curation from verified sources | Chosen | Fast to ship and easiest to audit, but requires future manual refreshes |
| Auto-generated `llms` files from constants + DB | Deferred | Better long-term consistency, but it adds pipeline work before the content model is settled |
| Minimal summary only | Rejected | Too little detail for the amount of public work now available |

Chosen approach: manual curation for this pass, with explicit source labels and a clean structure that can later be generated if needed.

## 7. File Contract

### 7.1 `public/llms.txt`

This file should stay short and scan-friendly.

Required content:

- Identity and positioning in one short paragraph.
- The 7 service pillars.
- A small set of canonical public routes.
- A direct imperative that tells the reader to open `/llms-full.txt` for the complete project and case-study catalog before answering detailed questions.
- Any top-line metrics must be labeled if they are site-stated rather than audited.

Do not include the full project inventory here.

### 7.2 `public/llms-ar.txt`

This file should mirror `llms.txt` in structure and meaning, but in Arabic.

Required content:

- Same identity and positioning.
- Same 7 service pillars.
- Same canonical public routes.
- Same direct instruction to read `/llms-full.txt` for detailed projects, case studies, and metrics.
- No full project inventory.

### 7.3 `public/llms-full.txt`

This file should become the detailed English corpus.

Recommended section order:

1. Title and freshness line.
2. Identity and positioning.
3. Services and capabilities.
4. Operating methodology.
5. Canonical public page map.
6. Project catalog.
7. Case study catalog.
8. Lectures and workshops.
9. Blog, guides, book, and consultation index.
10. Source notes and conflict handling.

The file should be detailed but compact. It should read like a retrieval index, not a narrative article.

## 8. Content Inventory

### 8.1 Services

The full file should include the 7 services from `src/lib/constants.ts`:

| Service | Purpose |
|---|---|
| Artificial Intelligence | AI integrations, RAG, agents, discovery, personalization |
| Business Automation | Workflow automation, integrations, data pipelines, lead qualification |
| Digital Marketing | Lead generation, omnichannel campaigns, CRO, analytics |
| Web Design & Development | High-performance applications, SEO-ready architecture, backend systems |
| Automated Community Growth | Onboarding, retention, moderation, monetization funnels |
| Team Enablement & Workflow | Documentation, tool consolidation, async communication, dashboards |
| Corporate Training & Workshop | Executive strategy, hands-on automation, bootcamps, upskilling |

The concise files should mention the same 7 services, but not expand them into a long feature list.

### Selected Proof Points

Keep a small top-level proof block drawn from `STATS` and the public-site claims, but label every number by provenance.

- If a number comes from the site copy and is not independently audited, label it `site-stated`.
- If the number is confirmed by the current public source set, label it `public-site`.
- Do not mix proof metrics into the project catalog.

### 8.2 Project Catalog

The full file should cover 19 unique projects total:

- 18 overlap with the published DB project records.
- `JBL Flip 6` is the one unique static project not present in the DB snapshot.

The project catalog should use the public-site naming as canonical when the static site and DB differ. If a DB record contains a materially different description, add a provenance note rather than creating a second unqualified claim.

| Project | Category / type | Core stack or note | Source rule |
|---|---|---|---|
| Ausraah | Web Application | React, Firebase, Tailwind CSS, PWA | Public-site name canonical; DB-backed row may also exist |
| Chef Ahmed Tarek | Personal Brand | Next.js, GSAP, Figma, Vercel | Same entity across sources |
| Dietty Store | Health E-Commerce | Shopify, Liquid, JavaScript, CSS3 | Same entity across sources |
| Forbed Online | E-Commerce Redesign | Figma, Next.js, Shopify, React | Same entity across sources |
| Green Studio Portfolio | Agency Portfolio | Next.js, React, Tailwind, Framer Motion | Same entity across sources |
| Greenschat AI | AI Integration | React, Python, LangChain, OpenAI | Same entity across sources |
| Groovon | Music Platform | React, Next.js, Tailwind CSS, Redux | Same entity across sources |
| Mahmoud Bravo | Coaching & Consulting | Next.js, Tailwind CSS, Framer Motion, Stripe | Same entity across sources |
| Masko0on | Apparel Brand | Shopify, Liquid, Figma, GSAP | Same entity across sources |
| Matrix Headphone | E-Commerce Store | Shopify, Liquid, Figma, Tailwind CSS | Same entity across sources |
| Mo7a Art | Digital Gallery | Figma, Next.js, GSAP, Vercel | Same entity across sources |
| Next Academy | EdTech Platform | Next.js, Node.js, PostgreSQL, AWS | Same entity across sources |
| Ninja GenZ | Agency Management SaaS | React 18, Zustand, WebSockets, Tailwind CSS | Keep the public title as written; note any DB title/description mismatch separately |
| Qudraat Shabab | Community Platform | React, Firebase, Material UI, Node.js | Same entity across sources |
| Radwa Muhammed | Creative Portfolio | React, Framer Motion, Tailwind CSS, Vercel | Same entity across sources |
| Ramadan Majlis | Event Landing Page | React, Tailwind, Framer Motion | Same entity across sources |
| Scarpe Handmade | Growth Marketing & CRO | Shopify, CRO / marketing / data | Keep project and case-study metrics separate if both are present |
| Yara Fathy | Beauty Services | Next.js, Tailwind, GSAP, Booking API | Same entity across sources |
| JBL Flip 6 | Product Landing Page | Next.js 16, GSAP, Framer Motion, Tailwind v4, 300-frame canvas scroll sequence, 8 variants, live at `https://jbl-flip6.vercel.app/` | Static-only unique project |

Required per-project fields in `llms-full.txt`:

- Title
- Category or client type
- Stack or implementation notes
- One-line outcome or differentiator
- Provenance label when needed

Do not merge project entries with case-study entries, even when the client name overlaps.

### 8.3 Case Study Catalog

The full file should cover 11 unique case studies total:

- 3 public static case studies from `src/lib/constants.ts`
- 8 published DB case studies

Case studies should always include a measurement scope or outcome window when one is known.

| Case study | Key outcome | Source rule |
|---|---|---|
| Automating a 6-Figure Agency | 300% revenue growth in 8 months, overhead down 60%, onboarding reduced from 3 days to 2 hours, 25+ hours/week saved | Public static case study |
| Global Community Growth | 50k+ members in 12 months, 85% retention, 40% engagement from community content, 100% organic | Public static case study |
| Automated Marketing Audit Pipeline | Actual CPA 398 EGP vs 4.85 Meta-reported, fixed objective misconfiguration, 30+ hours/month eliminated, break-even ROAS matrices | Public static case study |
| Architecting a High-Performance AI Chatbot with RAG System (`greenschat-ai-rag`) | 64% lower hallucinations, sub-80ms retrieval latency, Lighthouse 100 | DB-published |
| Architecting a High-Performance Browser Game Engine (`ninja-genz`) | Sub-10ms block dragging, collaboration, eliminated rerender thrashing | DB-published; title/description mismatch must be noted |
| Building a High-Performance Digital Marketing SaaS (`radwa-marketing-saas`) | Sub-second protected API, zero breaches due to RLS, localized payments/webhooks | DB-published |
| Developing an Immersive 3D Educational Platform (`nextacademy-3d-experience`) | 50k+ polygon scenes at 60fps mobile, initial chunk down 40%, session duration up 300% | DB-published |
| Engineering a High-Performance Data Visualization Dashboard (`qudraat-shabab`) | TTI under 1.2s, 60fps transitions, parsing up 300% | DB-published |
| Qudraat Youth Community Launch (`qudraat-youth-launch`) | Thousands of concurrent connections, lower payload latency, zero-friction auth | DB-published |
| Scaling a D2C Leather Brand via Omni-channel Optimization (`scarpe-handmade-marketing`) | CPP 176 to 87 EGP, AOV 622 to 967 EGP, basket 1.3 to 2.6 over 45 days | DB-published |
| Smart Workshop Scheduling System (`smart-workshop-scheduling`) | Automated a manual process, double-booking errors reduced to 0%, admin override UI | DB-published |

Required per-case-study fields in `llms-full.txt`:

- Title
- Source label
- Problem or starting point
- What was built or changed
- Measurement window when known
- Outcome metrics with units
- A note when the claim is client-reported or site-stated rather than independently audited

Important handling rules:

- Do not collapse `Scarpe Handmade` project metrics and `Scarpe Handmade` case-study metrics into one claim.
- Do not silently rename `Ninja GenZ` to resolve its internal DB mismatch.
- Keep `Qudraat Shabab` project and `Qudraat` case studies separate.

### 8.4 Lectures, Workshops, and Public Offers

Include a short supplemental section for the public educational and consultation offers:

| Item | Note |
|---|---|
| Automate Your Life | 3h lecture |
| Build Your Brand Using ChatGPT | 2.5h lecture |
| The Power of Prompts: From Prompt to Profit | 2h lecture |
| Promptology Unlocked | 2.5h lecture |
| Introduction to Notion | 2.5h lecture |
| Portfolio That Converts | 2h lecture |
| Methodology | 3-layer architecture: Intelligence, Execution, Growth |
| Prompt to Product | Live online camp, 5 weeks, 10 sessions, 3 clinics |
| Book / consultation | Discovery Call, Strategy Session |

The full file should also include the 3 current blog titles as a small supplemental list, but the project and case-study corpus must remain the main content.

### 8.5 Blog and Guide Index

Include the public blog titles as a brief supplemental index:

- The Future of Marketing Automation
- Mastering Notion for Teams
- Why Most Startups Fail at Scaling

`guides` currently has no published rows in the database snapshot, so do not invent guide titles.

## 9. Content Rules

| Rule | Requirement |
|---|---|
| No private data | Do not include submissions, contact records, bookings, resumes, or internal tables |
| No invented URLs | Only include public URLs that exist |
| No silent merges | Keep conflicting public and DB claims separate when they differ materially |
| Provenance labels | Use `public-site`, `db-published`, or `site-stated` where relevant |
| Directness | Start entries with the entity name and the main point |
| Freshness | Include a `Last reviewed: 2026-07-26` line in `llms-full.txt` |
| Synchronization | Update all three files together to avoid drift |

## 10. Acceptance Criteria

The implementation is complete when all of the following are true:

1. `public/llms.txt` contains a short English discovery map and explicitly instructs the reader to open `/llms-full.txt` for detailed projects and case studies.
2. `public/llms-ar.txt` contains the same instruction in Arabic and mirrors the English file's structure.
3. `public/llms-full.txt` contains the detailed corpus, including 19 unique projects, 11 unique case studies, the 7 services, lectures, and public offers.
4. The full file labels public-site, DB-published, and site-stated facts clearly enough that they cannot be confused.
5. No private operational records are copied into any `llms` file.
6. The `Ninja GenZ` mismatch is called out instead of being silently rewritten.
7. The `Scarpe Handmade` metrics are scoped so the project and case-study claims do not conflict.
8. `src/app/robots.ts` remains valid and continues to allow the three `llms` files to AI bots.
9. The final text does not read like a raw dump; each entry stays compact and retrieval-friendly.

## 11. Validation Plan

1. Diff-check all three `llms` files for completeness and duplication.
2. Confirm the concise files are short and directive-driven.
3. Confirm the full file contains every project and case study once, with source labels.
4. Confirm no private data from Supabase is present.
5. Confirm public URLs are only used where they already exist.
6. Confirm the freshness line is present.
7. Confirm `robots.ts` does not need a change for this pass.

## 12. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Drift between static constants and DB data | Use public-site names as canonical and add provenance notes for differing DB records |
| Overly long `llms-full.txt` | Keep each entry compact and avoid prose-heavy summaries |
| Site-stated metrics treated as audited facts | Label those claims explicitly and keep them separate from verified content |
| Conflicting project and case-study metrics for the same client | Keep the project and case-study sections separate |
| Future content changes | Refresh the three files together from the same reviewed source set |

## 13. Out of Scope

- Building a generator or sync pipeline for the `llms` files
- Changing `robots.ts` or `sitemap.ts` unless a later route change requires it
- Adding new public routes for DB-only records
- Copying book text into the repo
- Including private or unpublished operational data
