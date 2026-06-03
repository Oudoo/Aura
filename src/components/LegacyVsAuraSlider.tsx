"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Network, ServerCrash, Cpu } from "lucide-react";

export function LegacyVsAuraSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full max-w-5xl mx-auto my-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-platinum mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Chaos</span> vs. The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amethyst">Clarity</span>
        </h2>
        <p className="text-slate max-w-2xl mx-auto">
          Slide to reveal how Aura OS transforms fragmented, disconnected legacy systems into a unified, intelligent enterprise nervous system.
        </p>
      </div>

      <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden border border-fg/20 select-none">
        
        {/* Background Layer: Aura OS State (The "After") */}
        <div className="absolute inset-0 bg-void flex items-center justify-center overflow-hidden">
          {/* Glowing Aura Network */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan/10 via-void to-void"></div>
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              animate={{ boxShadow: ["0 0 40px rgba(0, 229, 255, 0.2)", "0 0 80px rgba(139, 92, 246, 0.4)", "0 0 40px rgba(0, 229, 255, 0.2)"] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-32 h-32 bg-obsidian rounded-full border border-cyan/50 flex items-center justify-center relative mb-8"
            >
              <Cpu className="w-12 h-12 text-cyan" />
              <div className="absolute inset-0 rounded-full border border-cyan animate-ping opacity-20"></div>
            </motion.div>
            
            <div className="flex gap-16 md:gap-32">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative">
                  {/* Connection Line */}
                  <div className="absolute -top-16 left-1/2 w-[2px] h-16 bg-gradient-to-b from-cyan to-amethyst opacity-50"></div>
                  <div className="w-16 h-16 bg-obsidian border border-amethyst/50 rounded-xl flex items-center justify-center">
                    <Network className="w-6 h-6 text-amethyst" />
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="absolute bottom-10 text-2xl font-bold text-cyan tracking-widest uppercase">Unified Intelligence</h3>
          </div>
        </div>

        {/* Foreground Layer: Legacy State (The "Before") clipped by slider */}
        <div 
          className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center overflow-hidden border-r-2 border-white"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {/* Messy Red Network */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center">
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative w-full px-10">
              {/* Tangled SVG Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                <path d="M 100,100 Q 200,50 300,150 T 500,100" stroke="#EF4444" strokeWidth="2" fill="none" className="opacity-50" strokeDasharray="5,5" />
                <path d="M 150,200 Q 250,300 400,200 T 600,250" stroke="#F59E0B" strokeWidth="2" fill="none" className="opacity-50" />
                <path d="M 50,150 Q 300,0 450,150 T 700,50" stroke="#EF4444" strokeWidth="3" fill="none" className="opacity-30" />
              </svg>

              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-20 h-20 bg-[#2A2A2A] border border-red-500/30 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                  <ServerCrash className="w-8 h-8 text-red-400" />
                </div>
              ))}
            </div>
            
            <h3 className="absolute bottom-10 text-2xl font-bold text-red-500 tracking-widest uppercase line-through">Fragmented Silos</h3>
          </div>
        </div>

        {/* Custom Slider Input */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderPosition} 
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />

        {/* Slider Handle Visual */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white z-10 pointer-events-none flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-0.5 h-3 bg-obsidian rounded"></div>
              <div className="w-0.5 h-3 bg-obsidian rounded"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
