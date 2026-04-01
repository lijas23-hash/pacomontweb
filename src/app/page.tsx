import Image from "next/image";

// ─── Schema: Person ───────────────────────────────────────────────────────────
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pacomont",
  alternateName: "pacomont24",
  description:
    "Embajador oficial HYROX en España. Atleta PRO con mejor tiempo de 1:08 en categoría PRO.",
  url: "https://pacomont.com",
  sameAs: [
    "https://www.instagram.com/pacomont24/",
    "https://www.tiktok.com/@pacomont24",
    "https://www.youtube.com/@pacomont24",
  ],
  jobTitle: "Embajador Oficial HYROX",
  award: "Embajador Oficial HYROX España",
  affiliation: {
    "@type": "SportsOrganization",
    name: "HYROX",
    url: "https://hyrox.com",
  },
  knowsAbout: [
    "HYROX",
    "Entrenamiento funcional",
    "Planes de entrenamiento HYROX online",
    "HYROX Individual",
    "HYROX Doubles",
    "Nutrición deportiva",
    "Preparación carreras híbridas",
  ],
  performerIn: [
    { "@type": "SportsEvent", name: "HYROX PRO", description: "Mejor tiempo: 1:08 — mejora de más de 10 min en categoría PRO" },
    { "@type": "SportsEvent", name: "HYROX Málaga", description: "Competición categoría PRO" },
    { "@type": "SportsEvent", name: "HYROX Barcelona", description: "Competición categoría PRO" },
  ],
};

// ─── Schema: WebSite ──────────────────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pacomont",
  url: "https://pacomont.com",
  description:
    "Web oficial de Pacomont, embajador HYROX en España. Planes de entrenamiento, app Playbook y descuentos exclusivos.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://pacomont.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// ─── Schema: FAQ ──────────────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo empezar a entrenar HYROX desde cero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para empezar a entrenar HYROX necesitas una base mínima de carrera y familiarizarte con las 8 estaciones funcionales: SkiErg, sled push, sled pull, burpees, rowing, farmer carry, sandbag lunges y wall balls. El plan HYROX OPEN de Pacomont está diseñado exactamente para esto: 5 días por semana, sesiones de 40-60 minutos, nivel principiante-intermedio, con progresión estructurada desde el primer día.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo se necesita para preparar un HYROX?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Con entrenamiento estructurado, una persona activa puede preparar su primer HYROX en 8-12 semanas. Para competir en HYROX se necesitan al menos 3 meses de preparación específica. El programa HYROX PRO PREP de Pacomont tiene 12 semanas de periodización completa con fuerza, carrera y circuitos de intervalos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Quién es el embajador oficial de HYROX en España?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pacomont (pacomont24) es embajador oficial HYROX en España. Atleta PRO activo con mejor tiempo de 1:08 en categoría PRO, mejorando más de 10 minutos. Sus planes de entrenamiento están disponibles en la app Playbook (my.playbookapp.io/pacomont).",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué planes de entrenamiento HYROX ofrece Pacomont?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pacomont ofrece tres planes dentro de su suscripción mensual de 12,99€ en Playbook: HYROX OPEN (iniciación, 5 días/semana), HYROX PRO PREP (12 semanas de preparación avanzada) y Atleta Híbrido Rendimiento y Definición Vol.1 (8 semanas, fuerza + carrera). También hay un programa OTP Atleta Híbrido Vol.1 por 18€ de pago único.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el plan de entrenamiento HYROX de Pacomont?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La suscripción de Pacomont en Playbook cuesta 12,99€ al mes e incluye acceso completo a todos los planes: HYROX OPEN, HYROX PRO PREP y Atleta Híbrido. También hay un plan de pago único (Atleta Híbrido Vol.1) por 18€.",
      },
    },
  ],
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-gradient-to-b from-black/60 to-transparent">
      <div className="text-white font-bold text-xl tracking-widest uppercase">
        Paco<span className="text-blue-400">mont</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300 font-medium">
        <a href="#sobre-mi" className="hover:text-blue-300 transition-colors">Sobre mí</a>
        <a href="#planes" className="hover:text-blue-300 transition-colors">Planes</a>
        <a href="#descuentos" className="hover:text-blue-300 transition-colors">Descuentos</a>
        <a href="#faq" className="hover:text-blue-300 transition-colors">FAQ</a>
      </div>
      <a
        href="https://my.playbookapp.io/pacomont"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500/80 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
      >
        Empezar ahora
      </a>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end md:items-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Pacomont compitiendo en HYROX — embajador oficial España"
        fill
        priority
        className="object-cover object-[60%_15%]"
        sizes="100vw"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 px-6 pb-20 md:pb-0 md:px-16 max-w-2xl">
        <p className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">
          Embajador Oficial HYROX · España
        </p>
        <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
          Planes de<br />entrenamiento<br />
          <span className="gradient-text">HYROX PRO.</span>
        </h1>
        <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
          Los mismos programas con los que compito a nivel PRO,
          disponibles para ti desde 12,99€/mes. Individual, Doubles y todos los niveles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://my.playbookapp.io/pacomont"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500/80 hover:bg-blue-500 text-white font-bold text-base px-8 py-4 rounded-full transition-colors text-center"
          >
            Ver mis planes →
          </a>
          <a
            href="#sobre-mi"
            className="border border-white/30 hover:border-blue-400 text-white font-medium text-base px-8 py-4 rounded-full transition-colors text-center"
          >
            Conocer mi historia
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-500 text-xs">
        <span>scroll</span>
        <div className="w-px h-8 bg-zinc-600" />
      </div>
    </section>
  );
}


