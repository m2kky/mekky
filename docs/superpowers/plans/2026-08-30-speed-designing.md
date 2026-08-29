# Speed Designing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production-ready `/speeddesigning` series homepage and an empty, typed public project archive.

**Architecture:** Render the page as a Server Component from one typed registry. Hydrate only a small session-aware intro component; use route-scoped CSS and the existing global route guards for everything else.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Node test runner, existing `next/image` and fonts.

## Global Constraints

- Preserve unrelated `public/linked_cv.pdf` and `tmp/` changes.
- Add no dependency, CMS, database, fake episode, fake metric, detail page, or private source file.
- Do not commit or push.
- Keep motion transform/opacity-only and respect `prefers-reduced-motion`.
- Only published projects are links; drafts never render; coming-soon requires explicit enablement.

---

### Task 1: Public Registry and Route Contract

**Files:**
- Create: `tests/speed-designing.test.mjs`
- Create: `src/data/speedDesigningProjects.ts`

**Interfaces:**
- Produces: `SpeedDesigningProject`, `speedDesigningProjects`, `getPublicSpeedDesigningProjects()`.

- [ ] **Step 1: Write the failing contract test**

Create a Node test that asserts the registry fields, draft exclusion, intentional coming-soon filtering, descending episode order, route metadata/copy, local logo paths, sitemap entry, and `/speeddesigning` global-widget guards.

- [ ] **Step 2: Verify RED**

Run: `node --test tests/speed-designing.test.mjs`
Expected: FAIL because the registry and route do not exist.

- [ ] **Step 3: Implement the registry**

Define the required union/status/language fields and export an initially empty `speedDesigningProjects` array. Implement one pure selector:

```ts
export function getPublicSpeedDesigningProjects() {
  return speedDesigningProjects
    .filter((project) => project.status === 'published' || (project.status === 'coming-soon' && project.showComingSoon))
    .toSorted((a, b) => b.episodeNumber - a.episodeNumber);
}
```

- [ ] **Step 4: Verify the registry portion turns GREEN**

Run: `node --test tests/speed-designing.test.mjs`
Expected: route assertions still fail; registry assertions pass.

---

### Task 2: Optimized Brand Assets and Intro

**Files:**
- Create: `public/speeddesigning/brand/compact.webp`
- Create: `public/speeddesigning/brand/signature.webp`
- Create: `public/speeddesigning/brand/monogram.webp`
- Create: `src/components/speeddesigning/SeriesIntro.tsx`

**Interfaces:**
- Produces: `SeriesIntro` with session key `speed-designing-intro-seen-v1`.

- [ ] **Step 1: Optimize the three supplied PNGs**

Use the already installed image tooling to create transparent WebP versions under the public route directory. Keep the originals on `G:` untouched.

- [ ] **Step 2: Implement the minimal intro island**

Read reduced-motion and session storage once on mount. Render a short branded overlay only when unseen, expose a `Skip intro` button, set the session key on skip/completion, and make storage failures non-blocking.

- [ ] **Step 3: Verify asset and intro contract**

Run: `node --test tests/speed-designing.test.mjs`
Expected: asset/intro assertions pass.

---

### Task 3: Dark Contact Sheet Page

**Files:**
- Create: `src/app/speeddesigning/page.tsx`
- Create: `src/app/speeddesigning/SpeedDesigning.module.css`
- Modify: `src/components/FloatingCTA.tsx`
- Modify: `src/components/CurrentProjectsWidget.tsx`
- Modify: `src/components/PopupRenderer.tsx`

**Interfaces:**
- Consumes: `getPublicSpeedDesigningProjects()` and `SeriesIntro`.

- [ ] **Step 1: Build the semantic server page**

Add route metadata, JSON-LD for the series creative work, standalone utility navigation, hero, manifesto, archive/empty state, episode process, Blueprint, author, and CTA. Use verified `SITE.email` and main-site URL only.

- [ ] **Step 2: Implement the approved visual system**

Build the Dark Contact Sheet layout from route-scoped tokens. Use the vertical metadata rail, oversized Syne title, mono labels, off-white editorial interludes, visible focus states, language-aware name direction, and responsive no-overflow rules.

- [ ] **Step 3: Hide global interruptions on the route**

Add `pathname?.startsWith('/speeddesigning')` to the existing focused/hidden route predicates in Floating CTA, current projects widget, and popup renderer.

- [ ] **Step 4: Verify GREEN**

Run: `node --test tests/speed-designing.test.mjs`
Expected: all Speed Designing tests pass.

---

### Task 4: Sitemap and Production Verification

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add the sitemap entry**

Add `${SITE.url}/speeddesigning` with weekly change frequency and `0.9` priority.

- [ ] **Step 2: Run static verification**

Run:

```powershell
node --test tests/speed-designing.test.mjs
npx eslint src/app/speeddesigning/page.tsx src/components/speeddesigning/SeriesIntro.tsx src/data/speedDesigningProjects.ts tests/speed-designing.test.mjs
npx tsc --noEmit
npm run test:portfolio
npm run test:waitlist
npm run test:llms
npm run build
```

Expected: all tests, lint, typecheck, and production build pass.

- [ ] **Step 3: Browser QA**

Use Playwright CLI on desktop `1440×1000`, mobile `390×844`, and reduced-motion. Verify intro skip/session behavior, empty archive, no draft leakage, focus states, no overflow, zero broken assets, and zero console errors.

- [ ] **Step 4: Review changed files**

Run `git diff --check` and `git status --short`; confirm only the planned files plus the user's pre-existing untracked files are present. Do not commit or push.
