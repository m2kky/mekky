export const SITE = {
    name: 'Muhammed Mekky',
    title: 'Marketing Automation Strategist & Performance Trainer',
    tagline: 'CREATE. AUTOMATE. GROW.',
    subtitle: 'Build Smarter. Scale Faster.',
    email: 'Cotact@muhammedmekky.com',
    url: 'https://muhammedmekky.com',
};

export const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Me', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Lectures', href: '/lectures' },
    { label: 'Blog', href: '/blog' },
    { label: 'Consultation', href: '#contact' },
    { label: 'Email Me', href: 'mailto:contact@muhammedmekky.com' },
    { label: 'WhatsApp', href: 'https://wa.me/201016629910' },
];

export const ABOUT = {
    sectionNumber: '01',
    sideLabel: 'The Strategy Behind The System',
    quote:
        'I help businesses and individuals build smarter, scalable systems — bridging marketing, technology, and people.',
    paragraphs: [
        'Muhammed Mekky is a marketing automation strategist and performance trainer who helps businesses and individuals build smarter, scalable systems.',
        'With years of experience across marketing, automation, and AI-driven workflows, Mekky has empowered startups and teams to grow efficiently and work intelligently.',
        'He brings a unique mix of creative strategy, technical precision, and human-centered training — bridging the gap between marketing, technology, and people.',
        'Beyond building systems, Mekky teaches them. Through his workshops and lectures, he shares practical frameworks for automating marketing, scaling performance, and integrating AI into real-world workflows.',
    ],
};

export const SERVICES = {
    sectionNumber: '02',
    sideLabel: 'What I Build',
    title: 'WHAT I CAN DO FOR YOU?',
    subtitle: 'I help teams design scalable systems and growth engines.',
    items: [
        {
            icon: '⚙️',
            title: 'AI & Automation',
            description:
                'Design intelligent workflows that eliminate repetitive tasks. From chatbots to full marketing-automation stacks, I build systems that work while you sleep.',
        },
        {
            icon: '📢',
            title: 'Digital Marketing',
            description:
                'Data-driven campaigns across paid, organic, and content channels. Strategy-first, metrics-obsessed, results-guaranteed.',
        },
        {
            icon: '🖥️',
            title: 'Web Design & Development',
            description:
                'Beautiful, high-performance websites that convert. From portfolios to e-commerce, every pixel is intentional.',
        },
        {
            icon: '👥',
            title: 'Community Management',
            description:
                'Build and nurture online communities that drive loyalty, word-of-mouth, and sustainable growth.',
        },
        {
            icon: '🔧',
            title: 'Team Enablement & Workflow',
            description:
                'Design internal tools, documentation, and SOPs that make your team 10x more productive.',
        },
        {
            icon: '🎓',
            title: 'Training & Workshops',
            description:
                'Hands-on sessions on AI, automation, Notion, and modern productivity. From startups to corporate teams.',
        },
    ],
};

export const STATS = [
    { number: 7, suffix: '+', label: 'Years of Experience' },
    { number: 284, suffix: '+', label: 'Completed Projects' },
    { number: 263, suffix: '+', label: 'Global Clients' },
    { number: 2400, suffix: '+', label: 'People Impacted' },
];

