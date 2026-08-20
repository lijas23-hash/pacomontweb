import Link from "next/link";

export const metadata = {
  title: "Política de Cookies | Pacomont",
  description: "Información sobre el uso de cookies en pacomont.es",
};

export default function PoliticaCookies() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#1a1a1a" }}>
      <nav style={{ background: "#0d1520", padding: "20px 24px" }}>
        <Link href="/" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          ← Volver a pacomont.es
        </Link>
      </nav>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0d1520", marginBottom: 8 }}>Política de Cookies</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 48 }}>Última actualización: agosto de 2026</p>

        <Section title="1. ¿Qué son las cookies?">
          <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo al visitarlos. Sirven para que el sitio funcione correctamente, recuerde tus preferencias o recopile información estadística sobre el uso.</p>
        </Section>

        <Section title="2. ¿Qué cookies utiliza este sitio?">
          <p>El sitio web www.pacomont.es utiliza los siguientes tipos de cookies:</p>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16, fontSize: 14 }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, border: "1px solid #e5e7eb" }}>Cookie</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, border: "1px solid #e5e7eb" }}>Tipo</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, border: "1px solid #e5e7eb" }}>Propósito</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, border: "1px solid #e5e7eb" }}>Titular</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 12px", border: "1px solid #e5e7eb" }}>Cookies técnicas de Vercel</td>
                <td style={{ padding: "10px 12px", border: "1px solid #e5e7eb" }}>Necesaria</td>
                <td style={{ padding: "10px 12px", border: "1px solid #e5e7eb" }}>Garantizan el correcto funcionamiento del sitio web</td>
                <td style={{ padding: "10px 12px", border: "1px solid #e5e7eb" }}>Tercero (Vercel)</td>
              </tr>
              <tr style={{ background: "#f9fafb" }}>
                <td style={{ padding: "10px 12px", border: "1px solid #e5e7eb" }}>Cookies de YouTube</td>
                <td style={{ padding: "10px 12px", border: "1px solid #e5e7eb" }}>Terceros</td>
                <td style={{ padding: "10px 12px", border: "1px solid #e5e7eb" }}>Reproductor de vídeo embebido. Google puede usar estas cookies para personalización y estadísticas</td>
                <td style={{ padding: "10px 12px", border: "1px solid #e5e7eb" }}>Tercero (Google/YouTube)</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="3. Cookies de terceros">
          <p>Este sitio incorpora vídeos de YouTube (Google LLC). Al reproducirse el vídeo, YouTube puede instalar cookies en tu dispositivo. Google tiene su propia política de privacidad y cookies, a la que puedes acceder en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>policies.google.com/privacy</a>.</p>
          <p>El titular del sitio no controla ni es responsable del uso que Google/YouTube haga de dichas cookies.</p>
        </Section>

        <Section title="4. Cómo gestionar las cookies">
          <p>Puedes configurar tu navegador para bloquear o eliminar las cookies. Ten en cuenta que deshabilitar ciertas cookies puede afectar a la funcionalidad del sitio.</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Microsoft Edge</a></li>
          </ul>
        </Section>

        <Section title="5. Más información">
          <p>Para cualquier consulta sobre el uso de cookies en este sitio, puedes contactar en <a href="mailto:lijas23@gmail.com" style={{ color: "#2563eb" }}>lijas23@gmail.com</a>.</p>
          <p>Para más información sobre cookies y su regulación, consulta la web de la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Agencia Española de Protección de Datos (AEPD)</a>.</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0d1520", marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>{children}</div>
    </section>
  );
}
