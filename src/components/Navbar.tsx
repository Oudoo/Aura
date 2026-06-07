"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Globe, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "./LanguageContext";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, toggleLanguage, ecosystem } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const menus = {
    methodology: {
      title: t("nav.methodology"),
      href: "/methodology",
      content: (
        <div className="grid grid-cols-3 gap-8 p-8 w-[760px]">
          {[
            { key: "1", color: "text-cyan" },
            { key: "2", color: "text-amethyst" },
            { key: "3", color: "text-platinum" },
          ].map(({ key, color }) => (
            <div key={key} className="space-y-2">
              <span className={`text-xs font-black tracking-widest uppercase ${color}`}>0{key}</span>
              <h4 className="text-platinum font-bold text-sm">{t(`methodology.${key}.title`)}</h4>
              <p className="text-xs text-slate leading-relaxed">{t(`methodology.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      ),
    },
    suites: {
      title: t("nav.suites"),
      href: "/suites",
      content: (
        <div className="w-[760px] p-8 grid grid-cols-3 gap-6">
          {ecosystem.map((suite) => (
            <Link
              key={suite.slug}
              href="/suites"
              onClick={() => setActiveMenu(null)}
              className="group block space-y-1.5"
            >
              <h4 className="text-platinum font-bold text-sm group-hover:text-cyan transition-colors flex items-center justify-between">
                {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
              </h4>
              <p className="text-xs text-slate leading-relaxed">
                {suite.products.length} modules
              </p>
            </Link>
          ))}
        </div>
      ),
    },
    products: {
      title: t("nav.products"),
      href: "/products",
      content: (
        <div className="w-[760px] p-8 grid grid-cols-4 gap-6 max-h-[380px] overflow-y-auto">
          {ecosystem.map((suite) => (
            <div key={suite.slug} className="space-y-3">
              <h4 className="text-xs font-black text-cyan tracking-widest uppercase">
                {language === "ar" && suite.suiteAr ? suite.suiteAr : suite.suite}
              </h4>
              <ul className="space-y-2">
                {suite.products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-xs text-slate hover:text-platinum transition-colors leading-snug block"
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
        <div className="p-8 w-[340px] space-y-4">
          <h4 className="text-platinum font-bold text-sm">{t("nav.about.title")}</h4>
          <p className="text-xs text-slate leading-relaxed">{t("nav.about.desc")}</p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs text-cyan font-bold hover:text-amethyst transition-colors"
            onClick={() => setActiveMenu(null)}
          >
            {t("nav.about.link")} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      ),
    },
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-void/90 backdrop-blur-xl border-b border-fg/8 shadow-[0_1px_0_rgba(255,255,255,0.03)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group z-10 flex-shrink-0">
          <Image src="/logo.png" alt="Aura" width={36} height={36} className="h-9 w-auto" />
          <span className="font-heading font-black text-xl tracking-tight text-platinum group-hover:text-cyan transition-colors duration-300">
            AURA
          </span>
        </Link>

        {/* Centered desktop nav */}
        <nav
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 h-full"
          onMouseLeave={() => setActiveMenu(null)}
        >
          {Object.entries(menus).map(([key, menu]) => (
            <div
              key={key}
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveMenu(key)}
            >
              <Link
                href={menu.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate hover:text-platinum transition-colors rounded-lg hover:bg-fg/5"
              >
                {menu.title}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === key ? "rotate-180" : ""}`}
                />
              </Link>

              <AnimatePresence>
                {activeMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                  >
                    <div className="bg-obsidian/95 backdrop-blur-2xl border border-fg/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                      {menu.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 z-10">
          <button
            onClick={toggleLanguage}
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate hover:text-platinum transition-colors px-2 py-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase">{language === "en" ? "AR" : "EN"}</span>
          </button>

          <ThemeToggle />

          <Link
            href="/audit"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-platinum text-void rounded-full text-sm font-bold hover:bg-platinum/90 transition-colors"
          >
            {t("nav.audit")}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate hover:text-platinum transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-fg/10 bg-obsidian/95 backdrop-blur-2xl overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {Object.entries(menus).map(([key, menu]) => (
                <Link
                  key={key}
                  href={menu.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium text-slate hover:text-platinum transition-colors border-b border-fg/5"
                >
                  {menu.title}
                </Link>
              ))}
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/audit"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-3 bg-platinum text-void rounded-full font-bold text-sm"
                >
                  {t("nav.audit")}
                </Link>
                <button
                  onClick={() => { toggleLanguage(); setMobileOpen(false); }}
                  className="flex items-center gap-1.5 text-sm font-bold text-slate px-3 py-2"
                >
                  <Globe className="w-4 h-4" />
                  {language === "en" ? "AR" : "EN"}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
