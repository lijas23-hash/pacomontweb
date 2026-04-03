"use client";
import { useState } from "react";

export default function LeadCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="mt-8 bg-blue-500/10 border border-blue-400/30 rounded-2xl px-6 py-5 max-w-md">
        <p className="text-blue-300 font-bold text-sm mb-1">✓ ¡Listo! Tu checklist está lista.</p>
        <p className="text-zinc-400 text-xs mb-4">También te la enviamos por email con el 20% de descuento en los planes.</p>
        <a
          href="/checklist-hyrox"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500/80 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
        >
          Descargar checklist →
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-md">
      <p className="text-zinc-400 text-xs font-bold tracking-wider uppercase mb-3">
        🎁 Gratis — Checklist HYROX: técnica y errores en las 8 estaciones
      </p>
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
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Error al enviar. Inténtalo de nuevo.</p>
      )}
      <p className="text-zinc-600 text-xs mt-2">Sin spam. Cancela cuando quieras.</p>
    </div>
  );
}
