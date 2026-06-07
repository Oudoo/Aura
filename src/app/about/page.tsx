"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Crosshair, Server, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  return (
    <main className="flex-1 w-full overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO — bold editorial opening
      ═══════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-28 md:pt-48 md:pb-36 px-6 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-cyan/8 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amethyst/6 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="text-xs font-black tracking-widest uppercase text-cyan mb-8">Our Story</p>
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.06}
            variants={fadeUp}
            className="font-heading font-black text-platinum leading-[0.88] tracking-tighter mb-10 max-w-5xl"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            {t("about.hero.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amethyst">
              {t("about.hero.highlight")}
            </span>{" "}
            {t("about.hero.title.end")}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            custom={0.12}
            variants={fadeUp}
            className="text-xl md:text-2xl text-slate max-w-3xl leading-relaxed"
          >
            {t("about.hero.desc")}
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROCESS — numbered phases
      ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-obsidian border-y border-fg/6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(var(--fg) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase text-cyan mb-5"
            >
              {t("about.process.title")}
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.06}
              variants={fadeUp}
              className="font-heading font-black text-platinum leading-[0.9] tracking-tighter max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              {t("about.process.subtitle")}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { phase: "01", title: t("about.process.1.title"), desc: t("about.process.1.desc"), Icon: Activity, color: "text-cyan", accent: "from-cyan/30 to-cyan/0" },
              { phase: "02", title: t("about.process.2.title"), desc: t("about.process.2.desc"), Icon: Crosshair, color: "text-amethyst", accent: "from-amethyst/30 to-amethyst/0" },
              { phase: "03", title: t("about.process.3.title"), desc: t("about.process.3.desc"), Icon: Server, color: "text-platinum", accent: "from-slate/30 to-slate/0" },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={idx * 0.1}
                variants={fadeUp}
                className="group relative"
              >
                <div
                  className={`font-heading font-black bg-gradient-to-b ${step.accent} bg-clip-text text-transparent leading-none mb-6 select-none`}
                  style={{ fontSize: "clamp(4rem, 7vw, 6rem)" }}
                >
                  {step.phase}
                </div>
                <div className={`w-10 h-10 rounded-xl bg-obsidian border border-fg/10 flex items-center justify-center mb-6 group-hover:border-fg/20 transition-colors ${step.color}`}>
                  <step.Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-platinum text-2xl mb-4">{step.title}</h3>
                <p className="text-slate leading-relaxed text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PHILOSOPHY — flashlight spotlight
      ═══════════════════════════════════════════════ */}
      <section
        className="py-28 md:py-36 relative group cursor-crosshair overflow-hidden"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
      >
        {/* Mouse-follow glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,229,255,0.06), transparent 50%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2
                className="font-heading font-black text-platinum leading-[0.9] tracking-tighter mb-14 group-hover:text-cyan transition-colors duration-700"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                {t("about.philosophy.title")}
              </h2>
              <div className="space-y-10">
                {[
                  { title: t("about.philosophy.1.title"), desc: t("about.philosophy.1.desc") },
                  { title: t("about.philosophy.2.title"), desc: t("about.philosophy.2.desc") },
                  { title: t("about.philosophy.3.title"), desc: t("about.philosophy.3.desc") },
                ].map((pillar, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-fg/10 hover:border-cyan/40 transition-colors">
                    <div className="absolute -left-1 top-1.5 w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,229,255,0.7)]" />
                    <h3 className="font-heading font-bold text-platinum text-xl mb-2">{pillar.title}</h3>
                    <p className="text-slate leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[520px] rounded-3xl overflow-hidden border border-fg/10 bg-obsidian/60 backdrop-blur-xl group/card"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)}px ${mousePos.y}px, rgba(139,92,246,0.12), transparent 50%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 rounded-full border border-amethyst/20 bg-amethyst/5 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black font-heading text-amethyst/50">A</span>
                </div>
                <p className="text-slate font-mono text-xs tracking-[0.3em] uppercase">{t("about.philosophy.badge")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TEAM — leadership cards
      ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-obsidian border-y border-fg/6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-xs font-black tracking-widest uppercase text-cyan mb-5"
            >
              Leadership
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.06}
              variants={fadeUp}
              className="font-heading font-black text-platinum leading-[0.9] tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              {t("about.team.title")}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.1}
              variants={fadeUp}
              className="text-slate text-lg mt-4 max-w-xl"
            >
              {t("about.team.subtitle")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: "mahmoud", name: t("about.team.1.name"), role: t("about.team.1.role"), desc: t("about.team.1.desc"), linkedin: "https://www.linkedin.com/in/oudoo/" },
              { id: "ahmed",   name: t("about.team.2.name"), role: t("about.team.2.role"), desc: t("about.team.2.desc"), linkedin: "https://www.linkedin.com/in/ahmedaltamawy/" },
              { id: "mohamed", name: t("about.team.3.name"), role: t("about.team.3.role"), desc: t("about.team.3.desc"), linkedin: "https://www.linkedin.com/in/mohameed-khaleed-51892a404/" },
            ].map((leader, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={idx * 0.1}
                variants={fadeUp}
              >
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {/* Photo */}
                  <div className="aspect-[4/5] rounded-2xl bg-obsidian border border-fg/10 mb-6 overflow-hidden relative flex items-center justify-center group-hover:border-cyan/30 transition-all duration-500">
                    <Image
                      src={`/team/${leader.id}.jpg`}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    {/* LinkedIn overlay */}
                    <div className="absolute inset-0 bg-void/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <ExternalLink className="w-8 h-8 text-cyan" />
                    </div>
                    {/* Fallback */}
                    <span className="absolute inset-0 flex items-center justify-center text-slate/30 font-heading font-black text-6xl">
                      {leader.name.charAt(0)}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <h3 className="font-heading font-bold text-platinum text-2xl group-hover:text-cyan transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-bold text-cyan tracking-widest uppercase">{leader.role}</p>
                  </div>
                  <p className="text-slate leading-relaxed">{leader.desc}</p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — dark, bold
      ═══════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/6 via-obsidian to-amethyst/6 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amethyst/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-xs font-black tracking-widest uppercase text-cyan mb-8">Ready to Start?</p>
            <h2
              className="font-heading font-black text-platinum leading-[0.88] tracking-tighter mb-8"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              {t("about.cta.title.start")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amethyst">
                {t("about.cta.title.highlight")}
              </span>
            </h2>
            <p className="text-xl text-slate mb-14 max-w-2xl mx-auto leading-relaxed">
              {t("about.cta.desc")}
            </p>

            <Link
              href="/audit"
              className="group inline-flex items-center gap-3 bg-platinum text-void px-10 py-5 rounded-full font-bold text-lg hover:bg-platinum/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(248,250,252,0.12)]"
            >
              {t("about.cta.button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
