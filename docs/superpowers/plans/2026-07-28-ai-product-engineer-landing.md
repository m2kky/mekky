# AI Product Engineer Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition `/prompt-to-product` as the AI Product Engineer foundational course while preserving the waitlist workflow.

**Architecture:** Keep the route, component boundaries, and waitlist state unchanged. Update metadata, data arrays, page copy, and the existing CSS module; add only the course-path and documentation layouts required by the approved design.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Framer Motion, Node test runner.

## Global Constraints

- Keep the route URL and waitlist API contract unchanged.
- Use direct Egyptian Arabic that recognises the learner's problem before course features.
- Keep the black, paper, and orange visual system; add no dependencies.
- Keep keyboard focus and reduced-motion behavior.
- Do not claim that AI replaces judgement or guarantees income.

---

### Task 1: Replace course identity and data

**Files:**
- Modify: `src/app/prompt-to-product/page.tsx`
- Modify: `src/app/prompt-to-product/promptToProductData.ts`
- Modify: `tests/prompt-to-product-campaign.test.mjs`

**Interfaces:**
- Consumes: `courseStats`, `courseSessions`, and `projectProof` in `CourseLanding.tsx`.
- Produces: updated route metadata and the same data exports with AI Product Engineer content.

- [ ] **Step 1: Update metadata**

Set the title to `AI Product Engineer — ابنِ وقُد منتجات بالـAI | Muhammed Mekky` and describe a practical program covering web, data, UX, system design, and directing AI-built products. Retain `canonical: '/prompt-to-product'` and `/images/og-preview.png`.

- [ ] **Step 2: Replace learning path and project data**

Set `courseSessions` to: AI limits; web, rendering, data, APIs and security; customer problem and journey; BRS/FRS/NFRS/user flows; UX/UI with Stitch and Figma; stack and system design; project context/Git/AI team management; testing/security/production review; deployment, operations, pricing and first customers.

Set the three `projectProof` records to `AI Tool`, `Basic SaaS`, and `Automation Tool`, preserving the three existing local image paths.

- [ ] **Step 3: Update campaign test copy checks**

Replace the old title assertion with `/AI Product Engineer/`. Replace the old `/Media Buyers/` assertion with `/مبتدئين/`. Keep the structural, motion, route, and accessibility assertions.

- [ ] **Step 4: Run the focused test**

Run `node --test tests/prompt-to-product-campaign.test.mjs`; all campaign tests must pass.

- [ ] **Step 5: Commit**

Stage the three changed files and commit with `feat: reposition course as AI Product Engineer`.

### Task 2: Rewrite the page for the learner's real problem

**Files:**
- Modify: `src/app/prompt-to-product/CourseLanding.tsx`

**Interfaces:**
- Consumes: Task 1 data exports and the existing `onJoinWaitlist: () => void` callback.
- Produces: labelled content sections with unchanged waitlist CTA behavior.

- [ ] **Step 1: Replace the hero**

Render `AI Product Engineer` in the existing hero type treatment. Lead with: `عندك فكرة، وبتعرف تطلب من الـAI. بس مش عارف تعرف هو بيبني صح ولا لأ.` Follow it with: `هنا هتفهم المنتج والنظام الأول، وبعدها تقود الـAI أو فريق مبرمجين عشان تطلع بحاجة تشتغل، تتراجع، وتتبع.`

- [ ] **Step 2: Replace generic audience and deliverables**

Describe four outcomes: understand systems, turn problems into documentation, design customer journeys and UI, and direct AI/human delivery. Replace three deliverables with an AI content tool, basic SaaS, and lead-to-action automation.

- [ ] **Step 3: Add course path and documentation sections**

Add labelled `pathSection` and `docsSection` sections before the offer. The path makes prerequisites explicit from AI fundamentals through deployment and monetization. The documentation section names BRS, FRS, NFRS, user flows, UI handoff, stack decisions, and system design, and says learners choose the right document pack instead of filling templates mechanically.

- [ ] **Step 4: Keep the waitlist unchanged**

Do not edit `PromptToProductClient.tsx`, `WaitlistWizard.tsx`, `waitlistWizardState.ts`, or API route files. Every CTA continues calling `onJoinWaitlist`.

- [ ] **Step 5: Run the waitlist suite**

Run `npm run test:waitlist`; every test must pass without a waitlist contract change.

- [ ] **Step 6: Commit**

Stage `CourseLanding.tsx` and commit with `feat: speak directly to AI Product Engineer learners`.

### Task 3: Add minimum visual support and verify

**Files:**
- Modify: `src/app/prompt-to-product/PromptToProduct.module.css`

**Interfaces:**
- Consumes: `pathSection` and `docsSection` class names from Task 2.
- Produces: responsive course-path and document-pack layouts without changing waitlist styles.

- [ ] **Step 1: Add scoped course layouts**

Use existing `--ink`, `--paper`, `--orange`, `--orange-on-paper`, and `--container-padding` tokens. Build the path with a CSS grid and thin dividers. Build document packs as a responsive grid. Add no JavaScript or animation.

- [ ] **Step 2: Add mobile support**

In the existing `@media (max-width: 800px)` block, collapse the new grids to one column. Preserve the focus and `prefers-reduced-motion` rules.

- [ ] **Step 3: Run validation**

Run `npm run lint`, `npm run test:waitlist`, and `npm run build`; each command must exit with code 0.

- [ ] **Step 4: Review the route**

Run the development server and inspect `/prompt-to-product` at desktop and mobile widths. Verify all CTAs reach the waitlist and hero, path, documentation, offer, and form remain readable.

- [ ] **Step 5: Commit**

Stage the CSS module and commit with `style: add AI Product Engineer course path`.

## Self-review

- Spec coverage: tasks cover identity, direct copy, learning sequence, documentation, projects, metadata, waitlist preservation, accessibility, and verification.
- Placeholder scan: no deferred implementation steps remain.
- Type consistency: data exports keep their current names and shapes, so `CourseLanding.tsx` remains the only consumer update.
