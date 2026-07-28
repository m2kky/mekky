# AI Product Engineer landing page update

## Goal

Reposition the existing `/prompt-to-product` landing page as `AI Product Engineer`: a practical program for people who may not write code but need to understand, design, direct, and verify AI-built digital products.

The page's job is to make a prospective beginner feel recognised, understand the outcome, and join the waitlist.

## Audience and voice

Primary audience: ambitious beginners, founders, freelancers, creators, and operators with little or no programming experience.

The copy speaks directly and informally in Egyptian Arabic. It names the visitor's real friction: they have ideas, have tried AI tools, get partial demos, but cannot tell what is missing, broken, unsafe, or worth building. It avoids academic promises and tool-first language.

Core promise: "مش لازم تكتب الكود بنفسك. لازم تفهم المنتج والنظام كويس كفاية عشان تقود الـAI وتراجع النتيجة."

## Visual direction

Keep the existing black, paper, and orange campaign palette and strong editorial typography. Evolve its signature from a generic launch campaign into an engineering field manual:

- Blueprint-like grid and system-diagram language in the hero.
- Explicit learning sequence, because the curriculum is intentionally prerequisite-driven.
- Quiet, structured supporting sections; the boldness belongs to the hero and the learning-path diagram.
- Responsive, keyboard-accessible controls and reduced-motion support remain intact.

## Content architecture

1. Hero: `AI Product Engineer`, direct problem recognition, and waitlist CTA.
2. The real gap: distinguish a surface-level AI demo from a product someone can trust and sell.
3. Outcomes: understand systems, direct AI/human teams, and ship three products.
4. The learning path: AI, web, data, product, UX/UI, stack, system design, AI team, build, quality, deployment, monetization.
5. Documentation system: BRS, FRS, NFRS, user flows, UI handoff, stack decisions, and system design; explain that learners choose the right documentation pack rather than fill forms mechanically.
6. Three build projects: AI content tool, basic SaaS, and automation tool.
7. Tools in context: Stitch/Figma for design; GitHub, Supabase, Vercel, and automation/API tooling for delivery.
8. Who it is for: people with an idea and limited coding experience, not only developers.
9. Founding cohort offer and waitlist.

## Copy rules

- Lead with the learner's situation before naming the program's features.
- Use simple, active Egyptian Arabic and short concrete examples.
- Explain English technical terms in context; do not use them as empty status markers.
- Do not promise that AI replaces judgment or guarantees income.
- Every CTA describes the immediate action: joining the foundational cohort waitlist.

## Implementation scope

- Update `CourseLanding.tsx` and `promptToProductData.ts` with the new name, copy, curriculum model, projects, and audience framing.
- Extend `PromptToProduct.module.css` only where the blueprint/course-path layout requires it.
- Preserve the existing waitlist workflow, client-side behavior, validation, and API contract.
- Update metadata if the route owns course-specific metadata.

## Verification

- Run lint and relevant waitlist tests.
- Run a production build.
- Review desktop and mobile rendering of the landing page.
