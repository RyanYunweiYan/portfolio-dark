// ============================================================
// Ryan's Personal Website — Shared Data Layer
// Both themes (Cool & Apple) consume this single data source.
// Update content HERE, both versions reflect changes automatically.
// ============================================================

// ── Bilingual type helper ──────────────────────────────────
export type Bilingual<T = string> = { en: T; zh: T };

// ── Profile ──────────────────────────────────────────────────

export const PROFILE = {
  name: "Ryan Yan",
  nameCN: "严韫玮",
  title: { en: "AI Product Manager & Builder", zh: "AI 产品经理 & 独立开发者" } as Bilingual,
  tagline: { en: "Turning AI capability into real-world product impact", zh: "用 AI 能力创造真实的产品价值" } as Bilingual,
  bio: {
    en: [
      "5 years as a product manager in tech, leading multiple products from zero to launch. I believe collaborating with AI agents is as important as collaborating with people. I own the full lifecycle — market research, product definition, and cross-functional coordination through to delivery — and independently ship from concept to finished product using AI tools.",
      "I spend 60+ hours per week building in Claude Code and stay hands-on with the latest AI models and tools. I know each model's strengths and limitations, so I can match the right capability to the right problem fast.",
      "I've independently shipped 20+ digital products using AI tools — web apps, iOS apps, WeChat mini-apps — including a CES expo app that served 3,000+ international users.",
      "M.S. in Information Technology & Management from UT Austin (program ranked top 3 nationally), focused on AI. Working with large language models since GPT-3, shipping AI products through every major wave since then. Currently focused on Harness Engineering — designing controlled environments where AI agents operate autonomously with minimal human intervention and consistent output quality. I break problems down from first principles, draw clear lines between what humans should do and what AI should do, and maximize leverage at every step.",
    ],
    zh: [
      "5 年 IT 行业产品经理经验，主导多个产品从 0 到 1 的落地。相信与 Agent 协作和与人协作同等重要。以 owner 身份全程推动——从前期市场研究、产品定义，到协调跨职能团队完成交付，通过 AI 工具独立完成从创意到成品的交付。",
      "日常深度使用 Claude Code（周均 60+ 小时），持续使用最前沿 AI 模型与工具，对不同模型能力边界保持敏感，快速为业务匹配最优方案。",
      "独立用 AI 工具开发了 20+ 数字产品（Web 应用、iOS 应用、小程序等），其中 CES 展会应用服务 3,000+ 海外用户。",
      "UT Austin 信息技术与管理硕士（专业全美 Top 3），AI 方向。从 GPT-3 开始接触大语言模型，持续深耕 AI 产品实践，经历 AI 技术的多轮迭代。当前聚焦于为 Agent 搭建可控的自主运行环境（Harness Engineering），减少人工干预的同时保证产出质量。善于从第一性原理拆解问题，精准划定人机协作边界，最大化 AI 杠杆效率。",
    ],
  } as Bilingual<string[]>,
  email: "yunweiyan@yahoo.com",
  location: { en: "Hangzhou, China", zh: "杭州" } as Bilingual,
  availability: { en: "Open to AI product roles", zh: "正在寻找 AI 产品相关机会" } as Bilingual,
};

// ── Impact Metrics ───────────────────────────────────────────

export const METRICS = [
  {
    value: "60h",
    label: { en: "Claude Code per Week", zh: "Claude Code 每周使用" } as Bilingual,
    description: { en: "Hands-on AI-powered development, every day", zh: "AI 驱动开发的深度日常实践" } as Bilingual,
    icon: "Terminal",
  },
  {
    value: "20+",
    label: { en: "AI Products Shipped", zh: "AI 产品已交付" } as Bilingual,
    description: { en: "Web apps, mini-programs, iOS apps & more", zh: "Web 应用、小程序、iOS App 等" } as Bilingual,
    icon: "Layers",
  },
  {
    value: "3,000+",
    label: { en: "CES International Users", zh: "CES 海外用户" } as Bilingual,
    description: { en: "Full-stack exhibition app built independently", zh: "独立开发的展会全栈应用" } as Bilingual,
    icon: "Globe",
  },
  {
    value: "$400+",
    label: { en: "Monthly AI Investment", zh: "每月 AI 工具投入" } as Bilingual,
    description: { en: "Claude Max, Cursor, Manus Pro & more", zh: "Claude Max、Cursor、Manus Pro 等" } as Bilingual,
    icon: "Zap",
  },
];

