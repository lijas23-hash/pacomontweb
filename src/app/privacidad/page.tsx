import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Pacomont",
  description: "Política de privacidad de pacomont.es. Información sobre el tratamiento de datos personales conforme al RGPD.",
  alternates: { canonical: "https://pacomont.es/privacidad" },
  robots: { index: false },
};

export default function Privacidad() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1117" }}>
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-16 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Política de Privacidad</h1>

        <div className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-300 prose-headings:font-black prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-a:text-blue-400">

          <p>Última actualización: abril de 2026</p>

          <p>
            El titular de este sitio web es <strong>Francisco Montero Balaguer</strong> (en adelante, &ldquo;Pacomont&rdquo;), con domicilio a efectos de contacto en{" "}
            <a href="mailto:hola@pacomont.es">hola@pacomont.es</a>.
          </p>

          <h2>1. Datos que recogemos</h2>
          <p>
            Este sitio web no recoge datos personales de forma directa a través de formularios. El único dato que puede procesarse de forma automática es la dirección IP de los visitantes a través de herramientas de analítica web (Google Analytics 4 y Vercel Analytics), con el fin de analizar el tráfico y mejorar el servicio.
          </p>

          <h2>2. Finalidad del tratamiento</h2>
          <p>
            Los datos de navegación se utilizan exclusivamente para análisis estadístico del sitio web (número de visitas, páginas consultadas, origen del tráfico) y para mejorar la experiencia del usuario. No se utilizan para crear perfiles de usuario ni para publicidad personalizada.
          </p>

          <h2>3. Base legal</h2>
          <p>
            El tratamiento se basa en el interés legítimo del titular para analizar el uso de su sitio web (art. 6.1.f RGPD). Los datos de analítica son anonimizados o pseudoanonimizados por las herramientas utilizadas.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Este sitio puede utilizar cookies técnicas y de analítica. Google Analytics puede depositar cookies en tu navegador para medir el uso del sitio. Puedes desactivarlas desde la configuración de tu navegador o utilizando las herramientas de opt-out de Google.
          </p>

          <h2>5. Terceros</h2>
          <p>
            Los planes de entrenamiento se ofrecen a través de <strong>Playbook</strong> (my.playbookapp.io), una plataforma externa con su propia política de privacidad. Al acceder a Playbook desde este sitio, el tratamiento de tus datos queda sujeto a sus propias condiciones.
          </p>

          <h2>6. Tus derechos</h2>
          <p>
            Tienes derecho a acceder, rectificar, suprimir y oponerte al tratamiento de tus datos, así como a la portabilidad y limitación del tratamiento. Para ejercer estos derechos, puedes contactar en{" "}
            <a href="mailto:hola@pacomont.es">hola@pacomont.es</a>.
          </p>
          <p>
            También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es) si consideras que el tratamiento no es conforme al RGPD.
          </p>

          <h2>7. Cambios en esta política</h2>
          <p>
            Esta política puede actualizarse en cualquier momento. La versión vigente siempre estará disponible en esta página con la fecha de última actualización.
          </p>

        </div>
      </main>
    </div>
  );
}
