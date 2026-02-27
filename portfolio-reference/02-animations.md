# 🎬 الانيميشنز المستخدمة (Animations Catalog)

كل انيميشن في الموقع مع الكود والشرح بالتفصيل.

---

## 1. ⏳ Preloader (شاشة التحميل)

### الوصف:
شاشة سوداء بتظهر أول ما الموقع يفتح، فيها عداد بيعد من `0%` لـ `100%`.
بعد ما يوصل 100%، الشاشة بتختفي وتكشف الموقع تحتيها.

### الكود:
```javascript
// HTML
// <div class="preloader">
//   <span class="preloader-counter">0</span>
//   <span>%</span>
// </div>

const counter = { value: 0 };
const counterElement = document.querySelector('.preloader-counter');

// Timeline للـ Preloader
const preloaderTl = gsap.timeline({
  onComplete: () => {
    // بعد ما يخلص، شيل الـ preloader
    gsap.to('.preloader', {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    });
    // ابدأ انيميشنز الصفحة
    initPageAnimations();
  }
});

preloaderTl.to(counter, {
  value: 100,
  duration: 2.5,
  ease: 'power1.inOut',
  onUpdate: () => {
    counterElement.textContent = Math.round(counter.value);
  }
});
```

### CSS:
```css
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-size: clamp(3rem, 8vw, 8rem);
  color: #fff;
  font-family: 'Satoshi', sans-serif;
}
```

---

## 2. 🔤 Hero Text Reveal (ظهور العنوان الرئيسي)

### الوصف:
"STOP PLAYING SMALL." → كل حرف بيظهر من تحت لفوق مع fade-in.
ولما تسكرول، النص بيتغير (أو بيظهر) لـ "START PLAYING SMART."

### الكود:
```javascript
// تقسيم النص
const heroSplit = new SplitType('.hero-title', { 
  types: 'chars, words' 
});

// انيميشن الظهور الأول (مش مربوط بالسكرول)
gsap.from(heroSplit.chars, {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.02,
  ease: 'power3.out',
  delay: 3, // بعد الـ preloader
});

// التحول مع السكرول
gsap.to('.hero-title-first', {
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: '50% top',
    scrub: true,
  },
  opacity: 0,
  y: -50,
});

gsap.from('.hero-title-second', {
  scrollTrigger: {
    trigger: '.hero-section',
    start: '30% top',
    end: '80% top',
    scrub: true,
  },
  opacity: 0,
  y: 100,
});
```

---

## 3. 📜 Word-by-Word Color Reveal (ظهور الكلمات بالألوان)

### الوصف:
جملة طويلة بالـ italic، الكلمات بتبدأ بلون باهت (رمادي فاتح)
ولما تسكرول، كل كلمة بتتلون واحدة واحدة للون الأساسي (أسود أو أبيض).

### الكود:
```javascript
// تقسيم الجملة لكلمات
const revealSplit = new SplitType('.word-reveal', { 
  types: 'words' 
});

gsap.fromTo(revealSplit.words,
  { 
    color: 'rgba(0, 0, 0, 0.15)',  // لون باهت جداً
  },
  {
    color: 'rgba(0, 0, 0, 1)',      // لون كامل
    scrollTrigger: {
      trigger: '.word-reveal',
      start: 'top 75%',
      end: 'bottom 25%',
      scrub: 1,                      // scrub بنعومة
    },
    stagger: 0.1,                    // تأخير بين كل كلمة
    ease: 'none',
  }
);
```

### CSS:
```css
.word-reveal {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.15);  /* الحالة الأولية */
}
```

---

## 4. 📐 Parallax Effect (حركة بسرعات مختلفة)

### الوصف:
الصور بتتحرك أبطأ من النصوص وأنت بتسكرول.
بيدي إحساس بالـ depth والـ 3D.

### الكود:
```javascript
// الصورة بتتحرك أبطأ (parallax)
gsap.to('.parallax-image', {
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
  y: -100,  // بتتحرك لفوق ببطء
  ease: 'none',
});

// النص بيتحرك أسرع
gsap.to('.parallax-text', {
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
  y: -200,  // بتتحرك أسرع من الصورة
  ease: 'none',
});
```

---

## 5. 📌 Sticky Section / Pin (تثبيت عنصر)

### الوصف:
النص الكبير بيفضل ثابت في مكانه بينما عناصر تانية بتعدي من وراه.
بيتعمل بيه الـ "STOP → START" effect.

### الكود:
```javascript
ScrollTrigger.create({
  trigger: '.pin-section',
  start: 'top top',
  end: '+=200%',          // يفضل ثابت لمسافة 200% من ارتفاع الشاشة
  pin: '.pin-content',     // العنصر اللي هيتثبت
  pinSpacing: true,
});

// محتوى يعدي من فوق العنصر المثبت
gsap.from('.overlay-content', {
  scrollTrigger: {
    trigger: '.pin-section',
    start: 'top top',
    end: '+=200%',
    scrub: true,
  },
  y: '100%',
  opacity: 0,
});
```

