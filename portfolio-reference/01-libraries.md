# 📦 المكتبات المستخدمة (Libraries & Dependencies)

## 1. GSAP (GreenSock Animation Platform) v3.x
> المكتبة الأساسية لكل الانيميشنز

### ما هي؟
أقوى مكتبة انيميشن في الويب. بتديك تحكم كامل في حركة أي عنصر
(position, opacity, scale, rotation, color, etc.)

### الاستخدام في الموقع:
- تحريك النصوص والصور
- الـ Timelines (سلسلة انيميشنز متتابعة)
- التحكم في الـ easing (سرعة الحركة)

### التثبيت:
```bash
npm install gsap
```

### الاستيراد:
```javascript
import gsap from 'gsap';
```

### مثال أساسي:
```javascript
// تحريك عنصر من الشمال مع fade-in
gsap.from('.hero-title', {
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: 'power3.out'
});
```

---

## 2. ScrollTrigger (GSAP Plugin)
> ربط الانيميشنز بموضع السكرول

### ما هي؟
Plugin من GSAP بتربط أي انيميشن بالسكرول.
يعني العنصر بيتحرك لما يوصل لمكان معين في الشاشة.

### الاستخدام في الموقع:
- ظهور النصوص لما تسكرول عليها
- الـ Parallax effects (عناصر بسرعات مختلفة)
- تغيير لون الخلفية بين السكاشن
- الـ Pinning (تثبيت عنصر في مكانه وأنت بتسكرول)

### التثبيت:
```bash
# مضمنة مع gsap
npm install gsap
```

### الاستيراد والتسجيل:
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

### مثال - Fade In on Scroll:
```javascript
gsap.from('.section-title', {
  scrollTrigger: {
    trigger: '.section-title',
    start: 'top 80%',    // يبدأ لما العنصر يوصل لـ 80% من الشاشة
    end: 'top 20%',      // ينتهي لما يوصل لـ 20%
    scrub: true,          // الانيميشن مربوطة بالسكرول مش بالوقت
  },
  y: 60,
  opacity: 0,
});
```

### مثال - Pinning (تثبيت عنصر):
```javascript
ScrollTrigger.create({
  trigger: '.sticky-section',
  start: 'top top',
  end: '+=1000',          // يفضل ثابت لمسافة 1000px
  pin: true,
  pinSpacing: true,
});
```

### مثال - تغيير لون الخلفية:
```javascript
gsap.to('body', {
  scrollTrigger: {
    trigger: '.light-section',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
  },
  backgroundColor: '#f5f5f5',
  color: '#000000',
});
```

---

## 3. SplitText (GSAP Premium Plugin)
> تقسيم النصوص لحروف/كلمات/سطور وتحريك كل واحدة لوحدها

### ما هي؟
Plugin من GSAP بتقسم أي نص لـ `chars` أو `words` أو `lines`
وتلفهم في `<span>` عشان تقدر تحرك كل عنصر لوحده.

### الاستخدام في الموقع:
- "STOP PLAYING SMALL" → كل حرف بيظهر لوحده
- الجمل الطويلة → كل كلمة بتظهر تدريجياً
- word-by-word color reveal

### البديل المجاني:
```bash
npm install split-type
```

### الاستيراد:
```javascript
// النسخة المجانية (SplitType)
import SplitType from 'split-type';
```

### مثال - Text Reveal حرف حرف:
```javascript
import SplitType from 'split-type';

// تقسيم النص لحروف
const split = new SplitType('.hero-title', { types: 'chars' });

// تحريك كل حرف
gsap.from(split.chars, {
  scrollTrigger: {
    trigger: '.hero-title',
    start: 'top 80%',
    end: 'top 30%',
    scrub: true,
  },
  y: 80,
  opacity: 0,
  stagger: 0.03,      // تأخير بين كل حرف والتاني
  ease: 'power2.out',
});
```

### مثال - Word-by-Word Color Reveal:
```javascript
const split = new SplitType('.reveal-text', { types: 'words' });

gsap.fromTo(split.words, 
  { color: 'rgba(0,0,0,0.2)' },       // لون باهت
  {
    color: 'rgba(0,0,0,1)',             // لون كامل
    scrollTrigger: {
      trigger: '.reveal-text',
      start: 'top 70%',
      end: 'top 20%',
      scrub: true,
    },
    stagger: 0.1,
  }
);
```

---

## 4. Lenis
> Smooth Scroll - سكرول ناعم ومتحكم فيه

### ما هي؟
مكتبة بتستبدل السكرول العادي بتاع المتصفح بسكرول ناعم
وبطيء شوية. بيدي إحساس "premium" و"cinematic".

### الاستخدام في الموقع:
- السكرول كله ناعم ومتحكم
- بيتكامل مع GSAP ScrollTrigger

### التثبيت:
```bash
npm install lenis
```

### الاستيراد والإعداد:
```javascript
import Lenis from 'lenis';

// إنشاء instance
const lenis = new Lenis({
  duration: 1.2,           // سرعة السكرول (أعلى = أبطأ/أنعم)
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

// ربط مع GSAP
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ربط مع ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

---

## 📋 ملخص الـ Dependencies

```json
{
  "dependencies": {
    "gsap": "^3.12.0",
    "lenis": "^1.1.0",
    "split-type": "^0.3.4"
  }
}
```

### CDN Alternative (لو مش بتستخدم bundler):
```html
<!-- GSAP Core -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>

<!-- ScrollTrigger Plugin -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>

<!-- Lenis -->
<script src="https://unpkg.com/lenis@1/dist/lenis.min.js"></script>

<!-- SplitType (بديل مجاني لـ SplitText) -->
<script src="https://unpkg.com/split-type"></script>
```
