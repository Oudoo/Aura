"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

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
    <footer className="w-full bg-obsidian border-t border-fg/8 mt-auto">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image src="/logo.png" alt="Aura" width={36} height={36} className="h-9 w-auto" />
              <span className="font-heading font-black text-xl tracking-tight text-platinum">AURA</span>
            </Link>
            <p className="text-slate leading-relaxed max-w-sm">
              Strategic business solutions that diagnose operational bottlenecks and unify your enterprise into a single intelligent system.
            </p>
            <div className="flex items-center gap-4 pt-2">
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
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-5">
              <h4 className="text-xs font-black tracking-widest uppercase text-cyan">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate hover:text-platinum transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-fg/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate/60">
          <span>&copy; {new Date().getFullYear()} Aura. All rights reserved.</span>
          <Link
            href="/admin/login"
            className="hover:text-slate transition-colors"
          >
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
