"use client";

import { useLanguage } from "@/components/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Compass, Rocket, Database, Zap, Cpu, Network, BarChart, ShieldCheck } from "lucide-react";
import { useRef } from "react";

export default function MethodologyPage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pipelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const phases = [
    {
      title: t("methodology.1.title"),
      desc: t("methodology.1.desc"),
      icon: <Search className="w-7 h-7 text-cyan" />,
      subpoints: [
        { icon: <Database className="w-5 h-5 text-cyan" />, text: t("methodology.1.sub1") },
        { icon: <Zap className="w-5 h-5 text-cyan" />, text: t("methodology.1.sub2") },
        { icon: <ShieldCheck className="w-5 h-5 text-cyan" />, text: t("methodology.1.sub3") }
      ]
    },
    {
      title: t("methodology.2.title"),
      desc: t("methodology.2.desc"),
      icon: <Compass className="w-7 h-7 text-cyan" />,
      subpoints: [
        { icon: <Network className="w-5 h-5 text-cyan" />, text: t("methodology.2.sub1") },
        { icon: <Cpu className="w-5 h-5 text-cyan" />, text: t("methodology.2.sub2") },
        { icon: <BarChart className="w-5 h-5 text-cyan" />, text: t("methodology.2.sub3") }
      ]
    },
    {
      title: t("methodology.3.title"),
      desc: t("methodology.3.desc"),
      icon: <Rocket className="w-7 h-7 text-cyan" />,
      subpoints: [
        { icon: <Zap className="w-5 h-5 text-cyan" />, text: t("methodology.3.sub1") },
        { icon: <Network className="w-5 h-5 text-cyan" />, text: t("methodology.3.sub2") },
        { icon: <BarChart className="w-5 h-5 text-cyan" />, text: t("methodology.3.sub3") }
      ]
    },
  ];

  return (
    <main className="flex-1 w-full relative bg-void py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="max-w-3xl mb-24 md:mb-32"
        >
          <div className="inline-flex items-center gap-2 border border-fg/15 bg-fg/5 px-4 py-1.5 rounded-md text-platinum eyebrow tracking-wide uppercase mb-6">
            <Cpu className="w-4 h-4 text-cyan" /> {t("methodology.protocol")}
          </div>
          <h1 className="display-xl text-5xl md:text-7xl mb-6 text-platinum">
            {t("methodology.title")}
          </h1>
          <p className="text-xl text-slate leading-relaxed">
            {t("methodology.protocol.desc")}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Scroll-Driven Pipeline rail */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-fg/15 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-fg/15 -translate-x-1/2 md:hidden" />

          <motion.div
            className="absolute left-[39px] md:left-1/2 top-0 w-px bg-cyan -translate-x-1/2 z-0"
            style={{ height: pipelineHeight }}
          />

          <div className="space-y-20 md:space-y-40 relative z-10">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;
              const num = String(index + 1).padStart(2, "0");
              return (
                <div key={index} className={`flex flex-col md:flex-row items-start gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>

                  {/* Timeline Node */}
                  <div className="absolute left-[39px] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-void border border-cyan flex items-center justify-center mt-6 md:mt-0 z-20">
                    <div className="w-3 h-3 bg-cyan rounded-full" />
                  </div>

                  {/* Content Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" as const }}
                    className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'} pl-24 md:pl-0 pt-2`}
                  >
                    <div className="bg-obsidian border border-fg/10 p-8 md:p-10 rounded-xl relative group hover:border-cyan/40 transition-colors duration-300">
                      <div className="text-sm font-semibold text-cyan mb-6 tracking-wide">{num}/</div>
                      <div className="w-14 h-14 rounded-lg bg-void border border-fg/10 flex items-center justify-center mb-7 group-hover:-translate-y-1 transition-transform duration-300">
                        {phase.icon}
                      </div>
                      <h2 className="display text-2xl md:text-3xl mb-4 text-platinum">
                        {phase.title}
                      </h2>
                      <p className="text-slate leading-relaxed mb-8 text-lg">
                        {phase.desc}
                      </p>

                      <div className="space-y-3">
                        {phase.subpoints.map((sub, idx) => (
                          <div key={idx} className="flex items-center gap-4 bg-void p-4 rounded-lg border border-fg/10 hover:border-cyan/40 transition-colors">
                            <div className="p-2 bg-obsidian rounded-md border border-fg/10">
                              {sub.icon}
                            </div>
                            <span className="text-sm font-medium text-platinum">{sub.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
