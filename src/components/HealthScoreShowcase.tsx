"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, ShieldCheck, Gauge } from "lucide-react";

/**
 * Marketing showcase for the Aura Health Score. Uses representative figures to
 * demonstrate the capability on the public site; inside the dashboard the same
 * gauge runs on the client's live data.
 */
export function HealthScoreShowcase({ language }: { language: string }) {
  const ar = language === "ar";
  const score = 87;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  const pillars = ar
    ? [
        { label: "التسليم", value: 92 },
        { label: "المالية", value: 84 },
        { label: "الدعم", value: 88 },
        { label: "المبيعات", value: 81 },
      ]
    : [
        { label: "Delivery", value: 92 },
        { label: "Finance", value: 84 },
        { label: "Support", value: 88 },
        { label: "Pipeline", value: 81 },
      ];

  const bullets = ar
    ? [
        { icon: Gauge, title: "مؤشر واحد", desc: "صحة عملك كلها في رقم واحد من 0 إلى 100." },
        { icon: TrendingUp, title: "اتجاه حي", desc: "تابع التحسن أو التراجع يوماً بيوم." },
        { icon: ShieldCheck, title: "تقارير العملاء", desc: "اعرض الصحة في بوابة العميل البيضاء." },
      ]
    : [
        { icon: Gauge, title: "One index", desc: "Your entire operation distilled into a single 0–100 score." },
        { icon: TrendingUp, title: "Live trend", desc: "See whether you're improving or slipping, day by day." },
        { icon: ShieldCheck, title: "Client reports", desc: "Surface health in the white-label client portal." },
      ];

  return (
    <section className="w-full py-24 bg-void relative overflow-hidden border-t border-fg/5">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/25 bg-cyan/5 text-cyan text-xs font-bold tracking-widest uppercase mb-6">
              <Activity className="w-3.5 h-3.5" />
              {ar ? "مؤشر الصحة التشغيلية" : "Aura Health Score"}
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-platinum mb-5 leading-tight">
              {ar ? "اعرف صحة عملك في لمحة" : "Know your operational health at a glance"}
            </h2>
            <p className="text-slate text-lg mb-8 leading-relaxed">
              {ar
                ? "تقرأ أورا مشاريعك وفواتيرك ودعمك ومبيعاتك لتحسب مؤشراً حياً واحداً — حتى تعرف أين تتدخل قبل فوات الأوان."
                : "Aura reads your projects, invoices, support and pipeline to compute one live index — so you know where to intervene before small issues become expensive ones."}
            </p>
            <div className="space-y-5">
              {bullets.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-bold text-platinum">{title}</h3>
                    <p className="text-sm text-slate">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gauge card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-fg/10 bg-obsidian/60 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(0,229,255,0.08)]"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-44 h-44" dir="ltr">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
                  <motion.circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="#00E5FF" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.4))" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-heading font-black text-platinum text-glow">{score}</span>
                  <span className="text-xs text-slate">/ 100</span>
                </div>
              </div>
              <span className="mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan/10 text-cyan">
                {ar ? "ممتاز" : "Excellent"}
              </span>
            </div>

            <div className="mt-8 space-y-3" dir={ar ? "rtl" : "ltr"}>
              {pillars.map((p) => (
                <div key={p.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-platinum font-medium">{p.label}</span>
                    <span className="text-slate">{p.value}</span>
                  </div>
                  <div className="w-full h-2 bg-void rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan to-amethyst"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
