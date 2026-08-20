import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Checklist HYROX: Las 8 Estaciones — Pacomont",
  robots: { index: false },
};

export default function ChecklistHyrox() {
  return (
    <div className="min-h-screen bg-white text-black print:bg-white">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Download button - hidden on print */}
      <div className="no-print bg-zinc-900 text-white py-4 px-6 flex items-center justify-between">
        <p className="text-sm text-zinc-400">Tu checklist exclusiva de <strong className="text-white">Pacomont</strong></p>
        <PrintButton />
      </div>

      {/* Checklist content */}
      <div className="max-w-2xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="border-b-2 border-black pb-8 mb-8">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-2">PACOMONT · Embajador Oficial HYROX España</p>
          <h1 className="text-4xl font-black leading-tight mb-3">Checklist HYROX<br />Las 8 estaciones</h1>
          <p className="text-zinc-600 text-base">Técnica clave y errores que te cuestan tiempo — para que no los cometas tú.</p>
        </div>

        {/* Stations */}
        <div className="space-y-6">
          {[
            {
              num: "01",
              name: "SkiErg",
              dist: "1.000 metros",
              error: "Salir demasiado fuerte. Es la primera estación y el cuerpo quiere explotar. No lo hagas.",
              tip: "Ritmo sostenible desde el inicio (~2:00-2:10 min/500m). El movimiento viene de cadera y core, no solo brazos.",
            },
            {
              num: "02",
              name: "Sled Push",
              dist: "50 metros",
              error: "Bajar demasiado el cuerpo. Pierdes potencia y te desequilibras.",
              tip: "Ángulo de 45°, pasos cortos y rápidos. La fuerza la generan las piernas, los brazos solo transmiten.",
            },
            {
              num: "03",
              name: "Sled Pull",
              dist: "50 metros",
              error: "Tirar con la espalda doblada. Destroza la zona lumbar y pierde eficiencia.",
              tip: "Cuerpo erguido, codos pegados al cuerpo en el jalón. Glúteos activos en cada paso hacia atrás.",
            },
            {
              num: "04",
              name: "Burpee Broad Jumps",
              dist: "80 metros",
              error: "Ir demasiado rápido los primeros metros y morir en los últimos 60.",
              tip: "Ritmo constante de inicio a fin. El salto hacia adelante, no hacia arriba. Maximiza distancia por rep.",
            },
            {
              num: "05",
              name: "Rowing",
              dist: "1.000 metros",
              error: "Tirar solo con los brazos. Te cansas el doble y rindes la mitad.",
              tip: "60% piernas, 20% cadera, 20% brazos. Secuencia: empuja piernas → inclina cadera → jala brazos.",
            },
            {
              num: "06",
              name: "Farmers Carry",
              dist: "200 metros",
              error: "Perder la postura cuando el cuerpo se cansa. La espalda se curva y el agarre falla.",
              tip: "Hombros atrás y abajo, core activado, mirada al frente. Si falla el agarre, falla la estación.",
            },
            {
              num: "07",
              name: "Sandbag Lunges",
              dist: "100 metros",
              error: "Parar. Volver a arrancar con el saco encima cuesta más que mantener el movimiento.",
              tip: "Saco bien posicionado sobre el hombro, paso medio, rodilla trasera cerca del suelo sin tocarlo.",
            },
            {
              num: "08",
              name: "Wall Balls",
              dist: "100 repeticiones",
              error: "Dividirlo en series desde el principio. Entrar pensando en 10x10 ya es perder.",
              tip: "Las piernas lanzan el balón, no los brazos. Primeros 40 seguidos si puedes. Tú controlas el ritmo.",
            },
          ].map((s) => (
            <div key={s.num} className="flex gap-4 pb-6 border-b border-zinc-200">
              <div className="text-3xl font-black text-zinc-200 w-10 shrink-0">{s.num}</div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="text-lg font-black">{s.name}</h2>
                  <span className="text-xs text-zinc-500 font-medium">{s.dist}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Error común</p>
                    <p className="text-xs text-zinc-700 leading-relaxed">{s.error}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Clave técnica</p>
                    <p className="text-xs text-zinc-700 leading-relaxed">{s.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy */}
        <div className="mt-8 bg-zinc-900 text-white rounded-2xl p-6 print:border-2 print:border-black print:bg-white print:text-black">
          <p className="text-xs font-bold tracking-wider uppercase text-blue-400 print:text-black mb-2">Estrategia global</p>
          <p className="font-black text-lg mb-2">No gana el más fuerte. Gana el que mejor gestiona la energía.</p>
          <p className="text-zinc-400 print:text-zinc-600 text-sm">Sal conservador la primera mitad. Lo que ahorras al principio lo gastas en los km 7-8 y las últimas estaciones. Si explotas en los primeros kilómetros, no hay vuelta atrás.</p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
          <p className="text-xs text-zinc-400">pacomont.es · @pacomont24 · Embajador Oficial HYROX España</p>
        </div>
      </div>
    </div>
  );
}
