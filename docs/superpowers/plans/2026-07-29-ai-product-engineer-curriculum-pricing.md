# AI Product Engineer Curriculum and Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `/prompt-to-product` sales narrative around a ten-week, eight-unit, 20-session program and validate the 10,500 EGP Founding Cohort pricing strategy.

**Architecture:** Keep the existing route, waitlist flow, data module, and visual system. Expand the typed campaign data first, render it through focused reusable sections in `CourseLanding.tsx`, then add responsive styling and accessibility behavior in the existing CSS module.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Framer Motion, Node test runner.

## Global Constraints

- Preserve the existing `/prompt-to-product` route and waitlist submission contract.
- Use conversational Egyptian Arabic and retain English technical labels where they improve recognition.
- Present 10 weeks, 8 engineering units, 20 live sessions, and 3 real products.
- Keep the current parallax curriculum behavior and the reduced-motion fallback.
- Keep existing teaching proof, lecture embeds, and four previous product examples.
- Test the 10,500 EGP price and 3 x 3,500 EGP payment option.
- Do not advertise the future premium tier.
- Keep the page responsive and keyboard accessible.

---

### Task 1: Lock the new campaign contract with failing tests

**Files:**
- Modify: `tests/prompt-to-product-campaign.test.mjs`
- Modify: `tests/prompt-to-product-domain.test.mjs`

**Interfaces:**
- Consumes: `courseSessions`, new `detailedSessions`, and `waitlistQuestions` exports from `promptToProductData.ts`.
- Produces: assertions for exactly eight curriculum units, 20 detailed sessions, accessible accordion markup, tangible outputs, weekly rhythm, documentation library, and pricing options.

- [ ] **Step 1: Replace the old ten-stage assertion and add the new content assertions**

Assert that the data source contains eight `stage` entries and 20 detailed session entries. Assert that the landing renders the comparison, unit outputs, accordion, weekly rhythm, 60-template positioning, Demo Day, and final pricing anchor.

- [ ] **Step 2: Add pricing contract assertions**

Assert that `waitlistQuestions` exposes `pay-full`, `pay-three`, `longer-plan`, `over-budget`, and `value-supported`, including the `10,500` and `3,500` labels.

- [ ] **Step 3: Run the tests and verify failure**

Run: `npm run test:waitlist`

Expected: FAIL because the current campaign still has ten stages, no detailed-session export, and old low-anchored budget options.

### Task 2: Replace curriculum and pricing data

**Files:**
- Modify: `src/app/prompt-to-product/promptToProductData.ts`
- Test: `tests/prompt-to-product-domain.test.mjs`
- Test: `tests/prompt-to-product-campaign.test.mjs`

**Interfaces:**
- Produces: `courseSessions` with eight unit objects containing `sessions`, `topics`, `output`, and optional `milestone`.
- Produces: `detailedSessions` with 20 objects containing `number`, `unit`, `title`, `understand`, `apply`, and `output`.
- Produces: updated `budget` waitlist options matching the pricing research contract.

- [ ] **Step 1: Update the budget prompt and options**

Use the approved acceptance/pricing wording and five pricing-response values.

- [ ] **Step 2: Replace ten stages with eight unit records**

Include exact session counts, four topic labels, tangible output text, and project milestones.

- [ ] **Step 3: Add all 20 detailed session records**

Keep the content concise enough for accordion panels while preserving the understand/apply/output structure.

- [ ] **Step 4: Run domain and campaign tests**

Run: `npm run test:waitlist`

Expected: pricing and data-count assertions pass; rendering assertions still fail until Task 3.

### Task 3: Render the revised sales narrative

**Files:**
- Modify: `src/app/prompt-to-product/CourseLanding.tsx`
- Test: `tests/prompt-to-product-campaign.test.mjs`

**Interfaces:**
- Consumes: `courseSessions`, `detailedSessions`, `courseStats`, and `projectProof`.
- Produces: program facts, comparison, eight parallax cards, output grid, accessible session accordion, documentation categories, weekly rhythm, previous-product proof, Demo Day framing, and final offer.

- [ ] **Step 1: Add static campaign datasets**

Define program facts, comparison rows, unit outputs, documentation categories, and weekly rhythm outside the component.

- [ ] **Step 2: Expand `CurriculumCard`**

Render unit session count, four topics, output, and optional milestone without changing its scroll-direction behavior.

- [ ] **Step 3: Add the accessible session accordion**

Use a small `SessionAccordion` component with native buttons, `aria-expanded`, `aria-controls`, and one open session at a time.

- [ ] **Step 4: Reorder and rewrite page sections**

Follow the approved 13-section order. Keep social proof and free lectures, separate learner projects from previous-product proof, and add CTAs after the curriculum detail and at the final offer.

- [ ] **Step 5: Run the campaign test**

Run: `node --test tests/prompt-to-product-campaign.test.mjs`

Expected: PASS once the new sections and accessibility hooks are present.

### Task 4: Style the expanded curriculum and conversion sections

**Files:**
- Modify: `src/app/prompt-to-product/PromptToProduct.module.css`
- Test: `tests/prompt-to-product-campaign.test.mjs`

**Interfaces:**
- Consumes: class names emitted by `CourseLanding.tsx`.
- Produces: responsive program facts, comparison table, output grid, accordion, document library, weekly rhythm, and founding offer styling.

- [ ] **Step 1: Extend the shared section spacing and color rules**

Add every new section to the existing section wrapper rules and alternate paper/ink backgrounds intentionally.

- [ ] **Step 2: Style the new curriculum information**

Keep sticky cards readable with the new unit output and project milestone. Add content visibility where safe for long below-the-fold sections.

- [ ] **Step 3: Style and animate the accordion**

Use CSS grid and opacity transitions without measuring DOM height. Remove transitions under reduced motion.

- [ ] **Step 4: Add mobile layouts**

Collapse comparison rows and grids to one column, use non-sticky curriculum cards on small screens if needed, and keep touch targets at least 44px high.

- [ ] **Step 5: Run lint and campaign tests**

Run: `npm run lint -- --file src/app/prompt-to-product/CourseLanding.tsx`

Expected: no lint errors.

Run: `npm run test:waitlist`

Expected: all waitlist and campaign tests pass.

### Task 5: Verify production behavior

**Files:**
- Verify: `src/app/prompt-to-product/CourseLanding.tsx`
- Verify: `src/app/prompt-to-product/PromptToProduct.module.css`
- Verify: `src/app/prompt-to-product/promptToProductData.ts`

**Interfaces:**
- Produces: a buildable, accessible, responsive campaign ready to push.

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: Next.js build succeeds without type or route errors.

- [ ] **Step 2: Run browser QA**

Open `/prompt-to-product` at desktop and mobile widths. Verify section order, parallax, accordion keyboard operation, embedded videos, CTAs, waitlist pricing question, and reduced-motion behavior.

- [ ] **Step 3: Review the diff**

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 4: Commit the implementation**

Commit message: `feat: expand AI Product Engineer curriculum`
