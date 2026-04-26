# 🚀 الدليل التطبيقي الشامل: بناء نظام أتمتة وتحليل لبيانات التسويق واستراتيجية النمو (Vibe Coding)

هذا الدليل ليس مجرد "شرح سطحي"، بل هو **"دليل تنفيذي شامل Step-by-Step"** ينقلك من الطرق اليدوية المرهقة في تحليل البيانات (والتي تستغرق من 14 إلى 30 يوماً من التشتت في شيتات الإكسيل) إلى تبني أسلوب **"Vibe Coding"**. هذه المنهجية ستمكنك من استخدام الذكاء الاصطناعي وبناء صلة وصل بين (Meta, Shopify, TikTok, Google Ads) للحصول على تقرير تدقيق (Audit) شامل واستراتيجية نمو دقيقة خلال دقائق معدودة، دون الحاجة لمعرفة مسبقة بالبرمجة.

---

## 🌟 مقدمة: لماذا تحتاج هذا النظام؟
سواء كنت تمثل Agency، أو Media Buyer، أو Marketing Manager؛ فبمجرد استلامك لعميل جديد، تبدأ دوامة استخراج البيانات، ومحاولة فهم الأرقام، وتحديد نقاط الضعف في المتجر، وكشف حقيقة التكلفة الفعلية للاستحواذ (CPA) مقارنةً بما تعرضه مديري الإعلانات. 
النظام الذي سنبنيه سوياً سيتولى:
1. سحب البيانات مباشرة من واجهات برمجة التطبيقات (APIs) لتخطي الواجهات العقيمة للأنظمة.
2. استيراد وقراءة تقارير المبيعات الفعلية من شوبيفاي لمقارنتها بالرسرف (Source of Truth).
3. معالجة آلاف المحادثات والتعليقات باستخدام تقنيات فهم اللغة (NLP) لاكتشاف أسباب عزوف العملاء الدقيقة.
4. الخروج بتقارير استراتيجية مالية محكمة (Break-Even ROAS).


---

## 🛠️ القسم الأول: تثبيت وإعداد بيئة العمل الذكية (AI IDE + Python)

الخطوة الأولى تتمثل في تجهيز أدوات العمل الأساسية على جهازك. نحتاج شيئين: (1) بيئة تطوير ذكية تفهم أوامرك وتكتب الكود نيابة عنك، و(2) لغة Python التي ستنفذ السكريبتات.

