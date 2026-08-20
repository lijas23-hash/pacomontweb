import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies — Pacomont",
  description: "Política de cookies de pacomont.es. Información sobre qué cookies usamos y cómo gestionarlas.",
  alternates: { canonical: "https://www.pacomont.es/cookies" },
  robots: { index: false, follow: false },
};

export default function Cookies() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-16 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Política de Cookies</h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-zinc-400">

          <section>
            <h2 className="text-xl font-black text-white mb-3">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Se usan ampliamente para que los sitios funcionen correctamente, mejorar su eficiencia y proporcionar información a los propietarios del sitio.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Cookies que usamos</h2>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-zinc-800 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-zinc-800">
                    <th className="text-left p-3 text-white font-bold">Cookie</th>
                    <th className="text-left p-3 text-white font-bold">Tipo</th>
                    <th className="text-left p-3 text-white font-bold">Finalidad</th>
                    <th className="text-left p-3 text-white font-bold">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="p-3">_ga, _gid</td>
                    <td className="p-3">Analítica</td>
                    <td className="p-3">Google Analytics — estadísticas de visitas</td>
                    <td className="p-3">2 años / 24h</td>
                  </tr>
                  <tr>
                    <td className="p-3">_fbp</td>
                    <td className="p-3">Marketing</td>
                    <td className="p-3">Meta Pixel — seguimiento de conversiones</td>
                    <td className="p-3">3 meses</td>
                  </tr>
                  <tr>
                    <td className="p-3">GTM-*</td>
                    <td className="p-3">Funcional</td>
                    <td className="p-3">Google Tag Manager — gestión de etiquetas</td>
                    <td className="p-3">Sesión</td>
                  </tr>
                  <tr>
                    <td className="p-3">va_*</td>
                    <td className="p-3">Analítica</td>
                    <td className="p-3">Vercel Analytics — rendimiento del sitio</td>
                    <td className="p-3">Sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Cómo gestionar las cookies</h2>
            <p>Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envía una cookie. La mayoría de los navegadores aceptan cookies automáticamente, pero puedes modificar la configuración del tuyo para rechazarlas si lo prefieres.</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Safari</a></li>
            </ul>
            <p className="mt-3">Ten en cuenta que desactivar las cookies puede afectar a la funcionalidad de este y otros muchos sitios web.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Más información</h2>
            <p>Para cualquier consulta relacionada con el uso de cookies, puedes contactarnos en <a href="mailto:pacomont@pacomont.es" className="text-blue-400 hover:text-blue-300">pacomont@pacomont.es</a>.</p>
            <p className="mt-3">Para más información sobre cómo tratamos tus datos personales, consulta nuestra <a href="/privacidad" className="text-blue-400 hover:text-blue-300">Política de Privacidad</a>.</p>
          </section>

          <p className="text-zinc-600 text-sm">Última actualización: junio de 2026</p>
        </div>
      </main>
    </div>
  );
}
