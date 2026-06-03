"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Truck, Users, PieChart, Shield, Bot, ChevronRight, X } from "lucide-react";

const availableSuites = [
  { id: "hr", name: "HR & Performance", icon: Users, color: "text-blue-400", border: "border-blue-400/30" },
  { id: "logistics", name: "Operations & Logistics", icon: Truck, color: "text-green-400", border: "border-green-400/30" },
  { id: "finance", name: "Finance & ERP", icon: Database, color: "text-yellow-400", border: "border-yellow-400/30" },
  { id: "ai", name: "AI Transformation", icon: Bot, color: "text-cyan", border: "border-cyan/30" },
  { id: "data", name: "Data & Analytics", icon: PieChart, color: "text-amethyst", border: "border-amethyst/30" },
  { id: "security", name: "IT & Security", icon: Shield, color: "text-red-400", border: "border-red-400/30" },
];

export function InteractiveArchitectureBuilder() {
  const [activeNodes, setActiveNodes] = useState<string[]>(["finance"]); // Core ERP always active by default

  const toggleNode = (id: string) => {
    if (activeNodes.includes(id)) {
      if (id !== "finance") { // Prevent removing core
        setActiveNodes(activeNodes.filter(node => node !== id));
      }
    } else {
      setActiveNodes([...activeNodes, id]);
    }
  };

  return (
    <div className="py-20 w-full max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-platinum mb-4">
          Architect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amethyst">Digital Future</span>
        </h2>
        <p className="text-slate max-w-2xl mx-auto">
          Click the modules below to build your custom Aura OS ecosystem. Watch as data silos dissolve into a unified source of truth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Module Selection Panel */}
        <div className="lg:col-span-4 bg-obsidian border border-fg/10 rounded-3xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-platinum mb-2 uppercase tracking-widest">Available Modules</h3>
          
          {availableSuites.map((suite) => {
            const isActive = activeNodes.includes(suite.id);
            const Icon = suite.icon;
            return (
              <button
                key={suite.id}
                onClick={() => toggleNode(suite.id)}
                className={`flex items-center justify-between w-full p-4 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? `bg-void ${suite.border} shadow-[0_0_15px_rgba(255,255,255,0.05)]` 
                    : "bg-void border-fg/5 hover:border-fg/20 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-obsidian ${suite.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`font-bold ${isActive ? "text-platinum" : "text-slate"}`}>
                    {suite.name}
                  </span>
                </div>
                {isActive ? (
                  <X className="w-4 h-4 text-slate hover:text-red-400 transition-colors" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate" />
                )}
              </button>
            );
          })}
        </div>

        {/* Visual Canvas Panel */}
        <div className="lg:col-span-8 bg-void border border-fg/10 rounded-3xl p-10 relative flex items-center justify-center min-h-[500px] overflow-hidden">
          {/* Subtle Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-10 z-10">
            <AnimatePresence>
              {availableSuites.map((suite) => {
                if (!activeNodes.includes(suite.id)) return null;
                const Icon = suite.icon;
                
                return (
                  <motion.div
                    key={suite.id}
                    layoutId={`node-${suite.id}`}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`relative w-40 h-40 bg-obsidian border-2 ${suite.border} rounded-2xl flex flex-col items-center justify-center p-4 shadow-2xl`}
                  >
                    {/* Glowing effect behind icon */}
                    <div className={`absolute inset-0 bg-current opacity-5 blur-xl rounded-2xl ${suite.color}`}></div>
                    
                    <Icon className={`w-10 h-10 mb-3 ${suite.color}`} />
                    <span className="text-xs font-bold text-platinum text-center leading-tight">
                      {suite.name}
                    </span>
                    
                    {/* Pulsing connection dot */}
                    <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-current ${suite.color}`}>
                      <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-50"></div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Central Orchestrator Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-obsidian border border-cyan/30 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse"></div>
            <span className="text-xs font-bold text-cyan tracking-widest uppercase">Aura OS Data Lake Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