// ── Projects ─────────────────────────────────────────────────

export interface Project {
  id: string;
  title: Bilingual;
  subtitle: Bilingual;
  description: Bilingual;
  details: Bilingual<string[]>;
  tags: string[];
  year: string;
  status: "live" | "in-progress" | "demo";
  coverImage?: string;
  screenshots?: string[];
  videoUrl?: string;
  liveUrl?: string;
  size: "large" | "medium" | "small";
}

export const PROJECTS: Project[] = [
  {
    id: "ces-web-app",
    title: { en: "CES 2026 Exhibition Web App", zh: "CES 2026 展会 Web 应用" },
    subtitle: { en: "Yuwell Medical — Full-Stack AI Application", zh: "鱼跃医疗 — 全栈 AI 应用" },
    description: {
      en: "Independently designed and developed a full-stack web application for Yuwell Medical's CES 2026 booth, enabling product consultation, user surveys, and lead capture for 3,000+ international attendees.",
      zh: "独立设计开发鱼跃医疗 CES 2026 展台全栈 Web 应用，涵盖产品咨询、用户调研和数据采集，展会期间服务 3,000+ 参观者。",
    },
    details: {
      en: [
        "Full-stack architecture with AI-powered features",
        "Real-time user data collection and analytics",
        "Served 3,000+ users during CES 2026",
        "Built entirely with AI-assisted development",
      ],
      zh: [
        "AI 驱动的全栈架构",
        "实时用户数据采集与分析",
        "CES 2026 期间服务 3,000+ 用户",
        "完全使用 AI 辅助开发",
      ],
    },
    tags: ["Full-Stack", "AI", "React", "Exhibition Tech"],
    year: "2026",
    status: "live",
    size: "large",
    liveUrl: "https://yuwell.manus.space",
    coverImage: "/images/projects/ces-app.png",
  },
  {
    id: "commercial-video-platform",
    title: { en: "AI Commercial Video Generator", zh: "AI 商业视频生成器" },
    subtitle: { en: "Product Photo & Video Creation Platform", zh: "商品图片与视频创作平台" },
    description: {
      en: "Built an end-to-end platform for e-commerce sellers to generate product images and promotional videos using AI. Available as both a web app and WeChat Mini Program.",
      zh: "为专业商家打造的一站式 AI 商品图片与推广视频生成平台，同时支持 Web 应用和微信小程序。",
    },
    details: {
      en: [
        "AI-powered product image generation",
        "Automated promotional video creation",
        "Dual-platform: Web + WeChat Mini Program",
        "Built for e-commerce sellers and brand owners",
      ],
      zh: [
        "AI 驱动的商品图片生成",
        "自动化推广视频制作",
        "双平台：Web + 微信小程序",
        "服务专业电商商家",
      ],
    },
    tags: ["AI Generation", "Mini Program", "E-Commerce", "Full-Stack"],
    year: "2025",
    status: "live",
    size: "medium",
    coverImage: "/images/projects/video-platform.png",
  },
  {
    id: "voice-flow",
    title: { en: "Voice Flow", zh: "Voice Flow" },
    subtitle: { en: "AI-Powered Voice Todo — iOS App", zh: "AI 语音待办 — iOS 应用" },
    description: {
      en: "An iOS application that transforms natural language voice input into structured calendar events and tasks. Leverages AI to understand context, extract dates, priorities, and create actionable items automatically.",
      zh: "一款将自然语言语音输入转化为结构化日历事件和任务的 iOS 应用。利用 AI 理解上下文，自动提取日期、优先级并创建可执行事项。",
    },
    details: {
      en: [
        "Natural language processing for task creation",
        "AI-powered context understanding",
        "Smart date and priority extraction",
        "Clean, intuitive iOS interface",
      ],
      zh: [
        "自然语言处理任务创建",
        "AI 驱动的上下文理解",
        "智能日期和优先级提取",
        "简洁直观的 iOS 界面",
      ],
    },
    tags: ["iOS", "AI", "NLP", "Voice Interface"],
    year: "2025",
    status: "live",
    size: "medium",
    coverImage: "/images/projects/voice-flow.png",
  },
  {
    id: "memorial-app",
    title: { en: "Memorial Tribute App", zh: "数字纪念平台" },
    subtitle: { en: "Digital Remembrance Platform", zh: "数字追思平台" },
    description: {
      en: "A compassionate digital platform for honoring and remembering loved ones who have passed. Provides a meaningful space for users to express thoughts, share memories, and maintain emotional connections.",
      zh: "一个温暖的数字平台，用于缅怀和纪念逝去的亲人。为用户提供表达思念、分享回忆和维系情感联结的有意义空间。",
    },
    details: {
      en: [
        "Thoughtful UX for sensitive user scenarios",
        "Digital memorial and tribute features",
        "Privacy-first design approach",
        "AI-assisted content and interaction",
      ],
      zh: [
        "针对敏感场景的用心 UX 设计",
        "数字纪念与追思功能",
        "隐私优先的设计理念",
        "AI 辅助的内容与交互",
      ],
    },
    tags: ["App", "AI", "UX Design", "Emotional Tech"],
    year: "2026",
    status: "in-progress",
    size: "small",
    coverImage: "/images/projects/memorial-app.png",
  },
  {
    id: "personal-website",
    title: { en: "This Website", zh: "本网站" },
    subtitle: { en: "AI-Built Personal Portfolio", zh: "AI 构建的个人作品集" },
    description: {
      en: "The website you're viewing right now — designed and developed entirely with AI-assisted tools. Two distinct visual themes (Immersive Dark & Apple Minimal) with a synchronized data layer.",
      zh: "你正在浏览的这个网站——完全使用 AI 辅助工具设计和开发。两种不同的视觉主题（沉浸暗色 & Apple 极简）数据层同步维护。",
    },
    details: {
      en: [
        "Dual-theme architecture with shared data",
        "React + TypeScript + Tailwind CSS + Framer Motion",
        "Deployed on Vercel with custom domain",
        "100% AI-assisted development",
      ],
      zh: [
        "双主题架构与共享数据层",
        "React + TypeScript + Tailwind CSS + Framer Motion",
        "部署在 Vercel 并绑定自定义域名",
        "100% AI 辅助开发",
      ],
    },
    tags: ["React", "AI Development", "Design", "Full-Stack"],
    year: "2026",
    status: "live",
    size: "small",
    coverImage: "/images/projects/this-website.png",
  },
];

