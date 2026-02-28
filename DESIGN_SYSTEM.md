# Muhammed Mekky — Portfolio Design System & Guidelines

This document outlines the core design, architecture, and animation principles established during the creation of the `About` page. We will use these exact structural patterns to build the rest of the pages (Home, Projects, Coaching).

## 1. Core Visual Language

The design is built on extreme contrast, typographic scale, and smooth motion.

### Colors
We strictly alternate between two main themes per section to create rhythm and distinct content boundaries. We avoid greys as backgrounds; we rely on absolute stark contrast.

- **Dark Theme (Primary):**
  - Background: `#050505` (Deep absolute black)
  - Text Primary: `var(--text-primary)` (Usually `rgba(255,255,255,1)`)
  - Text Secondary: `var(--text-secondary)` (Usually `rgba(255,255,255,0.7)`)

- **Light Theme (Secondary):**
  - Background: `#fffcf2` (Warm, creamy white)
  - Text Primary: `#050505`
  - Text Secondary: `#555` or `rgba(5,5,5,0.7)`

### Typography
We mix a clean San-Serif for primary readable content and uppercase headlines, with a Serif for italic accents and emphasis.

- **Sans-Serif (`var(--font-sans)`):** Inter / System default. Used for headlines, paragraphs, and labels.
- **Serif (`var(--font-serif)`):** Newsreader / Playfair. Used for quotes, captions, the "1%" number layout, and accented italic words inside paragraphs.
- **Scaling:** We heavy use `clamp()` for responsive text.
    - Massive Headlines: `clamp(3rem, 7vw, 7rem)`
    - Small Labels/Nav: `0.75rem` to `0.875rem` uppercase, letter-spaced `0.05em`.
    - Long readable text: `clamp(1.2rem, 3vw, 2rem)` or `clamp(1rem, 1.2vw, 1.25rem)` with `line-height: 1.6`.

---

## 2. Layout & Structure

Every section is its own component (`SectionName.tsx` + `SectionName.module.css`).

### Section Wrappers
```css
.section {
    position: relative;
    min-height: 100vh;
    padding: 15vh 5vw; /* Generous breathing room */
    display: flex;
    flex-direction: column;
    /* Determine background: #050505 or #fffcf2 */
}
```

### Grids & Content
- We avoid center-aligned text for paragraphs.
- We use asymmetrical grids (e.g., `grid-template-columns: 1fr 2fr` or `1fr 3fr`).
- Left columns typically hold metadata, structural labels, or section numbers (e.g., `(01)`).
- Right columns hold the bulk of the headline and narrative content.

---

## 3. Animation Patterns

We use `gsap` with `ScrollTrigger` and our custom hook `useSplitText` for interactions.

### The "Sentence Reveal" (Scrubbed)
Used for paragraphs where we want the user to read at their own scroll pace.
- **Logic:** Text starts at `opacity: 0.15`. As you scroll, it scrubs to `opacity: 1`.
- **Implementation:** Split the text array manually by sentence or use `.word` / `.line` splits. Attach a `ScrollTrigger` with `scrub: 1`.

### The "Headline Reveal" (Triggered once)
Used for big entry headlines.
- **Logic:** Words start translated down (`y: 30`) and transparent (`opacity: 0`). When they enter the viewport (`top 80%`), they animate to `y: 0` and `opacity: 1` over `1.2s` with a `stagger`.
- **Blur Variant:** Add `filter: 'blur(10px)'` to the starting state and animate to `blur(0px)` for high-status, cinematic reveals.

### Image Parallax
- **Logic:** Images are placed in a container with `overflow: hidden`. The `img` tag itself starts scaled up (`scale: 1.1`) and translated slightly (`yPercent: -5`). It scrubs on scroll to `yPercent: 5` and `scale: 1`.
- **Styling:** Images are often treated with `filter: grayscale(100%) contrast(1.1)` to fit the stark, moody aesthetic.

---

## 4. Universal Components

### Dynamic Navbar
- The Navbar tracks the scroll position. It calculates the perceived brightness of the element situated physically underneath it.
- If it's over a Light Theme section, it applies absolute `#050505` text colors and a light backdrop.
- If over a Dark Theme section, it reverts to `#fffcf2`.
- Uses a robust glassmorphism effect: `backdrop-filter: blur(12px)`.

---

## 5. Development Workflow

For the next pages (Home, Projects, Coaching):
1. **Analyze Content:** Break down the text/story into alternating dark/light sections.
2. **Draft Structure:** Create modular TSX components (e.g., `ProjectsHero.tsx`, `ProjectsList.tsx`).
3. **Apply Typography:** Bind the clamp sizes and font variables.
4. **Implement GSAP:** Add the `useEffect` hooks for scroll animations. Always remember `ctx.revert()` in the cleanup function!
5. **Verify:** Use the local dev server and ensure the alternating backgrounds trigger the Navbar properly without color clashing.
