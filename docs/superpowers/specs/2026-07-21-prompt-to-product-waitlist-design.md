# Prompt to Product Waitlist — Design Specification

Date: 2026-07-21
Status: Approved design direction; awaiting written-spec review

## 1. Objective

Build a premium Arabic landing page for **Prompt to Product**, a live online camp that teaches participants to turn an idea into a production-ready digital product. The page must establish Muhammed Mekky's credibility, explain how the camp differs from tool tutorials, and collect qualified waitlist submissions through a seven-question assessment.

The primary conversion is:

> Register interest and join the founding-cohort waitlist.

No payment or booking occurs in this version.

## 2. Audience

The page serves several audience segments in one flow, with three primary readiness profiles:

- Non-developers who have tried tools such as Lovable or Replit and want to build beyond a first prototype.
- People with basic or intermediate technical experience who want a repeatable, production-minded building process.
- Media buyers and performance marketers who want to build campaign calculators, reporting dashboards, audit tools, landing-page experiments, and small internal utilities without waiting on a development team.

The assessment segments applicants by role, current experience, tool usage, intended project, blocker, weekly availability, and budget.

## 3. Positioning

Course name: **Prompt to Product**

Core promise:

> مش هتتعلم أداة. هتتعلم تحوّل الفكرة لمنتج حقيقي.

Supporting message:

> مش هعلّمك تستخدم Lovable أو Replit. هعلّمك تبني منتج حقيقي، وتعرف إمتى تستخدمهم وإمتى تخرج منهم.

The course competes on transferable judgment, product documentation, UI/UX quality, architecture, code ownership, debugging, and production readiness. It must not claim that Replit and Lovable only support Vite or do not support backend and database features. Those claims are no longer technically accurate.

## 4. Offer

- Format: Live online camp.
- Duration: Five weeks.
- Teaching sessions: 10 sessions, 2.5 hours each.
- Build clinics: Three optional clinics, one hour each.
- Total live access: Approximately 28 hours.
- Outputs: A portfolio, a conversion landing page, and a full-stack micro tool.
- Standard price: 6,500 EGP.
- Waitlist benefit: Founding-cohort priority and a private early-access price. The discounted value is not shown on the waitlist page.

## 5. Curriculum

1. BRS and business thinking.
2. PRD, FRS, NFRs, user journeys, and acceptance criteria.
3. AI build workflow, stack selection, architecture, project rules, and Git foundations.
4. UI/UX and design systems.
5. Portfolio project.
6. Conversion landing-page project.
7. Backend, database, authentication, and APIs.
8. Micro-tool build, part one.
9. Micro-tool build, part two, debugging, security, and deployment.
10. Production review, deployment, and demo day.

Documentation is a practical spine across the course, not a standalone theory topic:

- Portfolio: lightweight PRD, content inventory, SEO/performance NFRs.
- Landing page: business objective, PRD, form/tracking FRS, conversion NFRs.
- Micro tool: complete BRS, PRD, FRS, NFRs, acceptance criteria, and data model.

## 6. Verified Proof Points

Use these as conservative minimums; do not invent increases:

- 7+ years of experience.
- 284+ completed projects.
- 87 projects during 2026 alone.
- 263+ clients.
- Work across 15+ countries.
- 2,400+ people impacted.

Preferred summary copy:

> 284+ products shipped. 263+ clients. 15+ countries.

The page should connect the proof to the offer: the curriculum comes from repeated delivery experience, not a theoretical tool walkthrough.

## 7. Visual Direction

### Visual thesis

A cinematic editorial campaign page that inherits the portfolio's stark black and warm-cream palette, oversized typography, asymmetric grids, real project imagery, and restrained motion. It should feel authored by the same person as the main site while being more conversion-focused.

### Content plan

1. Full-bleed hero: course name, promise, live format, and primary CTA.
2. Problem: the difference between a convincing demo and a usable product.
3. Proof: verified numbers and selected portfolio work.
4. Audience use cases: concrete applications for founders, creatives, developers, and media buyers.
5. Outcomes: the three projects participants ship.
6. Method: documentation, design, backend, and production layers.
7. Curriculum: the ten-session progression.
8. Format: five weeks, live sessions, clinics, and demo day.
9. Price anchor and waitlist benefit.
10. Inline assessment wizard.
11. Confirmation state.

### Interaction thesis

- A restrained hero entrance sequence for the course name, promise, and CTA.
- Scroll-linked transitions that move the visitor from “prompt/demo” to “product/production,” using typography and project media instead of decorative cards.
- Project-media reveals and subtle hover depth that make the portfolio proof tangible.
- A focused wizard transition that replaces the campaign narrative with one question at a time once the assessment begins.

Motion must respect `prefers-reduced-motion` and remain smooth on mobile.

## 8. Page Structure

### 8.1 Campaign header

A minimal campaign header with Muhammed Mekky branding, the course name, and a single “Join the waitlist” action. Avoid the full navigation menu during the conversion flow.

### 8.2 Hero

- Brand: Prompt to Product.
- Label: Live Online Camp.
- Headline: the core promise in Arabic.
- Supporting sentence: move from an idea and prompt to a real product that is designed, documented, connected, tested, and deployed.
- Primary CTA: `سجّل اهتمامك`.
- Secondary cue: `دقيقتين فقط · أولوية للدفعة التأسيسية`.
- Dominant visual: real project imagery or a purposeful project-build composition sourced from the existing portfolio assets.

### 8.3 Demo versus product

Explain the production gap without attacking a specific tool. Contrast:

- Demo: first screen, happy path, generated placeholder content.
- Product: requirements, real UX, data, validation, security, testing, analytics, and deployment.

### 8.4 Proof

