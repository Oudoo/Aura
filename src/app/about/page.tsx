"use client";

import { motion } from "framer-motion";
import { ArrowRight, Server, Activity, Shield, Crosshair } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="flex-1 w-full bg-void relative">
      {/* 1. The Hero (The "Why") */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 border-b border-fg/10">
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="max-w-4xl"
          >
            <span className="eyebrow text-cyan block mb-6">(Our Story)</span>
            <h1 className="display-xl text-5xl md:text-8xl text-platinum mb-8">
              {t("about.hero.title")} <span className="text-cyan">{t("about.hero.highlight")}</span> {t("about.hero.title.end")}
            </h1>
            <p className="text-xl md:text-2xl text-slate max-w-3xl leading-relaxed">
              {t("about.hero.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. The "Business Doctor" Diagnosis Phase */}
      <section className="py-20 md:py-28 bg-void relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="mb-16 md:mb-20 max-w-3xl"
          >
            <span className="eyebrow text-cyan block mb-4">(The Process)</span>
            <h2 className="display text-4xl md:text-6xl text-platinum mb-5">{t("about.process.title")}</h2>
            <p className="text-slate text-lg leading-relaxed">{t("about.process.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fg/10 border border-fg/10 rounded-xl overflow-hidden">
            {[
              {
                phase: "01",
                title: t("about.process.1.title"),
                desc: t("about.process.1.desc"),
                icon: <Activity className="w-6 h-6 text-cyan" />
              },
              {
                phase: "02",
                title: t("about.process.2.title"),
                desc: t("about.process.2.desc"),
                icon: <Crosshair className="w-6 h-6 text-cyan" />
              },
              {
                phase: "03",
                title: t("about.process.3.title"),
                desc: t("about.process.3.desc"),
                icon: <Server className="w-6 h-6 text-cyan" />
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" as const }}
                className="bg-void p-8 md:p-10 relative group transition-colors hover:bg-fg/5"
              >
                <div className="text-sm font-semibold text-cyan mb-6 tracking-wide">{step.phase}/</div>
                <div className="w-12 h-12 rounded-lg bg-obsidian border border-fg/10 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="display text-2xl text-platinum mb-3">{step.title}</h3>
                <p className="text-slate leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Core Philosophy */}
      <section className="py-20 md:py-28 relative bg-obsidian border-y border-fg/10">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <span className="eyebrow text-cyan block mb-4">(Philosophy)</span>
              <h2 className="display text-4xl md:text-6xl text-platinum mb-10">
                {t("about.philosophy.title")}
              </h2>
              <div className="space-y-10">
                {[
                  {
                    num: "01",
                    title: t("about.philosophy.1.title"),
                    desc: t("about.philosophy.1.desc")
                  },
                  {
                    num: "02",
                    title: t("about.philosophy.2.title"),
                    desc: t("about.philosophy.2.desc")
                  },
                  {
                    num: "03",
                    title: t("about.philosophy.3.title"),
                    desc: t("about.philosophy.3.desc")
                  }
                ].map((pillar, idx) => (
                  <div key={idx} className="relative pl-10 border-l border-fg/15">
                    <div className="absolute left-[-1px] top-0 h-8 w-px bg-cyan" />
                    <div className="text-sm font-semibold text-cyan mb-2">{pillar.num}/</div>
                    <h3 className="display text-xl text-platinum mb-2">{pillar.title}</h3>
                    <p className="text-slate leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="relative h-[420px] md:h-[560px] rounded-xl overflow-hidden bg-void border border-fg/10"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <Shield className="w-16 h-16 text-cyan mb-6" />
                <p className="eyebrow text-slate tracking-widest uppercase">{t("about.philosophy.badge")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. The Leadership/Team Section */}
      <section className="py-20 md:py-28 bg-void relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="mb-16 md:mb-20 max-w-3xl"
          >
            <span className="eyebrow text-cyan block mb-4">(Leadership)</span>
            <h2 className="display text-4xl md:text-6xl text-platinum mb-5">{t("about.team.title")}</h2>
            <p className="text-slate text-lg leading-relaxed">{t("about.team.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'mahmoud', name: t("about.team.1.name"), role: t("about.team.1.role"), desc: t("about.team.1.desc"), linkedin: "https://www.linkedin.com/in/oudoo/" },
              { id: 'ahmed', name: t("about.team.2.name"), role: t("about.team.2.role"), desc: t("about.team.2.desc"), linkedin: "https://www.linkedin.com/in/ahmedaltamawy/" },
              { id: 'mohamed', name: t("about.team.3.name"), role: t("about.team.3.role"), desc: t("about.team.3.desc"), linkedin: "https://www.linkedin.com/in/mohameed-khaleed-51892a404/" }
            ].map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" as const }}
              >
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer block"
                >
                  <div className="aspect-square rounded-xl bg-obsidian border border-fg/10 mb-6 overflow-hidden relative flex items-center justify-center group-hover:border-cyan/40 transition-colors duration-300">
                    {/* The actual photo */}
                    <Image
                      src={`/team/${leader.id}.jpg`}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Fallback placeholder underneath */}
                    <span className="absolute inset-0 flex items-center justify-center text-slate font-mono text-xs tracking-widest uppercase group-hover:text-cyan transition-colors z-0">
                      {leader.name} Portrait
                    </span>
                  </div>
                  <h3 className="display text-2xl text-platinum mb-1 group-hover:text-cyan transition-colors">{leader.name}</h3>
                  <p className="text-cyan text-sm font-semibold mb-4">{leader.role}</p>
                  <p className="text-slate leading-relaxed">{leader.desc}</p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Proof Point (CTA) */}
      <section className="py-20 md:py-28 relative bg-obsidian border-t border-fg/10">
        <div className="max-w-5xl mx-auto px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <h2 className="display text-5xl md:text-7xl mb-8 text-platinum">
              {t("about.cta.title.start")} <br/>
              <span className="text-cyan">{t("about.cta.title.highlight")}</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("about.cta.desc")}
            </p>

            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan text-white font-semibold hover:bg-amethyst transition-colors"
            >
              {t("about.cta.button")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
