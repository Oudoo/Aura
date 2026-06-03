"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Server, Workflow, Zap, Database, TrendingUp, Calculator } from "lucide-react";
import Link from "next/link";
import { ecosystem } from "@/data/ecosystem";
import { Card } from "@/components/ui/Card";
import { notFound } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { t, language } = useLanguage();
  
  const product = ecosystem
    .flatMap((suite) => suite.products.map((p) => ({ ...p, suiteName: suite.suite, suiteNameAr: suite.suiteAr })))
    .find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const [employees, setEmployees] = useState(25);
  const [legacySpend, setLegacySpend] = useState(2000); // monthly
  const [manualHours, setManualHours] = useState(2); // per week per employee
  const [hourlyRate, setHourlyRate] = useState(32); // hourly

  // Hard Savings: 60% of legacy stack spend eliminated through consolidation
  const monthlyHardSavings = legacySpend * 0.6;
  
  // Soft Savings: 75% of manual operational hours automated
  const weeklyHoursSaved = employees * manualHours * 0.75;
  const annualHoursSaved = weeklyHoursSaved * 52;
  const annualSoftSavings = annualHoursSaved * hourlyRate;
  
  const annualCapitalRecovered = (monthlyHardSavings * 12) + annualSoftSavings;
  
  // Assuming average Aura implementation cost is $150k + $10k/month
  const implementationCost = 150000;
  const monthlyAuraCost = 10000;
  
  const netMonthlyBenefit = (monthlyHardSavings + (weeklyHoursSaved * 4.33 * hourlyRate)) - monthlyAuraCost;
  const ttv = netMonthlyBenefit > 0 ? (implementationCost / netMonthlyBenefit).toFixed(1) : "N/A";

  const features = [
    { title: language === "ar" ? "مزامنة في الوقت الفعلي" : "Real-time Synchronization", icon: <Zap className="w-5 h-5 text-cyan" /> },
    { title: language === "ar" ? "بنية موزعة" : "Distributed Architecture", icon: <Server className="w-5 h-5 text-amethyst" /> },
    { title: language === "ar" ? "سير عمل آلي" : "Automated Workflows", icon: <Workflow className="w-5 h-5 text-cyan" /> },
    { title: language === "ar" ? "بحيرة بيانات موحدة" : "Unified Data Lake", icon: <Database className="w-5 h-5 text-amethyst" /> },
    { title: language === "ar" ? "تحليلات تنبؤية" : "Predictive Analytics", icon: <TrendingUp className="w-5 h-5 text-cyan" /> },
    { title: language === "ar" ? "امتثال مؤسسي" : "Enterprise Compliance", icon: <CheckCircle2 className="w-5 h-5 text-green-400" /> },
  ];

  return (
    <main className="flex-1 flex flex-col items-center pb-24">
      {/* Hero Section */}
      <section className="relative w-full py-24 flex items-center justify-center overflow-hidden border-b border-fg/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan/10 via-void to-void" />
        
        <div className="relative z-10 container mx-auto px-4">
          <Link href="/products" className="inline-flex items-center text-slate hover:text-cyan transition-colors mb-8 text-sm font-medium">
            {language === "ar" ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
            {t("product.back")}
          </Link>
          
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-fg/5 border border-fg/10 text-slate text-xs font-medium uppercase tracking-wider">
              {language === "ar" && product.suiteNameAr ? product.suiteNameAr : product.suiteName}
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-platinum text-glow">
              {language === "ar" && product.nameAr ? product.nameAr : product.name}
            </h1>
            <p className="text-xl text-slate max-w-2xl">
              {language === "ar" && product.descAr ? product.descAr : product.description}
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="w-full py-24 bg-void">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-platinum">{t("product.capabilities.title")}</h2>
            <p className="text-slate">{t("product.capabilities.subtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-fg/5 ${language === "ar" ? "ml-4" : "mr-4"}`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-platinum mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate">{t("product.capabilities.desc")}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Architecture */}
      <section className="w-full py-24 bg-obsidian relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-platinum mb-4">{t("product.arch.title")}</h2>
            <p className="text-slate">{t("product.arch.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between relative" dir="ltr">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-cyan/20 via-amethyst/50 to-cyan/20 hidden md:block" />
            
            <div className="relative z-10 p-8 rounded-2xl bg-void border border-cyan/30 shadow-[0_0_30px_rgba(0,229,255,0.1)] text-center mb-8 md:mb-0 w-full md:w-64">
              <div className="w-12 h-12 mx-auto bg-cyan/10 rounded-full flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-cyan" />
              </div>
              <h4 className="font-bold text-platinum">{language === "ar" && product.nameAr ? product.nameAr : product.name}</h4>
              <p className="text-xs text-slate mt-2">{t("product.arch.edge")}</p>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center mb-8 md:mb-0">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border border-dashed border-amethyst/50 flex items-center justify-center"
              >
                <div className="w-8 h-8 rounded-full bg-amethyst/20" />
              </motion.div>
              <span className="text-xs text-amethyst mt-4 font-mono">{t("product.arch.sync")}</span>
            </div>

            <div className="relative z-10 p-8 rounded-2xl bg-void border border-platinum/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] text-center w-full md:w-64">
              <div className="w-12 h-12 mx-auto bg-platinum/10 rounded-full flex items-center justify-center mb-4">
                <Server className="w-6 h-6 text-platinum" />
              </div>
              <h4 className="font-bold text-platinum">{t("product.arch.core")}</h4>
              <p className="text-xs text-slate mt-2">{t("product.arch.core.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Element: ROI Calculator */}
      <section className="w-full py-24 bg-void relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amethyst/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan/10 mb-6">
              <Calculator className="w-8 h-8 text-cyan" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-platinum text-glow mb-4">{t("roi.title")}</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">{t("roi.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Inputs Panel */}
            <div className="lg:col-span-5 space-y-8 p-8 rounded-2xl bg-obsidian/60 border border-fg/5 backdrop-blur-2xl">
              <h3 className="text-xl font-bold text-platinum mb-6 border-b border-fg/10 pb-4">{t("roi.inputs.title")}</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate">{t("roi.inputs.employees")}</label>
                    <span className="text-sm font-bold text-platinum" dir="ltr">{employees.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" max="5000" step="10"
                    value={employees} 
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-fg/10 rounded-lg appearance-none cursor-pointer accent-amethyst"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate">{t("roi.inputs.spend")}</label>
                    <span className="text-sm font-bold text-platinum" dir="ltr">${legacySpend.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" max="250000" step="500"
                    value={legacySpend} 
                    onChange={(e) => setLegacySpend(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-fg/10 rounded-lg appearance-none cursor-pointer accent-amethyst"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate">{t("roi.inputs.hours")}</label>
                    <span className="text-sm font-bold text-platinum" dir="ltr">{manualHours}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="30" step="1"
                    value={manualHours} 
                    onChange={(e) => setManualHours(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-fg/10 rounded-lg appearance-none cursor-pointer accent-amethyst"
                  />
                  <p className="text-xs text-slate/50">{t("roi.inputs.hours.desc")}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate">{t("roi.inputs.rate")}</label>
                    <span className="text-sm font-bold text-platinum" dir="ltr">${hourlyRate}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" max="150" step="2"
                    value={hourlyRate} 
                    onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-fg/10 rounded-lg appearance-none cursor-pointer accent-amethyst"
                  />
                </div>
              </div>
            </div>

            {/* Outputs Panel */}
            <div className="lg:col-span-7 grid grid-rows-3 gap-6">
              
              {/* Primary Output */}
              <div className="row-span-2 rounded-2xl bg-gradient-to-br from-cyan/10 via-obsidian to-obsidian p-10 border border-cyan/20 flex flex-col justify-center relative overflow-hidden group">
                <div className={`absolute top-0 ${language === "ar" ? "left-0" : "right-0"} p-6 opacity-20 group-hover:opacity-40 transition-opacity`}>
                  <TrendingUp className="w-32 h-32 text-cyan" />
                </div>
                <h4 className="text-sm font-medium text-cyan uppercase tracking-wider mb-2">{t("roi.outputs.annual")}</h4>
                <div className="text-5xl md:text-7xl font-bold text-platinum text-glow mb-4" dir="ltr">
                  ${annualCapitalRecovered.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-slate text-sm max-w-md">
                  {t("roi.outputs.annual.desc")}
                </p>
              </div>

              {/* Secondary Outputs */}
              <div className="row-span-1 grid grid-cols-2 gap-6">
                <div className="rounded-2xl bg-obsidian/60 border border-fg/5 p-6 flex flex-col justify-center">
                  <h4 className="text-xs font-medium text-slate uppercase tracking-wider mb-1">{t("roi.outputs.time")}</h4>
                  <div className="text-3xl font-bold text-amethyst text-glow" dir="ltr">
                    {annualHoursSaved.toLocaleString()} <span className="text-lg text-slate font-normal">{t("roi.outputs.time.unit")}</span>
                  </div>
                </div>
                
                <div className="rounded-2xl bg-obsidian/60 border border-fg/5 p-6 flex flex-col justify-center">
                  <h4 className="text-xs font-medium text-slate uppercase tracking-wider mb-1">{t("roi.outputs.ttv")}</h4>
                  <div className="text-3xl font-bold text-platinum text-glow" dir="ltr">
                    {ttv} <span className="text-lg text-slate font-normal">{t("roi.outputs.ttv.unit")}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