export const PROJECTS = {
    sectionNumber: '03',
    sideLabel: 'Selected Work',
    title: 'FEATURED PROJECTS',
    items: [
        {
            title: 'Mo7a Art',
            slug: 'mo7a-art',
            category: 'Web Design',
            description:
                'A digital art portfolio for painter Mohammed Moustafa Abdeldaiem, designed to reflect his artistic identity through a minimal yet expressive interface.',
            longDescription: 'Mo7a Art is a bespoke digital portfolio designed for fine artist Mohammed Moustafa Abdeldaiem. The goal was to create a space that felt like walking through a gallery — minimal distractions, vast white space, and artwork that speaks for itself. Every interaction was designed to feel intentional, from the smooth page transitions to the way paintings reveal themselves on scroll.',
            image: '/images/projects/mo7a-art.jpg',
            color: '#8B6914',
            tools: ['Figma', 'Next.js', 'GSAP', 'Vercel'],
            results: ['40% increase in portfolio views', 'Featured in design showcase', '3x more gallery inquiries'],
        },
        {
            title: 'Astra',
            slug: 'astra',
            category: 'E-Commerce',
            description:
                'A conceptual Shopify store built for gamer accessories, designed to capture the bold and dynamic energy of the Saudi gaming community.',
            longDescription: 'Astra is a high-energy Shopify store concept targeting the rapidly growing Saudi gaming market. The design language draws from neon aesthetics and futuristic UI patterns common in gaming culture, while maintaining the conversion-focused structure that drives e-commerce results. Custom product pages, animated transitions, and a streamlined checkout flow were the cornerstones.',
            image: '/images/projects/astra.jpg',
            color: '#6B1FB1',
            tools: ['Shopify', 'Liquid', 'Figma', 'After Effects'],
            results: ['Concept approved by client in first review', 'Mobile-first responsive design', 'Under 2s load time'],
        },
        {
            title: 'Chef Ahmed',
            slug: 'chef-ahmed',
            category: 'Web Design',
            description:
                'A professional portfolio website for Chef Ahmed Tarek showcasing his culinary expertise, work experience, and signature dishes.',
            longDescription: 'A premium personal brand website for Chef Ahmed Tarek that tells his culinary story through rich imagery, editorial typography, and smooth scroll-driven animations. The site serves as both a portfolio and a booking platform, connecting high-end clients with the chef\'s services for private dining and events.',
            image: '/images/projects/chef-ahmed.jpg',
            color: '#1B6B3A',
            tools: ['Next.js', 'GSAP', 'Figma', 'Vercel'],
            results: ['5x increase in private dining bookings', 'Average session duration of 4+ minutes', 'Zero bounce on mobile'],
        },
        {
            title: 'Forbed',
            slug: 'forbed',
            category: 'Redesign',
            description:
                'A modern redesign focusing on clean aesthetics and improved user experience for a professional services brand.',
            longDescription: 'Forbed was a complete brand refresh and website redesign. The previous site was outdated and failed to communicate the company\'s premium positioning. We rebuilt everything from the ground up — new visual identity, modern typography, strategic content hierarchy, and a responsive design that works flawlessly across all devices.',
            image: '/images/projects/forbed.jpg',
            color: '#2D4A7A',
            tools: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion'],
            results: ['200% increase in lead generation', 'Bounce rate dropped by 45%', 'Brand perception improved significantly'],
        },
        {
            title: 'Workshop System',
            slug: 'workshop-system',
            category: 'System Design',
            description:
                'A smart scheduling system for workshops, automating registration, reminders, and feedback collection.',
            longDescription: 'This internal system automates the entire lifecycle of a workshop — from registration and payment to automated reminders, attendance tracking, and post-session feedback collection. Built to handle hundreds of concurrent registrations while keeping the admin overhead close to zero.',
            image: '/images/projects/workshop.jpg',
            color: '#EB5E28',
            tools: ['n8n', 'Notion', 'Zapier', 'Google Sheets', 'WhatsApp API'],
            results: ['90% reduction in manual admin work', 'Handles 500+ registrations per session', 'Automated feedback collection with 78% response rate'],
        },
    ],
};

export const CASE_STUDIES = {
    sectionNumber: '03.5',
    sideLabel: 'Deep Dives',
    title: 'CASE STUDIES',
    items: [
        {
            title: 'Automating a 6-Figure Agency',
            category: 'Efficiency',
            description: 'A deep dive into the systems and workflows that scaled a marketing agency by 300%.',
            image: '/images/case-studies/agency-auto.jpg',
            slug: 'automating-agency',
            challenge: 'The agency was drowning in manual processes — client onboarding took 3 days, reporting was done in spreadsheets, and the team spent 60% of their time on repetitive tasks instead of creative strategy.',
            solution: 'We designed and implemented a full automation stack: automated client onboarding via Zapier + Notion, real-time reporting dashboards, AI-powered content scheduling, and a custom CRM workflow that reduced response time to under 1 hour.',
            results: ['300% revenue growth in 8 months', '60% reduction in operational overhead', 'Client onboarding time reduced from 3 days to 2 hours', 'Team freed up 25+ hours per week for creative work'],
        },
        {
            title: 'Global Community Growth',
            category: 'Engagement',
            description: 'How we built a community of 50k+ active members from scratch in 12 months.',
            image: '/images/case-studies/community-growth.jpg',
            slug: 'community-growth',
            challenge: 'Starting from zero — no existing audience, no brand recognition, and a highly competitive niche. The goal was to build a thriving, engaged community that would become a self-sustaining growth engine.',
            solution: 'We implemented a three-phase strategy: Phase 1 was content seeding with high-value educational posts. Phase 2 was community activation through challenges and AMAs. Phase 3 was automated onboarding funnels that turned followers into active participants.',
            results: ['50k+ active members in 12 months', '85% monthly retention rate', 'Community-driven content generates 40% of all engagement', 'Zero paid acquisition — 100% organic growth'],
        },
    ],
};

