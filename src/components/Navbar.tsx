"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Globe } from "lucide-react";
import { ecosystem } from "@/data/ecosystem";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "./LanguageContext";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, language, toggleLanguage } = useLanguage();

  const menus = {
    methodology: {
      title: t("nav.methodology"),
      content: (
        <div className="grid grid-cols-2 gap-8 p-6 w-[500px]">
          <div className="space-y-3">
            <h4 className="text-platinum font-semibold">{t("methodology.1.title")}</h4>
            <p className="text-sm text-slate">{t("methodology.1.desc")}</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-platinum font-semibold">{t("methodology.2.title")}</h4>
            <p className="text-sm text-slate">{t("methodology.2.desc")}</p>
          </div>
          <div className="col-span-2 space-y-3">
            <h4 className="text-platinum font-semibold">{t("methodology.3.title")}</h4>
            <p className="text-sm text-slate">{t("methodology.3.desc")}</p>
          </div>
        </div>
      ),
    },
    suites: {
      title: t("nav.suites"),
      content: (
        <div className="w-[600px] p-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {ecosystem.map((suite) => (
              <div key={suite.slug} className="group cursor-pointer" onClick={() => setActiveMenu(null)}>
                <Link href="/suites" className="block">
                  <h4 className="text-platinum font-medium group-hover:text-cyan transition-colors flex items-center">
                    {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </h4>
                  <p className="text-xs text-slate mt-1 line-clamp-1">
                    {language === "ar" && suite.descAr ? suite.descAr : suite.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    products: {
      title: t("nav.products"),
      content: (
        <div className="w-[800px] p-6 grid grid-cols-3 gap-6">
          {ecosystem.slice(0, 3).map((suite) => (
            <div key={suite.slug} className="space-y-4">
              <h4 className="text-sm font-semibold text-platinum border-b border-fg/10 pb-2">
                {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}
              </h4>
              <ul className="space-y-2">
                {suite.products.slice(0, 4).map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-xs text-slate hover:text-cyan transition-colors line-clamp-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      {language === "ar" && product.nameAr ? product.nameAr : product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-fg/5 bg-obsidian/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <img src="/logo.png" alt="Aura" className="h-8 w-auto" />
          <span className="font-heading font-bold text-xl tracking-tight text-platinum">
            AURA
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 h-full" onMouseLeave={() => setActiveMenu(null)}>
          {Object.entries(menus).map(([key, menu]) => (
            <div
              key={key}
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveMenu(key)}
            >
              <button className="flex items-center space-x-1 text-sm font-medium text-slate hover:text-platinum transition-colors">
                <span>{menu.title}</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </button>

              <AnimatePresence>
                {activeMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: 10, rotateX: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 perspective-1000"
                  >
                    <div className="bg-obsidian border border-fg/10 rounded-2xl shadow-2xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-fg/5 to-transparent pointer-events-none" />
                      <div className="relative z-10">{menu.content}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-sm font-medium text-slate hover:text-platinum transition-colors px-2 py-1"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language === "en" ? "AR" : "EN"}</span>
          </button>
          
          <ThemeToggle />
          
          <Link
            href="https://wa.me/201066221112"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 font-medium text-platinum transition-all duration-200 bg-transparent border border-cyan/50 rounded-full hover:bg-cyan/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]"
          >
            <span className="relative text-sm text-glow">{t("nav.audit")}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
