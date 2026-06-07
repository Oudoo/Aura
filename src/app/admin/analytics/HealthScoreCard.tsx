"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
} from "recharts";
import type { HealthScore, TrendPoint } from "@/lib/healthScore";

const GRADE_COLOR: Record<HealthScore["grade"], string> = {
  Excellent: "#10B981",
  Healthy: "#00E5FF",
  "At Risk": "#F59E0B",
  Critical: "#F43F5E",
};

const PILLAR_COLOR: Record<string, string> = {
  delivery: "#00E5FF",
  finance: "#10B981",
  support: "#8B5CF6",
  pipeline: "#F59E0B",
};

export function HealthScoreCard({
  health,
  trend,
}: {
  health: HealthScore;
  trend: TrendPoint[];
}) {
  const color = GRADE_COLOR[health.grade];
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (health.overall / 100) * circumference;

  // Direction of travel: compare the latest point to the previous one.
  const delta =
    trend.length >= 2 ? trend[trend.length - 1].score - trend[trend.length - 2].score : 0;
  const TrendIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const trendColor = delta > 0 ? "text-emerald-400" : delta < 0 ? "text-red-400" : "text-slate";

  return (
    <div className="bg-obsidian border border-fg/10 rounded-2xl p-6 md:p-8 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-cyan" />
        <h2 className="text-lg font-heading font-bold text-platinum">Aura Health Score</h2>
        <span className="ml-auto text-xs text-slate">
          Live · {new Date(health.computedAt).toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Gauge */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="52" fill="none"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-heading font-black text-platinum" style={{ textShadow: `0 0 20px ${color}55` }}>
                {health.overall}
              </span>
              <span className="text-xs text-slate">/ 100</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${color}1A`, color }}>
              {health.grade}
            </span>
            {trend.length >= 2 && (
              <span className={`flex items-center gap-1 text-xs font-bold ${trendColor}`}>
                <TrendIcon className="w-3.5 h-3.5" />
                {delta > 0 ? "+" : ""}{delta}
              </span>
            )}
          </div>
        </div>

        {/* Pillars */}
        <div className="space-y-3">
          {health.pillars.map((p) => (
            <div key={p.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-platinum font-medium">{p.label}</span>
                <span className="text-slate">{p.score}</span>
              </div>
              <div className="w-full h-2 bg-void rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: PILLAR_COLOR[p.key] ?? "#00E5FF" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.score}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-slate/70 mt-1">{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Trend */}
        <div className="h-44">
          <div className="text-xs text-slate font-bold uppercase tracking-wider mb-2">
            Trend · last {trend.length} day{trend.length === 1 ? "" : "s"}
          </div>
          {trend.length >= 2 ? (
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={trend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="healthTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "#94A3B8", fontSize: 10 }} tickFormatter={(d) => d.slice(5)} />
                <YAxis domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: "#0B0F19", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F8FAFC" }}
                  labelStyle={{ color: "#94A3B8" }}
                />
                <Area type="monotone" dataKey="score" stroke={color} strokeWidth={2} fill="url(#healthTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[85%] flex items-center justify-center text-center text-sm text-slate/60 border border-dashed border-fg/10 rounded-xl px-4">
              Trend builds as snapshots accumulate — check back tomorrow for your first data point.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