// ─── Sobre mí ─────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="sobre-mi" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
            <Image
              src="/images/lifestyle.jpg"
              alt="Pacomont — embajador oficial HYROX en España"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-blue-500/80 text-white rounded-2xl px-6 py-4 font-bold text-center shadow-xl">
            <div className="text-2xl font-black">HYROX</div>
            <div className="text-xs font-medium tracking-wider">AMBASSADOR</div>
          </div>
        </div>

        <div>
          <p className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Sobre mí
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
            Soy Pacomont.<br />
            <span className="gradient-text">Compito en HYROX.</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            Embajador oficial HYROX en España. Compito a nivel PRO con un mejor tiempo de{" "}
            <strong className="text-white">1:08</strong> —mejorado más de 10 minutos en categoría PRO,
            con Málaga como punto de inflexión.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            Mi misión es llevarte de cero a completar tu primer HYROX —o a bajar tu tiempo—
            con los planes exactos que yo mismo uso para competir en la élite. Entrenamiento híbrido,
            fuerza y carrera integrados para el atleta completo.
          </p>
          <blockquote className="border-l-2 border-blue-400 pl-4 mb-8">
            <p className="text-zinc-300 italic leading-relaxed">
              "Soy embajador oficial de HYROX."
            </p>
            <cite className="text-blue-400 text-sm font-bold not-italic mt-2 block">— Pacomont</cite>
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.instagram.com/pacomont24/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-zinc-300 hover:text-blue-300 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @pacomont24
            </a>
            <a
              href="https://www.tiktok.com/@pacomont24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-zinc-300 hover:text-blue-300 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.24 8.24 0 004.84 1.56V6.78a4.85 4.85 0 01-1.07-.09z" />
              </svg>
              @pacomont24
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Planes ───────────────────────────────────────────────────────────────────
type Plan = {
  name: string;
  tag: string;
  price: string;
  priceNote: string;
  weeks: string;
  days: string;
  level: string;
  description: string;
  cta: string;
  url: string;
  highlight: boolean;
};

