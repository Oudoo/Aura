"use client";

import { motion } from "framer-motion";
import { ArrowRight, Box, Layers, Package } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/components/LanguageContext";

export default function SuitesPage() {
  const { t, language, ecosystem } = useLanguage();

  // The ultimate bundle is our spotlight product
  const bundle = ecosystem.find((s) => s.slug === "ultimate-bundle");
  const coreSuites = ecosystem.filter((s) => s.slug !== "ultimate-bundle");

  return (
    <main className="flex-1 flex flex-col items-center w-full">
      {/* Header Section */}
      <section className="w-full pt-32 pb-16 md:pt-44 md:pb-20 bg-void border-b border-fg/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="max-w-4xl"
          >
            <span className="eyebrow text-cyan block mb-6">(The Ecosystem)</span>
            <h1 className="display-xl text-5xl md:text-7xl text-platinum mb-6">
              {t("suites.title")}
            </h1>
            <p className="text-xl text-slate max-w-2xl leading-relaxed">
              {t("suites.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Spotlight Bundle Section */}
      <section className="w-full py-16 md:py-20 bg-obsidian border-b border-fg/10">
        <div className="max-w-5xl mx-auto px-6">
          {bundle && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
            >
              <Card className="!rounded-xl !border-fg/10 !bg-void !backdrop-blur-none p-8 md:p-12 hover:!border-cyan/40 transition-colors">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/20">
                    <Package className="w-10 h-10 text-cyan" />
                  </div>
                  <div className="flex-1 text-center md:text-start">
                    <div className="eyebrow text-cyan tracking-widest uppercase mb-3">(Premiere Offering)</div>
                    <h2 className="display text-3xl md:text-4xl text-platinum mb-4">{t("suites.bundle.title")}</h2>
                    <p className="text-slate leading-relaxed mb-7 max-w-2xl">
                      {t("suites.bundle.desc")}
                    </p>
                    <Link
                      href={`/products/${bundle.products[0].slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan text-white font-semibold hover:bg-amethyst transition-colors"
                    >
                      {t("suites.view_products")}
                      <ArrowRight className={`w-4 h-4 ${language === "ar" ? "rotate-180" : ""}`} />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Core Suites Grid */}
      <section className="w-full py-16 md:py-24 bg-void">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreSuites.map((suite, index) => (
              <motion.div
                key={suite.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" as const }}
              >
                <Card className="!rounded-xl !border-fg/10 !bg-obsidian !backdrop-blur-none h-full p-8 group hover:!border-cyan/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-void border border-fg/10 flex items-center justify-center mb-6 text-platinum group-hover:text-cyan transition-colors">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="display text-2xl text-platinum mb-5 group-hover:text-cyan transition-colors">
                      {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}
                    </h3>
                    <div className="space-y-3 flex-1">
                      {suite.products.slice(0, 3).map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          className="flex items-center text-sm text-slate hover:text-cyan transition-colors"
                        >
                          <Box className={`w-3 h-3 ${language === "ar" ? "ml-2" : "mr-2"} text-cyan`} />
                          <span className="line-clamp-1">{language === "ar" && product.nameAr ? product.nameAr : product.name}</span>
                        </Link>
                      ))}
                      {suite.products.length > 3 && (
                        <div className="text-xs font-medium text-slate pt-2 border-t border-fg/10 mt-3">
                          + {suite.products.length - 3} more modules
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
