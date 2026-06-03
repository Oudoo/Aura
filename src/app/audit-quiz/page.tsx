"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Target, BarChart3, Settings, Shield, ArrowRight, ShieldCheck } from "lucide-react";
import { submitAuditForm } from "@/app/audit/actions";

const QUESTIONS = [
  {
    id: "q1",
    title: "How do you currently manage operational data?",
    icon: BarChart3,
    options: [
      { id: "o1", text: "Spreadsheets & Manual Entry", score: 10 },
      { id: "o2", text: "Disjointed Legacy Software", score: 20 },
      { id: "o3", text: "Basic ERP System", score: 30 },
      { id: "o4", text: "Fully Integrated AI Stack", score: 40 },
    ]
  },
  {
    id: "q2",
    title: "How quickly can your team generate financial reports?",
    icon: Target,
    options: [
      { id: "o1", text: "Weeks (Manual consolidation)", score: 10 },
      { id: "o2", text: "Days (Exporting from multiple tools)", score: 20 },
      { id: "o3", text: "Hours (Automated but requires checks)", score: 30 },
      { id: "o4", text: "Real-time (Live dashboarding)", score: 40 },
    ]
  },
  {
    id: "q3",
    title: "Describe your current IT infrastructure security:",
    icon: Shield,
    options: [
      { id: "o1", text: "Basic (Antivirus, firewalls)", score: 10 },
      { id: "o2", text: "Standard (VPNs, role-based access)", score: 20 },
      { id: "o3", text: "Advanced (SIEM, automated backups)", score: 30 },
      { id: "o4", text: "Zero-Trust (End-to-end encryption)", score: 40 },
    ]
  }
];

export default function AuditQuizPage() {
  const [step, setStep] = useState(0); // 0-2: questions, 3: email capture, 4: results
  const [scores, setScores] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOptionSelect = (score: number) => {
    setScores([...scores, score]);
    setTimeout(() => {
      setStep(step + 1);
    }, 400);
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const totalScore = scores.reduce((a, b) => a + b, 0);
    
    // Add score to message
    formData.append("message", `[DIGITAL MATURITY AUDIT]\nScore: ${totalScore}/120\nNeeds comprehensive review.`);
    
    await submitAuditForm(formData);
    
    // Simulate webhook
    await fetch('/api/webhooks/whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        message: `AUDIT COMPLETED. Score: ${totalScore}/120`
      })
    });

    setLoading(false);
    setStep(4);
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const getMaturityLevel = () => {
    if (totalScore < 50) return "Reactive";
    if (totalScore < 90) return "Transitional";
    return "Optimized";
  };

  return (
    <div className="min-h-screen bg-void pt-32 pb-20 px-4 relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan/10 via-void to-void pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Progress Bar */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex justify-between text-xs text-slate font-bold uppercase tracking-wider mb-2">
              <span>Digital Maturity Audit</span>
              <span>Step {step + 1} of 4</span>
            </div>
            <div className="w-full h-1 bg-fg/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        <div className="relative">
          <AnimatePresence mode="wait">
            
            {/* Questions (Steps 0-2) */}
            {step < 3 && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-obsidian/80 backdrop-blur-xl border border-fg/10 rounded-2xl p-8 md:p-12"
              >
                {(() => {
                  const q = QUESTIONS[step];
                  const Icon = q.icon;
                  return (
                    <>
                      <div className="w-16 h-16 bg-cyan/10 rounded-full flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-cyan" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-platinum mb-8 leading-tight">
                        {q.title}
                      </h2>
                      <div className="space-y-4">
                        {q.options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleOptionSelect(opt.score)}
                            className="w-full p-4 rounded-xl border border-fg/10 bg-void/50 hover:bg-cyan/10 hover:border-cyan/30 text-left transition-all group flex items-center justify-between"
                          >
                            <span className="font-medium text-platinum group-hover:text-cyan transition-colors">{opt.text}</span>
                            <ChevronRight className="w-5 h-5 text-slate group-hover:text-cyan transition-colors" />
                          </button>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}

            {/* Email Capture (Step 3) */}
            {step === 3 && (
              <motion.div
                key="step-email"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-obsidian/80 backdrop-blur-xl border border-cyan/20 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,229,255,0.1)] text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan/5 pointer-events-none" />
                <Settings className="w-12 h-12 text-cyan mx-auto mb-6 animate-spin-slow" />
                <h2 className="text-3xl font-heading font-bold text-platinum mb-4 text-glow">Audit Complete</h2>
                <p className="text-slate mb-8 max-w-md mx-auto">
                  We've calculated your digital maturity score. Enter your details to reveal your personalized strategic roadmap.
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-sm mx-auto relative z-10 text-left">
                  <input 
                    name="name" required placeholder="Full Name" 
                    className="w-full bg-void border border-fg/10 rounded-xl px-4 py-3 text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan transition-colors"
                  />
                  <input 
                    name="company" required placeholder="Company Name" 
                    className="w-full bg-void border border-fg/10 rounded-xl px-4 py-3 text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan transition-colors"
                  />
                  <input 
                    name="email" type="email" required placeholder="Work Email" 
                    className="w-full bg-void border border-fg/10 rounded-xl px-4 py-3 text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan transition-colors"
                  />
                  <button 
                    type="submit" disabled={loading}
                    className="w-full py-4 bg-cyan text-void font-bold rounded-xl hover:bg-cyan/90 transition-all shadow-lg hover:shadow-cyan/20 disabled:opacity-50 flex justify-center items-center"
                  >
                    {loading ? "Analyzing..." : "Reveal My Results"}
                    {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Results (Step 4) */}
            {step === 4 && (
              <motion.div
                key="step-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-obsidian/90 backdrop-blur-2xl border border-amethyst/30 rounded-2xl p-8 md:p-12 text-center"
              >
                <ShieldCheck className="w-16 h-16 text-amethyst mx-auto mb-6" />
                <div className="inline-block px-4 py-1.5 rounded-full bg-amethyst/10 border border-amethyst/20 text-amethyst text-sm font-bold tracking-wider uppercase mb-4">
                  {getMaturityLevel()} Phase
                </div>
                <h2 className="text-4xl font-heading font-bold text-platinum mb-2">
                  Score: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-amethyst">{totalScore}/120</span>
                </h2>
                <p className="text-slate mb-8 max-w-lg mx-auto leading-relaxed">
                  Your infrastructure is currently in the <strong>{getMaturityLevel()}</strong> phase. 
                  A senior Aura architect has been notified and will email you a comprehensive gap analysis and implementation roadmap within 24 hours.
                </p>
                <a 
                  href="/"
                  className="inline-flex px-8 py-3 bg-fg/5 hover:bg-fg/10 border border-fg/10 rounded-full text-platinum font-bold transition-colors"
                >
                  Return to Command Center
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