function PlanCard({ name, tag, price, priceNote, weeks, days, level, description, cta, url, highlight }: Plan) {
  return (
    <div className={`rounded-2xl p-6 flex flex-col card-hover border ${highlight ? "bg-blue-500/10 border-blue-400/40" : "bg-zinc-900 border-zinc-800"}`}>
      <div className="mb-4">
        <span className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full ${highlight ? "bg-blue-500/20 text-blue-300" : "bg-zinc-800 text-zinc-400"}`}>
          {tag}
        </span>
      </div>
      <h3 className="text-xl font-black mb-1">{name}</h3>
      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-3xl font-black ${highlight ? "text-blue-400" : "text-white"}`}>{price}</span>
        <span className="text-zinc-500 text-sm">{priceNote}</span>
      </div>
      <div className="grid grid-cols-1 gap-1 mb-4 text-xs text-zinc-400">
        <span><span className="text-zinc-500">Duración:</span> {weeks}</span>
        <span><span className="text-zinc-500">Frecuencia:</span> {days}</span>
        <span><span className="text-zinc-500">Nivel:</span> {level}</span>
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-6">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block font-bold text-center py-3 rounded-full transition-colors text-sm ${highlight ? "bg-blue-500/80 hover:bg-blue-500 text-white" : "border border-zinc-700 hover:border-blue-400 text-white hover:text-blue-300"}`}
      >
        {cta}
      </a>
    </div>
  );
}

