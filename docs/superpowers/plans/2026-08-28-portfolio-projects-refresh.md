# Portfolio Projects Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Rammah and Coach Hossam to the portfolio and refresh Mahmoud Bravo to V2 using the existing portfolio system.

**Architecture:** Keep `PROJECTS.items` as the only project data source and reuse the current portfolio list/detail components. Add one small source-contract test, correct the detail component's camelCase field access, and capture the three existing responsive image variants for each project.

**Tech Stack:** Next.js 16, React 19, Node test runner, Puppeteer/Chrome, WebP assets.

## Global Constraints

- Do not add dependencies or introduce a new CMS/data layer.
- Preserve unrelated working-tree changes and untracked files.
- Put Rammah and Coach Hossam first; preserve Mahmoud Bravo's existing slug.
- Do not invent business metrics.
- Use `https://rammah.vercel.app` only if reachable; omit Coach Hossam's live URL while deployments fail.

---

### Task 1: Lock the portfolio contract

**Files:**
- Create: `tests/portfolio-projects.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `PROJECTS.items` in `src/lib/constants.ts` and `ProjectClient` in `src/app/portfolio/[slug]/ProjectClient.tsx`.
- Produces: `npm run test:portfolio`, a source-level regression check for ordering, fields, and required assets.

- [ ] **Step 1: Write the failing test**

Create a Node test that reads the source files and asserts:

```js
assert.ok(constants.indexOf("slug: 'ahmed-rammah'") < constants.indexOf("slug: 'coach-hossam-ibrahim'"));
assert.ok(constants.indexOf("slug: 'coach-hossam-ibrahim'") < constants.indexOf("slug: 'jbl-flip-6'"));
assert.match(client, /project\.longDescription/);
assert.match(client, /project\.liveUrl/);
for (const slug of ['ahmed-rammah', 'coach-hossam-ibrahim', 'mahmoud-bravo']) {
  for (const suffix of ['', '-desktop', '-mobile']) {
    assert.ok(existsSync(join(root, `public/images/projects/${slug}${suffix}.webp`)));
  }
}
```

Add `"test:portfolio": "node --test tests/portfolio-projects.test.mjs"` to `package.json`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test:portfolio`

Expected: FAIL because the two new project records and image sets do not exist and `ProjectClient` still reads snake_case fields.

### Task 2: Add project data and repair detail fields

**Files:**
- Modify: `src/lib/constants.ts`
- Modify: `src/app/portfolio/[slug]/ProjectClient.tsx`

**Interfaces:**
- Consumes: Existing `PROJECTS.items` object shape.
- Produces: `ahmed-rammah` and `coach-hossam-ibrahim` records plus an updated `mahmoud-bravo` record; detail pages consume `longDescription` and optional `liveUrl`.

- [ ] **Step 1: Add the two newest items before JBL**

Use evidence-based copy and these stacks:

```ts
// Ahmed Rammah
tools: ['Next.js 16', 'Express', 'PostgreSQL', 'Drizzle ORM']
liveUrl: 'https://rammah.vercel.app'

// Coach Hossam Ibrahim
tools: ['Next.js', 'Fastify', 'PostgreSQL', 'Kashier']
// No liveUrl until a deployment succeeds.
```

Describe delivered capabilities rather than unsupported conversion numbers: bilingual public experience, CMS/admin operations, booking/payment workflows, calendar/email integrations, and responsive editorial UI.

- [ ] **Step 2: Refresh Mahmoud Bravo in place**

Keep `slug: 'mahmoud-bravo'` and `liveUrl: 'https://www.mahmoudbravo.com/'`. Update the category/copy/stack/results to reflect the V2 Next.js 16 + GSAP cinematic corporate-training experience.

- [ ] **Step 3: Fix the detail component contract**

Rename the interface and reads:

```ts
longDescription: string;
liveUrl?: string;
```

Use `project.longDescription` and `project.liveUrl` in the hero, mockup, and body.

### Task 3: Capture responsive project images

**Files:**
- Create: `public/images/projects/ahmed-rammah.webp`
- Create: `public/images/projects/ahmed-rammah-desktop.webp`
- Create: `public/images/projects/ahmed-rammah-mobile.webp`
- Create: `public/images/projects/coach-hossam-ibrahim.webp`
- Create: `public/images/projects/coach-hossam-ibrahim-desktop.webp`
- Create: `public/images/projects/coach-hossam-ibrahim-mobile.webp`
- Modify: `public/images/projects/mahmoud-bravo.webp`
- Modify: `public/images/projects/mahmoud-bravo-desktop.webp`
- Modify: `public/images/projects/mahmoud-bravo-mobile.webp`

**Interfaces:**
- Consumes: Home pages from `D:\projects\rammah\rammah-next`, `D:\coash_hossam_ibrahim\apps\web`, and `D:\bravo\site`.
- Produces: Existing portfolio image naming contract for cover, desktop mockup, and mobile mockup.

- [ ] **Step 1: Start each local frontend on a free port**

Run the existing `npm run dev` command in each frontend directory with an explicit port. Do not edit the source repositories.

- [ ] **Step 2: Capture with installed Puppeteer and Chrome**

Use Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`. Capture the loaded home page at `1440x1000` and `390x844`, save WebP at quality 88, and reuse the desktop capture as the card cover. Wait for fonts/images and any intro animation to settle before capture.

- [ ] **Step 3: Stop only the servers started for capture**

Track their process IDs and terminate those exact processes after screenshots are written.

### Task 4: Verify and commit

**Files:**
- Test: `tests/portfolio-projects.test.mjs`
- Test: `src/lib/constants.ts`
- Test: `src/app/portfolio/[slug]/ProjectClient.tsx`
- Test: `public/images/projects/*.webp`

**Interfaces:**
- Consumes: Tasks 1-3.
- Produces: Verified portfolio refresh ready for deployment.

- [ ] **Step 1: Run focused checks**

Run:

```bash
npm run test:portfolio
npx eslint src/lib/constants.ts "src/app/portfolio/[slug]/ProjectClient.tsx" tests/portfolio-projects.test.mjs
npx tsc --noEmit
```

Expected: all commands exit 0.

- [ ] **Step 2: Run browser smoke checks**

Start the Mekky app and verify `/portfolio`, `/portfolio/ahmed-rammah`, `/portfolio/coach-hossam-ibrahim`, and `/portfolio/mahmoud-bravo`. Confirm cards, responsive images, descriptions, stacks, results, Rammah/Bravo preview links, and Coach's missing preview link.

- [ ] **Step 3: Commit only intentional files**

```bash
git add package.json tests/portfolio-projects.test.mjs src/lib/constants.ts "src/app/portfolio/[slug]/ProjectClient.tsx" public/images/projects/ahmed-rammah.webp public/images/projects/ahmed-rammah-desktop.webp public/images/projects/ahmed-rammah-mobile.webp public/images/projects/coach-hossam-ibrahim.webp public/images/projects/coach-hossam-ibrahim-desktop.webp public/images/projects/coach-hossam-ibrahim-mobile.webp public/images/projects/mahmoud-bravo.webp public/images/projects/mahmoud-bravo-desktop.webp public/images/projects/mahmoud-bravo-mobile.webp
git commit -m "feat: refresh featured portfolio projects"
```
