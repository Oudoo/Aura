"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageContext";

export default function ProductsPage() {
  const [activeSuite, setActiveSuite] = useState<string>("all");
  const { t, language, ecosystem } = useLanguage();

  const allProducts = ecosystem.flatMap((suite) =>
    suite.products.map((p) => ({ ...p, suiteSlug: suite.slug, suiteName: suite.suite, suiteNameAr: suite.suiteAr }))
  );

  const filteredProducts =
    activeSuite === "all"
      ? allProducts
      : allProducts.filter((p) => p.suiteSlug === activeSuite);

  return (
    <main className="flex-1 flex flex-col items-center bg-void">
      <section className="w-full py-20 md:py-28 bg-void border-b border-fg/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="max-w-4xl"
          >
            <span className="eyebrow text-cyan">(Products)</span>
            <h1 className="display text-5xl md:text-7xl text-platinum mt-4 mb-6">
              {t("products.title")}
            </h1>
            <p className="text-slate text-lg leading-relaxed max-w-2xl">
              {t("products.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-6 sticky top-20 z-40 bg-void/80 backdrop-blur-xl border-b border-fg/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-2">
            <button
              onClick={() => setActiveSuite("all")}
              className={cn(
                "relative px-6 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap transition-colors",
                activeSuite === "all" ? "text-white" : "text-slate hover:text-platinum bg-fg/5",
                language === "ar" && "ml-2"
              )}
            >
              {activeSuite === "all" && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-cyan rounded-md"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t("products.filter.all")}</span>
            </button>
            {ecosystem.map((suite) => (
              <button
                key={suite.slug}
                onClick={() => setActiveSuite(suite.slug)}
                className={cn(
                  "relative px-6 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap transition-colors",
                  activeSuite === suite.slug ? "text-white" : "text-slate hover:text-platinum bg-fg/5",
                  language === "ar" && "ml-2"
                )}
              >
                {activeSuite === suite.slug && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-cyan rounded-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-28 bg-void min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/products/${product.slug}`}>
                    <Card className="h-full p-6 group bg-void border border-fg/10 rounded-xl backdrop-blur-none hover:border-cyan/40 hover:-translate-y-1 cursor-pointer flex flex-col justify-between transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="eyebrow text-cyan">
                            ({language === "ar" && product.suiteNameAr ? product.suiteNameAr : product.suiteName})
                          </span>
                          <span className="text-xs font-semibold text-slate tabular-nums" dir="ltr">
                            {String(idx + 1).padStart(2, "0")}/
                          </span>
                        </div>
                        <h3 className="text-xl heading font-bold text-platinum mb-3 group-hover:text-cyan transition-colors">
                          {language === "ar" && product.nameAr ? product.nameAr : product.name}
                        </h3>
                        <p className="text-slate text-sm leading-relaxed">
                          {language === "ar" && product.descAr ? product.descAr : product.description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center text-sm font-semibold text-platinum group-hover:text-cyan transition-colors">
                        {t("products.view_details")}
                        {language === "ar" ? (
                          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        ) : (
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