// ── AI Creative Works ────────────────────────────────────────

export interface CreativeWork {
  id: string;
  type: "video" | "music" | "article";
  title: Bilingual;
  description: Bilingual;
  embedUrl?: string;
  externalUrl?: string;
  coverImage?: string;
  date: string;
  platform?: string;
  stats?: string;
}

export const CREATIVE_WORKS: CreativeWork[] = [
  // ── Videos ──
  {
    id: "lalaland-collab",
    type: "video",
    title: { en: "La La Land 10th Anniversary — AI Film", zh: "《爱乐之城》十周年 — AI 影片" },
    description: {
      en: "Collaborated with Jimeng (ByteDance's AI video platform) on the La La Land 10th anniversary project. Created a promotional film entirely using AI video generation.",
      zh: "与即梦合作参与《爱乐之城》十周年项目，使用 AI 视频生成技术完成宣传片制作。",
    },
    embedUrl: "/videos/lalaland.mp4",
    date: "2025",
    platform: "Douyin",
  },
  {
    id: "video-showcase-1",
    type: "video",
    title: { en: "AI Commercial Content Showcase", zh: "AI 商业内容作品集" },
    description: {
      en: "Selected works from two Douyin (TikTok China) channels covering AI commercial design and AI tool reviews. Combined views exceed 100K.",
      zh: "来自两个抖音频道的精选作品，涵盖 AI 商业设计和 AI 工具测评，合计播放量超 10 万。",
    },
    date: "2025",
    platform: "Douyin",
    stats: "100K+ views across channels",
  },
  // ── Music ──
  {
    id: "ai-music-collection",
    type: "music",
    title: { en: "AI Music Collection", zh: "AI 音乐合集" },
    description: {
      en: "Original AI music created with Suno. A high-energy funk track — perfect for late-night drives.",
      zh: "使用 Suno AI 创作的原创音乐。一首高能 Funk 歌曲——适合深夜开车时听。",
    },
    embedUrl: "https://suno.com/embed/e73edcfa-196e-4475-8925-9e6ccc85a16b",
    date: "2025-2026",
    platform: "Suno",
  },
  // ── Articles ──
  {
    id: "article-ai-knowledge-base",
    type: "article",
    title: { en: "Why AI Agents Are the Future of Personal Knowledge Management", zh: "放弃传统笔记软件：为什么 AI Agent 是个人知识库的终极方案" },
    description: {
      en: "Why traditional note-taking apps are obsolete — how I built an AI Agent-powered personal knowledge base that actually thinks with you.",
      zh: "为什么传统笔记软件已经过时——我如何搭建一个能和你一起思考的 AI Agent 驱动个人知识库。",
    },
    externalUrl: "https://mp.weixin.qq.com/s/URaGSRUtuxid-dXAi7JwvQ",
    date: "2026-02",
    platform: "WeChat",
    stats: "956 reads · 44 shares",
  },
  {
    id: "article-ai-hardware",
    type: "article",
    title: { en: "65 Viral AI Hardware Products, 52 Made in China", zh: "65个爆款AI硬件，52个中国造" },
    description: {
      en: "Deep dive into Kickstarter's hottest AI hardware trends — 80% are Chinese-made. Analysis of what makes AI hardware products go viral in global markets.",
      zh: "深度剖析 Kickstarter 上最火的 AI 硬件趋势——80% 是中国造。分析 AI 硬件产品在全球市场爆火的原因。",
    },
    externalUrl: "https://mp.weixin.qq.com/s/hm0rCFdCFCSUNKKw4psoqw",
    date: "2025-12",
    platform: "WeChat",
    stats: "3,164 reads · 350 shares · 11%+ share rate",
  },
];

