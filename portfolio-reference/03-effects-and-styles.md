# ✨ التأثيرات والستايلز (Effects & Styles)

كل التأثيرات البصرية والـ CSS patterns المستخدمة في الموقع.

---

## 1. 🌈 Purple Gradient Border (الحدود البنفسجي)

### الوصف:
على جوانب الصفحة فيه gradient بنفسجي خفيف بيدي إحساس بالـ glow.

### CSS:
```css
/* الطريقة: pseudo-elements على الـ body أو wrapper */
.page-wrapper {
  position: relative;
}

.page-wrapper::before,
.page-wrapper::after {
  content: '';
  position: fixed;
  top: 0;
  width: 15px;
  height: 100%;
  z-index: 100;
  pointer-events: none;
}

.page-wrapper::before {
  left: 0;
  background: linear-gradient(
    to right,
    rgba(128, 0, 255, 0.4),
    rgba(128, 0, 255, 0.1),
    transparent
  );
}

.page-wrapper::after {
  right: 0;
  background: linear-gradient(
    to left,
    rgba(128, 0, 255, 0.4),
    rgba(128, 0, 255, 0.1),
    transparent
  );
}

/* Top gradient */
.page-wrapper .top-gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(
    to bottom,
    rgba(128, 0, 255, 0.5),
    transparent
  );
  z-index: 100;
  pointer-events: none;
}
```

---

## 2. 🖼️ Image Treatment (معالجة الصور)

### الوصف:
كل الصور في الموقع أبيض وأسود (B&W) أو desaturated.
بيدي شكل موحد ومتناسق.

### CSS:
```css
.portfolio-image {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3/4;
  object-fit: cover;
  filter: grayscale(100%);          /* أبيض وأسود */
  transition: filter 0.5s ease;
}

.portfolio-image:hover {
  filter: grayscale(0%);            /* الألوان ترجع مع الـ hover */
}
```

---

## 3. 📝 Typography System (نظام الخطوط)

### Font Loading:
```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');

/* Satoshi - from FontShare (مجاني) */
@font-face {
  font-family: 'Satoshi';
  src: url('./fonts/Satoshi-Variable.woff2') format('woff2');
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Satoshi';
  src: url('./fonts/Satoshi-VariableItalic.woff2') format('woff2');
  font-weight: 300 900;
  font-display: swap;
  font-style: italic;
}
```

### Typography Scale:
```css
:root {
  /* Font Families */
  --font-primary: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-accent: 'Playfair Display', Georgia, serif;

  /* Font Sizes - Fluid/Responsive */
  --text-hero: clamp(4rem, 10vw, 10rem);      /* العناوين الضخمة */
  --text-section: clamp(2.5rem, 5vw, 5rem);   /* عناوين السكاشن */
  --text-heading: clamp(1.5rem, 3vw, 3rem);   /* العناوين الثانوية */
  --text-subheading: clamp(1.2rem, 2vw, 1.8rem); /* عناوين فرعية */
  --text-body: clamp(0.9rem, 1.1vw, 1.1rem);  /* النص العادي */
  --text-small: clamp(0.75rem, 0.9vw, 0.875rem); /* النص الصغير */
  --text-label: 0.75rem;                        /* الـ Labels */

  /* Line Heights */
  --leading-tight: 0.95;   /* للعناوين الضخمة */
  --leading-snug: 1.1;     /* للعناوين */
  --leading-normal: 1.6;   /* للنص العادي */

  /* Letter Spacing */
  --tracking-tight: -0.02em;   /* للعناوين */
  --tracking-normal: 0;        /* عادي */
  --tracking-wide: 0.05em;     /* للـ Labels والزراير */
  --tracking-wider: 0.1em;     /* للتأثير */
}

/* الاستخدام */
.hero-title {
  font-family: var(--font-primary);
  font-size: var(--text-hero);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
}

.accent-text {
  font-family: var(--font-accent);
  font-style: italic;
  font-size: var(--text-heading);
  line-height: var(--leading-snug);
}

.section-title {
  font-family: var(--font-primary);
  font-size: var(--text-section);
  font-weight: 700;
  line-height: var(--leading-tight);
  text-transform: uppercase;
}

.body-text {
  font-family: var(--font-primary);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: var(--leading-normal);
}

.label {
  font-family: var(--font-primary);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
```

