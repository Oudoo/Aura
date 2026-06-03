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

// Define our translations directly in this file for simplicity since it's a single page app experience
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
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
    
    // Home Page Methodology
    "methodology.title": "The Aura Methodology",
    "methodology.subtitle": "Our proprietary framework for digital transformation.",
    "methodology.1.title": "1. Diagnose",
    "methodology.1.desc": "We embed within your organization to map existing processes, identify operational bottlenecks, and analyze technical debt.",
    "methodology.2.title": "2. Strategize",
    "methodology.2.desc": "Our architects design a comprehensive, bespoke digital roadmap using the Aura ecosystem, tailored specifically to your objectives.",
    "methodology.3.title": "3. Execute",
    "methodology.3.desc": "We deploy the solution with precision, ensuring seamless integration, employee training, and continuous growth tracking.",
    
    // Home Page Dashboard
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

    // Products Directory Page
    "products.title": "Product Directory",
    "products.subtitle": "Explore the components of the Aura ecosystem.",
    "products.filter.all": "All Products",
    "products.view_details": "View Details",

    // Product Details Page
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
    
    // ROI Calculator
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
  },
  ar: {
    // Navbar
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
    
    // Home Page Methodology
    "methodology.title": "منهجية أورا",
    "methodology.subtitle": "إطار عمل حصري لدفع التحول الرقمي الاستراتيجي.",
    "methodology.1.title": "1. التشخيص الدقيق",
    "methodology.1.desc": "نعمل جنباً إلى جنب مع فريقك لرسم خريطة العمليات الحالية، وتحديد المعوقات التشغيلية، وتحليل أعباء الأنظمة القديمة.",
    "methodology.2.title": "2. بناء الاستراتيجية",
    "methodology.2.desc": "يصمم خبراؤنا خارطة طريق رقمية متكاملة باستخدام نظام أورا البيئي، لتتوافق تماماً مع أهدافك الاستراتيجية.",
    "methodology.3.title": "3. التنفيذ المتقن",
    "methodology.3.desc": "نقوم بنشر الحلول المعتمدة بدقة متناهية، لضمان التكامل السلس وتدريب الكوادر ومتابعة مؤشرات النمو المستمر.",
    
    // Home Page Dashboard
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

    // Products Directory Page
    "products.title": "دليل المنتجات والتطبيقات",
    "products.subtitle": "استكشف البنية التحتية والمكونات المتقدمة لنظام أورا البيئي.",
    "products.filter.all": "جميع المنتجات",
    "products.view_details": "عرض التفاصيل",

    // Product Details Page
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
    
    // ROI Calculator
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
