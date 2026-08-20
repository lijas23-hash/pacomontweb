import Link from "next/link";

export const metadata = {
  title: "Aviso Legal | Pacomont",
  description: "Aviso legal de Pacomont — Francisco Montero Hernández",
};

export default function AvisoLegal() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#1a1a1a" }}>
      <nav style={{ background: "#0d1520", padding: "20px 24px" }}>
        <Link href="/" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          ← Volver a pacomont.es
        </Link>
      </nav>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0d1520", marginBottom: 8 }}>Aviso Legal</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 48 }}>Última actualización: agosto de 2026</p>

        <Section title="1. Datos del titular">
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI), se facilitan los datos identificativos del titular del presente sitio web:</p>
          <ul>
            <li><strong>Titular:</strong> Francisco Montero Hernández</li>
            <li><strong>NIF:</strong> 23048845Q</li>
            <li><strong>Domicilio:</strong> Calle Miguel Hernández, 3, 2ºJ, España</li>
            <li><strong>Correo electrónico:</strong> lijas23@gmail.com</li>
            <li><strong>Sitio web:</strong> www.pacomont.es</li>
          </ul>
        </Section>

        <Section title="2. Objeto y ámbito de aplicación">
          <p>El presente Aviso Legal regula el acceso y el uso del sitio web www.pacomont.es, a través del cual Francisco Montero Hernández ofrece información sobre servicios de entrenamiento personal y nutrición online.</p>
          <p>El acceso y uso del sitio implica la aceptación plena y sin reservas de las presentes condiciones. El titular se reserva el derecho a modificar el presente Aviso Legal en cualquier momento.</p>
        </Section>

        <Section title="3. Condiciones de uso">
          <p>El usuario se compromete a utilizar el sitio web y sus contenidos conforme a la ley, la moral y el orden público, así como a no emplearlo para actividades ilícitas o lesivas de derechos de terceros.</p>
          <p>Queda prohibida la reproducción, distribución o modificación de los contenidos sin autorización expresa del titular.</p>
        </Section>

        <Section title="4. Propiedad intelectual e industrial">
          <p>Todos los contenidos del sitio web —textos, imágenes, logotipos, diseño gráfico, código fuente y demás elementos— son propiedad del titular o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
          <p>Queda expresamente prohibida su reproducción total o parcial sin consentimiento previo y por escrito del titular.</p>
        </Section>

        <Section title="5. Limitación de responsabilidad">
          <p>El titular no garantiza la disponibilidad y continuidad ininterrumpida del sitio web ni se responsabiliza de los daños producidos por virus informáticos, problemas en la red o cualquier causa ajena a su control.</p>
          <p>Los contenidos del sitio tienen carácter meramente informativo. El titular no asume responsabilidad por el uso que el usuario haga de la información proporcionada.</p>
        </Section>

        <Section title="6. Ley aplicable y jurisdicción">
          <p>Las relaciones entre el titular y los usuarios del sitio se rigen por la legislación española vigente. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del titular, salvo que la ley establezca otro fuero imperativo.</p>
        </Section>

        <Section title="7. Contacto">
          <p>Para cualquier consulta relativa al presente Aviso Legal, puede dirigirse a: <a href="mailto:lijas23@gmail.com" style={{ color: "#2563eb" }}>lijas23@gmail.com</a></p>
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
