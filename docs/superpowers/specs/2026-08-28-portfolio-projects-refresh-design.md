# Portfolio Projects Refresh Design

## Goal

Add Ahmed Rammah and Coach Hossam Ibrahim to the existing portfolio, and refresh the existing Mahmoud Bravo entry to represent the V2 build in `D:\bravo`.

## Approach

Reuse the current `PROJECTS.items` data model and existing `/portfolio/[slug]` detail route. Do not introduce a CMS migration, new project components, or separate case-study layouts.

## Data and ordering

- Add `Ahmed Rammah` and `Coach Hossam Ibrahim` as the first two portfolio items so the newest shipped work appears first.
- Keep the existing Mahmoud Bravo slug and update its copy, stack, results, images, and live URL to the V2 project.
- Use concise, evidence-based project copy derived from each source repository. Do not invent business metrics.
- Use the official `https://ahmedrammah.com/` site for Rammah's Live Preview and screenshots.
- Use the official `https://hossamibrahim.net/` site for Coach Hossam's Live Preview and screenshots.

## Images

Capture each project from its official live site at desktop and mobile viewport sizes. Wait for Rammah's loading screen to finish before capture. Produce the three files expected by the current portfolio:

- `/images/projects/<slug>.webp`
- `/images/projects/<slug>-desktop.webp`
- `/images/projects/<slug>-mobile.webp`

Replace the existing Mahmoud Bravo image set with V2 captures while preserving its current filenames and slug.

## Detail-page compatibility fix

Update `ProjectClient` to consume the camelCase fields already used by `PROJECTS.items`: `longDescription` and `liveUrl`. This fixes descriptions, mockup links, and Live Preview links for both new and existing projects.

## Verification

- Confirm both new cards appear first on `/portfolio` and Bravo still resolves at its existing slug.
- Confirm all three detail pages render their copy, tools, results, and responsive mockups.
- Confirm both official Live Preview links work.
- Run targeted lint/type checks and a production build or the closest available project checks.
- Preserve all unrelated working-tree changes and untracked files.
