export const ASSESSMENT_ID = 'octaholic-ai-workshop-2026';
export const ASSESSMENT_COMPANY = 'Octaholic';

export type QuestionType = 'choice' | 'scale' | 'text';
export type QuestionMode = 'standard' | 'scenario';

export type AssessmentQuestion = {
  id: string;
  type: QuestionType;
  mode?: QuestionMode;
  prompt: string;
  helper?: string;
  options?: string[];
};

export type AssessmentPosition = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  questions: AssessmentQuestion[];
};

export const assessmentPositions: AssessmentPosition[] = [
  {
    id: 'management',
    label: 'الإدارة',
    shortLabel: 'Management',
    description: 'تقييم رؤية الإدارة، جاهزية الفريق، وطريقة تبني أدوات AI بعد الورشة.',
    questions: [
      {
        id: 'management-1',
        type: 'choice',
        prompt: 'إيه اللي دفعكم تطلبوا ووركشوب AI دلوقتي تحديداً؟',
        options: [
          'شفنا المنافسين بيستخدموه',
          'عايزين نوفر وقت الفريق',
          'كلايت طلب منا ده',
          'فضول عام بس مش عارفين من فين نبدأ',
        ],
      },
      {
        id: 'management-2',
        type: 'scale',
        prompt: 'على مقياس من 1 لـ5، الفريق دلوقتي بيستخدم الـ AI إزاي؟',
        helper: '1 = مش بيستخدموه خالص، 5 = بيستخدموه يومياً',
      },
      {
        id: 'management-3',
        type: 'choice',
        prompt: 'إيه أكتر مشكلة بتواجهوها يومياً في الشغل؟',
        options: [
          'بطء في إنتاج المحتوى',
          'صعوبة في التواصل مع الكلايت',
          'وقت طويل في التقارير والأدمن',
          'جودة الشغل بتتفاوت من شخص لشخص',
        ],
      },
      {
        id: 'management-4',
        type: 'text',
        prompt: 'لو هتوصف الـ ideal outcome من السيشن ده في جملة واحدة، هتقول إيه؟',
      },
      {
        id: 'management-5',
        type: 'choice',
        prompt: 'إيه الأهم بالنسبالكم من السيشن؟',
        options: [
          'الفريق يعرف يستخدم أدوات AI في شغله اليومي',
          'توفير وقت وتكلفة على الشركة',
          'مستوى الشغل يطلع أحسن وأسرع',
          'الفريق يبقى updated مع التريند',
        ],
      },
      {
        id: 'management-6',
        type: 'choice',
        prompt: 'في ميزانية للاشتراك في أدوات AI مدفوعة بعد الووركشوب؟',
        options: ['أيوه، عندنا ميزانية جاهزة', 'ممكن لو الفائدة واضحة', 'بنفضل free tools بس', 'لسه مش متحدد'],
      },
      {
        id: 'management-7',
        type: 'text',
        prompt: 'في شخص في الفريق شايف إنه الأكتر استعداد يتبنى الـ AI؟ وليه؟',
      },
      {
        id: 'management-8',
        type: 'choice',
        mode: 'scenario',
        prompt: 'لو الفريق خلص الووركشوب وبعدين رجع لنفس أسلوبه القديم، إيه اللي بيحصل عادةً عندكم في الشركة؟',
        options: [
          'بنعمل follow-up session',
          'بنحدد KPIs وبنتابع',
          'مش بنعمل حاجة، الموضوع بيموت لوحده',
          'بنحاول نعمل accountability system',
        ],
      },
      {
        id: 'management-9',
        type: 'choice',
        prompt: 'مين اللي هيحضر الووركشوب؟',
        options: ['الفريق بس', 'الفريق + الإدارة', 'الإدارة بس عشان تقرر هتعمل إيه', 'كل الشركة'],
      },
      {
        id: 'management-10',
        type: 'text',
        prompt: 'في خوف معين عندكم من استخدام الـ AI؟ (جودة، سرية معلومات، اعتماد زيادة عليه...)',
      },
      {
        id: 'management-11',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: موظف قالكم "الـ AI هياخد شغلي" وبقى مش متحمس. إيه ردكم عادةً؟',
        options: [
          'بنطمنه إن ده مش هيحصل',
          'بنوضنله إن اللي مش بيستخدم AI هو اللي في خطر',
          'بنتجاهل الموضوع',
          'مش واجهنا الموقف ده قبل كده',
        ],
      },
      {
        id: 'management-12',
        type: 'scale',
        prompt: 'قد ايه الفريق بيكمل على أدوات جديدة لما بيتعلمها؟',
        helper: '1 = بيسيبوها بسرعة، 5 = بيتبنوها وبيطوروا فيها',
      },
      {
        id: 'management-13',
        type: 'text',
        prompt: 'في رول معين في الفريق شايفين إن AI ممكن يساعده أكتر من غيره؟ وليه؟',
      },
      {
        id: 'management-14',
        type: 'choice',
        prompt: 'إيه التوقع للوقت اللي الفريق محتاجه عشان يبدأ يطبق بعد الووركشوب؟',
        options: ['فوراً نفس اليوم', 'خلال أسبوع', 'محتاجين شهر مع متابعة', 'مش متوقع يطبقوا لوحدهم'],
      },
      {
        id: 'management-15',
        type: 'text',
        mode: 'scenario',
        prompt: 'لو قلنا الـ AI هو "موظف جديد عندكم"، هتكون وظيفته الأساسية إيه في شركتكم؟',
      },
    ],
  },
  {
    id: 'content-creator',
    label: 'Content Creator',
    shortLabel: 'Content',
    description: 'تقييم طريقة التفكير، الكتابة، استقبال الفيدباك، واستخدام AI في إنتاج المحتوى.',
    questions: [
      {
        id: 'content-1',
        type: 'choice',
        prompt: 'كام سنة بتشتغل Content Creator؟',
        options: ['أقل من سنة', '1 - 2 سنة', '3 - 5 سنين', 'أكتر من 5 سنين'],
      },
      {
        id: 'content-2',
        type: 'choice',
        prompt: 'إيه النوع الأكتر اللي بتنتجه؟',
        options: ['كابشن سوشيال ميديا', 'مقالات / بلوج', 'سكريبت فيديو', 'إيميلات ونيوزليتر'],
      },
      {
        id: 'content-3',
        type: 'scale',
        prompt: 'على مقياس 1 لـ5، قد ايه بتحس إن الكتابة بيجي بسهولة طبيعية معاك؟',
        helper: '1 = بيتعبني جداً، 5 = بيجي أوتوماتيك',
      },
      {
        id: 'content-4',
        type: 'choice',
        prompt: 'لما بتقعد تكتب بوست، بتبدأ إزاي عادةً؟',
        options: [
          'بيجيلي الفكرة وباكتب على طول',
          'بعمل outline الأول وبعدين باكتب',
          'بدور على inspiration من posts تانية',
          'بفضل أفكر وبتأجل الكتابة',
        ],
      },
      {
        id: 'content-5',
        type: 'text',
        prompt: 'وصف يوم شغل عادي بتاعك من أول ما تصحى لغاية ما تخلص؟',
      },
      {
        id: 'content-6',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: عندك deadline بكره الصبح وعندك 5 بوستات لازم تكتبهم ومش عندك أي أفكار. بتعمل إيه؟',
        options: [
          'بضغط على نفسي وبكتب',
          'بدور على content من المنافسين عشان أتعلم',
          'بطلب extension',
          'بعمل حاجة تانية وبعدين بحاول تاني',
        ],
      },
      {
        id: 'content-7',
        type: 'scale',
        prompt: 'قد ايه بتتأثر بـ feedback الكلايت على الكتابة بتاعتك؟',
        helper: '1 = مش بيأثر فيا خالص، 5 = بيأثر جداً',
      },
      {
        id: 'content-8',
        type: 'choice',
        prompt: 'جربت أي AI writing tool قبل كده؟',
        options: ['لأ خالص', 'جربت ChatGPT بس مرة أو اتنين', 'بستخدمه أحياناً', 'بستخدمه بشكل منتظم'],
      },
      {
        id: 'content-9',
        type: 'choice',
        mode: 'scenario',
        prompt: 'لو استخدمت ChatGPT يكتبلك بوست، حاسس بإيه؟',
        options: [
          'مرتاح، المهم الشغل يخلص',
          'مش مرتاح، حاسس إنها مش أفكاري',
          'مرتاح لو أنا عدلت عليه',
          'خايف الكلايت يكتشف',
        ],
      },
      {
        id: 'content-10',
        type: 'text',
        prompt: 'إيه أكتر جزء في شغلك بتحبه؟ وإيه اللي بتكرهه؟',
      },
      {
        id: 'content-11',
        type: 'choice',
        prompt: 'لما الكلايت بيرفض البوست اللي كتبته، أول إحساس عندك إيه؟',
        options: ['بزعل من نفسي', 'بزعل منه هو', 'بحاول أفهم المشكلة وأعدل', 'بعتبره normal وبتابع'],
      },
      {
        id: 'content-12',
        type: 'scale',
        prompt: 'قد ايه بتحس إنك "stuck" أو خلاص أفكارك خلصت؟',
        helper: '1 = نادراً، 5 = كتير جداً',
      },
      {
        id: 'content-13',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: طلب منك تكتب محتوى لـ brand في مجال مش عارفه خالص. بتعمل إيه؟',
        options: ['بقرأ عن المجال الأول', 'بسأل الكلايت يشرحلي', 'بكتب عام وبشوف رد فعله', 'بشعر بإنهيار 😅'],
      },
      {
        id: 'content-14',
        type: 'choice',
        prompt: 'بتكتب عادةً بالعربي ولا الإنجليزي؟',
        options: ['عربي بس', 'إنجليزي بس', 'الاتنين بالتساوي', 'حسب الكلايت'],
      },
      {
        id: 'content-15',
        type: 'choice',
        prompt: 'لما بتوصف نفسك، إيه اللي يوصفك أكتر؟',
        options: [
          'المبدع اللي بيحب يجرب أفكار جديدة',
          'المنظم اللي بيشتغل على structure واضح',
          'اللي بيحب يفهم الجمهور وبيكتب ليهم',
          'اللي بيحب السرعة والإنتاجية',
        ],
      },
      {
        id: 'content-16',
        type: 'scale',
        prompt: 'قد ايه بتحس بـ ownership تجاه المحتوى اللي بتكتبه؟',
        helper: '1 = مجرد شغل، 5 = ده جزء من هويتي',
      },
      {
        id: 'content-17',
        type: 'text',
        prompt: 'لو عندك أداة بتساعدك تكتب 3 مرات أسرع، بس الأسلوب هيبقى مختلف شوية عن أسلوبك، هتستخدمها؟ ليه؟',
      },
      {
        id: 'content-18',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: صاحبك كونتنت كريتور زيك قالك "أنا بستخدم AI وبعمل شغل 3 كلايت في وقت ما كنت بعمل 1". ردك الداخلي إيه؟',
        options: [
          'مبهور وعايز أعرف أعمل نفسه',
          'مش مصدق إن الجودة بتبقى كويسة',
          'مش مهتم، أنا بفضل أسلوبي',
          'قلقان على مستقبلي',
        ],
      },
      {
        id: 'content-19',
        type: 'choice',
        prompt: 'إيه أكتر حاجة بتستهلك وقتك في اليوم من غير ما تحس بإنها بتفيد؟',
        options: [
          'التعديلات الكتير من الكلايت',
          'Revisions على نفس الموضوع أكتر من مرة',
          'التفكير الطويل قبل الكتابة',
          'الاجتماعات والمتابعة',
        ],
      },
      {
        id: 'content-20',
        type: 'text',
        prompt: 'لو قدرت تغير حاجة واحدة بس في طريقة شغلك دلوقتي، هتغير إيه؟',
      },
    ],
  },
  {
    id: 'graphic-designer',
    label: 'Graphic Designer',
    shortLabel: 'Design',
    description: 'تقييم workflow التصميم، علاقة المصمم بالـ references، وإحساسه تجاه AI visuals.',
    questions: [
      {
        id: 'design-1',
        type: 'choice',
        prompt: 'كام سنة بتشتغل Graphic Design؟',
        options: ['أقل من سنة', '1 - 2 سنة', '3 - 5 سنين', 'أكتر من 5 سنين'],
      },
      {
        id: 'design-2',
        type: 'choice',
        prompt: 'إيه البرامج الأساسية اللي بتستخدمها؟',
        options: ['Photoshop / Illustrator', 'Figma / XD', 'Canva بشكل أساسي', 'Canva + Adobe مع بعض'],
      },
      {
        id: 'design-3',
        type: 'choice',
        prompt: 'إيه نوع الشغل الأكتر اللي بتعمله؟',
        options: ['سوشيال ميديا posts وstories', 'هوية بصرية وبراندينج', 'إعلانات وbanners', 'تصميم مواقع أو UX/UI'],
      },
      {
        id: 'design-4',
        type: 'scale',
        prompt: 'على مقياس 1 لـ5، قد ايه التصميم بيجي من خيالك مباشرةً من غير ما تدور على أمثلة؟',
        helper: '1 = دايماً محتاج reference، 5 = بيجي من دماغي مباشرة',
      },
      {
        id: 'design-5',
        type: 'text',
        prompt: 'وصف الـ workflow بتاعك من لما بتاخد البريف لحد ما تسلم الشغل؟',
      },
      {
        id: 'design-6',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: الكلايت بعتلك بريف ناقص جداً "عايز تصميم احترافي للبراند بتاعنا". بتعمل إيه؟',
        options: [
          'بسأل أسئلة كتير قبل ما أبدأ',
          'بعمل 2-3 options مختلفة وبشوف يعجبه إيه',
          'بعمل اللي بيبان صح في دماغي',
          'بزعل من البريف الركيك 😅',
        ],
      },
      {
        id: 'design-7',
        type: 'choice',
        prompt: 'جربت AI image generation قبل كده؟ (Midjourney, DALL-E, Firefly)',
        options: [
          'لأ خالص وبفضل أعمل كل حاجة بنفسي',
          'سمعت عنه بس مجربتش',
          'جربته مرة أو اتنين',
          'بستخدمه أحياناً في شغلي',
        ],
      },
      {
        id: 'design-8',
        type: 'scale',
        prompt: 'قد ايه التعديلات من الكلايت بتتعبك نفسياً؟',
        helper: '1 = مش بتأثر فيا، 5 = بتأثر جداً في حماسي',
      },
      {
        id: 'design-9',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: AI عمل visual concept كامل في 10 ثواني، بس محتاج تعديل وإنتا تكمّله. حاسس إيه؟',
        options: [
          'مبسوط، وفّر عليا الجزء الصعب',
          'مش مرتاح، حاسس إن ده مش تصميمي',
          'حيادي، المهم الناتج النهائي',
          'خايف أبقى مش محتاج في المستقبل',
        ],
      },
      {
        id: 'design-10',
        type: 'choice',
        prompt: 'لما بتعمل concept جديد، بتاخد منك قد ايه عادةً؟',
        options: ['أقل من ساعة', 'ساعة لـ3 ساعات', 'نص يوم', 'يوم كامل أو أكتر'],
      },
      {
        id: 'design-11',
        type: 'text',
        prompt: 'إيه أكتر تصميم عملته وفخور بيه؟ وليه؟',
      },
      {
        id: 'design-12',
        type: 'choice',
        prompt: 'لما بتوصف نفسك كـ designer، إيه اللي يعبر عنك أكتر؟',
        options: [
          'المبدع اللي بيحب التجريب والأفكار الجديدة',
          'المنظم اللي بيحب الـ grid والـ structure',
          'اللي بيركز على راحة المستخدم والـ UX',
          'اللي بيشتغل بسرعة ويسلم في الوقت',
        ],
      },
      {
        id: 'design-13',
        type: 'scale',
        prompt: 'قد ايه بتحس بـ ownership قوي تجاه تصاميمك؟',
        helper: '1 = مجرد شغل، 5 = ده فن وجزء مني',
      },
      {
        id: 'design-14',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: مصمم تاني في نفس مستواك بدأ يستخدم AI وبقى يخلص ضعف شغلك في نفس الوقت. ردك؟',
        options: [
          'هحاول أتعلم نفس الأدوات بسرعة',
          'مش مهتم، جودة شغلي مختلفة',
          'هحاول أتعلم بس خايف يأثر على أسلوبي',
          'مش مصدق إن جودته نفس جودتي',
        ],
      },
      {
        id: 'design-15',
        type: 'choice',
        prompt: 'أكتر حاجة ممكن تخلص وقتك من غير ما تحس بإنها مفيدة؟',
        options: [
          'تعديلات صغيرة ومتكررة على نفس العميل',
          'عمل resize لنفس التصميم على dimensions مختلفة',
          'البحث عن inspiration وmockups',
          'التعامل مع ملفات قديمة غير منظمة',
        ],
      },
      {
        id: 'design-16',
        type: 'text',
        prompt: 'وصف أصعب كلايت اتعاملت معه وإزاي تعاملت معه؟',
      },
      {
        id: 'design-17',
        type: 'choice',
        prompt: 'لو AI قدر يعمل 10 options مختلفة لتصميم في دقيقة، هتحس بإيه؟',
        options: [
          'رائع، هختار أحسن واحد وأكمل',
          'هيبقى overwhelming ومش هعرف أختار',
          'هستخدمه كـ starting point بس',
          'مش هستخدمه، بفضل أفكاري',
        ],
      },
      {
        id: 'design-18',
        type: 'scale',
        prompt: 'قد ايه بتتابع التريند في عالم التصميم؟',
        helper: '1 = نادراً، 5 = يومياً',
      },
      {
        id: 'design-19',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: كلايت طلب منك تصميم بأسلوب مختلف تماماً عن اللي بتحبه. بتعمل إيه؟',
        options: [
          'بعمله وبسيب رأيي جنب',
          'بقوله رأيي وبقترح حاجة تانية',
          'بعمله بس بحاول أضيف لمسة من أسلوبي',
          'برفض لو مش مناسب لـ brand values',
        ],
      },
      {
        id: 'design-20',
        type: 'text',
        prompt: 'لو قدرت توصف نفسك في 3 كلمات كـ designer، إيه هما؟',
      },
    ],
  },
  {
    id: 'media-buyer',
    label: 'Media Buyer',
    shortLabel: 'Media',
    description: 'تقييم طريقة قراءة الأرقام، القرارات تحت الضغط، واستخدام AI في التحليل والتجارب.',
    questions: [
      {
        id: 'media-1',
        type: 'choice',
        prompt: 'كام سنة بتشتغل Media Buying؟',
        options: ['أقل من سنة', '1 - 2 سنة', '3 - 5 سنين', 'أكتر من 5 سنين'],
      },
      {
        id: 'media-2',
        type: 'choice',
        prompt: 'على إيه بتشغل الإعلانات أكتر؟',
        options: ['Meta (Facebook / Instagram) بس', 'Google Ads بس', 'Meta + Google مع بعض', 'TikTok + Meta'],
      },
      {
        id: 'media-3',
        type: 'choice',
        prompt: 'الـ ad copy بتكتبها إزاي؟',
        options: [
          'بكتبها بنفسي من دماغي',
          'بستلهم من إعلانات المنافسين',
          'بطلبها من الكونتنت تيم',
          'بجرب كذا نسخة وبشوف الأحسن',
        ],
      },
      {
        id: 'media-4',
        type: 'scale',
        prompt: 'قد ايه بتحس إنك "مسيطر" على الـ campaigns وفاهم الأرقام بشكل كامل؟',
        helper: '1 = الأرقام بتربكني أحياناً، 5 = الأرقام زي لغتي الأم',
      },
      {
        id: 'media-5',
        type: 'text',
        prompt: 'وصف الـ routine اليومي بتاعك في إدارة الإعلانات؟',
      },
      {
        id: 'media-6',
        type: 'choice',
        prompt: 'لما campaign بتفشل، أول حاجة بتعملها؟',
        options: ['باوقفها فوراً', 'بغير الـ targeting', 'بغير الـ creative والـ copy', 'بحلل الأرقام الأول قبل أي قرار'],
      },
      {
        id: 'media-7',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: أداة AI قالتلك "غير الـ budget على الـ ad set ده وزوده 40%" بناءً على بيانات. هتطبق التوصية؟',
        options: [
          'أيوه فوراً، هي شايفة data أكتر مني',
          'هشوف البيانات الأول وبعدين هقرر',
          'لأ، بفضل حكمي أنا',
          'هجرب بمبلغ صغير الأول',
        ],
      },
      {
        id: 'media-8',
        type: 'choice',
        prompt: 'بتعمل A/B testing بانتظام؟',
        options: ['أيوه، دايماً', 'أحياناً لما أفتكر', 'نادراً', 'لأ، مش بعمله'],
      },
      {
        id: 'media-9',
        type: 'scale',
        prompt: 'قد ايه بتحس بضغط لما ROAS بيقل؟',
        helper: '1 = متعود ومش بيأثر فيا، 5 = ضغط شديد',
      },
      {
        id: 'media-10',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: كلايت طلب منك تضاعف الـ leads في نص الوقت ونص الميزانية. ردك؟',
        options: [
          'بقوله مستحيل وبشرحله',
          'بقوله هجرب وبشوف أقدر أعمل إيه',
          'بقوله محتاج يختار: وقت أو ميزانية',
          'بقبل وبضغط على نفسي',
        ],
      },
      {
        id: 'media-11',
        type: 'choice',
        prompt: 'إيه أكتر حاجة بتستهلك وقتك من غير فايدة؟',
        options: [
          'عمل التقارير وتجميع الأرقام',
          'الرد على تساؤلات الكلايت على الأداء',
          'التفكير في الـ creatives الجديدة',
          'مشاكل رفض الإعلانات من المنصات',
        ],
      },
      {
        id: 'media-12',
        type: 'text',
        prompt: 'إيه أهم قرار اتخذته في campaign خلى النتايج تتغير 180 درجة؟',
      },
      {
        id: 'media-13',
        type: 'choice',
        prompt: 'لما بتوصف نفسك، إيه اللي يعبر عنك أكتر؟',
        options: [
          'المحلل اللي بيعيش في الأرقام والداتا',
          'المبدع اللي بيفكر في الـ creatives والـ angles',
          'الاستراتيجي اللي بيفكر في الـ big picture',
          'العملي اللي بيركز على النتايج بسرعة',
        ],
      },
      {
        id: 'media-14',
        type: 'scale',
        prompt: 'قد ايه بتثق في قراراتك بناءً على الحدس من غير داتا كاملة؟',
        helper: '1 = مش بثق، لازم داتا، 5 = حدسي قوي وبثق فيه',
      },
      {
        id: 'media-15',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: عندك 3 campaigns شغالين في نفس الوقت وكلهم محتاجين تعديل دلوقتي. بتبدأ بإيه؟',
        options: ['الأعلى في الإنفاق', 'الأقل في الأداء', 'الأقرب للـ deadline', 'بعملهم بالترتيب واحدة واحدة'],
      },
      {
        id: 'media-16',
        type: 'choice',
        prompt: 'كام أكاونت بتدير في نفس الوقت؟',
        options: ['1 - 2', '3 - 5', '6 - 10', 'أكتر من 10'],
      },
      {
        id: 'media-17',
        type: 'text',
        prompt: 'لو في حاجة ممكن تتعلمها في الـ media buying وعايزها بس لسه ماخدتش وقت ليها، هي إيه؟',
      },
      {
        id: 'media-18',
        type: 'scale',
        prompt: 'قد ايه بتحس بـ burnout من إدارة الإعلانات؟',
        helper: '1 = نادراً، 5 = كتير',
      },
      {
        id: 'media-19',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: كلايت بعتلك سكرين شوت لإعلان منافس قايلك "عايزه زيه بالظبط". بتعمل إيه؟',
        options: [
          'بعمله زيه عشان الكلايت عايزه',
          'بعمل حاجة متشابهة بس بضيف اختلاف',
          'بشرحله إن التقليد مش بيشتغل دايماً',
          'بسأله أولاً عن الـ target audience والهدف',
        ],
      },
      {
        id: 'media-20',
        type: 'text',
        prompt: 'لو قدرت تفوّض حاجة واحدة في شغلك لـ AI، هتفوضه إيه؟',
      },
    ],
  },
  {
    id: 'account-manager',
    label: 'Account Manager',
    shortLabel: 'Accounts',
    description: 'تقييم إدارة التواصل، ضغط الكلاينت، التقارير، والمتابعات اليومية.',
    questions: [
      {
        id: 'account-1',
        type: 'choice',
        prompt: 'كام سنة بتشتغل Account Manager؟',
        options: ['أقل من سنة', '1 - 2 سنة', '3 - 5 سنين', 'أكتر من 5 سنين'],
      },
      {
        id: 'account-2',
        type: 'choice',
        prompt: 'كام كلايت بتتعامل معاهم في نفس الوقت؟',
        options: ['1 - 3', '4 - 7', '8 - 12', 'أكتر من 12'],
      },
      {
        id: 'account-3',
        type: 'choice',
        prompt: 'بتتواصل مع الكلايت بشكل أساسي إزاي؟',
        options: ['واتساب بشكل أساسي', 'إيميل بشكل أساسي', 'Zoom/Google Meet', 'مزيج من كل ده'],
      },
      {
        id: 'account-4',
        type: 'scale',
        prompt: 'قد ايه بتحس إنك بتفهم الكلايت وعارف هو محتاج إيه قبل ما يقولهولك؟',
        helper: '1 = صعب أحزر، 5 = بفهمه قبل ما يتكلم',
      },
      {
        id: 'account-5',
        type: 'text',
        prompt: 'وصف أصعب موقف مع كلايت وإزاي حليته؟',
      },
      {
        id: 'account-6',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: كلايت زعلان وبعتلك رسالة طويلة فيها شكوى وانتقاد قوي. أول حاجة بتعملها؟',
        options: [
          'بقراها وبرد فوراً',
          'بقراها وبفضل أفكر في الرد الصح',
          'بتصل بيه على طول عشان مش هينفع إيميل',
          'بقراها وبحتاج وقت عشان مش هعصّب',
        ],
      },
      {
        id: 'account-7',
        type: 'choice',
        prompt: 'بتعمل reports للكلايت؟',
        options: ['أيوه كل أسبوع', 'أيوه كل شهر', 'أحياناً لما يطلبوا', 'نادراً'],
      },
      {
        id: 'account-8',
        type: 'scale',
        prompt: 'قد ايه بتاخد وقت في عمل report واحد؟',
        helper: '1 = أقل من ساعة، 5 = أكتر من 3 ساعات',
      },
      {
        id: 'account-9',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: AI كتبلك draft لإيميل كلايت بناءً على نقط أنت كتبتها. هتبعته زيه؟',
        options: [
          'أيوه، بعد ما بعدل عليه شوية',
          'لأ، بفضل أكتب بأسلوبي أنا',
          'هتعمد منه لكن هكتب من الأول',
          'مش مرتاح إن AI يكتب باسمي',
        ],
      },
      {
        id: 'account-10',
        type: 'choice',
        prompt: 'إيه أكتر حاجة بتتعبك في شغلك؟',
        options: [
          'المتابعة اليومية والرسائل الكتيرة',
          'شرح النتايج للكلايت وإقناعه',
          'التنسيق بين الكلايت والتيم الداخلي',
          'الكلايت اللي بيغيروا رأيهم كتير',
        ],
      },
      {
        id: 'account-11',
        type: 'choice',
        prompt: 'لما بتوصف نفسك، إيه اللي يعبر عنك أكتر؟',
        options: [
          'الدبلوماسي اللي بيوازن بين الكلايت والتيم',
          'المنظم اللي بيحب كل حاجة على سكتها',
          'العلاقاتي اللي بيبني ثقة قوية مع الناس',
          'السريع في الحلول اللي بيحل المشاكل بسرعة',
        ],
      },
      {
        id: 'account-12',
        type: 'text',
        prompt: 'إيه أكتر جملة بتقولها لكلايت زعلان عشان تهدّيه؟',
      },
      {
        id: 'account-13',
        type: 'scale',
        prompt: 'قد ايه بتحس بضغط لما في أكتر من طلب عاجل في نفس الوقت؟',
        helper: '1 = بتعامل بهدوء، 5 = بتضغط جداً',
      },
      {
        id: 'account-14',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: كلايتين طلبوا منك meetings في نفس الوقت وكلاهم مهم. بتعمل إيه؟',
        options: [
          'بحدد أولوية بالأهمية التجارية',
          'بحدد أولوية بمين أكتر إلحاح',
          'بحاول أأخر أحدهم بلطف',
          'بتوتر وبحاول أعمل الاتنين',
        ],
      },
      {
        id: 'account-15',
        type: 'choice',
        prompt: 'بتحفظ follow-ups والمواعيد إزاي؟',
        options: ['في دماغي', 'في notes على الموبايل', 'في CRM أو أداة manage', 'في إيميل بـ reminders'],
      },
      {
        id: 'account-16',
        type: 'text',
        prompt: 'إيه الفرق بينك وبين Account Manager تاني عادي في نظرك؟',
      },
      {
        id: 'account-17',
        type: 'choice',
        prompt: 'الكلايت بيجدد معاك عادةً ليه؟',
        options: [
          'لأني بحقق نتايج',
          'لأن التواصل معايا سهل وسريع',
          'لأني بفهمه وبحل مشاكله قبل ما يحس بيها',
          'لأن السعر مناسب',
        ],
      },
      {
        id: 'account-18',
        type: 'scale',
        prompt: 'قد ايه بتحس بـ ownership تجاه نجاح الكلايت؟',
        helper: '1 = شغل بس، 5 = نجاحه نجاحي',
      },
      {
        id: 'account-19',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: كلايت بعتلك برييف جديد وانت عارف إنه مش هيحقق النتايج اللي هو متوقعها. بتعمل إيه؟',
        options: [
          'بنفذ وبسيب المسؤولية عليه',
          'بقوله رأيي بصراحة وبقترح بديل',
          'بنفذ بس بحدد توقعات واقعية من الأول',
          'بسأل أسئلة أكتر قبل ما أقرر',
        ],
      },
      {
        id: 'account-20',
        type: 'text',
        prompt: 'لو في أداة بتلخصلك محادثات الواتساب مع الكلايت وبتعمللك action items تلقائياً، هتستخدمها؟ ليه؟',
      },
    ],
  },
  {
    id: 'video-editor',
    label: 'Video Editor',
    shortLabel: 'Video',
    description: 'تقييم workflow المونتاج، أكثر الأجزاء المتكررة، ونظرة الـ editor لأدوات AI.',
    questions: [
      {
        id: 'video-1',
        type: 'choice',
        prompt: 'كام سنة بتشتغل Video Editing؟',
        options: ['أقل من سنة', '1 - 2 سنة', '3 - 5 سنين', 'أكتر من 5 سنين'],
      },
      {
        id: 'video-2',
        type: 'choice',
        prompt: 'إيه البرامج الأساسية اللي بتستخدمها؟',
        options: ['Adobe Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Final Cut Pro'],
      },
      {
        id: 'video-3',
        type: 'choice',
        prompt: 'إيه نوع الفيديو الأكتر اللي بتعمله؟',
        options: ['Reels و Short-form content', 'YouTube Videos طويلة', 'إعلانات', 'Corporate / Brand videos'],
      },
      {
        id: 'video-4',
        type: 'scale',
        prompt: 'قد ايه الـ editing بيجي من حدسك من غير ما تفكر كتير؟',
        helper: '1 = بفكر في كل cut، 5 = بيجي أوتوماتيك',
      },
      {
        id: 'video-5',
        type: 'text',
        prompt: 'وصف الـ workflow بتاعك من لما بتاخد الـ footage لحد ما تسلم الفيديو؟',
      },
      {
        id: 'video-6',
        type: 'choice',
        prompt: 'الـ subtitles والـ captions بتعملها إزاي دلوقتي؟',
        options: [
          'بكتبها يدوي',
          'بستخدم auto-caption في Premiere',
          'بستخدم CapCut AI',
          'بستخدم أداة متخصصة زي Descript',
        ],
      },
      {
        id: 'video-7',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: بعتلك فيديو خام 2 ساعة محتاج يبقى Reel 60 ثانية. بتبدأ إزاي؟',
        options: [
          'بتفرج على كل الـ footage الأول',
          'بدور على أحسن moments بسرعة',
          'بسأل صاحب الفيديو عن أهم parts',
          'بحس بالإرهاق قبل ما أبدأ 😅',
        ],
      },
      {
        id: 'video-8',
        type: 'choice',
        prompt: 'جربت أي AI editing tool قبل كده؟',
        options: ['لأ خالص', 'سمعت بس مجربتش', 'جربت Descript أو CapCut AI', 'بستخدم AI tools بانتظام'],
      },
      {
        id: 'video-9',
        type: 'scale',
        prompt: 'قد ايه التعديلات من الكلايت بتأثر على حماسك؟',
        helper: '1 = مش بتأثر خالص، 5 = بتقتل حماسي',
      },
      {
        id: 'video-10',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: AI عمل rough cut كامل للفيديو في دقائق وطلب منك تكمله وتعمل color grading وsound design. حاسس بإيه؟',
        options: [
          'مبسوط، وفّر عليا الجزء الممل',
          'حاسس إن الـ editing مش كافية الآن',
          'مرتاح لو الـ rough cut معقولة',
          'قلقان على مستقبل مجالي',
        ],
      },
      {
        id: 'video-11',
        type: 'choice',
        prompt: 'إيه أكتر جزء ممل في الـ video editing؟',
        options: ['Syncing الأوديو', 'عمل الـ subtitles', 'الـ color correction', 'الـ export وانتظار الـ render'],
      },
      {
        id: 'video-12',
        type: 'text',
        prompt: 'إيه أكتر فيديو عملته وكنت فخور بيه؟ وليه؟',
      },
      {
        id: 'video-13',
        type: 'choice',
        prompt: 'كام فيديو بتخلص في الأسبوع تقريباً؟',
        options: ['1 - 3', '4 - 7', '8 - 15', 'أكتر من 15'],
      },
      {
        id: 'video-14',
        type: 'scale',
        prompt: 'قد ايه بتحس إنك فنان مش بس editor؟',
        helper: '1 = أنا بس بنفذ، 5 = أنا فنان بيعبر',
      },
      {
        id: 'video-15',
        type: 'choice',
        prompt: 'لما بتوصف نفسك، إيه اللي يعبر عنك أكتر؟',
        options: [
          'الـ storyteller اللي بيحكي قصة بالصورة',
          'الـ technician اللي بيتقن الأدوات',
          'الـ fast executor اللي بيخلص بسرعة وجودة',
          'الـ perfectionist اللي مش بيرضى إلا بالأحسن',
        ],
      },
      {
        id: 'video-16',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: الكلايت مش بيفهم الفرق بين فيديو كويس وفيديو ممتاز وبيقولك "خليه زي اللي قبله". بتعمل إيه؟',
        options: [
          'بعمله زيه عشان يريح دماغه ودماغي',
          'بشرحله الفرق وبحاول أقنعه',
          'بعمله أحسن وبسيب رأيه يتغير لوحده',
          'بزعل جوايا بس بنفذ',
        ],
      },
      {
        id: 'video-17',
        type: 'text',
        prompt: 'لو في حاجة في الـ editing بتاعك عايز تتحسن فيها، هي إيه؟',
      },
      {
        id: 'video-18',
        type: 'scale',
        prompt: 'قد ايه بتحس بـ burnout من كتر الشغل؟',
        helper: '1 = نادراً، 5 = كتير',
      },
      {
        id: 'video-19',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: عندك deadline بكره وعندك مشكلة تقنية في الـ export والفيديو مش بيطلع صح. بتعمل إيه؟',
        options: [
          'بدور على solution في YouTube فوراً',
          'بسأل في groups أو communities',
          'بعمل بديل بطريقة تانية',
          'بـ panic وبطلب تمديد',
        ],
      },
      {
        id: 'video-20',
        type: 'text',
        prompt: 'لو قدرت تأتمت جزء واحد من شغلك بالكامل، هيبقى إيه؟',
      },
    ],
  },
  {
    id: 'web-developer',
    label: 'Web Developer',
    shortLabel: 'Web',
    description: 'تقييم حل المشكلات، استخدام AI coding tools، والتعامل مع الكود والـ UX.',
    questions: [
      {
        id: 'web-1',
        type: 'choice',
        prompt: 'كام سنة بتشتغل Web Development؟',
        options: ['أقل من سنة', '1 - 2 سنة', '3 - 5 سنين', 'أكتر من 5 سنين'],
      },
      {
        id: 'web-2',
        type: 'choice',
        prompt: 'إيه الأكتر في شغلك؟',
        options: ['WordPress / Webflow / No-code', 'Frontend فقط (HTML/CSS/JS)', 'Full-stack Development', 'Landing pages وsales funnels'],
      },
      {
        id: 'web-3',
        type: 'choice',
        prompt: 'اللغات اللي بتستخدمها؟',
        options: ['HTML/CSS بس', 'JavaScript / TypeScript', 'PHP / Python', 'أكتر من لغة مع بعض'],
      },
      {
        id: 'web-4',
        type: 'scale',
        prompt: 'قد ايه بتحس إنك قادر تحل أي مشكلة تقنية بتواجهك؟',
        helper: '1 = كتير بلاقي نفسي stuck، 5 = بحل أي حاجة في النهاية',
      },
      {
        id: 'web-5',
        type: 'text',
        prompt: 'وصف آخر project شتغلت عليه وإيه الـ challenge الأكبر فيه؟',
      },
      {
        id: 'web-6',
        type: 'choice',
        prompt: 'لما بتواجه bug صعبة، بتعمل إيه؟',
        options: [
          'بدور على Stack Overflow',
          'بسأل في communities',
          'بحاول أفهمها وأحلها لوحدي',
          'بستخدم AI زي ChatGPT أو Copilot',
        ],
      },
      {
        id: 'web-7',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: AI كتبلك function كاملة بس مش متأكد إنها صح 100%. بتعمل إيه؟',
        options: [
          'براجعها كل سطر وبفهمها',
          'بجربها وبشوف النتيجة',
          'بثق فيها وبستخدمها على طول',
          'مش بستخدم AI في الكود خالص',
        ],
      },
      {
        id: 'web-8',
        type: 'choice',
        prompt: 'جربت GitHub Copilot أو أي AI coding assistant؟',
        options: ['لأ خالص', 'جربته بس مش بستخدمه', 'بستخدمه أحياناً', 'بستخدمه دايماً في شغلي'],
      },
      {
        id: 'web-9',
        type: 'scale',
        prompt: 'قد ايه بتكتب documentation أو comments للكود بتاعك؟',
        helper: '1 = نادراً أو خالص، 5 = دايماً',
      },
      {
        id: 'web-10',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: كلايت طلب feature جديدة وانت عارف إنها هتاخد 3 أيام بس هو مستعجل يومين. بتعمل إيه؟',
        options: [
          'بقوله 3 أيام وبشرح ليه',
          'بحاول أعمله في يومين وبضغط على نفسي',
          'بعمله basic في يومين والباقي بعدين',
          'بسأله يقلل من الـ requirements',
        ],
      },
      {
        id: 'web-11',
        type: 'choice',
        prompt: 'بتشتغل مع فريق ولا لوحدك عادةً؟',
        options: ['لوحدي دايماً', 'أحياناً مع فريق صغير', 'دايماً مع فريق', 'بتفاوت حسب البروجيكت'],
      },
      {
        id: 'web-12',
        type: 'text',
        prompt: 'إيه أكتر project فخور بيه وليه؟',
      },
      {
        id: 'web-13',
        type: 'choice',
        prompt: 'إيه أكتر حاجة بتاخد وقتك من غير ما تحس بفايدة كبيرة؟',
        options: [
          'كتابة الـ boilerplate code المتكررة',
          'الـ debugging الطويل',
          'التواصل وفهم requirements الكلايت',
          'الـ deployment والـ hosting issues',
        ],
      },
      {
        id: 'web-14',
        type: 'scale',
        prompt: 'قد ايه بتحس إنك developer بيفكر في الـ UX والمستخدم مش بس الكود؟',
        helper: '1 = بركز على الكود بس، 5 = دايماً بفكر في المستخدم',
      },
      {
        id: 'web-15',
        type: 'choice',
        prompt: 'لما بتوصف نفسك، إيه اللي يعبر عنك أكتر؟',
        options: [
          'الـ problem solver اللي بيحب الـ challenges',
          'الـ builder اللي بيحب يشوف الحاجة شغالة',
          'الـ perfectionist اللي بيتأكد إن الكود نظيف',
          'الـ fast developer اللي بيخلص بسرعة',
        ],
      },
      {
        id: 'web-16',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: شايف كود قديم في project قابل للتحسين كتير بس الكلايت مش طالبه. بتعمل إيه؟',
        options: [
          'بحسّنه لوحدي من غير ما يعرف',
          'بقوله وبشرح الفايدة',
          'بسيبه عشان مش شغلتي دلوقتي',
          'بحسّن اللي بيأثر على الأداء بس',
        ],
      },
      {
        id: 'web-17',
        type: 'text',
        prompt: 'لو قدرت تتعلم حاجة واحدة جديدة دلوقتي في الـ development، هي إيه؟',
      },
      {
        id: 'web-18',
        type: 'scale',
        prompt: 'قد ايه بتحس بـ imposter syndrome؟ (الإحساس إنك مش كافي أو ناقصك حاجة)',
        helper: '1 = نادراً، 5 = كتير',
      },
      {
        id: 'web-19',
        type: 'choice',
        mode: 'scenario',
        prompt: 'سيناريو: AI tool قدرت تبني بيه landing page كاملة في 20 دقيقة بدل يوم كامل. حاسس بإيه؟',
        options: [
          'مبسوط، وفّر عليا وقت كتير',
          'قلقان إن ده هيأثر على قيمتي',
          'مش مصدق إن الجودة هتبقى كويسة',
          'مرتاح لو أنا راجعت وعدلت عليها',
        ],
      },
      {
        id: 'web-20',
        type: 'text',
        prompt: 'لو قدرت تفوّض حاجة واحدة في شغلك لـ AI من غير أي قلق، هتفوضه إيه؟',
      },
    ],
  },
];

export function getAssessmentPosition(positionId: string) {
  return assessmentPositions.find((position) => position.id === positionId);
}