// ── AI Stack ─────────────────────────────────────────────────

export const AI_STACK = [
  {
    category: "Think",
    description: { en: "Research & reasoning", zh: "研究与推理" } as Bilingual,
    tools: ["Claude Max", "ChatGPT Plus", "Gemini Pro", "Grok", "NotebookLM", "Plaud"],
  },
  {
    category: "Build",
    description: { en: "Development & automation", zh: "开发与自动化" } as Bilingual,
    tools: ["Claude Code", "Cursor", "Lovable", "Manus Pro", "Firecrawl"],
  },
  {
    category: "Create",
    description: { en: "Content generation", zh: "内容创作" } as Bilingual,
    tools: ["Jimeng (即梦)", "Suno", "MiniMax", "Flow (Google)", "Stitch (Google)"],
  },
  {
    category: "Ship",
    description: { en: "Deploy & deliver", zh: "部署与交付" } as Bilingual,
    tools: ["Vercel", "GitHub"],
  },
];

// ── Work Experience ──────────────────────────────────────────

export const EXPERIENCE = [
  {
    company: "Yuwell Medical (鱼跃医疗)",
    role: { en: "AI Wearable Product Manager", zh: "AI 穿戴产品经理" } as Bilingual,
    period: "2025.04 – Present",
    location: "Nanjing, China",
    highlights: {
      en: [
        "Leading two AI wearable product lines (smartwatch & smart ring) from zero to launch, owning market analysis, product definition, cross-functional coordination, and go-to-market execution. The consumer smart ring has reached the go-to-market stage; the medical-grade line is progressing in parallel.",
        "Built an AI-powered workflow for DHF regulatory documentation — cut single-document turnaround from 3 days to 30 minutes and passed regulatory review on the first submission. Used Claude Code with multi-agent parallel exploration to converge on optimal approaches, implemented sub-agent cross-validation to reduce hallucination risk, and applied context engineering to keep context under 250K tokens.",
        "Designed a personal agent collaboration system on the Harness Engineering framework, codifying recurring workflows into reusable, standardized skills across document generation, dev/test, knowledge management, and business decision-making — creating a self-improving workflow loop. Open-sourced the core modules, actively contributing tools and learnings to the community.",
        "Independently designed and produced product brochures, trade-show collateral, and web applications using AI tools. Represented the company at CES, Hong Kong Electronics Fair, CMEF, AI Innovation Conference, and other international expos while staying current on industry and AI trends.",
        "Drove development of an AI conversational module from requirements through production, including prompt strategy design and context engineering. Invited by department leadership to lead hands-on AI workshops for the broader team.",
      ],
      zh: [
        "产品线负责人，从 0 到 1 主导智能手表、智能戒指两条产品线，覆盖市场分析、产品定义、跨部门协调与上市推进，消费级智能戒指已至上市阶段，医疗级产品线同步推进中。",
        "AI 工作流搭建：以 DHF 法规文档系统为例，使用 Claude Code 多 Agent 并行探索方案，高效收敛至最优路径；制定 Sub Agent 交叉验证流程降低幻觉风险；Context Engineering 将上下文控制在 250K token 以下，防止注意力衰减。单份文档产出时间从 3 个工作日压缩至半小时，一次性通过体系评审。",
        "个人 Agent 协作系统：基于 Harness Engineering 框架，将工作中高频复用的流程沉淀为标准化 Skills，覆盖文档生产、开发测试、知识管理、商业决策等场景，形成可自主迭代的工作流闭环。核心模块已开源，持续向开源社区输出实践经验。",
        "通过 AI 工具独立完成产品宣传册、展会海报、Web 应用等数字产品的设计与制作。参加 CES、香港电子展、CMEF、AI 创新大会等国内外展会，持续跟进行业与 AI 前沿趋势。",
        "参与产品 AI 对话模块从需求定义到落地的工程侧建设，包含 Prompt 策略设计与上下文工程。受部门负责人邀请为团队开展 AI 实践分享。",
      ],
    } as Bilingual<string[]>,
  },
  {
    company: "LifeSmart (行至云起)",
    role: { en: "AI Product Manager", zh: "AI 产品经理" } as Bilingual,
    period: "2024.04 – 2025.03",
    location: "Hangzhou, China",
    highlights: {
      en: [
        "Analyzed user data on lighting effects to uncover scene-based preference patterns, then designed and shipped an end-to-end LLM-powered smart recommendation system. Used AI to auto-generate lighting-effect code, replacing the manual development pipeline and expanding the effect library. Increased average app session duration by 30%.",
        "Took the GCS Surround Speaker from concept to global crowdfunding launch, aligning hardware, firmware, and marketing teams. Ranked #1 in Audio on Indiegogo, surpassing its funding goal by 755%.",
      ],
      zh: [
        "AI 驱动产品创新：使用 LLM 分析用户灯效数据，挖掘场景偏好规律，设计并落地智能推荐系统；用 AI 自动生成灯效代码替代传统开发流程，拓展灯效库内容。App 平均使用时长提升 30%。",
        "主导从需求分析到产品商业化的全流程，协调跨职能团队高效协作，成功交付「GCS 环绕立体音响」项目。产品在预售阶段登顶 Indiegogo 众筹平台 Audio 类目第一，超额 755% 达成目标。",
      ],
    } as Bilingual<string[]>,
  },
  {
    company: "H3C Technologies (新华三)",
    role: { en: "Product Manager", zh: "产品经理" } as Bilingual,
    period: "2021.03 – 2023.12",
    location: "Beijing, China",
    highlights: {
      en: [
        "Built an AI customer service system using LLMs, enabling multi-turn conversations that understand customer needs, automatically configure and compare solutions, and close the full consulting-to-ordering loop. Optimized knowledge base retrieval with RAG architecture. Reduced conversation steps by 25% and improved conversion rate by nearly 30%.",
        "Owned the AI computing network portfolio, delivering AI Fabric network solutions to enterprise clients.",
        "Led delivery of 3 major data center projects — Heathrow Airport network upgrade, Siemens data center, and TSMC network upgrade — aligning engineering, procurement, and client stakeholders to meet deadlines. Total project value exceeded $20M.",
      ],
      zh: [
        "基于大语言模型构建 AI 客服系统，支持多轮对话，实现客户需求智能理解、方案自动配置与对比评估，完成从咨询到下单的服务闭环；采用 RAG 架构优化知识库检索。内测阶段对话轮次减少 25%，转化率提升近 30%。",
        "聚焦 AI 智算网络方向，面向企业级客户提供 AI Fabric 网络解决方案。",
        "作为项目经理主导完成 3 个大型数据中心项目——英国希思罗机场网络升级、西门子数据中心、台积电网络升级——协调跨职能团队高效协作，确保项目按时交付，项目总金额超 2000 万美金。",
      ],
    } as Bilingual<string[]>,
  },
  {
    company: "Zhejiang University (浙江大学)",
    role: { en: "Deep Learning Research Intern", zh: "深度学习研究员（实习）" } as Bilingual,
    period: "2018.07 – 2018.08",
    location: "Hangzhou, China",
    highlights: {
      en: [
        "Developed deep learning-based text and facial recognition systems — focused on model implementation and optimization.",
        "Trained and optimized models using Keras and TensorFlow — achieving 98.5% facial recognition accuracy and 99.7% text recognition accuracy, exceeding target benchmarks.",
      ],
      zh: [
        "参与基于深度学习的文本识别与人脸识别系统开发，负责模型架构设计与优化。",
        "使用 Keras 和 TensorFlow 训练并优化深度学习模型，面部识别准确率达 98.5%，文字识别准确率达 99.7%，均超越设定目标。",
      ],
    } as Bilingual<string[]>,
  },
];