export const TESTIMONIALS = [
    {
        quote:
            'Mekky transformed our entire marketing workflow. What used to take us days now runs on autopilot.',
        author: 'Ahmed K.',
        role: 'Startup Founder',
        rating: 5,
    },
    {
        quote:
            'His workshops are game-changers. The team went from zero to confident with AI tools in just two sessions.',
        author: 'Sara M.',
        role: 'Marketing Director',
        rating: 5,
    },
    {
        quote:
            'The website he built for us wasn\'t just beautiful — it actually converted. Our leads tripled in the first month.',
        author: 'Omar T.',
        role: 'E-Commerce Owner',
        rating: 5,
    },
];

export const LECTURES = [
    {
        title: 'Automate Your Life',
        slug: 'automate-your-life',
        description:
            'A practical workshop on automating repetitive tasks using AI and no-code tools.',
        longDescription: 'This hands-on workshop takes participants from zero automation to building their first complete workflow. We cover the automation mindset, tool selection (Zapier, n8n, Make), practical use cases for email, social media, and data entry, and how to think in systems rather than tasks. Participants leave with 3 working automations they built themselves.',
        image: '/images/lectures/automate.jpg',
        duration: '3 hours',
        videoId: '1SWrZsQLnVmMJAMziddPzlNlTBXXLIAsw',
        topics: ['Automation Mindset', 'Zapier & n8n Basics', 'Email Automation', 'Social Media Scheduling', 'Building Your First Workflow'],
    },
    {
        title: 'Build Your Brand Using ChatGPT',
        slug: 'build-your-brand-chatgpt',
        description:
            'How to leverage ChatGPT to build, position, and grow your personal brand from scratch.',
        longDescription: 'In this workshop, we break down the exact frameworks for using ChatGPT as your brand strategist, copywriter, and content machine. From defining your brand voice to generating months of content in hours — this session gives you the playbook that agencies charge thousands for. Live demonstrations, real brand case studies, and actionable templates included.',
        image: '/images/lectures/brand-chatgpt.jpg',
        duration: '2.5 hours',
        videoId: '1oPENQooS8S4hUWJL8F_Ehc9W1yxi6Gyh',
        topics: ['Brand Positioning with AI', 'Content Strategy Automation', 'Social Media Copy Generation', 'Personal Brand Framework', 'ChatGPT Prompt Templates'],
    },
    {
        title: 'The Power of Prompts: From Prompt to Profit',
        slug: 'power-of-prompts',
        description:
            'Turning AI prompts into real business value — from creative outputs to revenue-generating systems.',
        longDescription: 'Most people write prompts. Few people make money from them. This session bridges that gap. We explore how to turn prompt engineering into a professional skill — building prompt libraries, creating AI-powered products, selling prompt-based services, and integrating prompts into client workflows. Real monetization strategies, not theory.',
        image: '/images/lectures/prompt-profit.jpg',
        duration: '2 hours',
        videoId: '1uh5T8nWn0cXjheG1q7AayGoiyStdxSjx',
        topics: ['Prompt as a Skill', 'Monetization Strategies', 'AI Product Design', 'Prompt Libraries for Clients', 'Scaling with AI Services'],
    },
    {
        title: 'Promptology Unlocked',
        slug: 'promptology-unlocked',
        description:
            'Advanced prompt engineering — mastering the art and science of communicating with AI models.',
        longDescription: 'The advanced follow-up to our intro session. Promptology Unlocked goes deep into the science behind effective prompting — chain-of-thought reasoning, few-shot learning, structured outputs, system prompts, and model-specific optimization. Participants practice with real business scenarios and leave with a comprehensive personal prompt library ready for production use.',
        image: '/images/lectures/promptology.jpg',
        duration: '2.5 hours',
        videoId: '1jIzzjfgrGogtUDgwthevStdhV7jlDN4Q',
        topics: ['Advanced Prompt Patterns', 'Chain of Thought Reasoning', 'Few-Shot Learning', 'System Prompt Architecture', 'Building a Prompt Library'],
    },
    {
        title: 'Introduction to Notion',
        slug: 'introduction-to-notion',
        description:
            'From zero to productive — a hands-on session on building your second brain with Notion.',
        longDescription: 'Notion is the ultimate productivity tool — but only if you know how to use it right. This workshop covers the fundamentals of databases, templates, relations, and formulas. By the end, every participant has a fully functioning personal dashboard, task manager, and knowledge base. We build together, step by step, live.',
        image: '/images/lectures/notion.jpg',
        duration: '2.5 hours',
        videoId: '1o1dFPpcKdOFfTvwXtkmBLINrgch0fBl2',
        topics: ['Notion Fundamentals', 'Database Design', 'Templates & Relations', 'Personal Dashboard', 'Team Collaboration'],
    },
    {
        title: 'Portfolio That Converts',
        slug: 'portfolio-that-converts',
        description:
            'How to build a portfolio that doesn\'t just look good — it gets you hired and closes deals.',
        longDescription: 'Your portfolio is your most powerful sales tool. In this session, we dissect what makes portfolios convert — from the psychology of first impressions to the structure that guides visitors toward action. Case studies, before/after redesigns, and a live portfolio audit. Every participant leaves with a clear action plan to rebuild their portfolio for results.',
        image: '/images/lectures/portfolio-converts.jpg',
        duration: '2 hours',
        videoId: '1Wy1evc9IbgGd7BTylQtERVciCn-VKgxB',
        topics: ['Portfolio Psychology', 'Converting Structure', 'Case Study Storytelling', 'Visual Hierarchy', 'CTA Optimization'],
    },
];

