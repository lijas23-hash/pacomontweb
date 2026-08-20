import Link from "next/link";

export const metadata = {
  title: "Términos y Condiciones | Pacomont",
  description: "Términos y condiciones del servicio de entrenamiento personal online de Pacomont",
};

export default function Terminos() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#1a1a1a" }}>
      <nav style={{ background: "#0d1520", padding: "20px 24px" }}>
        <Link href="/" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          ← Volver a pacomont.es
        </Link>
      </nav>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0d1520", marginBottom: 8 }}>Términos y Condiciones</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 48 }}>Última actualización: agosto de 2026</p>

        <Section title="1. Partes del contrato">
          <p>Los presentes Términos y Condiciones regulan la contratación de los servicios ofrecidos por Francisco Montero Hernández (NIF: 23048845Q), con domicilio en Calle Miguel Hernández, 3, 2ºJ, España, correo electrónico lijas23@gmail.com (en adelante, «el prestador»), y el cliente que contrata dichos servicios (en adelante, «el cliente»).</p>
        </Section>

        <Section title="2. Descripción del servicio">
          <p>El prestador ofrece servicios de entrenamiento personal y nutrición online, que incluyen:</p>
          <ul>
            <li>Plan de entrenamiento personalizado según los objetivos y disponibilidad del cliente</li>
            <li>Plan de nutrición adaptado al plan de entrenamiento</li>
            <li>Seguimiento periódico y ajustes del plan cada 15 días</li>
            <li>Atención y resolución de dudas a través del chat de la aplicación</li>
          </ul>
          <p>El plan estará disponible en la aplicación de entrenamiento en un plazo máximo de 24/48 horas desde la primera toma de contacto y confirmación del servicio.</p>
        </Section>

        <Section title="3. Precio y forma de pago">
          <p>El precio del servicio se acordará entre las partes durante la toma de contacto inicial. El pago se realizará por los medios acordados en dicho momento. El prestador emitirá el correspondiente justificante o factura a solicitud del cliente.</p>
        </Section>

        <Section title="4. Duración y renovación">
          <p>Los servicios se contratan generalmente por períodos mensuales, prorrogables. La duración exacta se acordará entre las partes. El cliente podrá no renovar el servicio notificándolo al prestador con antelación suficiente al fin del período contratado.</p>
        </Section>

        <Section title="5. Derecho de desistimiento">
          <p>De conformidad con el Real Decreto Legislativo 1/2007 y la Directiva 2011/83/UE, el cliente dispone de un plazo de <strong>14 días naturales</strong> desde la confirmación del contrato para ejercer su derecho de desistimiento, sin necesidad de justificación.</p>
          <p>Para ejercer el desistimiento, el cliente debe notificarlo al prestador mediante un mensaje escrito a <a href="mailto:lijas23@gmail.com" style={{ color: "#2563eb" }}>lijas23@gmail.com</a> antes de que expire dicho plazo.</p>
          <p><strong>Excepción:</strong> si el cliente solicita expresamente el inicio del servicio antes del fin del plazo de desistimiento y el plan es entregado, el cliente reconoce que el derecho de desistimiento quedará limitado a la parte del servicio no ejecutada.</p>
        </Section>

        <Section title="6. Obligaciones del cliente">
          <p>El cliente se compromete a:</p>
          <ul>
            <li>Proporcionar información veraz sobre su estado de salud, historial deportivo y objetivos</li>
            <li>Consultar con un médico antes de iniciar cualquier programa de entrenamiento si padece alguna condición de salud</li>
            <li>Seguir las indicaciones del plan de forma responsable y dentro de sus capacidades físicas</li>
            <li>Comunicar al prestador cualquier cambio en su estado de salud que pueda afectar al entrenamiento</li>
          </ul>
        </Section>

        <Section title="7. Limitación de responsabilidad">
          <p>El prestador elabora los planes de entrenamiento y nutrición basándose en la información facilitada por el cliente. No se responsabiliza de lesiones derivadas de una ejecución incorrecta de los ejercicios, de no comunicar condiciones de salud relevantes, o del incumplimiento de las indicaciones del plan.</p>
          <p>Los servicios de entrenamiento personal online no sustituyen el consejo médico. El cliente debe consultar con su médico ante cualquier duda sobre su aptitud física para realizar ejercicio.</p>
        </Section>

        <Section title="8. Propiedad intelectual">
          <p>Los planes de entrenamiento y nutrición elaborados por el prestador son de uso exclusivo del cliente contratante. Queda prohibida su reproducción, distribución o cesión a terceros sin autorización expresa del prestador.</p>
        </Section>

        <Section title="9. Protección de datos">
          <p>El tratamiento de los datos personales del cliente se rige por la <Link href="/politica-privacidad" style={{ color: "#2563eb" }}>Política de Privacidad</Link> de pacomont.es, conforme al RGPD y la LOPDGDD.</p>
        </Section>

        <Section title="10. Ley aplicable y resolución de conflictos">
          <p>Los presentes Términos y Condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del prestador, salvo que la normativa de protección de consumidores establezca otro fuero imperativo.</p>
          <p>En caso de conflicto, el cliente consumidor también puede recurrir a la plataforma de resolución de litigios en línea de la UE: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>ec.europa.eu/consumers/odr</a>.</p>
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
