import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal — Pacomont",
  description: "Aviso legal de pacomont.es. Información sobre el titular del sitio web, condiciones de uso y legislación aplicable.",
  alternates: { canonical: "https://www.pacomont.es/aviso-legal" },
  robots: { index: false, follow: false },
};

export default function AvisoLegal() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-16 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Aviso Legal</h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-400">

          <section>
            <h2 className="text-xl font-black text-white mb-3">1. Datos identificativos del titular</h2>
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li><strong className="text-white">Titular:</strong> Francisco Montero</li>
              <li><strong className="text-white">Nombre comercial:</strong> Pacomont</li>
              <li><strong className="text-white">Domicilio:</strong> España</li>
              <li><strong className="text-white">Correo electrónico:</strong> pacomont@pacomont.es</li>
              <li><strong className="text-white">Web:</strong> www.pacomont.es</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">2. Objeto y ámbito de aplicación</h2>
            <p>El presente Aviso Legal regula el acceso y uso del sitio web <strong className="text-white">www.pacomont.es</strong> y de la aplicación <strong className="text-white">app.pacomont.es</strong>, titularidad de Francisco Montero.</p>
            <p className="mt-3">El acceso al sitio web implica la aceptación plena y sin reservas de las condiciones establecidas en este Aviso Legal. El titular se reserva el derecho a modificar en cualquier momento su contenido.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">3. Propiedad intelectual e industrial</h2>
            <p>Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño, código fuente y demás elementos) son propiedad de Francisco Montero o cuenta con las licencias correspondientes. Quedan reservados todos los derechos de propiedad intelectual e industrial.</p>
            <p className="mt-3">Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de los contenidos sin autorización expresa y por escrito del titular.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">4. Exclusión de garantías y responsabilidad</h2>
            <p>El titular no garantiza la disponibilidad y continuidad del funcionamiento del sitio web. Tampoco garantiza la ausencia de errores en el acceso al sitio, ni que los contenidos estén actualizados en todo momento.</p>
            <p className="mt-3">El titular no será responsable de los daños y perjuicios de cualquier naturaleza que pudieran derivarse del acceso o uso del sitio web.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">5. Política de enlaces</h2>
            <p>El sitio web puede contener enlaces a terceros. El titular no controla ni se responsabiliza del contenido de dichos sitios externos y recomienda leer los avisos legales y políticas de privacidad de cada uno.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">6. Legislación aplicable y jurisdicción</h2>
            <p>Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada del uso de este sitio web, las partes se someten a los Juzgados y Tribunales del domicilio del usuario, conforme a la normativa de consumidores y usuarios vigente en España.</p>
          </section>

          <p className="text-zinc-600 text-sm">Última actualización: junio de 2026</p>
        </div>
      </main>
    </div>
  );
}