function Plans() {
  const plans: Plan[] = [
    {
      name: "HYROX OPEN",
      tag: "Iniciación",
      price: "12,99€",
      priceNote: "/ mes · incluido en suscripción",
      weeks: "Trimestral",
      days: "5 días/semana",
      level: "Principiante–Intermedio",
      description: "Tu primer paso en las carreras híbridas. Aprende las 8 estaciones HYROX con técnica correcta, mejora tu resistencia y fuerza de forma progresiva. Sesiones de 40-60 minutos, estructuradas y realistas.",
      cta: "Empezar con HYROX OPEN →",
      url: "https://my.playbookapp.io/pacomont",
      highlight: false,
    },
    {
      name: "HYROX PRO PREP",
      tag: "Más popular",
      price: "12,99€",
      priceNote: "/ mes · incluido en suscripción",
      weeks: "12 semanas",
      days: "5 días/semana",
      level: "Intermedio–Avanzado",
      description: "El programa que uso para prepararme a nivel PRO. 12 semanas de fuerza, carrera y circuitos de intervalos diseñados para el atleta híbrido. Periodización completa hacia tu mejor tiempo en HYROX.",
      cta: "Empezar HYROX PRO PREP →",
      url: "https://my.playbookapp.io/pacomont",
      highlight: true,
    },
    {
      name: "Atleta Híbrido — Rendimiento y Definición",
      tag: "Composición corporal",
      price: "12,99€",
      priceNote: "/ mes · incluido en suscripción",
      weeks: "8 semanas",
      days: "5 días/semana",
      level: "Intermedio",
      description: "Combina fuerza y carrera para mejorar rendimiento y reducir grasa. Mantén músculo mientras te defines. Esfuerzo moderado-alto sin llegar al fallo, con progresión controlada semana a semana.",
      cta: "Empezar Atleta Híbrido →",
      url: "https://my.playbookapp.io/pacomont",
      highlight: false,
    },
    {
      name: "Atleta Híbrido Vol.1",
      tag: "Pago único",
      price: "18€",
      priceNote: "pago único",
      weeks: "Progresivo",
      days: "5 fuerza + 5 running + 2 movilidad",
      level: "Todos los niveles",
      description: "Aumenta masa muscular y resistencia a la vez. 5 sesiones de pesas, 5 de carrera y 2 de movilidad por semana. El plan completo para construir un atleta verdaderamente funcional.",
      cta: "Comprar Atleta Híbrido Vol.1 →",
      url: "https://my.playbookapp.io/pacomont",
      highlight: false,
    },
  ];

  return (
    <section id="planes" className="py-24 bg-zinc-900">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Mis planes de entrenamiento
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Entrena con el método<br />
            <span className="gradient-text">del embajador HYROX.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Suscripción mensual de <strong className="text-white">12,99€</strong> con acceso completo a todos los planes.
            Sin permanencia. Cancela cuando quieras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((p) => (
            <PlanCard key={p.name} {...p} />
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden">
          <div className="aspect-[21/6] relative hidden md:block">
            <Image
              src="/images/playbook.jpg"
              alt="Pacomont entrenando — planes disponibles en Playbook"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent flex items-center px-12">
              <div>
                <h3 className="text-3xl font-black mb-2">Disponible en iOS y Android</h3>
                <p className="text-zinc-400 mb-6">Descarga Playbook y accede a todos los planes desde tu móvil.</p>
                <a
                  href="https://my.playbookapp.io/pacomont"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500/80 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full transition-colors"
                >
                  Ver todos los planes en Playbook →
                </a>
              </div>
            </div>
          </div>
          {/* Mobile CTA */}
          <div className="md:hidden text-center py-8 px-6 bg-zinc-800 rounded-2xl">
            <h3 className="text-2xl font-black mb-2">¿Listo para empezar?</h3>
            <p className="text-zinc-400 mb-6 text-sm">12,99€/mes · Todos los planes incluidos · Sin permanencia</p>
            <a
              href="https://my.playbookapp.io/pacomont"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500/80 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full transition-colors"
            >
              Ver planes en Playbook →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Descuentos ───────────────────────────────────────────────────────────────
type Discount = {
  brand: string;
  category: string;
  code: string;
  discount: string;
  url: string;
  description: string;
};

function DiscountCard({ brand, category, code, discount, url, description }: Discount) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 card-hover flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-blue-400 text-xs font-bold tracking-wider uppercase">
            {category}
          </span>
          <h3 className="text-xl font-black mt-1">{brand}</h3>
        </div>
        <span className="bg-blue-500/10 text-blue-400 font-black text-lg px-3 py-1 rounded-lg border border-blue-400/20">
          {discount}
        </span>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{description}</p>
      <div className="flex items-center justify-between gap-4 mt-auto">
        <div className="bg-zinc-800 rounded-lg px-4 py-2 flex-1 text-center">
          <p className="text-xs text-zinc-500 mb-1">Código</p>
          <p className="font-mono font-bold text-white tracking-widest text-sm">{code}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500/80 hover:bg-blue-500 text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
        >
          Comprar →
        </a>
      </div>
    </div>
  );
}

function Discounts() {
  const discounts: Discount[] = [
    {
      brand: "Velites",
      category: "Equipamiento HYROX",
      code: "PACOMONT10",
      discount: "10% OFF",
      url: "https://eu.velitessport.com/?ac=pacomont10",
      description:
        "Guantes, muñequeras, calcetines y equipamiento de competición HYROX. El material que yo uso en cada carrera.",
    },
    {
      brand: "Life Pro Nutrition",
      category: "Suplementación deportiva",
      code: "PACOMONT",
      discount: "10% OFF",
      url: "https://www.lifepronutrition.com/es/?codigo=PACOMONT",
      description:
        "Proteínas, creatina, pre-entrenos y suplementación para rendir al máximo en HYROX. Mi stack de competición.",
    },
    {
      brand: "Gudslip",
      category: "Rendimiento respiratorio",
      code: "PACOMONT",
      discount: "Descuento",
      url: "https://gudslip.com/products/gudsport-nose-strips?ref=pacomont",
      description:
        "Tiras nasales para mejorar la respiración en carrera y ejercicios de alta intensidad. Las uso en competición.",
    },
  ];

  return (
    <section id="descuentos" className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Mis partners
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Equipación HYROX<br />
            <span className="gradient-text">con descuento exclusivo.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Solo recomiendo lo que realmente uso en competición. Partners oficiales con código de descuento directo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {discounts.map((d) => (
            <DiscountCard key={d.brand} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const faqs = [
    {
      q: "¿Cómo empezar a entrenar HYROX desde cero?",
      a: "Para empezar necesitas una base de carrera mínima y aprender las 8 estaciones funcionales. El plan HYROX OPEN está diseñado exactamente para esto: 5 días/semana, sesiones de 40-60 minutos con progresión desde el primer día. Sin experiencia previa en HYROX necesaria.",
    },
    {
      q: "¿Cuánto tiempo necesito para preparar mi primer HYROX?",
      a: "Con entrenamiento estructurado, una persona activa puede prepararse en 8-12 semanas. Para competir en HYROX se necesitan al menos 3 meses. El programa HYROX PRO PREP tiene 12 semanas de periodización completa.",
    },
    {
      q: "¿Qué incluye la suscripción de 12,99€/mes?",
      a: "La suscripción incluye acceso completo a todos los planes: HYROX OPEN, HYROX PRO PREP y Atleta Híbrido Rendimiento y Definición. Son planes trimestrales. Sin permanencia, cancelas cuando quieras.",
    },
    {
      q: "¿Hay planes para HYROX Doubles?",
      a: "Sí. Los programas están adaptados tanto para la modalidad Individual como para Doubles. En el plan HYROX PRO PREP encontrarás estrategias específicas para la modalidad en pareja.",
    },
    {
      q: "¿Funciona la app Playbook en iOS y Android?",
      a: "Sí, Playbook está disponible en iOS y Android. Accedes a todos los planes desde tu móvil, con seguimiento de sesiones, cargas y progresión semana a semana.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-zinc-900">
      <div className="px-6 md:px-16 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Preguntas frecuentes
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Todo lo que necesitas<br />
            <span className="gradient-text">saber sobre HYROX.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-lg font-black mb-3 text-white">{faq.q}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-400 mb-4">¿Tienes más preguntas?</p>
          <a
            href="https://www.instagram.com/pacomont24/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-zinc-700 hover:border-blue-400 text-white hover:text-blue-300 font-medium px-6 py-3 rounded-full transition-colors"
          >
            Escríbeme en Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Redes sociales ───────────────────────────────────────────────────────────
function Social() {
  const platforms = [
    {
      name: "Instagram",
      handle: "@pacomont24",
      url: "https://www.instagram.com/pacomont24/",
      description: "Fotos y reels de competición, entrenamiento y lifestyle HYROX.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      handle: "@pacomont24",
      url: "https://www.tiktok.com/@pacomont24",
      description: "Videos cortos de entrenamiento, consejos HYROX y momentos de carrera.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.24 8.24 0 004.84 1.56V6.78a4.85 4.85 0 01-1.07-.09z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      handle: "@pacomont24",
      url: "https://www.youtube.com/@pacomont24",
      description: "Vlogs de HYROX Bilbao, AthlonX y guías de entrenamiento en profundidad.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="redes" className="py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden mb-16 h-64 md:h-72">
          <Image
            src="/images/action.jpg"
            alt="Pacomont en competición HYROX"
            fill
            className="object-cover object-[center_20%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/30 flex items-center px-8 md:px-16">
            <div>
              <p className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-2">
                Sígueme
              </p>
              <h2 className="text-3xl md:text-5xl font-black">
                La comunidad<br />
                <span className="gradient-text">HYROX en español.</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 card-hover flex flex-col gap-4 group"
            >
              <div className="text-zinc-400 group-hover:text-blue-400 transition-colors">
                {p.icon}
              </div>
              <div>
                <h3 className="font-black text-lg">{p.name}</h3>
                <p className="text-blue-400 text-sm font-medium">{p.handle}</p>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="text-white font-bold text-xl tracking-widest uppercase mb-1">
            Paco<span className="text-blue-400">mont</span>
          </div>
          <p className="text-zinc-500 text-sm">Embajador Oficial HYROX · España</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <a href="https://www.instagram.com/pacomont24/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Instagram</a>
          <a href="https://www.tiktok.com/@pacomont24" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">TikTok</a>
          <a href="https://www.youtube.com/@pacomont24" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">YouTube</a>
          <a href="https://my.playbookapp.io/pacomont" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Playbook</a>
        </div>
        <p className="text-zinc-600 text-xs">© 2025 Pacomont. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Plans />
        <Discounts />
        <FAQ />
        <Social />
      </main>
      <Footer />
    </>
  );
}
