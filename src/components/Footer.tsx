"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MessageCircle, Lock } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Suites", href: "/suites" },
    { label: "Products", href: "/products" },
    { label: "Methodology", href: "/methodology" },
    { label: "Business Audit", href: "/audit" },
  ],
  Company: [
    { label: "About Aura", href: "/about" },
    { label: "Support Hub", href: "/support" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full bg-void border-t border-fg/10 mt-auto">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Big statement */}
        <div className="py-20 border-b border-fg/10">
          <p className="eyebrow text-cyan mb-5">(Let&apos;s build)</p>
          <h2 className="display text-4xl md:text-6xl text-platinum max-w-3xl">
            Ready to unify your enterprise into one intelligent system?
          </h2>
          <Link
            href="/audit"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan text-white font-semibold hover:bg-amethyst transition-colors"
          >
            Take the Business Audit
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Columns */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-platinum">
                <Image src="/logo.png" alt="Aura" width={36} height={36} className="h-6 w-auto" />
              </span>
              <span className="font-body font-extrabold text-xl tracking-tight text-platinum">AURA</span>
            </Link>
            <p className="text-slate leading-relaxed max-w-sm">
              Strategic business solutions that diagnose operational bottlenecks and unify your enterprise into a single intelligent system.
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-1">
              <a
                href="mailto:info@getaura.business"
                className="flex items-center gap-2 text-sm text-slate hover:text-platinum transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:text-cyan transition-colors" />
                info@getaura.business
              </a>
              <a
                href="https://wa.me/201066221112"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate hover:text-platinum transition-colors group"
              >
                <MessageCircle className="w-4 h-4 group-hover:text-cyan transition-colors" />
                WhatsApp
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-5">
              <h4 className="eyebrow text-slate uppercase tracking-wider">({category})</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate hover:text-platinum transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-fg/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate">
          <span>&copy; {new Date().getFullYear()} Aura. All rights reserved.</span>
          <Link href="/admin/login" className="flex items-center gap-1.5 hover:text-platinum transition-colors">
            <Lock className="w-3 h-3" />
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
