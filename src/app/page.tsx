"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Cpu, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/components/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <main className="flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Light Trails */}
        <div className="absolute inset-0 z-0 opacity-40">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q25,25 50,50 T100,50"
              stroke="url(#cyan-grad)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.path
              d="M0,70 Q25,95 50,70 T100,70"
              stroke="url(#amethyst-grad)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 1 }}
            />
            <defs>
              <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--obsidian)" />
                <stop offset="50%" stopColor="var(--cyan)" />
                <stop offset="100%" stopColor="var(--obsidian)" />
              </linearGradient>
              <linearGradient id="amethyst-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--obsidian)" />
                <stop offset="50%" stopColor="var(--amethyst)" />
                <stop offset="100%" stopColor="var(--obsidian)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-platinum text-glow leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-slate font-body max-w-2xl mx-auto">
              {t("hero.subtitle")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amethyst font-semibold">
                {t("hero.subtitle.highlight")}
              </span>.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/suites"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-void transition-all duration-200 bg-cyan border border-transparent rounded-full hover:bg-cyan/90 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              >
                {t("hero.explore")}
                <ArrowRight className={`w-5 h-5 transition-transform ${language === "ar" ? "mr-2 group-hover:-translate-x-1 rotate-180" : "ml-2 group-hover:translate-x-1"}`} />
              </Link>
              <Link
                href="https://wa.me/201066221112"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-bold text-platinum transition-all duration-200 bg-transparent border border-fg/10 rounded-full hover:bg-fg/5"
              >
                {t("hero.contact")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="w-full py-24 bg-void relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-platinum">{t("methodology.title")}</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">{t("methodology.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 group hover:border-cyan/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-cyan" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-platinum mb-3">{t("methodology.1.title")}</h3>
              <p className="text-slate leading-relaxed">
                {t("methodology.1.desc")}
              </p>
            </Card>

            <Card className="p-8 group hover:border-amethyst/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-amethyst/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6 text-amethyst" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-platinum mb-3">{t("methodology.2.title")}</h3>
              <p className="text-slate leading-relaxed">
                {t("methodology.2.desc")}
              </p>
            </Card>

            <Card className="p-8 group hover:border-fg/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-fg/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-platinum" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-platinum mb-3">{t("methodology.3.title")}</h3>
              <p className="text-slate leading-relaxed">
                {t("methodology.3.desc")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Command Center Showcase Section */}
      <section className="w-full py-32 bg-gradient-to-b from-void to-obsidian relative overflow-hidden">
        {/* Glow behind dashboard */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amethyst/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-platinum text-glow">{t("dashboard.title")}</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">{t("dashboard.subtitle")}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <div className="rounded-xl border border-fg/10 bg-obsidian/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden">
              
              {/* Top KPI Bar */}
              <div className="grid grid-cols-3 border-b border-fg/5 bg-fg/[0.02]">
                <div className={`p-6 border-fg/5 text-center ${language === "ar" ? "border-l" : "border-r"}`}>
                  <div className="text-sm font-medium text-slate uppercase tracking-wider mb-1">{t("dashboard.kpi1.label")}</div>
                  <div className="text-3xl font-bold text-cyan text-glow" dir="ltr">{t("dashboard.kpi1.value")}</div>
                </div>
                <div className={`p-6 border-fg/5 text-center ${language === "ar" ? "border-l" : "border-r"}`}>
                  <div className="text-sm font-medium text-slate uppercase tracking-wider mb-1">{t("dashboard.kpi2.label")}</div>
                  <div className="text-3xl font-bold text-platinum text-glow" dir="ltr">{t("dashboard.kpi2.value")}</div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-sm font-medium text-slate uppercase tracking-wider mb-1">{t("dashboard.kpi3.label")}</div>
                  <div className="text-3xl font-bold text-amethyst text-glow" dir="ltr">{t("dashboard.kpi3.value")}</div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="grid grid-cols-1 md:grid-cols-3 min-h-[400px]">
                
                {/* Center Widget: The Convergence Map */}
                <div className={`col-span-2 p-8 relative flex items-center justify-center border-fg/5 ${language === "ar" ? "border-l" : "border-r"}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan/5 via-transparent to-transparent pointer-events-none" />
                  
                  {/* SVG Convergence Node Graph */}
                  <div className="relative w-full max-w-md aspect-video" dir="ltr">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
                      <defs>
                        <linearGradient id="hr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="var(--amethyst)" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="log-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="var(--amethyst)" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="fin-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="var(--amethyst)" stopOpacity="0.2" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Paths converging to center */}
                      <motion.path 
                        d="M 50,40 Q 150,40 250,100" 
                        fill="none" 
                        stroke="url(#hr-grad)" 
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.path 
                        d="M 50,100 Q 150,100 250,100" 
                        fill="none" 
                        stroke="url(#fin-grad)" 
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.path 
                        d="M 50,160 Q 150,160 250,100" 
                        fill="none" 
                        stroke="url(#log-grad)" 
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Origin Nodes */}
                      <circle cx="50" cy="40" r="6" fill="var(--cyan)" filter="url(#glow)" />
                      <text x="10" y="44" fill="var(--slate)" fontSize="10" fontFamily="monospace">HR_API</text>
                      
                      <circle cx="50" cy="100" r="6" fill="#10B981" filter="url(#glow)" />
                      <text x="10" y="104" fill="var(--slate)" fontSize="10" fontFamily="monospace">FIN_DB</text>
                      
                      <circle cx="50" cy="160" r="6" fill="#F43F5E" filter="url(#glow)" />
                      <text x="10" y="164" fill="var(--slate)" fontSize="10" fontFamily="monospace">LOG_SYS</text>

                      {/* Central Core */}
                      <motion.circle 
                        cx="250" cy="100" r="20" 
                        fill="var(--amethyst)" 
                        filter="url(#glow)"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <circle cx="250" cy="100" r="10" fill="var(--platinum)" />
                      <text x="285" y="104" fill="var(--platinum)" fontSize="14" fontWeight="bold" filter="url(#glow)">AURA CORE</text>
                    </svg>
                  </div>
                </div>

                {/* Right Sidebar: Live AI Feed */}
                <div className="col-span-1 p-6 flex flex-col bg-void/50">
                  <h3 className="text-sm font-semibold text-platinum mb-4 flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-cyan animate-pulse ${language === "ar" ? "ml-2" : "mr-2"}`} />
                    {t("dashboard.live_feed")}
                  </h3>
                  
                  <div className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void z-10 pointer-events-none" />
                    
                    <motion.div 
                      className="space-y-4 font-body text-xs absolute w-full"
                      animate={{ y: ["0%", "-50%"] }}
                      transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    >
                      {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, idx) => (
                        <div key={idx} className={`p-3 rounded border ${idx % 2 === 0 ? "bg-fg/5 border-fg/5 text-slate" : "bg-cyan/5 border-cyan/10 text-cyan/90"}`}>
                          <span className={`${idx % 2 === 0 ? "text-amethyst" : "text-cyan"} font-bold`} dir="ltr">[{14}:0{item + 2}:{10 + item * 3}]</span> {t(`dashboard.feed.${item}`)}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