// ── Education & Credentials ─────────────────────────────────

export const CREDENTIALS = {
  education: [
    {
      school: { en: "University of Texas at Austin (Top 3 Program)", zh: "德克萨斯大学奥斯汀分校（专业全美 Top 3）" } as Bilingual,
      degree: { en: "M.S. in Information Technology & Management", zh: "信息技术与管理 硕士" } as Bilingual,
      period: "2019.07 – 2020.05",
      gpa: "3.65 / 4.0",
      focus: { en: "Machine Learning & Neural Networks", zh: "机器学习与神经网络" } as Bilingual,
    },
    {
      school: { en: "Cal State Fullerton", zh: "加州州立大学富勒顿分校" } as Bilingual,
      degree: { en: "B.S. in Information Systems & Decision Science (Minor: CS)", zh: "信息系统与决策科学 学士（辅修：计算机科学）" } as Bilingual,
      period: "2014.08 – 2019.05",
      gpa: "3.55 / 4.0",
    },
  ],
  certifications: [
    { en: "UC Davis — AI Agents: From Prompts to Multi-Agent Systems", zh: "UC Davis — AI Agents：从 Prompt 到多 Agent 系统" } as Bilingual,
    { en: "IBM AI Product Manager Professional Certificate (10 courses)", zh: "IBM AI 产品经理专业证书（10 门课程）" } as Bilingual,
    { en: "DeepLearning.AI Certificate (Andrew Ng)", zh: "DeepLearning.AI 证书（吴恩达）" } as Bilingual,
    { en: "PMP (Project Management Professional)", zh: "PMP（项目管理专业人士）" } as Bilingual,
    { en: "Anthropic Courses (in progress)", zh: "Anthropic 课程（在读）" } as Bilingual,
  ],
};

// ── Social Links ─────────────────────────────────────────────

export const SOCIAL_LINKS = [
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yunweiyan",
    icon: "linkedin",
  },
];

// ── Site Metadata ────────────────────────────────────────────

export const SITE_META = {
  title: { en: "Ryan Yan — AI Product Manager & Builder", zh: "Ryan Yan — AI 产品经理 & 独立开发者" } as Bilingual,
  description: {
    en: "AI Product Manager | 5+ years shipping AI-powered products across health tech, e-commerce & IoT. 20+ products built with AI tools. CES 2026 app serving 3,000+ users. M.S. from UT Austin.",
    zh: "5 年以上经验的 AI 产品经理。用 AI 能力创造真实的产品价值。$20M+ 已交付项目，20+ 款 AI 驱动数字产品已上线。",
  } as Bilingual,
  ogImage: "/og-image.png",
};
