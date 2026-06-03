"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, Package, LogOut, Moon, Sun, Briefcase } from "lucide-react";
import { logoutAction } from "./actions";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Hide sidebar on the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const links = [
    { name: "Submissions", href: "/admin", icon: Inbox },
    { name: "Ecosystem Manager", href: "/admin/products", icon: Package },
    { name: "Project Management", href: "/admin/projects", icon: Briefcase },
  ];

  return (
    <div className="flex h-screen bg-void w-full overflow-hidden absolute inset-0 z-50">
      {/* Sidebar */}
      <aside className="w-64 bg-obsidian border-r border-fg/5 flex flex-col">
        <div className="h-20 flex items-center justify-center px-6 border-b border-fg/5 relative overflow-hidden">
          <img src="/logo.png" alt="" className="absolute -left-4 -top-4 h-24 w-auto opacity-10 pointer-events-none" />
          <span className="font-heading font-bold text-xl text-platinum relative z-10 text-glow">AURA ADMIN</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  active 
                    ? "bg-cyan/10 text-cyan font-bold" 
                    : "text-slate hover:bg-fg/5 hover:text-platinum"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-fg/5 space-y-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-xl text-slate hover:bg-fg/5 hover:text-platinum transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          )}
          <button 
            onClick={() => logoutAction()}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-xl text-slate hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-void">
        {children}
      </main>
    </div>
  );
}
