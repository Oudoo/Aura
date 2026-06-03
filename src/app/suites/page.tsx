"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package, Box } from "lucide-react";
import Link from "next/link";
import { ecosystem } from "@/data/ecosystem";
import { Card } from "@/components/ui/Card";

export default function SuitesPage() {
  // Separate the ultimate bundle from the rest
  const ultimateBundle = ecosystem.find((s) => s.slug === "ultimate-bundle");
  const coreSuites = ecosystem.filter((s) => s.slug !== "ultimate-bundle");

  return (
    <main className="flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amethyst/20 via-void to-void" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amethyst/10 border border-amethyst/30 text-amethyst text-sm font-medium mb-6">
              <Package className="w-4 h-4" />
              <span>The Ultimate Digital Transformation</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-platinum">
              The One Eco System Bundle
            </h1>
            <p className="text-xl text-slate max-w-2xl mx-auto">
              {ultimateBundle?.products[0].description} All 7 core suites unified into a single source of truth for your enterprise.
            </p>

            <div className="pt-8">
              <Link
                href={`/products/${ultimateBundle?.products[0].slug}`}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-amethyst border border-transparent rounded-full hover:bg-amethyst/90 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              >
                Explore the Ultimate Bundle
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Suites Bento Grid */}
      <section className="w-full py-24 bg-void">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-heading text-3xl font-bold text-platinum">7 Core Suites</h2>
            <p className="text-slate">Modular solutions. Infinite scalability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto auto-rows-[minmax(300px,auto)]">
            {coreSuites.map((suite, index) => (
              <motion.div
                key={suite.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={
                  index === 0 || index === 3
                    ? "md:col-span-2 lg:col-span-2"
                    : "col-span-1"
                }
              >
                <Card className="h-full p-8 group hover:border-amethyst/50 cursor-pointer flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-platinum group-hover:text-amethyst group-hover:bg-amethyst/10 transition-colors">
                      <Box className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-platinum mb-4 group-hover:text-glow">
                      {suite.suite}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-medium text-slate uppercase tracking-wider">Included Products:</p>
                    <ul className="space-y-3">
                      {suite.products.map((product) => (
                        <li key={product.slug} className="flex flex-col">
                          <Link
                            href={`/products/${product.slug}`}
                            className="text-platinum hover:text-amethyst font-medium transition-colors"
                          >
                            {product.name}
                          </Link>
                          <span className="text-xs text-slate mt-1 line-clamp-1">
                            {product.description}
                          </span>
                        </li>
                      ))}
                    </ul>
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