---

## 6. 🔄 3D Diagonal Text (نص مائل متحرك)

### الوصف:
"NOW IT'S TIME FOR PEACE PURPOSE AND POWER"
نص ضخم مائل بزاوية بيتحرك ويدور مع السكرول.

### الكود:
```javascript
gsap.fromTo('.diagonal-text', 
  {
    rotateX: 25,
    rotateY: -15,
    rotateZ: -10,
    y: 200,
    opacity: 0.5,
  },
  {
    scrollTrigger: {
      trigger: '.diagonal-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    y: -200,
    opacity: 1,
    ease: 'none',
  }
);
```

### CSS:
```css
.diagonal-section {
  perspective: 1000px;
  overflow: hidden;
  background: #1a1a1a;
  min-height: 100vh;
}

.diagonal-text {
  font-family: 'Playfair Display', serif;
  font-size: clamp(4rem, 12vw, 12rem);
  color: #fff;
  text-transform: uppercase;
  transform-style: preserve-3d;
  text-align: center;
  line-height: 1;
}
```

---

## 7. 🎯 Staggered List Items (عناصر القائمة المتتابعة)

### الوصف:
عناصر القائمة (Signs You're Ready) بتظهر واحدة واحدة
بتأخير بسيط بين كل عنصر والتاني.

### الكود:
```javascript
gsap.from('.list-item', {
  scrollTrigger: {
    trigger: '.list-section',
    start: 'top 60%',
    end: 'bottom 40%',
    scrub: true,
  },
  y: 40,
  opacity: 0,
  stagger: 0.15,    // 0.15 ثانية بين كل عنصر
  ease: 'power2.out',
});
```

---

## 8. 🌓 Section Color Transition (تغيير لون السكشن)

### الوصف:
الخلفية بتتغير بنعومة من أسود (dark section) لأبيض (light section)
والنصوص بتتغير بالعكس.

### الكود:
```javascript
// لكل سكشن فاتح
document.querySelectorAll('.light-section').forEach(section => {
  gsap.to('.page-wrapper', {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
    },
    backgroundColor: '#f5f5f5',
    color: '#1a1a1a',
    ease: 'none',
  });
});

// لكل سكشن داكن
document.querySelectorAll('.dark-section').forEach(section => {
  gsap.to('.page-wrapper', {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
    },
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    ease: 'none',
  });
});
```

---

## 9. 📊 Number Counter (عداد الأرقام)

### الوصف:
رقم بيعد من 0 لرقم معين (مثل 1% أو أي إحصائية).

### الكود:
```javascript
const counter = { value: 0 };

gsap.to(counter, {
  value: 1,
  duration: 2,
  scrollTrigger: {
    trigger: '.counter-section',
    start: 'top 60%',
  },
  ease: 'power1.out',
  onUpdate: () => {
    document.querySelector('.counter').textContent = 
      Math.round(counter.value);
  }
});
```

---

## 10. 🎭 Image Scale on Scroll

### الوصف:
الصورة بتكبر أو بتصغر بنعومة وأنت بتسكرول.

### الكود:
```javascript
gsap.fromTo('.scale-image',
  { scale: 0.8 },
  {
    scale: 1,
    scrollTrigger: {
      trigger: '.scale-image',
      start: 'top bottom',
      end: 'center center',
      scrub: true,
    },
    ease: 'none',
  }
);
```

---

## 11. 🔗 Sticky CTA Button

### الوصف:
زرار "Book your Consultation" ثابت في أسفل يمين الشاشة دايماً.

### CSS:
```css
.sticky-cta {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  padding: 1rem 2rem;
  background: #1a1a1a;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Satoshi', sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sticky-cta:hover {
  background: #fff;
  color: #1a1a1a;
  transform: scale(1.05);
}
```

---

## 12. 🎪 "DON'T QUIT → DO IT" Text Reveal

### الوصف:
نص ضخم Serif "DON'T QUIT" بيتكشف مع السكرول
وبيبان إن الكلمات بتتغير لـ "DO IT" (optical illusion مع الصورة).

### الكود:
```javascript
// الصورة بتتحرك فوق النص الكبير
gsap.to('.reveal-image', {
  scrollTrigger: {
    trigger: '.reveal-section',
    start: 'top top',
    end: '+=150%',
    scrub: true,
    pin: true,
  },
  y: '-60%',
  ease: 'none',
});

// النص الكبير ورا الصورة
gsap.fromTo('.background-text span', 
  { opacity: 0.3 },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: '.reveal-section',
      start: 'top top',
      end: '+=150%',
      scrub: true,
    },
    stagger: 0.2,
  }
);
```
