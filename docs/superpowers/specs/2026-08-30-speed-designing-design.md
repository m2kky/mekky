# Speed Designing Landing Page Design

**Date:** 2026-08-30
**Route:** `/speeddesigning`
**Status:** Approved for implementation

## Purpose

Build the permanent home and automatically rendered archive for **SPEED DESIGNING — Public Figures' Websites**, an independent speculative design series by Muhammed Mekky Studio. The page must explain the series, establish a recognizable identity, and be ready for real episodes without publishing invented people, claims, or metrics.

## Art Direction

The approved direction is **Dark Contact Sheet**: a cinematic black editorial archive built on Swiss grid discipline, narrow metadata rails, oversized typography, and restrained orange proof marks.

- **Black:** `#070707`
- **Ink:** `#111111`
- **Off-white:** `#F4F0E7`
- **Muted gray:** `#9B9B94`
- **Mekky orange:** `#EB4D1B`
- **Display:** Syne
- **Body:** Inter
- **Utility metadata:** JetBrains Mono

The signature element is a narrow vertical metadata rail that frames the page like a contact sheet and carries series/process information. Motion reinforces scanning, revealing, and iteration; it uses only opacity and transforms and does not animate every element.

## Page Structure

1. **Studio intro:** a short first-visit-in-session reveal using the optimized Compact logo, with a visible skip control. Repeat visits in the same session bypass it. Reduced-motion users see no timed animation.
2. **Hero:** series label, oversized title, supporting statement, published project count, archive jump link, and explicit independent/speculative disclaimer.
3. **Manifesto:** an asymmetric editorial sequence covering person-first research, voice and audience, positioning, visual system, appropriate style selection, responsive build, and explained decisions.
4. **Projects archive:** newest published episode first. Drafts never render publicly. Coming-soon entries render only when explicitly enabled. With the initial empty registry, show a deliberate launch state without names or invented episode details.
5. **Episode process:** Research → Personality → Audience → Positioning → Creative Direction → Design → Build → Blueprint → Launch.
6. **Blueprint:** concise explanation of the public decision record included with each future episode.
7. **About the designer:** short authorship statement, signature asset, and verified link to `https://muhammedmekky.com`.
8. **Closing CTA:** invite visitors to suggest a person via the existing verified studio email and return to the main site.

## Architecture

Keep the implementation intentionally small:

- `src/data/speedDesigningProjects.ts` owns the project type, registry, and public filtering/sorting helper.
- `src/app/speeddesigning/page.tsx` is a Server Component that owns metadata and composes the page.
- `src/app/speeddesigning/SpeedDesigning.module.css` owns route-scoped layout, responsive behavior, and CSS motion.
- `src/components/speeddesigning/SeriesIntro.tsx` is the only required Client Component and owns session-based intro state.
- `public/speeddesigning/brand/` contains optimized local identity assets.
- `tests/speed-designing.test.mjs` verifies registry visibility, route content, metadata, sitemap inclusion, and required assets.

No CMS, database, fake detail pages, new dependency, or generic component abstraction is added. Future routes are represented only by `websitePath` and `blueprintPath` fields until real public pages exist.

## Project Registry Contract

Each entry supports:

- `episodeNumber`
- `slug`
- `personName`
- `personNameArabic?`
- `profession`
- `positioning`
- `coverImage`
- `accentColor`
- `websitePath`
- `blueprintPath`
- `publishDate`
- `status: 'published' | 'coming-soon' | 'draft'`
- `language`
- `designStyles`
- `featured`
- `showComingSoon?`

The public selector removes drafts, removes unenabled coming-soon entries, and sorts descending by episode number. Only published entries are links.

## Existing Site Integration

The route uses a standalone series shell rather than the global Navbar/Footer. Route CSS suppresses the global floating project widget, floating CTA, and popup UI for this campaign page. A small utility navigation preserves clear authorship and links back to the main site.

The route receives full metadata: title, description, canonical URL, Open Graph fields, and an indexable robots policy. `/speeddesigning` is added to the existing sitemap. No celebrity keywords are added before a real episode exists.

## Accessibility and Performance

- Semantic landmarks and heading order.
- Visible `:focus-visible` states.
- Keyboard-operable intro skip and all links.
- `prefers-reduced-motion` disables nonessential transitions and bypasses the timed intro.
- CSS prevents horizontal overflow and keeps small-screen typography readable.
- Arabic-ready data includes language/optional Arabic name and applies `dir="rtl"` where relevant.
- Server rendering is the default; only intro behavior hydrates.
- Optimized local image assets use explicit dimensions.

## Verification

- Test-first registry and route contract.
- Lint the changed TypeScript and test files.
- Run TypeScript and existing relevant tests.
- Run a production build with the existing local environment.
- Browser-test `/speeddesigning` at desktop and mobile sizes.
- Verify reduced motion, intro skip/session behavior, empty state, draft exclusion, focus visibility, console output, broken assets, and horizontal overflow.

## Out of Scope

- Episode detail pages and Blueprint pages.
- Publishing Ehsan El Sayed or any other public figure before research and assets are complete.
- CMS/database management.
- Private research files, CVs, notes, social archives, source documents, testimonials, or invented metrics.
