"use client";

import Link from "next/link";
import { Lock, LifeBuoy } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-void border-t border-fg/5 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0 text-slate text-sm">
          <img src="/logo.png" alt="Aura Logo" className="h-6 w-auto" />
          <span className="font-bold text-platinum">AURA</span>
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="hidden md:inline-block mx-2 text-fg/20">|</span>
          <span className="hidden md:inline-block">Strategic Business Solutions</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/support" className="flex items-center text-sm font-bold text-slate hover:text-cyan transition-colors group">
            <LifeBuoy className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
            <span>Support Hub</span>
          </Link>
          <Link href="/admin/login" className="flex items-center text-sm text-slate/50 hover:text-platinum transition-colors group">
            <Lock className="w-3 h-3 mr-1.5 group-hover:text-cyan transition-colors" />
            <span>Staff Login</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
