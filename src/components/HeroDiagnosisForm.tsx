"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Send, CheckCircle2 } from "lucide-react";
import { submitAuditForm } from "@/app/audit/actions";

export function HeroDiagnosisForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      // 1. Submit to Database (Server Action)
      await submitAuditForm(formData);
      
      // 2. Trigger WhatsApp Webhook
      await fetch('/api/webhooks/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          message: formData.get("message")
        })
      });
      
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto p-6 rounded-2xl glass flex flex-col items-center text-center mt-12"
      >
        <div className="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-cyan" />
        </div>
        <h3 className="text-xl font-bold text-platinum mb-2">Diagnosis Requested</h3>
        <p className="text-sm text-slate">Our engineers have been notified via WhatsApp and will contact you shortly.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-md mx-auto mt-12 relative group"
    >
      <div className="absolute inset-0 bg-cyan/20 rounded-2xl blur-xl group-hover:bg-cyan/30 transition-colors duration-500 -z-10" />
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass space-y-4">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-5 h-5 text-cyan" />
          <h3 className="font-heading font-bold text-lg text-platinum">Instant Diagnosis Hub</h3>
        </div>
        <p className="text-xs text-slate text-left mb-4">Submit your operational bottleneck. Get an expert roadmap.</p>
        
        <div className="space-y-3 text-left">
          <div className="grid grid-cols-2 gap-3">
            <input 
              name="name" required placeholder="Name" 
              className="w-full bg-void/50 border border-fg/10 rounded-lg px-3 py-2 text-sm text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan"
            />
            <input 
              name="company" required placeholder="Company" 
              className="w-full bg-void/50 border border-fg/10 rounded-lg px-3 py-2 text-sm text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan"
            />
          </div>
          <input 
            name="email" type="email" required placeholder="Work Email" 
            className="w-full bg-void/50 border border-fg/10 rounded-lg px-3 py-2 text-sm text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan"
          />
          <textarea 
            name="message" required rows={2} placeholder="Describe your primary bottleneck..." 
            className="w-full bg-void/50 border border-fg/10 rounded-lg px-3 py-2 text-sm text-platinum placeholder-slate/50 focus:outline-none focus:border-cyan resize-none"
          />
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full py-3 bg-cyan text-void font-bold rounded-lg hover:bg-cyan/90 transition-colors flex items-center justify-center text-sm disabled:opacity-50"
        >
          {loading ? "Transmitting..." : "Trigger WhatsApp Notification"}
          {!loading && <Send className="w-4 h-4 ml-2" />}
        </button>
      </form>
    </motion.div>
  );
}