---

## 4. 🏗️ Layout System (نظام الـ Layout)

```css
:root {
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --space-2xl: 12rem;

  /* Container */
  --container-width: min(90%, 1400px);
  --container-padding: clamp(1rem, 3vw, 3rem);
}

.container {
  width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Full-height sections */
.section {
  min-height: 100vh;
  padding: var(--space-xl) 0;
  position: relative;
}

/* Section numbering */
.section-number {
  font-family: var(--font-primary);
  font-size: var(--text-small);
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: var(--container-padding);
  top: var(--space-md);
}

/* Side labels */
.side-label {
  position: absolute;
  right: var(--container-padding);
  top: var(--space-md);
  font-family: var(--font-primary);
  font-size: var(--text-label);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.side-label::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
```

---

## 5. 🔘 Button Styles (ستايلز الزراير)

```css
/* Primary Button */
.btn-primary {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-family: var(--font-primary);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: none;
  color: #fff;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-primary:hover {
  background: #fff;
  color: #1a1a1a;
  border-color: #1a1a1a;
  transform: scale(1.03);
}

/* Outline Button (on light background) */
.btn-outline {
  display: inline-block;
  padding: 0.8rem 2rem;
  font-family: var(--font-primary);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  color: #1a1a1a;
  background: transparent;
  border: 1px solid #1a1a1a;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: #1a1a1a;
  color: #fff;
}
```

---

## 6. 🧭 Navigation Style

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem var(--container-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
  mix-blend-mode: difference; /* عشان يبان على أي خلفية */
  color: #fff;
}

.nav-title {
  font-family: var(--font-primary);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
}

.nav-name {
  font-family: var(--font-primary);
  font-size: var(--text-body);
  font-weight: 500;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
  list-style: none;
}

.nav-links a {
  font-family: var(--font-primary);
  font-size: var(--text-small);
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.nav-links a:hover {
  opacity: 0.6;
}

/* Hamburger */
.hamburger {
  width: 32px;
  height: 32px;
  border: 1px solid currentColor;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.hamburger:hover {
  transform: scale(1.1);
}

.hamburger-line {
  width: 14px;
  height: 2px;
  background: currentColor;
  position: relative;
}

.hamburger-line::before,
.hamburger-line::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: currentColor;
}

.hamburger-line::before { top: -4px; }
.hamburger-line::after { bottom: -4px; }
```

---

## 7. 📱 Responsive Breakpoints

```css
/* Mobile First */

/* Tablet */
@media (min-width: 768px) {
  .hero-title { font-size: 6vw; }
  .two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero-title { font-size: 8vw; }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .hero-title { font-size: 10rem; }
}
```

---

## 8. 🎨 Color Scheme Variables

```css
:root {
  /* Dark Mode (Default) */
  --bg-dark: #1a1a1a;
  --text-dark: #ffffff;
  
  /* Light Mode (Sections) */
  --bg-light: #f5f5f5;
  --text-light: #1a1a1a;
  
  /* Accent */
  --accent-purple: rgba(128, 0, 255, 0.4);
  --accent-purple-light: rgba(128, 0, 255, 0.1);
  
  /* Text Opacity Variants */
  --text-muted: 0.4;
  --text-subtle: 0.15;
  --text-full: 1;
}
```

---

## 9. 🔄 Scroll Arrow Indicator

```css
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  opacity: 0.5;
}

.scroll-indicator-icon {
  width: 24px;
  height: 24px;
  border: 1px solid currentColor;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-indicator-arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid currentColor;
}

/* Bounce animation */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

.scroll-indicator {
  animation: bounce 2s infinite;
}
```

---

## 10. ✏️ Curly Brace List Style

### الوصف:
عناصر القائمة في قسم "Signs You're Ready" ليها `{` كمان قبل كل عنصر.

```css
.brace-list-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  padding-left: calc(var(--index, 0) * 3rem); /* كل عنصر متزحلق أكتر */
}

.brace-list-item::before {
  content: '{';
  font-family: var(--font-primary);
  font-size: 1.5rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.3);
  line-height: 1;
}
```