Display the verified numbers as large editorial type, not dashboard cards. Pair the numbers with selected existing portfolio images that demonstrate portfolio, landing/e-commerce, and tool/system work. Feature the Automated Marketing Audit case study as direct evidence for media buyers: a real system combining ad-platform and Shopify data to reveal acquisition cost and break-even ROAS.

### 8.5 Who this is for

Show audience use cases as concise editorial examples rather than generic persona cards:

- Founders: validate ideas, launch waitlists, and build internal tools.
- Designers and creators: publish portfolios and interactive experiences.
- Developers and technical builders: plan, accelerate, debug, and productionize AI-assisted work.
- Media buyers and performance marketers: build break-even ROAS and budget calculators, UTM utilities, campaign dashboards, automated performance audits, creative-testing trackers, and higher-converting campaign landing pages.

The media-buyer message must be prominent enough to appear while scanning the page and must not imply that the camp teaches media buying itself. It teaches product-building skills applied to performance-marketing workflows.

### 8.6 Outcomes

Present the three course outputs as a narrative progression:

1. Portfolio — communicate and sell your work.
2. Landing page — turn attention into action.
3. Micro tool — solve a real problem with frontend, backend, and data.

### 8.7 Method and curriculum

Show the workflow `Business → Product → Functional → Quality → Build → Verify`. The ten sessions appear as a clean indexed timeline, with documentation and production topics emphasized as differentiators.

### 8.8 Format and price anchor

Show five weeks, ten sessions, three clinics, live delivery, recordings, project files, and demo day. Display the standard 6,500 EGP value while describing the waitlist benefit as private founding-cohort access without publishing the discounted price.

### 8.9 Waitlist transition

The primary CTA scrolls to and activates the inline assessment. On activation, the assessment becomes the dominant surface and minimizes campaign distractions. Preserve progress in the browser so an accidental refresh does not discard completed answers.

## 9. Assessment Flow

### 9.1 Identity

Required fields:

- Full name.
- Email address.
- Egyptian WhatsApp number.

### 9.2 Seven questions

1. **Current role**
   - Founder / business owner
   - Media buyer / performance marketer
   - Marketer / content creator
   - Designer
   - Developer
   - Freelancer
   - Student / career switcher
   - Other

2. **Current coding experience**
   - No coding experience
   - Basic HTML/CSS or technical concepts
   - I have built with AI tools
   - I can edit and debug code
   - I work professionally in development

3. **Tools already used** — multi-select
   - ChatGPT
   - Claude
   - Codex / Claude Code / Cursor
   - Lovable
   - Replit
   - v0 / Bolt
   - None yet

4. **What do you want to build first?**
   - Personal portfolio
   - Landing page
   - Micro tool
   - Marketing calculator, dashboard, or audit tool
   - SaaS / customer-facing product
   - Internal business tool
   - I have not decided yet

5. **Biggest blocker**
   - Turning the idea into a clear specification
   - UI/UX and visual quality
   - Choosing the right stack
   - Backend, database, or authentication
   - Debugging AI-generated work
   - Testing, security, and deployment

6. **Weekly commitment outside live sessions**
   - Less than 3 hours
   - 3–5 hours
   - 5–8 hours
   - More than 8 hours

7. **Budget question**
   - Less than 4,000 EGP
   - 4,000–6,000 EGP
   - 6,000–8,000 EGP
   - Price is not the primary factor if the value is right

### 9.3 Completion

Show one question per screen with a progress indicator, back/next controls, keyboard-friendly selection, and a final submit action. The completion screen confirms waitlist membership and founding-cohort priority without promising acceptance or a specific launch date.

## 10. Data and API Design

- Public route: `/prompt-to-product`.
- Submission endpoint: `/api/prompt-to-product`.
- Reuse the existing `assessment_submissions` table to avoid unnecessary schema duplication.
- Assessment identifier: `prompt-to-product-2026`.
- Store the applicant as position `waitlist`, with all seven responses in the existing JSON answers format.
- Keep the existing per-assessment unique constraints for normalized email and phone.
- Validate full name, email, Egyptian mobile format, allowed options, and completion on the server.
- Return a friendly duplicate-submission message for existing email or phone entries.
- Do not build a new admin dashboard in this version; submissions remain queryable in Supabase and isolated by assessment identifier.

## 11. Error and Recovery Behavior

- Show Arabic field-level errors before advancing from identity.
- Disable the next action until the current required response is valid.
- Preserve local progress after each step; clear it only after a successful submission.
- Keep answers intact after a network or server error and offer a clear retry action.
- Treat duplicate submission as a useful state, not a generic failure.
- Never expose Supabase service credentials in the client.

## 12. Accessibility, Performance, and SEO

- Fully usable at 320 px through wide desktop viewports.
- Semantic headings, labels, buttons, and live error messages.
- Visible keyboard focus and adequate tap targets.
- Strong contrast in both black and cream sections.
- Reduced-motion fallback.
- Optimized local project imagery with responsive sizing and lazy loading below the fold.
- Arabic metadata and social preview for Prompt to Product.
- Keep the initial hero and CTA useful before JavaScript-driven animation runs.

## 13. Verification

- Run lint and production build.
- Verify layout at representative mobile, tablet, and desktop widths.
- Test every question type, back/next navigation, refresh recovery, success, network failure, and duplicate submission.
- Verify a saved Supabase row contains the correct assessment identifier, normalized identity fields, and all seven answers.
- Confirm the page does not show global floating CTAs or popups that compete with the waitlist action.
- Inspect console output, keyboard navigation, reduced-motion behavior, and primary performance regressions.

## 14. Out of Scope

- Payment collection.
- Cohort scheduling or calendar booking.
- Automated email or WhatsApp campaigns.
- Applicant scoring or automated acceptance.
- A new admin reporting dashboard.
- Student accounts or a learning-management system.
