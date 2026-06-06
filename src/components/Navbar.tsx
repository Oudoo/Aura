"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "./LanguageContext";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, language, toggleLanguage, ecosystem } = useLanguage();

  const menus = {
    methodology: {
      title: t("nav.methodology"),
      href: "/methodology",
      content: (
        <div className="grid grid-cols-3 gap-6 p-6 w-[800px]">
          <div className="space-y-3">
            <h4 className="text-platinum font-semibold text-sm border-b border-fg/10 pb-2">{t("methodology.1.title")}</h4>
            <p className="text-xs text-slate">{t("methodology.1.desc")}</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-platinum font-semibold text-sm border-b border-fg/10 pb-2">{t("methodology.2.title")}</h4>
            <p className="text-xs text-slate">{t("methodology.2.desc")}</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-platinum font-semibold text-sm border-b border-fg/10 pb-2">{t("methodology.3.title")}</h4>
            <p className="text-xs text-slate">{t("methodology.3.desc")}</p>
          </div>
        </div>
      ),
    },
    suites: {
      title: t("nav.suites"),
      href: "/suites",
      content: (
        <div className="w-[800px] p-6 grid grid-cols-3 gap-6">
          {ecosystem.map((suite) => (
            <div key={suite.slug} className="group cursor-pointer" onClick={() => setActiveMenu(null)}>
              <Link href="/suites" className="block">
                <h4 className="text-platinum font-semibold text-sm border-b border-fg/10 pb-2 group-hover:text-cyan transition-colors flex items-center justify-between">
                  {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h4>
                <p className="text-xs text-slate mt-2 line-clamp-2">Explore the tools within the {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite} suite.</p>
              </Link>
            </div>
          ))}
        </div>
      ),
    },
    products: {
      title: t("nav.products"),
      href: "/products",
      content: (
        <div className="w-[800px] p-6 grid grid-cols-4 gap-6 max-h-[400px] overflow-y-auto">
          {ecosystem.map((suite) => (
            <div key={suite.slug} className="space-y-3">
              <h4 className="text-xs font-semibold text-platinum border-b border-fg/10 pb-2">
                {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}
              </h4>
              <ul className="space-y-2">
                {suite.products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-xs text-slate hover:text-cyan transition-colors whitespace-normal break-words leading-tight block"
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
    about: {
      title: t("nav.about"),
      href: "/about",
      content: (
        <div className="p-6 w-[350px]">
          <h4 className="text-platinum font-semibold text-sm border-b border-fg/10 pb-2 mb-3">{t("nav.about.title")}</h4>
          <p className="text-xs text-slate leading-relaxed mb-4">
            {t("nav.about.desc")}
          </p>
          <Link href="/about" className="text-xs text-cyan hover:text-amethyst transition-colors flex items-center gap-1 font-semibold" onClick={() => setActiveMenu(null)}>
            {t("nav.about.link")} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      ),
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-fg/5 bg-obsidian/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between relative">
        <Link href="/" className="flex items-center space-x-3 group z-10">
          <Image src="/logo.png" alt="Aura" width={32} height={32} className="h-8 w-auto" />
          <span className="font-heading font-bold text-xl tracking-tight text-platinum">
            AURA
          </span>
        </Link>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8 h-full" onMouseLeave={() => setActiveMenu(null)}>
          {Object.entries(menus).map(([key, menu]) => (
            <div
              key={key}
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveMenu(key)}
            >
              <Link href={menu.href} className="flex items-center space-x-1 text-sm font-medium text-slate hover:text-platinum transition-colors">
                <span>{menu.title}</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Link>

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

        <div className="flex items-center space-x-4 z-10">
          <Link
            href="/audit"
            className="hidden md:inline-flex items-center px-4 py-2 border border-fg/20 rounded-full text-sm font-bold text-platinum hover:bg-fg/5 hover:border-cyan hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300"
          >
            {t("nav.audit")}
          </Link>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-sm font-medium text-slate hover:text-platinum transition-colors px-2 py-1"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language === "en" ? "AR" : "EN"}</span>
          </button>
          
          <ThemeToggle />

        </div>
      </div>
    </header>
  );
}
