"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Sparkles, Send, User } from "lucide-react";
import { askCopilotAction } from "./actions";
import { COPILOT_SUGGESTIONS } from "@/lib/copilot";
import type { CopilotAnswer } from "@/lib/copilot";

interface Message {
  role: "user" | "assistant";
  text: string;
  answer?: CopilotAnswer;
}

export function CopilotClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  function send(question: string) {
    const q = question.trim();
    if (!q || pending) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    startTransition(async () => {
      const res = await askCopilotAction(q);
      setMessages((m) => [
        ...m,
        res.success && res.answer
          ? { role: "assistant", text: res.answer.text, answer: res.answer }
          : { role: "assistant", text: res.error ?? "Something went wrong." },
      ]);
    });
  }

  return (
    <div className="flex-1 flex flex-col bg-obsidian border border-fg/10 rounded-2xl overflow-hidden min-h-0">
      {/* Conversation */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 min-h-[300px]">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-cyan/10 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-cyan" />
            </div>
            <h3 className="text-lg font-bold text-platinum mb-1">How can I help?</h3>
            <p className="text-slate text-sm mb-6 max-w-md">
              I read your live projects, invoices, leads and support. Try one of these:
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {COPILOT_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-3 py-1.5 text-sm rounded-full border border-fg/10 text-slate hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-cyan" />
              </div>
            )}
            <div className={`max-w-[80%] ${m.role === "user" ? "order-1" : ""}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  m.role === "user"
                    ? "bg-cyan text-void font-medium"
                    : "bg-void border border-fg/10 text-platinum"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{m.text}</p>

                {m.answer?.metric && (
                  <div className="mt-3 inline-flex items-baseline gap-2 bg-cyan/10 border border-cyan/20 rounded-lg px-3 py-1.5">
                    <span className="text-xs text-slate uppercase tracking-wider">{m.answer.metric.label}</span>
                    <span className="text-lg font-heading font-black text-cyan">{m.answer.metric.value}</span>
                  </div>
                )}

                {m.answer?.table && (
                  <div className="mt-3 overflow-x-auto rounded-lg border border-fg/10">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-obsidian text-slate uppercase tracking-wider">
                        <tr>
                          {m.answer.table.columns.map((c) => (
                            <th key={c} className="px-3 py-2 font-bold whitespace-nowrap">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-fg/5">
                        {m.answer.table.rows.map((row, r) => (
                          <tr key={r}>
                            {row.map((cell, c) => (
                              <td key={c} className="px-3 py-2 text-platinum whitespace-nowrap">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            {m.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-fg/5 flex items-center justify-center flex-shrink-0 order-2">
                <User className="w-4 h-4 text-slate" />
              </div>
            )}
          </div>
        ))}

        {pending && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-cyan animate-pulse" />
            </div>
            <div className="bg-void border border-fg/10 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate/50 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-slate/50 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-slate/50 animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-fg/10 p-4 flex items-center gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about invoices, leads, deliveries, support…"
          className="flex-1 bg-void border border-fg/10 rounded-xl px-4 py-3 text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan/50 transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          className="px-4 py-3 bg-cyan text-void font-bold rounded-xl hover:bg-cyan/90 transition-colors disabled:opacity-40 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
