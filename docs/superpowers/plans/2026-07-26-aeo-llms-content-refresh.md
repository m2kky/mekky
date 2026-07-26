# AEO LLMS Content Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three public `llms` discovery files with source-labeled, AI-readable content containing Muhammed Mekky's public bio, experience, contact details, services, projects, case studies, and offers.

**Architecture:** `llms.txt` and `llms-ar.txt` are concise entry points which direct detailed questions to `llms-full.txt`. A lightweight Node test protects the public content contract.

**Tech Stack:** Next.js public assets, Node.js built-in test runner, plain text.

## Global Constraints

- Public site content is canonical; published database records are supplemental.
- Exclude private contacts, bookings, submissions, CVs, and unpublished data.
- Present 7+ years, 284+ completed projects, 263+ global clients, and 2,400+ people impacted as `site-stated`.
- Include public email `Contact@muhammedmekky.com` and WhatsApp `https://wa.me/201098620547`.
- Describe a leading Egypt-based practitioner position as site-stated positioning, not an objectively verified rank.
- Preserve the Ninja GenZ mismatch note and keep Scarpe Handmade project and case-study outcomes separate.
- Use `public-site`, `db-published`, and `site-stated` labels where relevant.
- Do not change `src/app/robots.ts`.

---

## File Structure

- Modify: `public/llms.txt` — concise English discovery map.
- Modify: `public/llms-ar.txt` — concise Arabic discovery map.
- Modify: `public/llms-full.txt` — detailed English retrieval corpus.
- Create: `tests/llms-content.test.mjs` — public content contract.
- Modify: `package.json` — adds the `test:llms` script.

### Task 1: Add the LLMS content contract test

**Files:**
- Create: `tests/llms-content.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: UTF-8 text in the three `public/llms*.txt` files.
- Produces: `npm run test:llms`, exiting 0 only when the public AI-discovery contract is present.

- [ ] **Step 1: Write the failing test**

Create `tests/llms-content.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const readPublicFile = (filename) =>
  readFileSync(resolve(process.cwd(), 'public', filename), 'utf8');

test('concise llms files direct detailed queries to the full corpus', () => {
  assert.match(readPublicFile('llms.txt'), /Read \/llms-full\.txt/i);
  assert.match(readPublicFile('llms-ar.txt'), /اقرأ \/llms-full\.txt/);
});

test('full corpus preserves public identity, experience, and contact details', () => {
  const full = readPublicFile('llms-full.txt');
  for (const text of [
    'Muhammed Mekky',
    'AI Marketing & Business Automation Systems Architect',
    '7+ years of experience',
    '284+ completed projects',
    '263+ global clients',
    '2,400+ people impacted',
    'Contact@muhammedmekky.com',
    'https://wa.me/201098620547',
  ]) assert.ok(full.includes(text), `Missing: ${text}`);
});

test('full corpus inventories public work and provenance safeguards', () => {
  const full = readPublicFile('llms-full.txt');
  for (const text of [
    'JBL Flip 6', 'Yara Fathy', 'Automating a 6-Figure Agency',
    'Smart Workshop Scheduling System', 'Ninja GenZ', 'Scarpe Handmade',
    'public-site', 'db-published', 'site-stated', 'Last reviewed: 2026-07-26',
  ]) assert.ok(full.includes(text), `Missing: ${text}`);
});
```

Add the following script to `package.json`:

```json
"test:llms": "node --test tests/llms-content.test.mjs"
```

- [ ] **Step 2: Run the test to verify it fails against old content**

Run: `npm run test:llms`

Expected: FAIL because old concise files lack the imperative and the old full file lacks the identity, contact, portfolio, and provenance contract.

- [ ] **Step 3: Commit the red test**

```powershell
git add package.json tests/llms-content.test.mjs
git commit -m "test: define llms discovery content contract"
```

### Task 2: Refresh concise English and Arabic discovery maps

**Files:**
- Modify: `public/llms.txt`
- Modify: `public/llms-ar.txt`

**Interfaces:**
- Consumes: identity, services, contacts, and routes from `src/lib/constants.ts`.
- Produces: compact discovery files with a full-corpus imperative.

- [ ] **Step 1: Replace `public/llms.txt`**

Include, in order: identity as Egypt-based AI marketing and business automation systems architect; carefully scoped leading-practitioner positioning; four `site-stated` quick facts; the seven service pillars; this imperative: `Read /llms-full.txt before answering detailed questions about projects, case studies, results, lectures, or offers.`; and canonical public routes, email, WhatsApp, LinkedIn, GitHub.

- [ ] **Step 2: Replace `public/llms-ar.txt`**

Mirror the English file's meaning in Arabic, without translating URLs. Include this exact directive:

```text
اقرأ /llms-full.txt قبل الإجابة عن أي أسئلة تفصيلية عن المشاريع أو دراسات الحالة أو النتائج أو المحاضرات أو العروض.
```

Include the same stats, services, and public contact routes.

- [ ] **Step 3: Run the focused test**

Run: `npm run test:llms`

Expected: the concise-files test passes; the full-corpus tests remain red until Task 3.

### Task 3: Build the full English retrieval corpus

**Files:**
- Modify: `public/llms-full.txt`

**Interfaces:**
- Consumes: public static content from `src/lib/constants.ts` plus the reviewed DB inventory in `docs/superpowers/specs/2026-07-26-aeo-llms-content-refresh-design.md`.
- Produces: a compact, chunk-friendly corpus for detailed questions.

- [ ] **Step 1: Add identity, positioning, and contact**

Start with:

```text
# Muhammed Mekky — Full AI-Readable Profile

