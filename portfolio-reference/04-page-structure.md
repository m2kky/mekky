# 🏗️ هيكل الصفحة الكامل (Page Structure Blueprint)

خريطة كاملة لكل سكشن في الصفحة، الترتيب، والعلاقة بينهم.

---

## 📋 ترتيب السكاشن

| # | السكشن | الخلفية | الانيميشنز المستخدمة |
|---|--------|---------|---------------------|
| 0 | Preloader | Dark | Number counter (0%→100%), fade out |
| 1 | Hero | Dark | Text reveal (char-by-char), image parallax, pin |
| 2 | Intro Quote | Dark→Light | Word-by-word color reveal, fade transition |
| 3 | Problem Statement | Light | Section title fade-in, two-column text stagger |
| 4 | Italic Quote | Light | Word-by-word color reveal (italic serif) |
| 5 | 3D Diagonal Text | Dark | 3D rotation, parallax, perspective transform |
| 6 | Stats/Value Prop | Light | Giant number animation, text reveal |
| 7 | Signs/List | Light | Staggered list items, large side text |
| 8 | CTA/Motivation | Dark | Image + text reveal ("DON'T QUIT → DO IT") |
| 9 | Services Detail | Light | Bullet list stagger, button hover |
| 10 | Closing Quote | Light | Word-by-word reveal |
| 11 | Footer | Dark | Fade-in, links |

---