export const BLOGS = {
    sectionNumber: '04',
    sideLabel: 'Latest Insights',
    title: 'THE BLOG.',
    items: [
        {
            title: 'The Future of Marketing Automation',
            slug: 'future-of-marketing-automation',
            date: 'Feb 15, 2026',
            excerpt: 'How AI is reshaping how we build systems and scale businesses.',
            image: '/images/blog/automation.jpg',
            content: [
                'Marketing automation is no longer about scheduling social media posts. In 2026, AI-driven systems are handling everything from initial lead qualification to personalized content creation at scale.',
                'The businesses that will win aren\'t the ones with the biggest budgets — they\'re the ones with the smartest systems. Systems that learn from every interaction, optimize in real-time, and free up humans to do what they do best: think creatively and build relationships.',
                'The key shift? Moving from rule-based automation ("if this, then that") to intelligence-based automation ("understand the context, then decide"). This is where tools like n8n, combined with language models, become game-changers.',
            ],
        },
        {
            title: 'Mastering Notion for Teams',
            slug: 'mastering-notion-for-teams',
            date: 'Jan 28, 2026',
            excerpt: 'A guide to building collaborative workspaces that actually work.',
            image: '/images/blog/notion.jpg',
            content: [
                'Most teams use Notion like a fancy notepad. They create pages, dump text, and wonder why nobody can find anything. The problem isn\'t the tool — it\'s the architecture.',
                'Great Notion workspaces are designed like databases, not documents. Every piece of information has a type, a status, and relationships to other pieces. When you get this right, Notion becomes your team\'s single source of truth.',
                'In this guide, I walk through the exact setup I use for teams of 5-50: a unified task database, linked project trackers, automated status updates, and a dashboard that shows everyone exactly what matters right now.',
            ],
        },
        {
            title: 'Why Most Startups Fail at Scaling',
            slug: 'why-startups-fail-scaling',
            date: 'Jan 10, 2026',
            excerpt: 'The common pitfalls and how to build a scalable foundation early on.',
            image: '/images/blog/scaling.jpg',
            content: [
                'Scaling isn\'t about doing more of what works. It\'s about building systems that can handle more without you doing more. Most founders learn this the hard way.',
                'The three scaling killers I see most often: 1) Founder dependency — everything requires the founder\'s approval. 2) Manual processes disguised as "personal touch." 3) Tool fragmentation — 15 different apps that don\'t talk to each other.',
                'The fix? Build your operating system before you need it. Document processes, automate the repetitive, and create decision frameworks that let your team move fast without breaking things.',
            ],
        },
    ]
};

export const SOCIAL_LINKS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammedmekky' },
    { label: 'GitHub', href: 'https://github.com/m2kky' },
    { label: 'Email', href: 'mailto:contact@muhammedmekky.com' },
    { label: 'Facebook', href: 'https://www.facebook.com/muhammedmekky' },
    { label: 'Instagram', href: 'https://www.instagram.com/muhammedm2kky' },
];

export const SEO = {
    title: 'Muhammed Mekky — Marketing Automation Strategist & Performance Trainer',
    description:
        'Build smarter, scale faster. Marketing automation, AI workflows, web design, and performance training for businesses and teams worldwide.',
    keywords: [
        'Muhammed Mekky',
        'Marketing Automation',
        'AI Workflows',
        'Performance Trainer',
        'Web Design',
        'Digital Marketing',
        'Automation Strategist',
    ],
    image: '/images/og-image.jpg',
};
