import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog HYROX — Pacomont | Entrenamiento, técnica y estrategia",
  description:
    "Consejos de entrenamiento HYROX, técnica de estaciones, estrategia de carrera y planes de preparación. Todo desde la experiencia de un atleta PRO.",
  alternates: { canonical: "https://pacomont.es/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-gradient-to-b from-black/60 to-transparent">
        <Link href="/" className="text-white font-bold text-xl tracking-widest uppercase">
          Paco<span className="text-blue-400">mont</span>
        </Link>
        <Link
          href="https://my.playbookapp.io/pacomont"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500/80 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        >
          Ver planes →
        </Link>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-16 max-w-4xl mx-auto">
        <p className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">Blog</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Todo sobre <span style={{ background: "linear-gradient(135deg, #60a5fa, #93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>HYROX.</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-16 max-w-xl">
          Entrenamiento, técnica, estrategia y todo lo que necesitas saber para rendir en HYROX.
        </p>

        {posts.length === 0 ? (
          <p className="text-zinc-500">Próximamente...</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-zinc-900 border border-zinc-800 hover:border-blue-400/40 rounded-2xl p-6 transition-colors group"
              >
                <p className="text-zinc-500 text-xs mb-2">
                  {new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <h2 className="text-xl font-black mb-2 group-hover:text-blue-300 transition-colors">{post.title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{post.description}</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