## 📐 HTML Blueprint

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[YOUR NAME] - [YOUR ROLE]</title>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <!-- Satoshi self-hosted from fonts/ folder -->
  
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>

  <!-- ==================== -->
  <!-- 0. PRELOADER          -->
  <!-- ==================== -->
  <div class="preloader" id="preloader">
    <span class="preloader-counter" id="preloader-counter">0</span>
    <span class="preloader-percent">%</span>
  </div>

  <!-- ==================== -->
  <!-- NAVIGATION            -->
  <!-- ==================== -->
  <nav class="nav">
    <div class="nav-left">
      <span class="nav-title">[YOUR ROLE]</span>
      <span class="nav-subtitle">[TAGLINE]</span>
    </div>
    <div class="nav-center">
      <a href="/" class="nav-name">[YOUR NAME]</a>
    </div>
    <div class="nav-right">
      <ul class="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <button class="hamburger" aria-label="Menu">
        <span class="hamburger-line"></span>
      </button>
    </div>
  </nav>

  <!-- ==================== -->
  <!-- PAGE WRAPPER          -->
  <!-- ==================== -->
  <div class="page-wrapper">
    <!-- Purple gradient borders -->
    <div class="gradient-border gradient-border--left"></div>
    <div class="gradient-border gradient-border--right"></div>
    <div class="gradient-border gradient-border--top"></div>

    <!-- ==================== -->
    <!-- 1. HERO SECTION       -->
    <!-- ==================== -->
    <section class="section hero-section dark-section" data-section="hero">
      <div class="hero-image-wrapper">
        <img src="./images/hero.jpg" alt="[NAME]" class="hero-image parallax-image">
      </div>
      <h1 class="hero-title hero-title-first" data-split="chars">
        [BOLD STATEMENT LINE 1]
      </h1>
      <!-- يظهر مع السكرول -->
      <h1 class="hero-title hero-title-second" data-split="chars">
        [BOLD STATEMENT LINE 2]
      </h1>
      <p class="hero-subtitle">[Subtitle text]</p>
    </section>

    <!-- ==================== -->
    <!-- 2. INTRO SECTION      -->
    <!-- ==================== -->
    <section class="section intro-section" data-section="intro">
      <span class="section-number">(01)</span>
      <span class="side-label">● [Label text]</span>
      
      <div class="container">
        <h2 class="section-title" data-split="words">
          [SECTION HEADING]<br>
          [HEADING LINE 2]
        </h2>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 3. QUOTE SECTION      -->
    <!-- ==================== -->
    <section class="section quote-section dark-section" data-section="quote">
      <div class="container">
        <p class="word-reveal accent-text">
          [Long italic quote that reveals word by word
          as the user scrolls through this section.
          Make it impactful and meaningful.]
        </p>
      </div>
      <div class="scroll-indicator">
        <div class="scroll-indicator-icon">
          <span class="scroll-indicator-arrow"></span>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 4. PROBLEM SECTION    -->
    <!-- ==================== -->
    <section class="section problem-section light-section" data-section="problem">
      <span class="section-number">(02)</span>
      <span class="side-label">● [Label]</span>

      <div class="container">
        <h2 class="section-title" data-split="words">
          [PROBLEM STATEMENT<br>HEADING]
        </h2>

        <div class="two-columns">
          <div class="column">
            <p class="body-text">[Left column text...]</p>
          </div>
          <div class="column">
            <p class="body-text">[Right column text...]</p>
          </div>
        </div>

        <div class="scroll-indicator">...</div>

        <p class="word-reveal accent-text">
          [Another italic word-reveal quote.]
        </p>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 5. 3D TEXT SECTION    -->
    <!-- ==================== -->
    <section class="section diagonal-section dark-section" data-section="diagonal">
      <div class="diagonal-text-wrapper">
        <span class="diagonal-text">[LINE 1]</span>
        <span class="diagonal-text">[LINE 2]</span>
        <span class="diagonal-text">[LINE 3]</span>
        <span class="diagonal-text">[LINE 4]</span>
      </div>
      
      <!-- Side content -->
      <div class="diagonal-side-content">
        <p class="body-text">[Description text]</p>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 6. STATS SECTION      -->
    <!-- ==================== -->
    <section class="section stats-section light-section" data-section="stats">
      <span class="side-label">● [Label]</span>

      <div class="container stats-layout">
        <div class="stats-left">
          <p class="label">[SUBTITLE]</p>
          <span class="giant-number" data-count="[NUMBER]">[NUMBER]</span>
          <span class="giant-symbol">%</span>
          <p class="stats-description label">[DESCRIPTION IN CAPS]</p>
        </div>
        <div class="stats-right">
          <p class="body-text">[Paragraph text]</p>
          <p class="word-reveal accent-text">
            [Word-reveal quote]
          </p>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 7. SIGNS/LIST SECTION -->
    <!-- ==================== -->
    <section class="section signs-section light-section" data-section="signs">
      <span class="section-number">(05)</span>
      <span class="side-label">● [Label]</span>

      <div class="container">
        <h2 class="accent-text section-title">
          [List Heading:]
        </h2>

        <div class="brace-list">
          <div class="brace-list-item" style="--index: 0">
            <p>[Item 1 text]</p>
          </div>
          <div class="brace-list-item" style="--index: 1">
            <p>[Item 2 text]</p>
          </div>
          <div class="brace-list-item" style="--index: 2">
            <p>[Item 3 text]</p>
          </div>
          <div class="brace-list-item" style="--index: 3">
            <p>[Item 4 text]</p>
          </div>
        </div>

        <!-- Large side text -->
        <div class="large-side-text">
          <span>Get shit</span>
          <span>Done.</span>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 8. CTA SECTION        -->
    <!-- ==================== -->
    <section class="section cta-section dark-section" data-section="cta">
      <div class="reveal-wrapper">
        <img src="./images/cta-photo.jpg" alt="" class="reveal-image">
        <div class="background-text">
          <span>[BIG TEXT LINE 1]</span>
          <span>[BIG TEXT LINE 2]</span>
        </div>
      </div>
      <div class="cta-content">
        <h3 class="cta-title">[CTA HEADING]</h3>
        <p class="body-text">[CTA description]</p>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 9. SERVICES SECTION   -->
    <!-- ==================== -->
    <section class="section services-section light-section" data-section="services">
      <div class="container">
        <h2 class="section-title">[SERVICES HEADING]</h2>

        <div class="services-layout">
          <div class="services-description">
            <p class="body-text">[Description paragraph 1]</p>
            <p class="body-text accent-text">[Italic emphasis text]</p>
          </div>
          <div class="services-list">
            <p class="label">What you'll get:</p>
            <ul class="bullet-list">
              <li class="bullet-item">
                <h4>[SERVICE TITLE]</h4>
                <p>[service description]</p>
              </li>
              <!-- repeat for each service -->
            </ul>
            <a href="#contact" class="btn-outline">More about services</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 10. CLOSING QUOTE     -->
    <!-- ==================== -->
    <section class="section closing-section light-section" data-section="closing">
      <div class="container">
        <p class="word-reveal accent-text large">
          [Final powerful closing quote
          that reveals word by word.]
        </p>
      </div>
    </section>

    <!-- ==================== -->
    <!-- 11. FOOTER            -->
    <!-- ==================== -->
    <footer class="section footer dark-section" data-section="footer">
      <div class="container footer-content">
        <div class="footer-left">
          <h3 class="footer-name">[YOUR NAME]</h3>
          <p class="footer-role">[YOUR ROLE]</p>
        </div>
        <div class="footer-right">
          <ul class="footer-links">
            <li><a href="#">GitHub</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Email</a></li>
          </ul>
        </div>
        <p class="footer-copyright">© 2026 [NAME]. All rights reserved.</p>
      </div>
    </footer>

  </div><!-- /page-wrapper -->

  <!-- ==================== -->
  <!-- STICKY CTA BUTTON     -->
  <!-- ==================== -->
  <a href="#contact" class="sticky-cta">Let's Talk</a>

  <!-- Scripts -->
  <script type="module" src="./scripts/main.js"></script>

