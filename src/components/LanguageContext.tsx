"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ecosystem as defaultEcosystem } from "@/data/ecosystem";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  ecosystem: typeof defaultEcosystem;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.about": "About Us",
    "nav.about.title": "The Enterprise Architects",
    "nav.about.desc": "We diagnose operational inefficiencies, eradicate technical debt, and deploy high-ROI technological cures that act, scale, and deliver.",
    "nav.about.link": "Read our Manifesto",
    "nav.methodology": "Methodology",
    "nav.methodology.desc": "Discover the Aura framework for transformation.",
    "nav.suites": "Suites & Packages",
    "nav.suites.desc": "Explore our curated business solutions.",
    "nav.products": "All Products",
    "nav.products.desc": "Browse the complete Aura ecosystem.",
    "nav.audit": "Request a Business Audit",
    
    // Home Page Hero
    "hero.title": "We Diagnose Bottlenecks and Drive Enterprise Growth.",
    "hero.subtitle": "Stop patching your business with fragmented tools. Experience the",
    "hero.subtitle.highlight": "One Eco System",
    "hero.explore": "Explore the Ecosystem",
    "hero.contact": "Contact Sales",
    "hero.challenge.default": "Select Challenge...",
    "hero.challenge.1": "Disconnected Operations & Data Silos",
    "hero.challenge.2": "High Manual Labor Costs",
    "hero.challenge.3": "Slow Reporting & Lack of Visibility",
    "hero.challenge.4": "Scaling & Technical Debt",
    "hero.query.placeholder": "Describe your operational bottleneck...",
    "hero.diagnose.btn": "Diagnose Now",
    
    // Methodology Page
    "methodology.title": "The Aura Methodology",
    "methodology.subtitle": "Our proprietary framework for digital transformation.",
    "methodology.1.title": "1. Diagnose",
    "methodology.1.desc": "We embed within your organization to map existing processes, identify operational bottlenecks, and analyze technical debt.",
    "methodology.2.title": "2. Strategize",
    "methodology.2.desc": "Our architects design a comprehensive, bespoke digital roadmap using the Aura ecosystem, tailored specifically to your objectives.",
    "methodology.3.title": "3. Execute",
    "methodology.3.desc": "We deploy the solution with precision, ensuring seamless integration, employee training, and continuous growth tracking.",
    "methodology.1.sub1": "Deep-Dive Data Extraction & Systems Auditing",
    "methodology.1.sub2": "Workflow Bottleneck & Latency Identification",
    "methodology.1.sub3": "Technical Debt & Security Vulnerability Mapping",
    "methodology.2.sub1": "Bespoke Ecosystem Architecture Design",
    "methodology.2.sub2": "Module Selection & Integration Blueprinting",
    "methodology.2.sub3": "Predictive ROI & Capital Efficiency Forecasting",
    "methodology.3.sub1": "Zero-Downtime Agentic Deployment",
    "methodology.3.sub2": "Seamless Cross-Departmental Onboarding",
    "methodology.3.sub3": "Continuous Telemetry & Growth Tracking",
    "methodology.protocol": "The Protocol",
    "methodology.protocol.desc": "We don't guess. We measure, architect, and execute with absolute precision.",
    
    // Dashboard
    "dashboard.title": "The Convergence Command Center",
    "dashboard.subtitle": "Witness the unification of siloed data streams into actionable intelligence.",
    "dashboard.kpi1.label": "System Unification",
    "dashboard.kpi1.value": "100% Data Parity",
    "dashboard.kpi2.label": "Capital Efficiency",
    "dashboard.kpi2.value": "$12.4M Saved (YTD)",
    "dashboard.kpi3.label": "Agentic Actions",
    "dashboard.kpi3.value": "14,029 Executed",
    "dashboard.live_feed": "Live Agent Feed",
    "dashboard.feed.1": "Aura Agent synchronized Payroll discrepancies with Operations.",
    "dashboard.feed.2": "Predictive Engine rerouted Logistics Fleet 4 to avoid projected delay.",
    "dashboard.feed.3": "Procurement anomaly detected and automatically flagged for CFO review.",
    "dashboard.feed.4": "CRM pipeline velocity adjusted based on real-time market sentiment.",
    "dashboard.feed.5": "ITSM ticket resolved automatically via Agentic diagnostic workflow.",

    // Suites Page
    "suites.title": "Suites & Packages",
    "suites.subtitle": "Pre-architected solutions tailored for your industry.",
    "suites.bundle.title": "The One Eco System Bundle",
    "suites.bundle.desc": "The ultimate enterprise transformation package. Includes full access to all 8 Suites, 48 products, and dedicated architectural support for limitless scalability.",
    "suites.view_products": "View Products",

    // Products
    "products.title": "Product Directory",
    "products.subtitle": "Explore the components of the Aura ecosystem.",
    "products.filter.all": "All Products",
    "products.view_details": "View Details",
    "product.back": "Back to Products",
    "product.capabilities.title": "Technical Capabilities",
    "product.capabilities.subtitle": "Built for scale, security, and performance.",
    "product.capabilities.desc": "Seamlessly integrate with the core Aura to unlock this capability across your organization.",
    "product.arch.title": "Integration Architecture",
    "product.arch.subtitle": "How this connects to the Core OS.",
    "product.arch.edge": "Edge Node",
    "product.arch.sync": "SYNC / DATA_LAKE",
    "product.arch.core": "Aura Core",
    "product.arch.core.desc": "Central Database",
    
    // ROI
    "roi.title": "Enterprise Transformation Calculator",
    "roi.subtitle": "Discover the hidden costs of legacy operations and visualize the financial impact of unifying your enterprise with Aura.",
    "roi.inputs.title": "Current Operational State",
    "roi.inputs.employees": "Company Size (Employees)",
    "roi.inputs.spend": "Legacy Tech Stack Spend / Month",
    "roi.inputs.hours": "Manual Ops Hours / Week (per Emp.)",
    "roi.inputs.hours.desc": "Data entry, compliance checks, reporting across fragmented systems.",
    "roi.inputs.rate": "Average Blended Hourly Rate",
    "roi.outputs.annual": "Annual Capital Recovered",
    "roi.outputs.annual.desc": "Combines hard savings from retiring legacy software licenses and soft savings from automating manual labor.",
    "roi.outputs.time": "Reclaimed Strategic Time",
    "roi.outputs.time.unit": "hrs/yr",
    "roi.outputs.ttv": "Ecosystem Time-to-Value",
    "roi.outputs.ttv.unit": "months",

    // About Us Page
    "about.hero.title": "We exist to",
    "about.hero.highlight": "synchronize",
    "about.hero.title.end": "the enterprise.",
    "about.hero.desc": "We do not just implement software. We diagnose operational inefficiencies, eradicate technical debt, and deploy high-ROI technological cures that act, scale, and deliver.",
    "about.process.title": "The Clinical Process",
    "about.process.subtitle": "Rigorous diagnosis before intelligent execution.",
    "about.process.1.title": "Diagnostic Phase",
    "about.process.1.desc": "We embed deeply into your architecture, identifying isolated datasets, workflow bottlenecks, and hemorrhagic capital loss caused by manual processes.",
    "about.process.2.title": "Strategic Alignment",
    "about.process.2.desc": "We prescribe an enterprise-grade digital roadmap. Every proposed module targets a specific symptom, guaranteeing a measurable return on investment.",
    "about.process.3.title": "Agentic Execution",
    "about.process.3.desc": "We deploy autonomous, intelligent solutions that orchestrate your operations. Our systems execute complex workflows without requiring human intervention.",
    "about.philosophy.title": "The Architect's Protocol.",
    "about.philosophy.1.title": "Operational Parity",
    "about.philosophy.1.desc": "Every system talks to every other system. We eradicate data silos, ensuring synchronous, real-time intelligence across the entire corporate structure.",
    "about.philosophy.2.title": "Capital Efficiency",
    "about.philosophy.2.desc": "We eliminate the compounding cost of human-in-the-loop manual tasks. Operations run leaner, recovering lost revenue through absolute automation.",
    "about.philosophy.3.title": "Agentic Sovereignty",
    "about.philosophy.3.desc": "We deploy AI that acts, not just talks. Our agents possess the sovereignty to execute workflows, resolve anomalies, and optimize logistics continuously.",
    "about.philosophy.badge": "Palantir-Grade Architecture",
    "about.team.title": "Meet the Architects",
    "about.team.subtitle": "Engineering pedigree driving enterprise transformation.",
    "about.team.1.name": "Mahmoud Hassan",
    "about.team.1.role": "Chief Technology Officer",
    "about.team.1.desc": "Orchestrates macroscopic data strategies and ensures architectural integrity across all deployments.",
    "about.team.2.name": "Ahmed El-Tamawy",
    "about.team.2.role": "Chief Executive Officer",
    "about.team.2.desc": "Translates diagnostic blueprints into tangible, high-performance infrastructure with zero operational downtime.",
    "about.team.3.name": "Mohamed Khaled",
    "about.team.3.role": "General Manager",
    "about.team.3.desc": "Develops the autonomous logic systems that allow operations to scale without proportional headcount growth.",
    "about.cta.title.start": "The Cost of Inaction is",
    "about.cta.title.highlight": "Exponential.",
    "about.cta.desc": "Every minute spent sustaining legacy systems is revenue permanently lost. Stop managing technical debt. Start executing with agentic precision.",
    "about.cta.button": "Initiate Diagnostic Audit",
  },
  ar: {
    // Navbar
    "nav.about": "من نحن",
    "nav.about.title": "مهندسو المؤسسات",
    "nav.about.desc": "نحن نشخّص أوجه القصور التشغيلية، ونقضي على الديون التقنية، وننشر حلولاً تكنولوجية عالية العائد تتصرف وتتوسع وتنجز.",
    "nav.about.link": "اقرأ بياننا",
    "nav.methodology": "منهجيتنا",
    "nav.methodology.desc": "تعرف على إطار عمل أورا للتحول الرقمي.",
    "nav.suites": "الحزم والحلول",
    "nav.suites.desc": "استكشف حلول الأعمال المصممة خصيصاً لمؤسستك.",
    "nav.products": "المنتجات والتطبيقات",
    "nav.products.desc": "تصفح النظام البيئي المتكامل لمنصة أورا.",
    "nav.audit": "اطلب استشارة وتقييم",
    
    // Home Page Hero
    "hero.title": "نشخّص تحدياتك التشغيلية وندفع عجلة النمو المؤسسي.",
    "hero.subtitle": "تجاوز الأنظمة المجزأة والحلول المؤقتة. اختبر قوة",
    "hero.subtitle.highlight": "النظام البيئي الموحد",
    "hero.explore": "استكشف النظام البيئي",
    "hero.contact": "تواصل مع المبيعات",
    "hero.challenge.default": "اختر التحدي...",
    "hero.challenge.1": "عمليات منفصلة وصوامع بيانات",
    "hero.challenge.2": "تكاليف عمالة يدوية مرتفعة",
    "hero.challenge.3": "بطء التقارير ونقص الرؤية",
    "hero.challenge.4": "صعوبات التوسع والديون التقنية",
    "hero.query.placeholder": "صف التحدي التشغيلي أو المشكلة...",
    "hero.diagnose.btn": "شخّص الآن",
    
    // Methodology Page
    "methodology.title": "منهجية أورا",
    "methodology.subtitle": "إطار عمل حصري لدفع التحول الرقمي الاستراتيجي.",
    "methodology.1.title": "1. التشخيص الدقيق",
    "methodology.1.desc": "نعمل جنباً إلى جنب مع فريقك لرسم خريطة العمليات الحالية، وتحديد المعوقات التشغيلية، وتحليل أعباء الأنظمة القديمة.",
    "methodology.2.title": "2. بناء الاستراتيجية",
    "methodology.2.desc": "يصمم خبراؤنا خارطة طريق رقمية متكاملة باستخدام نظام أورا البيئي، لتتوافق تماماً مع أهدافك الاستراتيجية.",
    "methodology.3.title": "3. التنفيذ المتقن",
    "methodology.3.desc": "نقوم بنشر الحلول المعتمدة بدقة متناهية، لضمان التكامل السلس وتدريب الكوادر ومتابعة مؤشرات النمو المستمر.",
    "methodology.1.sub1": "استخراج البيانات العميق وتدقيق الأنظمة",
    "methodology.1.sub2": "تحديد الاختناقات التشغيلية وأسباب التأخير",
    "methodology.1.sub3": "رسم خريطة الديون التقنية والثغرات الأمنية",
    "methodology.2.sub1": "تصميم بنية تحتية مخصصة للنظام البيئي",
    "methodology.2.sub2": "اختيار الوحدات ومخطط التكامل",
    "methodology.2.sub3": "التنبؤ بالعائد على الاستثمار وكفاءة رأس المال",
    "methodology.3.sub1": "نشر ذكي للأنظمة بدون توقف تشغيلي",
    "methodology.3.sub2": "تهيئة سلسة ودمج بين جميع الأقسام",
    "methodology.3.sub3": "مراقبة مستمرة وتتبع دقيق للنمو",
    "methodology.protocol": "البروتوكول",
    "methodology.protocol.desc": "نحن لا نعتمد على التخمين. نحن نقيس، ونصمم، وننفذ بدقة متناهية.",
    
    // Dashboard
    "dashboard.title": "مركز القيادة والتحكم الموحد",
    "dashboard.subtitle": "شاهد تحول تدفقات البيانات المنعزلة إلى رؤى وأرقام قابلة للتنفيذ الآني.",
    "dashboard.kpi1.label": "تكامل الأنظمة",
    "dashboard.kpi1.value": "100% تطابق البيانات",
    "dashboard.kpi2.label": "الكفاءة المالية",
    "dashboard.kpi2.value": "$12.4M توفير سنوي",
    "dashboard.kpi3.label": "العمليات الذكية",
    "dashboard.kpi3.value": "14,029 عملية منفذة",
    "dashboard.live_feed": "السجل الحي للعمليات الذكية",
    "dashboard.feed.1": "مزامنة آلية للفروقات في مسيرات الرواتب مع النظام التشغيلي.",
    "dashboard.feed.2": "قام المحرك التنبئي بإعادة توجيه أسطول الدعم اللوجستي لتفادي التأخيرات المحتملة.",
    "dashboard.feed.3": "تم رصد تباين في عمليات الشراء وتم إحالتها تلقائياً لمراجعة الإدارة المالية.",
    "dashboard.feed.4": "تعديل مسار وتوقعات المبيعات تلقائياً بناءً على مؤشرات السوق اللحظية.",
    "dashboard.feed.5": "اكتشاف ومعالجة استفسار تقني تلقائياً عبر نظام الدعم الفني المدمج.",

    // Suites Page
    "suites.title": "الحزم والحلول الاستراتيجية",
    "suites.subtitle": "حلول متكاملة ومصممة مسبقاً لتلبية تطلعات قطاعك.",
    "suites.bundle.title": "باقة النظام البيئي الشاملة",
    "suites.bundle.desc": "الخيار الأمثل للتحول المؤسسي الجذري. تتضمن صلاحية الوصول لجميع حزمنا الثمانية بمنتجاتها الـ 48 مع دعم هندسي مخصص لتوسع لا محدود.",
    "suites.view_products": "استعراض المنتجات",

    // Products
    "products.title": "دليل المنتجات والتطبيقات",
    "products.subtitle": "استكشف البنية التحتية والمكونات المتقدمة لنظام أورا البيئي.",
    "products.filter.all": "جميع المنتجات",
    "products.view_details": "عرض التفاصيل",
    "product.back": "العودة لدليل المنتجات",
    "product.capabilities.title": "القدرات الفنية",
    "product.capabilities.subtitle": "بنية تحتية مصممة لتحقيق أعلى معايير الأمان والتوسع والأداء.",
    "product.capabilities.desc": "يتكامل هذا المكون بسلاسة مع البنية الأساسية لمنصة أورا لتعزيز كفاءة مؤسستك.",
    "product.arch.title": "بنية التكامل المؤسسي",
    "product.arch.subtitle": "كيف يرتبط هذا المنتج بالقاعدة الأساسية للنظام.",
    "product.arch.edge": "نقطة الاتصال الطرفية",
    "product.arch.sync": "التزامن / بحيرة البيانات",
    "product.arch.core": "نظام أورا الأساسي",
    "product.arch.core.desc": "قاعدة البيانات المركزية",
    
    // ROI
    "roi.title": "حاسبة العائد على التحول المؤسسي",
    "roi.subtitle": "اكتشف التكاليف الخفية للأنظمة القديمة، وصوّر الأثر المالي لتوحيد عملياتك مع منصة أورا.",
    "roi.inputs.title": "الوضع التشغيلي الحالي",
    "roi.inputs.employees": "حجم المؤسسة (عدد الموظفين)",
    "roi.inputs.spend": "تكلفة الأنظمة والبرمجيات الحالية / شهرياً",
    "roi.inputs.hours": "ساعات العمل اليدوي الروتينية / أسبوعياً (لكل موظف)",
    "roi.inputs.hours.desc": "إدخال البيانات، المطابقات، والتقارير عبر أنظمة متعددة وغير مترابطة.",
    "roi.inputs.rate": "متوسط تكلفة ساعة الموظف",
    "roi.outputs.annual": "إجمالي الوفر المالي السنوي",
    "roi.outputs.annual.desc": "مجموع الوفورات المباشرة من الاستغناء عن الرخص القديمة، والوفورات غير المباشرة من أتمتة المهام اليدوية المتكررة.",
    "roi.outputs.time": "ساعات العمل الاستراتيجية المستردة",
    "roi.outputs.time.unit": "ساعة/سنوياً",
    "roi.outputs.ttv": "المدة الزمنية لاسترداد التكلفة",
    "roi.outputs.ttv.unit": "أشهر",

    // About Us Page
    "about.hero.title": "نحن هنا من أجل",
    "about.hero.highlight": "مزامنة وتوحيد",
    "about.hero.title.end": "المؤسسات.",
    "about.hero.desc": "نحن لا نكتفي ببرمجة الأنظمة. نحن نشخّص القصور التشغيلي، ونجتث الديون التقنية، ونطلق حلولاً ذكية تملك القدرة على التصرف والتوسع وتحقيق العوائد.",
    "about.process.title": "العملية السريرية للأعمال",
    "about.process.subtitle": "تشخيص دقيق يسبق التنفيذ الذكي.",
    "about.process.1.title": "مرحلة التشخيص",
    "about.process.1.desc": "نتعمق في بنيتك المؤسسية لنرصد البيانات المعزولة، واختناقات سير العمل، والنزيف المالي الناتج عن العمليات اليدوية.",
    "about.process.2.title": "المواءمة الاستراتيجية",
    "about.process.2.desc": "نصف لك خارطة طريق رقمية بمستوى المؤسسات الكبرى. كل وحدة نقترحها تستهدف عرضاً محدداً، مما يضمن عائداً قابلاً للقياس على الاستثمار.",
    "about.process.3.title": "التنفيذ الذكي المستقل",
    "about.process.3.desc": "نطلق حلولاً مستقلة وذكية تقود عملياتك. تنفذ أنظمتنا مسارات العمل المعقدة دون الحاجة لتدخل بشري مستمر.",
    "about.philosophy.title": "بروتوكول المهندس.",
    "about.philosophy.1.title": "التكافؤ التشغيلي",
    "about.philosophy.1.desc": "كل نظام يتحدث مع كل نظام آخر. نحن نقضي على صوامع البيانات، لنضمن ذكاءً متزامناً ولحظياً عبر كامل الهيكل المؤسسي.",
    "about.philosophy.2.title": "كفاءة رأس المال",
    "about.philosophy.2.desc": "نقضي على التكلفة المتراكمة للمهام اليدوية التي تعتمد على البشر. نجعل العمليات أكثر رشاقة، ونسترد الإيرادات المفقودة عبر أتمتة مطلقة.",
    "about.philosophy.3.title": "السيادة الذكية",
    "about.philosophy.3.desc": "نحن ننشر ذكاءً اصطناعياً يعمل ولا يكتفي بالكلام. يمتلك وكلائنا السيادة لتنفيذ سير العمل، وحل الشذوذ، وتحسين اللوجستيات باستمرار.",
    "about.philosophy.badge": "هندسة معمارية من فئة Palantir",
    "about.team.title": "تعرف على المهندسين",
    "about.team.subtitle": "نسب هندسي عريق يقود التحول المؤسسي.",
    "about.team.1.name": "محمود حسن",
    "about.team.1.role": "الرئيس التنفيذي للتكنولوجيا",
    "about.team.1.desc": "ينسق استراتيجيات البيانات الكلية ويضمن سلامة البنية التحتية عبر جميع عمليات النشر.",
    "about.team.2.name": "أحمد الطماوي",
    "about.team.2.role": "الرئيس التنفيذي",
    "about.team.2.desc": "يترجم المخططات التشخيصية إلى بنية تحتية ملموسة وعالية الأداء دون أي توقف تشغيلي.",
    "about.team.3.name": "محمد خالد",
    "about.team.3.role": "المدير العام",
    "about.team.3.desc": "يطور أنظمة المنطق المستقلة التي تتيح للعمليات التوسع دون نمو نسبي في عدد الموظفين.",
    "about.cta.title.start": "تكلفة التقاعس",
    "about.cta.title.highlight": "تتصاعد أسياً.",
    "about.cta.desc": "كل دقيقة تُهدر في الحفاظ على الأنظمة القديمة هي إيرادات مفقودة للأبد. توقف عن إدارة ديونك التقنية وابدأ التنفيذ بدقة ذكية.",
    "about.cta.button": "بدء التدقيق التشخيصي",
  }
};

export function LanguageProvider({ children, initialEcosystem }: { children: React.ReactNode, initialEcosystem: typeof defaultEcosystem }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("aura-lang") as Language;
    if (savedLang) setLanguage(savedLang);
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("aura-lang", newLang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, ecosystem: initialEcosystem }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-arabic" : ""} style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
