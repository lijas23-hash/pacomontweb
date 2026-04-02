import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Pacomont`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://pacomont.es/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://pacomont.es/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Francisco Montero",
      alternateName: "Pacomont",
      url: "https://pacomont.es",
    },
    publisher: {
      "@type": "Organization",
      name: "Pacomont",
      url: "https://pacomont.es",
    },
    url: `https://pacomont.es/blog/${slug}`,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-16 max-w-3xl mx-auto">
        <Link href="/blog" className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors mb-8 inline-block">
          ← Volver al blog
        </Link>
        <p className="text-zinc-500 text-sm mb-4">
          {new Date(post.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-8">{post.title}</h1>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6
          prose-strong:text-white
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
          prose-ul:text-zinc-300 prose-li:mb-2
          prose-blockquote:border-blue-400 prose-blockquote:text-zinc-300">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-16 border-t border-zinc-800 pt-12 text-center">
          <p className="text-zinc-400 mb-2">¿Quieres entrenar con este método?</p>
          <Link
            href="https://my.playbookapp.io/pacomont"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500/80 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full transition-colors"
          >
            Ver mis planes en Playbook →
          </Link>
        </div>
      </main>
    </div>
  );
}