</body>
</html>
```

---

## 📁 File Structure

```
portfolio/
├── index.html
├── styles/
│   ├── main.css          # CSS variables + base styles
│   ├── nav.css           # Navigation styles
│   ├── sections.css      # Section-specific styles
│   ├── animations.css    # Keyframes + transition classes
│   └── responsive.css    # Media queries
├── scripts/
│   ├── main.js           # Entry point + Lenis + GSAP init
│   ├── preloader.js      # Preloader logic
│   ├── animations.js     # All scroll animations
│   └── split-text.js     # Text splitting + reveals
├── fonts/
│   ├── Satoshi-Variable.woff2
│   └── Satoshi-VariableItalic.woff2
├── images/
│   ├── hero.jpg          # Hero B&W photo
│   ├── cta-photo.jpg     # CTA section photo
│   └── about.jpg         # About photo
└── package.json
```

---

## 🎯 ملاحظات مهمة

1. **كل سكشن ليه `data-section` attribute** → بنستخدمه في JavaScript عشان نعرف أي سكشن ظاهر
2. **الـ `data-split` attribute** → بيقول لـ SplitType يقسم النص إزاي (`chars`, `words`, `lines`)
3. **الـ `dark-section` / `light-section` classes** → بتتحكم في لون الخلفية والنص
4. **الـ `section-number`** → ترقيم عشوائي (مش لازم 01, 02, 03) - دة part of the aesthetic
5. **الـ `side-label`** → بيدي context للسكشن على الجنب

---

## 🔄 Page Flow Diagram

```
[PRELOADER 0%→100%]
         ↓
[HERO] ■ Dark ■
"STOP PLAYING SMALL"
    ↓ scroll ↓
"START PLAYING SMART"
         ↓
[INTRO] ■ Dark→Light ■
Section (01) + bold heading
         ↓
[QUOTE] ■ Dark ■
Word-by-word italic reveal
         ↓
[PROBLEM] ■ Light ■
Section (02) + two columns
         ↓
[3D TEXT] ■ Dark ■
Diagonal rotating text
         ↓
[STATS] ■ Light ■
Giant number + value prop
         ↓
[SIGNS] ■ Light ■
Staggered brace list
         ↓
[CTA] ■ Dark ■
Photo + text reveal
         ↓
[SERVICES] ■ Light ■
Bullet list + CTA button
         ↓
[CLOSING] ■ Light ■
Final word-reveal quote
         ↓
[FOOTER] ■ Dark ■
```
