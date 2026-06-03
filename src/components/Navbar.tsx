"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ecosystem } from "@/data/ecosystem";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = {
    methodology: {
      title: "Methodology",
      content: (
        <div className="grid grid-cols-3 gap-6 p-6">
          <div className="space-y-3">
            <h4 className="text-cyan font-semibold">1. Diagnose</h4>
            <p className="text-sm text-slate">Identify enterprise bottlenecks and architectural flaws.</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-amethyst font-semibold">2. Strategize</h4>
            <p className="text-sm text-slate">Develop a prescriptive roadmap for digital transformation.</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-platinum font-semibold">3. Execute</h4>
            <p className="text-sm text-slate">Deploy the Aura ecosystem to drive growth.</p>
          </div>
        </div>
      ),
    },
    suites: {
      title: "Suites & Packages",
      content: (
        <div className="grid grid-cols-2 gap-4 p-6">
          {ecosystem.map((suite) => (
            <Link
              key={suite.slug}
              href={`/suites`}
              className="flex items-center space-x-2 text-sm text-slate hover:text-cyan transition-colors"
              onClick={() => setActiveMenu(null)}
            >
              <ArrowRight className="w-4 h-4" />
              <span>{suite.suite}</span>
            </Link>
          ))}
        </div>
      ),
    },
    products: {
      title: "All Products",
      content: (
        <div className="grid grid-cols-3 gap-6 p-6 max-h-[60vh] overflow-y-auto">
          {ecosystem.map((suite) => (
            <div key={suite.slug} className="space-y-3">
              <h4 className="text-sm font-semibold text-platinum border-b border-white/10 pb-2">
                {suite.suite}
              </h4>
              <ul className="space-y-2">
                {suite.products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-xs text-slate hover:text-cyan transition-colors line-clamp-1"
                      onClick={() => setActiveMenu(null)}
                    >
                      {product.name}
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
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan/50 shadow-[0_0_15px_rgba(0,229,255,0.5)] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.8)] transition-shadow duration-300" />
            <div className="absolute w-full h-[1px] bg-amethyst/70 rotate-45" />
            <div className="absolute w-full h-[1px] bg-amethyst/70 -rotate-45" />
            <div className="w-3 h-3 bg-cyan rounded-full animate-pulse" />
          </div>
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
                    className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-3xl pt-2 perspective-[2000px]"
                  >
                    <div className="bg-[#0B0F19] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                      {menu.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center">
          <Link
            href="https://wa.me/201066221112"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 font-medium text-white transition-all duration-200 bg-transparent border border-cyan/50 rounded-full hover:bg-cyan/10 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-cyan" />
            <span className="relative text-sm text-glow">Request a Business Audit</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