### تثبيت Python (ضروري):
السكريبتات التي سيكتبها الـ AI تعتمد على لغة Python. إذا لم تكن مثبتة على جهازك:
1. اذهب إلى الموقع الرسمي: [https://www.python.org/downloads/](https://www.python.org/downloads/).
2. اضغط على **"Download Python 3.x"** (أحدث إصدار).
3. **مهم جداً أثناء التثبيت:** ✅ ضع علامة صح على خيار **"Add Python to PATH"** قبل الضغط على Install.
4. بعد التثبيت، افتح الـ Terminal (أو PowerShell) واكتب `python --version` للتأكد.


### تثبيت الـ AI IDE:
1. **تحميل البرنامج:** قم بتنزيل أحد برامج تحرير الأكواد المدمجة بـ AI مثل **Antigravity** (أو Cursor / Windsurf).
2. **تثبيت البرنامج:** سطّب البرنامج على حاسوبك كأي برنامج عادي (Next > Next > Install).
3. **فتح واجهة الاستخدام:** بمجرد دخولك ستجد نافذة للدردشة (Chat Window) ومساحة لتصفح الفولدرات. هنا سيكون مركز التحكم الأساسي للعمليتنا.


---

## 🌐 القسم الثاني: سحب بيانات المنصات والـ API Tokens

لتجعل البرنامج يسحب البيانات تلقائياً، يحتاج إلى "مفاتيح" تُدعى (Tokens) من كل منصة. 

### 1️⃣ إعدادات Meta Developers (الفيسبوك والإنستجرام) – الخطوة الأهم والأعقد!
هذه الخطوة تفتح لك بيانات مدير الإعلانات، وصفحات الفيسبوك، ورسائل الإنستجرام:

1. اذهب إلى منصة مطوري ميتا: [https://developers.facebook.com/](https://developers.facebook.com/).
2. من القائمة العلوية اضغط على **"My Apps"** ثم اضغط على زر **"Create App"**.
3. اختر نوع التطبيق **Business** (لتتمكن من الوصول للأنشطة التجارية) واضغط التالى.
4. أضف منتج **Graph API** إلى التطبيق من قائمة المنتجات المتاحة.
5. الآن، لإصدار مفتاح الوصول (Page Access Token)، اختر التطبيق الذي أنشأته واذهب إلى قسم استخراج التوكن. **السر يكمن في اختيار الـ Permissions (الصلاحيات) الصحيحة!** حدد القائمة التالية بالحرف:
   - `ads_read`: لسحب أداء الحملات والإنفاق.
   - `read_insights`: للاطلاع على الإحصائيات العضوية والمجمعة.
   - `business_management`: للوصول للحساب الإعلاني.
   - `pages_show_list`: لإظهار قائمة الصفحات المربوطة.
   - `pages_read_engagement`: لقراءة التفاعل على بوستات الصفحة.
   - `pages_manage_metadata`: لمعلومات الصفحة.
   - `pages_messaging`: لسحب وتحليل محادثات العملاء على الماسنجر.
   - `instagram_basic`: بيانات الإنستجرام الأساسية.
   - `instagram_manage_insights`: إحصائيات تفاعل الإنستجرام.
   - `instagram_manage_messages`: لسحب رسائل الدايركت وتحليلها.
   - `leads_retrieval`: للوصول الفورم لجمع البيانات (Lead Gen).

6. بمجرد التحديد، انقر على **Generate Token**. **(تنبيه: انسخ هذا الكود الطويل واحتفظ به في ملف نصي أو Notepad جانبي).**


#### ⏳ تمديد صلاحية مفتاح Meta لمدة شهرين (60 يوماً)!
التوكن الذي نسخته تواً ينتهي خلال ساعة أو ساعتين. يجب تحويله لتوكن طويل الأمد:
1. افتح صفحة مصحح التوكن من ميتا: [Facebook Debug Tool](https://developers.facebook.com/tools/debug/accesstoken/).
2. الصق الـ Token القصير في المربع العلوي واضغط **Debug**.
3. ستنزل بأسفل الصفحة لترى تفاصيل التوكن، اضغط هناك على زر **"Extend Access Token"**.
4. سيظهر لك كود جديد طويل الأمد، انسخه وهو ما سنعتمده لاحقاً في النظام.


#### 🆔 استخراج المعرفات (IDs) من ميتا:
احتفظ بالأرقام التالية في نفس ملف الملاحظات (Notepad):
- `META_AD_ACCOUNT_ID`: رقم حسابك الإعلاني (يُسبق بـ `act_`). تجده في رابط متصفحك وأنت داخل الـ Ads Manager.
- `META_PAGE_ID`: رقم الصفحة الخاصة بك على الفيسبوك.
- `META_BUSINESS_ID`: رقم مدير الأعمال الخاص بك.

---

### 2️⃣ إعدادات TikTok Ads API
العملية في تيك توك أبسط بكثير من ميتا، لكن لازم تعملها صح:

1. اذهب إلى منصة مطوري تيك توك: [TikTok for Business - Developer Portal](https://business-api.tiktok.com/portal/docs).
2. سجل دخول بحساب TikTok for Business الخاص بك.
3. اضغط على **"My Apps"** ثم **"Create a new App"**.
4. اختر نوع التطبيق **"Business"** واكتب اسم تطبيقك (مثلاً: Data Audit Tool).
5. **الصلاحيات المطلوبة (Scopes):**
   - `Ad Account Management`: لقراءة بيانات الحملات.
   - `Ad Account Reporting`: لسحب تقارير الأداء (الإنفاق، CPA، CTR).
   - `Audience Management`: لفهم الجماهير المستهدفة.
6. بعد إنشاء التطبيق، ستجد الـ **Access Token** والـ **Advertiser ID** في صفحة إعدادات التطبيق. انسخهم واحتفظ بهم.
7. **ملاحظة:** توكن TikTok لا يحتاج تمديد (يعمل لفترة طويلة تلقائياً).

> 💡 **لاختبار التوكن:** استخدم [TikTok Ads API Sandbox](https://business-api.tiktok.com/portal/docs?id=1740302848100353) للتأكد من الاتصال قبل تشغيل النظام الكامل.


---

### 3️⃣ إعدادات Google Ads API
إعداد Google Ads أكثر تعقيداً قليلاً لأنه يعتمد على نظام مصادقة OAuth 2.0، لكن هذه الخطوات ستوصلك:

1. **الحصول على Developer Token:**
   - ادخل على حساب Google Ads Manager (الـ MCC): [https://ads.google.com/](https://ads.google.com/).
   - اذهب إلى **Tools & Settings → API Center**.
   - انسخ الـ **Developer Token** الموجود هناك.
   - إذا كان التوكن في وضع **Test Account**، قدّم طلب لترقيته لـ **Basic Access** (عادةً يأخذ يومين).

2. **إنشاء مشروع OAuth 2.0:**
   - اذهب إلى [Google Cloud Console](https://console.cloud.google.com/).
   - أنشئ **مشروع جديد** (Create Project).
   - فعّل **Google Ads API** من قائمة APIs & Services → Library.
   - اذهب إلى **APIs & Services → Credentials → Create Credentials → OAuth Client ID**.
   - اختر نوع **Desktop App**.
   - انسخ الـ **Client ID** والـ **Client Secret**.

3. **استخراج Refresh Token:**
   - استخدم أداة [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).
   - في الإعدادات (أيقونة الترس)، فعّل **"Use your own OAuth credentials"** وأدخل الـ Client ID و Secret.
   - في Step 1، أضف الـ Scope: `https://www.googleapis.com/auth/adwords`.
   - في Step 2، اضغط **"Exchange authorization code for tokens"**.
   - انسخ الـ **Refresh Token** الذي يظهر.

4. **الـ Customer ID:** رقم حسابك الإعلاني الموجود في أعلى صفحة Google Ads (الشكل: `123-456-7890`).

> 💡 **نصيحة:** لو الموضوع معقد عليك، ابحث على يوتيوب عن "Google Ads API OAuth Setup" وهتلاقي شروحات بالفيديو خطوة بخطوة.


---

### 4️⃣ استخراج بيانات Shopify (التقارير الجاهزة)
هنا سنسحب مصدر الحقيقة ليقارنه النظام بالأرقام الإعلانية:
1. سجل الدخول للوحة تحكم **Shopify**.
2. توجّه إلى (Analytics) ثم (Reports).
3. قم بفتح تقارير المبيعات المطلوبة (مثلاً: Sales over time, Sales by Referrer... إلخ).
4. اضغط على **Export**، وحملها بصيغة **CSV**.
5. افعل نفس الشيء مع تقرير الأوردرات (Orders). اذهب لصفحة الـ Orders > اضغط Export > اختار (All Orders). حمل الملف وابقه جاهزاً.


---

### 🔎 الطبقة المتقدمة في شوبيفاي: استعلامات ShopifyQL المخصصة

بالإضافة إلى التقارير الجاهزة المُصدرة كـ CSV، يوفر شوبيفاي محرراً داخلياً يُدعى **ShopifyQL Notebook** يسمح لك بكتابة استعلامات (Queries) مخصصة لاستخراج بيانات بالشكل الذي تريده بالضبط. هذا هو السلاح الذي استخدمناه لاكتشاف أن الأوردرات "الحقيقية" القادمة من الإعلانات مختلفة تماماً عما يظهره Meta Pixel.

**كيف تصل لمحرر ShopifyQL؟**
1. من لوحة تحكم شوبيفاي، اذهب إلى **Analytics** ثم **Reports**.
2. في أعلى الصفحة ستجد خيار **"Explore data"** أو **"ShopifyQL Notebook"**.
3. ستفتح لك شاشة تشبه الـ SQL Editor، اكتب فيها الاستعلامات التالية واضغط Run.


> **ملاحظة مهمة:** الجدول الرئيسي في ShopifyQL هو `sales` وليس `orders`. هذا خطأ شائع يسبب أخطاء عند التنفيذ.

---

#### 📌 Query 1: المبيعات حسب مصدر الترافيك (الاستعلام الأهم!)

هذا الاستعلام يكشف لك فوراً كم من مبيعاتك جاءت فعلاً من فيسبوك (الإعلانات المدفوعة) مقابل الزيارات المباشرة أو محركات البحث:

```sql
FROM sales
  SHOW total_sales, orders
  GROUP BY referrer_source
  SINCE 2026-01-24
  UNTIL 2026-04-24
  ORDER BY total_sales DESC
```

> 💡 لو `referrer_source` لم يعمل على متجرك، جرّب استبداله بـ `marketing_channel` أو `referrer_name`.


---

#### 📌 Query 2: المبيعات حسب اسم المصدر بالتفصيل (Referrer Name)

هذا الاستعلام يعطيك تفصيلاً أدق من السابق حيث يظهر اسم الموقع أو التطبيق الذي أحال الزائر:

```sql
FROM sales
  SHOW total_sales, orders
  GROUP BY referrer_name
  SINCE 2026-01-24
  UNTIL 2026-04-24
  ORDER BY total_sales DESC
```

---

#### 📌 Query 3: المبيعات يوم بيوم حسب المصدر (آخر أسبوع)

هذا الاستعلام يفتح لك الصورة اليومية لتعرف في أي يوم بالتحديد جاءت مبيعات الإعلانات:

```sql
FROM sales
  SHOW total_sales, orders
  GROUP BY referrer_source
  TIMESERIES day
  SINCE 2026-04-18
  UNTIL 2026-04-24
```

> هذا الاستعلام هو الذي كشف لنا أن في أسبوع كامل من الإنفاق، Meta Pixel سجّل 3 عمليات شراء فقط بينما إجمالي الأوردرات كان 21!

---

#### 📌 Query 4: إجمالي المبيعات مع الأوردرات ومتوسط قيمة الأوردر يوم بيوم

```sql
FROM sales
  SHOW total_sales, orders, average_order_value
  TIMESERIES day
  SINCE 2026-01-24
  UNTIL 2026-04-24
```

---

#### 📌 Query 5: أفضل 20 منتجاً مبيعاً

لتحديد المنتجات التي تستحق ميزانية إعلانية مخصصة:

```sql
FROM sales
  SHOW total_sales, product_title, orders
  GROUP BY product_title
  SINCE 2026-01-24
  UNTIL 2026-04-24
  ORDER BY total_sales DESC
  LIMIT 20
```

---

#### 📌 Query 6: المبيعات حسب المنطقة الجغرافية (Billing Region)

لمعرفة المناطق التي تحقق أعلى مبيعات وتوجيه الإعلانات لها:

```sql
FROM sales
  SHOW total_sales, orders
  GROUP BY billing_region
  SINCE 2026-01-24
  UNTIL 2026-04-24
  ORDER BY total_sales DESC
```

---

#### 📌 Query 7: مقارنة الشهر الحالي بالشهر السابق

لتقييم مسار النمو بسرعة:

```sql
FROM sales
  SHOW total_sales, orders
  TIMESERIES day
  DURING this_month
  COMPARE TO previous_month
```

---

#### ⚠️ استكشاف الأخطاء (Troubleshooting)

لو أي استعلام أعطاك خطأ، ابدأ بالاستعلام الأبسط وتأكد أنه يعمل أولاً:

```sql
FROM sales
  SHOW total_sales
  SINCE -30d
```

لو اشتغل، أضف الأعمدة واحداً تلو الآخر:

```sql
FROM sales
  SHOW total_sales, orders
  SINCE -30d
```

ثم أضف الـ GROUP BY:

```sql
FROM sales
  SHOW total_sales, orders
  GROUP BY referrer_source
  SINCE -30d
```

> 💡 **نصيحة ذهبية:** داخل محرر ShopifyQL، ابدأ بكتابة `FROM sales` واضغط Enter، ثم في خانة `SHOW` ابدأ الكتابة واستخدم الـ **Autocomplete** لترى كل الأعمدة والمقاييس المتاحة على متجرك.


---

### 🧬 الطبقة الاحترافية: استعلام Shopify GraphQL لتتبع الـ Attribution

بالإضافة إلى الاستعلامات السابقة التي تعمل من داخل لوحة التحكم، إذا كان لديك Shopify Custom App أو API Access، يمكنك استخدام استعلام GraphQL المتقدم التالي. هذا الاستعلام يسحب لك حقل `customerJourneySummary` وهو الحقل السحري الذي يخبرك بدقة من أين جاء كل عميل (أول زيارة وآخر زيارة) ومن أي حملة إعلانية بالذات عبر الـ UTM Parameters:

```graphql
{
  orders(first: 50, query: "created_at:>=2026-04-18 AND created_at:<=2026-04-24") {
    edges {
      node {
        name
        createdAt
        totalPriceSet {
          shopMoney {
            amount
          }
        }
        customerJourneySummary {
          firstVisit {
            source
            sourceType
            utmParameters {
              source
              medium
              campaign
              content
              term
            }
          }
          lastVisit {
            source
            sourceType
            utmParameters {
              source
              medium
              campaign
              content
              term
            }
          }
        }
      }
    }
  }
}
```

**لماذا هذا الاستعلام مهم؟**
- حقل `firstVisit.utmParameters.source` يخبرك إذا كان العميل جاء أول مرة من `facebook` (إعلان مدفوع).
- حقل `lastVisit` يخبرك بآخر مصدر زاره العميل قبل الشراء مباشرة.
- بمقارنة الاثنين، تستطيع تحديد بدقة ما إذا كان الإعلان هو الفضل في تحويل هذا العميل أم كان سيشتري بأي حال (أورجانيك/دايركت).

> **تذكير:** لضمان عمل هذا الاستعلام، يجب أن تكون إعلاناتك على Meta تحتوي على UTM Parameters. أضف هذا النص في خانة الـ URL Parameters في كل إعلان:
> ```
> utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
> ```


---

### 📊 الطريقة اليدوية البديلة (من لوحة تحكم شوبيفاي مباشرة بدون كود)

لو مش محتاج كل التفصيل ده وعاوز تتأكد بسرعة:
1. اذهب إلى **Analytics → Reports**.
2. اختر تقرير **"Orders by traffic referrer name"**.
3. حدد الفترة الزمنية المطلوبة.
4. ستظهر لك كل أوردر مربوط بمصدره (Facebook, Google, Direct... إلخ).

أو الطريقة البديلة:
1. **Analytics → Reports → "Sessions by referrer"**.
2. فلتر بـ **"Completed checkout sessions"**.
3. سيظهر لك الـ Sessions التي أتمت عملية الشراء ومن أين جاءت.


---

## 🗂️ القسم الثالث: هيكلة المجلدات وبناء الـ Data Warehouse المحلي

الآن سنقوم بجمع أوراقنا وترتيبها في جهازك ليقترحها البرنامج بشكل منهجي.

1. في أي مكان على جهازك (مثلاً الديسكتوب)، قم بإنشاء مجلد أم (Folder) باسم مشروعك وليكن `ProjectX_Growth_Audit`.
2. بداخل هذا الفولدر الأساسي، قم بإنشاء المجلدات الفرعية التالية لتنظيم البيانات:
   - فولدر باسم `shopify`: (خذ كل ملفات الـ CSV التي قمنا بتحميلها في الخطوة السابقة من Shopify وضعها داخله).
   - فولدر باسم `meta` (اتركه فارغاً).
   - فولدر باسم `tiktok` (اتركه فارغاً).
   - فولدر باسم `google` (اتركه فارغاً).
3. افتح برنامج الـ IDE (Antigravity). اختر **Open Folder**، وقم باختيار الفولدر الأساسي `ProjectX_Growth_Audit` ليفتحه.


---

## 🔒 القسم الرابع: ملف الأسرار وتكوين البيئة (`.env`)

يجب تمرير الأرقام والـ Tokens التي احتفظنا بها للبرنامج بشروط وبطريقة قراءة قياسية:

1. من داخل البرنامج (IDE)، انقر كليك يمين على الفولدر الرئيسي واختر **New File**.
2. سَمِّ الملف بالضبط كالتالي: `.env` (ملحوظة شديدة الأهمية: النقطة تكون في البداية).
3. افتح الملف، وانسخ الأسطر التالية بداخله وقم بتعبئة قيمك الحقيقية التي استخرجناها بين علامات المساواة `=`:

```env
# 🔒 Meta Secrets
META_ACCESS_TOKEN=ضع_التوكن_الطويل_لميتا_هنا
META_AD_ACCOUNT_ID=act_1234567890
META_PAGE_ID=9876543210
META_BUSINESS_ID=1122334455

# 🔒 TikTok Secrets
TIKTOK_ACCESS_TOKEN=ضع_التوكن_الخاص_بتيك_توك_هنا
TIKTOK_ADVERTISER_ID=ضع_رقم_المعلن_هنا

# 🔒 Google Ads Secrets
GOOGLE_ADS_DEVELOPER_TOKEN=ضع_التوكن_هنا
GOOGLE_ADS_CLIENT_ID=ضع_الـ_Client_ID
GOOGLE_ADS_CLIENT_SECRET=ضع_الـ_Client_Secret
GOOGLE_ADS_REFRESH_TOKEN=ضع_الـ_Refresh_Token
GOOGLE_ADS_CUSTOMER_ID=123-456-7890

# 🛍️ Target Website Configurations
TARGET_WEBSITE_URL=https://your-store.com

# ⏳ Analysis Window (فترة التحليل الزمنية)
ANALYSIS_SINCE=2026-03-01
ANALYSIS_UNTIL=2026-04-25
META_TIME_INCREMENT=1
META_ATTRIBUTION_WINDOWS=7d_click,1d_view

# ⚙️ Settings (إعدادات النظام للتقارير)
META_INCLUDE_BREAKDOWNS=true
META_OUTPUT_DIR=./meta
TIKTOK_OUTPUT_DIR=./tiktok
GOOGLE_OUTPUT_DIR=./google
SHOPIFY_INPUT_DIR=./shopify

# 💰 Financial Indicators (للتحليل المالي واستخراج الـ ROAS الفعلي - عدلها حسب أرقام بيزنسك)
MARGIN_PERCENTAGE=0.45
SHIPPING_COST=50
RETURN_RATE=0.12
DELIVERY_RATE=0.88
```
*قم بعمل Save للملف.*

> ⚠️ **تحذير أمني مهم:** ملف الـ `.env` يحتوي على مفاتيح سرية لحساباتك. إذا كنت تستخدم Git لإدارة المشروع، قم فوراً بإنشاء ملف `.gitignore` في نفس الفولدر وأضف بداخله السطر `.env` لمنع رفع الأسرار للإنترنت عن طريق الخطأ.


---

## 🤖 القسم الخامس: تشغيل النظام السحري وتصنيع الداتا (The Ingestion Prompt)

هانحن وصلنا للحظة الـ **Vibe Coding** الفعلية. الآن أنت لن تكتب الكود، بل ستخبر البرنامج "ما المخرجات والأفعال التي ترغب بها وتتركه يكتب سكريبتات بايثون لتنفيذها ومطابقتها وتوليد المعالجة".

1. من داخل الـ IDE، افتح نافذة الدردشة (الـ AI Chat / Composer).
2. تأكد من أن الـ AI قادر على رؤية هيكل المجلدات وملف الـ `.env`.
3. انسخ هذا البرومبت (Prompt) بالكامل، الصقه، واضغط إرسال:

> Act as an elite Data Engineer and Growth Strategy Analyst. Your objective is to build a modular Python data pipeline to audit a client's entire marketing, sales, and web ecosystem.
> 
> **Important:** Read the `.env` file first for all API credentials and configuration. Save all fetched data to the output directories specified in `.env` (`META_OUTPUT_DIR`, `TIKTOK_OUTPUT_DIR`, `GOOGLE_OUTPUT_DIR`). Read Shopify CSV reports from `SHOPIFY_INPUT_DIR`. If any API returns an error or a token is missing, log the error clearly and continue processing the remaining data sources.
> 
> **1. Data Ingestion (Handle rate limits and pagination securely):**
> Connect to Meta, TikTok, and Google Ads APIs using credentials in `.env`. Fetch full-funnel performance metrics (Spend, CPA, CPM, CTR, ROAS) per campaign for the date range specified in `ANALYSIS_SINCE` and `ANALYSIS_UNTIL`.
> Fetch organic post metrics (Reach, Engagement, Saves) across pages.
> Extract the last 1,000 customer DMs and comments (Anonymize PII — remove names, phone numbers, emails).
> Parse the local Shopify CSV reports from the `SHOPIFY_INPUT_DIR` folder.
> Web Audit: Crawl the `TARGET_WEBSITE_URL` provided in the `.env`. Run a performance and SEO check (simulating Lighthouse/PageSpeed). Scrape the main landing page copy and structure.
> 
> **2. Processing, NLP & CRO Analysis:**
> Merge all data streams based on timestamps and the attribution windows specified in `META_ATTRIBUTION_WINDOWS`.
> Run NLP sentiment/intent analysis on DMs to categorize drop-off reasons (e.g., 'Pricing', 'Shipping', 'Trust', 'Product Quality').
> Message Match Analysis: Compare the top-performing Ad copy with the scraped Landing Page copy. Flag any inconsistencies in the offer or value proposition.
> UX/Speed Check: Identify if slow load times or broken links correlate with high bounce rates from specific ad campaigns.
> 
> **3. Output & Strategy:**
> Generate a comprehensive `360_Audit_Report.md` in the project root containing:
> Executive Summary: Blended ROAS and overall ecosystem health.
> Funnel Bottlenecks: Precisely where users drop off (Ad Creative vs. Landing Page UX vs. Sales Rep Replies).
> Web & CRO Health: Landing page loading speed, SEO gaps, and friction points in the user journey.
> Actionable Fixes: A prioritized, bulleted list of immediate technical and marketing changes required for scaling.
> Campaign Optimization Flags: If any campaign is set to `OUTCOME_ENGAGEMENT` instead of `OUTCOME_SALES`, flag it as a critical misconfiguration.

### ماذا سيحدث هنا؟
ستشاهد الـ AI يبدأ بفتح نافذة الموجه (Terminal)، ويثبت مكاتب بايثون اللازمة (مثل `requests` و `pandas`). ثم يقوم بكتابة السكريبت وتشغيله لسحب الفواتير من الـ APIs، ثم مقارنتها وتمرير تحليل الداتا اللغوية (NLP)، وأخيراً سيقوم بكتابة ملف نهائي باسم `360_Audit_Report.md` في مجلدك الأساسي!


---

## 💼 القسم السادس: محاكات اجتماع مديري الشركة والخروج بدليل النمو المستقبلي (The Board Prompt)

البيانات خام بمفردها لا تكفي؛ نحتاج للقرارات! بعد خروج تقرير البيانات الكلي `360_Audit_Report.md`، سنخبر الـ AI في محادثة جديدة أو استكمالاً للسابقة ليتصرف كأنه (مجلس إداري مشكل من مدراء النمو والمبيعات).

انسخ وأرسل هذا الـ Prompt:

> Act as a Virtual Board of Directors consisting of a Chief Growth Officer, a Sales Director, and a Data Scientist. Your goal is to synthesize all retrieved data into a high-level Growth Strategy.
> 
> **Context:** Read the `360_Audit_Report.md` generated by the previous data pipeline, along with all data files in the `./meta`, `./tiktok`, `./google`, and `./shopify` directories. Also read the financial parameters from `.env`.
> 
> **1. Data Ingestion & Financial Modeling:**
> Process all collected data from the audit report and raw data files.
> Use the financial metrics in `.env` (Margin, Shipping, Returns, Delivery) to calculate the True Break-Even ROAS for each product and channel.
> Analyze customer conversations to find the 'Hidden Objections' that are killing the conversion rate.
> 
> **2. The Strategic Debate (Simulation):**
> Marketing Perspective: Debate which channels should be scaled vs. killed based on the Actual Delivered Profit, not just Shopify's reported ROAS.
> Sales Perspective: Analyze chat logs to highlight where the sales scripts are failing and suggest better objection-handling based on the customer's sentiment.
> Operations Perspective: Factor in the Return Rate and Delivery Rate to identify if specific locations or products are draining the budget.
> 
> **3. Output: The Growth Blueprint (`Growth_Strategy_2026.md`):**
> The Hard Truths: Direct feedback on why the current strategy is failing or succeeding.
> Break-Even Matrix: A table showing exactly what ROAS we need to stay profitable after all costs.
> Offer Engineering: Suggest 3 specific offers (bundles, discounts, or loyalty plays) that optimize the AOV while staying above the break-even point.
> The 90-Day Roadmap: A week-by-week plan for scaling spend, refreshing creatives, and optimizing the landing page based on the web audit.

### ماذا سيحدث هنا؟
ستجد ملفاً جديداً ظهر باسم `Growth_Strategy_2026.md`. هذا الملف سيحتوي على:
1. **The Hard Truths (الواقع المر):** تشخيص لمشاكل لم تكن مرئية قط.
2. **Break-Even Matrix:** جدول تفصيلي يخبرك حرفياً بالـ ROAS الذي إذا نزل عنه الإعلان تخسر فلوسك بعد كل التكاليف (المرتجعات والشحن).
3. **90-Day Roadmap:** تقويم استراتيجي لما يجب على الـ Media Buyer والـ Web Developer فعله خلال الـ 3 شهور القادمة.


---

## 📋 القسم السابع: التحقق من Meta Pixel (خطوة لا تفوّتها!)

قبل أن تثق في أي رقم من أرقام Meta، يجب أن تتأكد أولاً أن الـ Pixel مركب ويعمل بشكل صحيح:

### أداة Meta Pixel Helper (إضافة كروم):
1. حمّل إضافة **[Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)** من متجر Chrome.
2. بعد التثبيت، ادخل على موقعك (المتجر).
3. ستظهر أيقونة الإضافة في شريط المتصفح. اضغط عليها.
4. **يجب أن ترى الـ Events التالية تعمل بشكل صحيح:**
   - `PageView`: يظهر عند دخول أي صفحة.
   - `ViewContent`: يظهر عند فتح صفحة منتج.
   - `AddToCart`: يظهر عند الإضافة للسلة.
   - `InitiateCheckout`: يظهر عند بدء الدفع.
   - `Purchase`: يظهر بعد إتمام الشراء (الأهم!).
5. **إذا كان أي Event مفقوداً** (خصوصاً Purchase)، فهذا يعني أن Meta لا يمكنه تتبع المبيعات الحقيقية، وكل أرقام الـ CPA والـ ROAS ستكون خاطئة!

> ⚠️ **تحذير:** لو وجدت أن الـ Pixel مثبت لكنه لا يسجل `Purchase` events، تحقق من إعدادات الـ Pixel في Shopify عبر: **Settings → Apps → Meta → Data sharing level** وتأكد أنه على **Maximum**.


---

## ⚡ القسم الثامن: الأخطاء الشائعة والاكتشافات الخطيرة (Gotchas)

هذه الأخطاء هي ما اكتشفناها بالفعل أثناء تشغيل الـ Pipeline. احذر منها:

### 1. كارثة هدف الحملة (Campaign Objective Misconfiguration)
- **المشكلة:** الحملة الإعلانية معمولة بهدف `OUTCOME_ENGAGEMENT` (يعني بتجيب ناس تتصفح وتمشي) بدلاً من `OUTCOME_SALES` (ناس فعلاً بتشتري).
- **الأثر:** Meta يعرض الإعلان لأشخاص يحبون الضغط والتفاعل لكنهم لا يشترون أبداً.
- **الإصلاح:** غيّر هدف الحملة فوراً من `OUTCOME_ENGAGEMENT` إلى **`OUTCOME_SALES`** والـ Optimization من `LANDING_PAGE_VIEWS` إلى **`PURCHASE`**.

### 2. خدعة الـ CPA الرخيص (Fake CPA)
- **المشكلة:** قسمة إجمالي إنفاق الإعلانات على **جميع** الطلبات (بما فيها الأورجانيك).
- **الأثر:** يظهر لك CPA رخيص جداً (مثلاً 4.85 ج.م) بينما الحقيقي **398 ج.م**!
- **الإصلاح:** استخدم طريقة الـ Attribution الصحيحة عبر ShopifyQL أو الـ GraphQL لفلترة الطلبات التي جاءت فعلاً من الإعلانات.

### 3. غياب UTM Parameters
- **المشكلة:** الإعلانات لا تحتوي على UTM Parameters.
- **الأثر:** Shopify لا يعرف أن هذا العميل جاء من إعلان ميتا، فيظهر كـ "Direct".
- **الإصلاح:** أضف دائماً في كل إعلان: `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}`

### 4. الـ Add-to-Cart Rate المنخفض جداً
- **العلامة:** نسبة الإضافة للسلة أقل من 1% من Landing Page Views.
- **المعنى:** المشكلة ليست في الإعلان فقط، بل في صفحة المنتج نفسها (السعر، الصور، الوصف، سرعة التحميل).

---

## 📊 القسم التاسع: مثال حقيقي على مخرجات النظام (Case Study)

هذا مقتطف حقيقي مما اكتشفه النظام عند تشغيله على مشروع فعلي:

### النتائج الصادمة (7 أيام فقط):

| المؤشر | ما كان يقوله Meta | الحقيقة (بعد التحليل) |
|--------|-------------------|---------------------|
| CPA (تكلفة الأوردر) | ~4.85 ج.م | **~398 ج.م** |
| عدد الأوردرات من الإعلانات | 21 | **3 فقط** |
| هدف الحملة | يبدو أنه Sales | **ENGAGEMENT (مش Sales!)** |
| Add-to-Cart Rate | غير واضح | **0.29%** (ضعيف جداً) |

### كيف اكتشفنا ذلك؟
1. سحبنا من Meta API بيانات الحملة واكتشفنا أن الـ Optimization Event هو `LANDING_PAGE_VIEWS` وليس `PURCHASE`.
2. من ShopifyQL، سحبنا الأوردرات حسب مصدر الترافيك واكتشفنا أن معظمها "Direct" وليس "Facebook".
3. من الـ GraphQL `customerJourneySummary`، تأكدنا أن 3 أوردرات فقط كان أول مصدر لها هو `utm_source=facebook`.
4. النتيجة: الميديا باير كان يصرف على جمهور يبحث عن محتوى مش جمهور يشتري!

> **الخلاصة:** بدون هذا النظام، كنا سنستمر في ضخ الميزانية في حملة لا تجلب سوى 3 أوردرات أسبوعياً بتكلفة 398 ج.م للأوردر الواحد!


---

## 🔮 القسم العاشر: الخطوات القادمة والاستخدام المتقدم

بعد أن أصبح النظام يعمل، إليك طرق لتطويره والاستفادة منه بشكل أعمق:

### 1. الجدولة الأسبوعية (Weekly Automation)
- يمكنك أتمتة تشغيل السكريبت أسبوعياً باستخدام أدوات مثل **n8n** أو **Make (Integromat)** أو حتى **Windows Task Scheduler**.
- اجعل التقرير يُرسل تلقائياً إلى بريدك الإلكتروني أو قناة Slack كل يوم اثنين.

### 2. ربط الداتا بـ Google Sheets / Dashboard
- اطلب من الـ AI في Prompt إضافي أن يصدّر البيانات كملف CSV.
- اربط الـ CSV بـ Google Sheets عبر Google Apps Script لتحديث تلقائي.
- أنشئ Dashboard على **Looker Studio** (مجاني من Google) لتصور البيانات بشكل بصري.

### 3. تحليل المنافسين
- أضف في الـ Prompt طلب لسحب بيانات الـ Facebook Ad Library الخاصة بالمنافسين.
- قارن بين أداء إعلاناتك وأنماط إعلاناتهم (Creative Formats, Landing Pages).

### 4. تتبع التغييرات عبر الزمن
- احتفظ بملفات الـ `360_Audit_Report.md` و `Growth_Strategy_2026.md` بتواريخ مختلفة.
- اطلب من الـ AI مقارنة تقريرَيْن لمعرفة مسار التحسن أو التراجع.

---

## 🎯 الخلاصة

ما فعلته الآن يُمثل أحدث طفرة في الـ Automation. لقد وفّرت على نفسك أسابيع من الجهد الإداري الممل والتخمينات، ونقلت تركيز فريقك نحو وضع إستراتيجيات الـ Scaling وصناعة المحتوى والإبداع بدلاً من الانغماس والموت بين أروقة الإكسيل شيت والتقارير المشتتة.

أنت لم تعد محللاً تقليدياً يبحث عن الإجابات، بل أصبحت تدير **مدراء افتراضيين** يستخرجون الإجابات من سيرفرات المنصات بشكل مباشر ودون أعذار.

هذا هو **Vibe Coding** الحقيقي في عالم التسويق الرقمي: إنك تستخدم الذكاء الاصطناعي لبناء أدوات أتمتة تخلص لك شغلك المكرر والمعقد من غير ما تكون Software Engineer ولا تكتب سطر كود بإيدك.

**وفّر وقتك ومجهودك للـ Strategy والـ Scaling، وسيب الـ AI يعمل الـ Data Crunching.**
