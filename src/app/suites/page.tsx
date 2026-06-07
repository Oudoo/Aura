"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, Box, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

export default function SuitesPage() {
  const { t, language, ecosystem } = useLanguage();

  const bundle = ecosystem.find((s) => s.slug === "ultimate-bundle");
  const coreSuites = ecosystem.filter((s) => s.slug !== "ultimate-bundle");

  return (
    <main className="flex-1 flex flex-col items-center overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO — editorial header
      ═══════════════════════════════════════════════ */}
      <section className="w-full pt-36 pb-20 px-6 relative overflow-hidden border-b border-fg/6">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-amethyst/6 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-xs font-black tracking-widest uppercase text-cyan mb-8"
          >
            Product Catalog
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.06}
            variants={fadeUp}
            className="font-heading font-black text-platinum leading-[0.88] tracking-tighter mb-8 max-w-4xl"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            {t("suites.title")}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            custom={0.12}
            variants={fadeUp}
            className="text-xl text-slate max-w-2xl leading-relaxed"
          >
            {t("suites.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BUNDLE SPOTLIGHT
      ═══════════════════════════════════════════════ */}
      {bundle && (
        <section className="w-full py-16 px-6 border-b border-fg/6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative rounded-3xl border border-cyan/20 bg-gradient-to-br from-cyan/5 via-obsidian to-amethyst/5 p-10 md:p-14 overflow-hidden group hover:border-cyan/30 transition-colors duration-500"
            >
              {/* Glow blobs */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan/15 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amethyst/15 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-10">
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-cyan" />
                </div>

                <div className="flex-1">
                  <div className="text-xs font-black tracking-widest uppercase text-cyan mb-3">
                    Premiere Offering
                  </div>
                  <h2 className="font-heading font-black text-platinum leading-tight tracking-tighter mb-4"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                    {t("suites.bundle.title")}
                  </h2>
                  <p className="text-slate text-lg leading-relaxed max-w-2xl">
                    {t("suites.bundle.desc")}
                  </p>
                </div>

                <Link
                  href={`/products/${bundle.products[0]?.slug ?? ""}`}
                  className="group/btn flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-4 bg-platinum text-void font-bold rounded-full hover:bg-platinum/90 transition-all duration-300 text-base whitespace-nowrap"
                >
                  {t("suites.view_products")}
                  <ArrowRight className={`w-4 h-4 transition-transform ${language === "ar" ? "rotate-180 group-hover/btn:-translate-x-1" : "group-hover/btn:translate-x-1"}`} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          SUITE GRID — editorial cards
      ═══════════════════════════════════════════════ */}
      <section className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreSuites.map((suite, index) => (
              <motion.div
                key={suite.slug}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index * 0.06}
                variants={fadeUp}
              >
                <div className="h-full p-8 rounded-2xl border border-fg/8 bg-obsidian/60 hover:border-amethyst/30 hover:bg-obsidian transition-all duration-400 group cursor-default flex flex-col">
                  {/* Suite header */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-11 h-11 rounded-xl bg-fg/5 border border-fg/8 flex items-center justify-center flex-shrink-0 group-hover:bg-amethyst/10 group-hover:border-amethyst/20 transition-colors">
                      <Layers className="w-5 h-5 text-slate group-hover:text-amethyst transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-platinum text-xl leading-tight group-hover:text-amethyst transition-colors">
                        {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}
                      </h3>
                      <p className="text-xs text-slate mt-1">{suite.products.length} modules</p>
                    </div>
                  </div>

                  {/* Product list */}
                  <div className="space-y-2.5 flex-1">
                    {suite.products.slice(0, 4).map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="flex items-center gap-2.5 text-sm text-slate hover:text-cyan transition-colors group/link"
                      >
                        <Box className="w-3 h-3 text-cyan/50 group-hover/link:text-cyan transition-colors flex-shrink-0" />
                        <span className="line-clamp-1">
                          {language === "ar" && product.nameAr ? product.nameAr : product.name}
                        </span>
                      </Link>
                    ))}
                    {suite.products.length > 4 && (
                      <p className="text-xs text-slate/50 pt-1 pl-5.5">
                        +{suite.products.length - 4} more
                      </p>
                    )}
                  </div>

                  {/* Footer link */}
                  <div className="mt-8 pt-6 border-t border-fg/6">
                    <Link
                      href="/suites"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate hover:text-amethyst transition-colors"
                    >
                      Explore Suite
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${language === "ar" ? "rotate-180" : "group-hover:translate-x-0.5"}`} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════════════ */}
      <section className="w-full py-24 px-6 border-t border-fg/6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-void via-obsidian to-void pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2
              className="font-heading font-black text-platinum leading-[0.9] tracking-tighter mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Not sure where to start?
            </h2>
            <p className="text-slate text-lg mb-10 leading-relaxed">
              Take our Digital Maturity Assessment and we'll map the right modules to your specific operational gaps.
            </p>
            <Link
              href="/audit"
              className="group inline-flex items-center gap-3 bg-cyan text-void px-9 py-4 rounded-full font-bold text-base hover:bg-cyan/90 transition-colors"
            >
              Start Free Assessment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
