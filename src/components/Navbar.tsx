"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#planes", label: "Planes" },
    { href: "#descuentos", label: "Descuentos" },
    { href: "#faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 bg-gradient-to-b from-black/60 to-transparent">
      <div className="flex items-center justify-between">
        <a href="/" className="text-white text-2xl tracking-widest uppercase" style={{ fontFamily: "var(--font-bebas)" }}>
          PACOMONT
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300 font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-blue-300 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://my.playbookapp.io/pacomont"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500/80 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
          >
            Empezar ahora
          </a>
          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <span className={`block h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-4 bg-zinc-900/95 rounded-2xl p-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-zinc-300 hover:text-blue-300 transition-colors font-medium text-lg"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
