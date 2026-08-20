"use client";
import { useState } from "react";

const PLANS = [
  { id: "hyrox",      label: "HYROX",       desc: "Preparación para competición",    emoji: "🏁" },
  { id: "hyrox_pro",  label: "HYROX PRO",   desc: "Programa PRO de alto rendimiento", emoji: "⚡" },
  { id: "hibrido",    label: "Híbrido",     desc: "Fuerza + cardio combinados",       emoji: "💪" },
  { id: "pierde_peso",label: "Pierde Peso", desc: "Pierde grasa sin perder músculo",  emoji: "🔥" },
  { id: "solo_gym",   label: "GYM",         desc: "Fuerza en sala",                  emoji: "🏋️" },
];

export default function LeadCapture() {
  const [plan, setPlan] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!plan) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, plan }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  const selectedPlan = PLANS.find(p => p.id === plan);

  if (status === "ok") {
    return (
      <div className="mt-8 bg-blue-500/10 border border-blue-400/30 rounded-2xl px-6 py-5 max-w-lg">
        <p className="text-blue-300 font-bold text-sm mb-1">✓ ¡Listo! Revisa tu email.</p>
        <p className="text-zinc-400 text-xs">
          Te enviamos la semana de entrenamiento de <strong className="text-white">{selectedPlan?.label}</strong> a {email}. Llega en menos de un minuto.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-lg">
      <p className="text-zinc-400 text-xs font-bold tracking-wider uppercase mb-4">
        🎁 Gratis — Elige tu plan y recibe una semana de entrenamiento
      </p>

      {/* Plan selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {PLANS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlan(p.id)}
            className={`text-left rounded-xl px-3 py-2.5 border transition-all text-sm ${
              plan === p.id
                ? "border-blue-400 bg-blue-500/15 text-white"
                : "border-zinc-700 bg-white/5 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            <span className="block text-base mb-0.5">{p.emoji}</span>
            <span className="block font-bold text-xs">{p.label}</span>
            <span className="block text-zinc-500 text-xs leading-tight">{p.desc}</span>
          </button>
        ))}
      </div>

      {/* Email form — only show after plan selected */}
      {plan && (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-zinc-500 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-blue-500/80 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            {status === "loading" ? "Enviando..." : "Recibir gratis →"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Error al enviar. Inténtalo de nuevo.</p>
      )}
      <p className="text-zinc-600 text-xs mt-2">Sin spam. Cancela cuando quieras.</p>
    </div>
  );
}