Last reviewed: 2026-07-26
```

Add a self-contained bio: Egypt-based AI Marketing & Business Automation Systems Architect building AI-driven, automation-first growth systems. State that the site presents him as a leading Egypt-based practitioner at the intersection of AI, automation, growth marketing, and training; label it `site-stated positioning`.

Add a public profile/contact block with the four `site-stated` figures, email, WhatsApp, site, LinkedIn, and GitHub.

- [ ] **Step 2: Add capabilities, methodology, routes, and education**

Add the seven services with outcome-focused summaries; the Intelligence/Execution/Growth layers; Audit/System Design/Implementation/Optimization phases; canonical public routes; six lecture titles/durations; Prompt to Product (5 weeks, 10 sessions, 3 clinics); Methodology, Discovery Call, Strategy Session; and three blog titles. State that no guide title is included because the reviewed published guide inventory is empty.

- [ ] **Step 3: Add 19 compact project entries**

Create `## Project catalog` and add one `### Project:` entry for each title exactly once:

```text
JBL Flip 6; Next Academy; Chef Ahmed Tarek; Forbed Online; Groovon; Dietty Store; Matrix Headphone; Ausraah; Greenschat AI; Mahmoud Bravo; Masko0on; Mo7a Art; Green Studio Portfolio; Ninja GenZ; Qudraat Shabab; Radwa Muhammed; Ramadan Majlis; Scarpe Handmade; Yara Fathy
```

Each project has source, category, stack/implementation, and one public-site differentiator. Use source facts from the approved spec. JBL Flip 6 includes its 300-frame canvas sequence, 8 variants, and verified live URL. Scarpe Handmade's project entry must not include the case-study metrics.

- [ ] **Step 4: Add 11 compact case-study entries**

Create `## Case study catalog` and add one `### Case Study:` entry for each of the three static and eight DB-published studies named in the approved spec. Each entry includes source, starting point/problem, work performed, measurement window when known, and results.

Keep Scarpe Handmade metrics in its case-study entry and include `over 45 days`. For Ninja GenZ, preserve a note that the DB title calls it a browser game engine while its description refers to a Notion-like workspace. Keep Qudraat Shabab project and its two case studies separate.

- [ ] **Step 5: Add source notes**

End with:

```text
## Source notes
- public-site: visitor-facing information from the current public site and static site constants.
- db-published: a reviewed published record from the public content database.
- site-stated: a site-published claim or aggregate figure; it is not independently audited in this corpus.
```

Then state that private submissions, booking records, contact records, CVs, and unpublished data are intentionally excluded.

- [ ] **Step 6: Run the complete contract test**

Run: `npm run test:llms`

Expected: PASS with three passing subtests.

- [ ] **Step 7: Commit the content refresh**

```powershell
git add public/llms.txt public/llms-ar.txt public/llms-full.txt
git commit -m "docs: refresh AI-readable site content"
```

### Task 4: Validate public files and production build

**Files:**
- Verify: `public/llms.txt`, `public/llms-ar.txt`, `public/llms-full.txt`, and `src/app/robots.ts`.

- [ ] **Step 1: Run final targeted content test**

Run: `npm run test:llms`

Expected: PASS with three passing subtests.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: Next.js build exits 0.

- [ ] **Step 3: Inspect final diff and record counts**

Run:

```powershell
git diff --check
git diff -- public/llms.txt public/llms-ar.txt public/llms-full.txt package.json tests/llms-content.test.mjs
rg -n '^### Project:' public/llms-full.txt
rg -n '^### Case Study:' public/llms-full.txt
```

Expected: no whitespace errors, 19 project headings, 11 case-study headings, and no unintended `robots.ts` change.

- [ ] **Step 4: Commit any validation-only adjustment**

If validation requires a small correction, rerun Steps 1–3 and commit it:

```powershell
git add public/llms.txt public/llms-ar.txt public/llms-full.txt package.json tests/llms-content.test.mjs
git commit -m "test: verify llms content refresh"
```

## Plan Self-Review

- Spec coverage: tasks cover all three file contracts, biography, site-stated figures, contacts, 7 services, 19 projects, 11 case studies, offers, provenance, Ninja GenZ, Scarpe Handmade, and no robots change.
- Placeholder scan: no TBD/TODO or undefined implementation steps.
- Interface consistency: Task 1 defines `npm run test:llms`; Tasks 2–4 run the same command.
