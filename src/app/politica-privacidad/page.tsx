import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad | Pacomont",
  description: "Política de privacidad de Pacomont conforme al RGPD y la LOPDGDD",
};

export default function PoliticaPrivacidad() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#1a1a1a" }}>
      <nav style={{ background: "#0d1520", padding: "20px 24px" }}>
        <Link href="/" style={{ color: "#9ca3af", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          ← Volver a pacomont.es
        </Link>
      </nav>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 80px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0d1520", marginBottom: 8 }}>Política de Privacidad</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 48 }}>Última actualización: agosto de 2026</p>

        <Section title="1. Responsable del tratamiento">
          <ul>
            <li><strong>Identidad:</strong> Francisco Montero Hernández</li>
            <li><strong>NIF:</strong> 23048845Q</li>
            <li><strong>Domicilio:</strong> Calle Miguel Hernández, 3, 2ºJ, España</li>
            <li><strong>Correo electrónico:</strong> lijas23@gmail.com</li>
          </ul>
        </Section>

        <Section title="2. Datos que recogemos y cómo los recogemos">
          <p>Cuando contactas a través de WhatsApp o cualquier otro medio facilitado en el sitio web, podemos tratar los siguientes datos:</p>
          <ul>
            <li>Nombre y apellidos</li>
            <li>Número de teléfono</li>
            <li>Dirección de correo electrónico (si la facilitas)</li>
            <li>Información sobre tu estado de salud y objetivos físicos que nos comuniques voluntariamente para la prestación del servicio</li>
          </ul>
          <p>No recopilamos datos a través de formularios web. El contacto se realiza mediante canales externos (WhatsApp) sujetos a sus propias políticas de privacidad.</p>
        </Section>

        <Section title="3. Finalidad del tratamiento">
          <p>Tratamos tus datos para:</p>
          <ul>
            <li>Gestionar tu solicitud de información y dar respuesta a tus consultas</li>
            <li>Elaborar y hacer seguimiento de planes de entrenamiento y nutrición personalizados</li>
            <li>Mantener la relación comercial durante la prestación del servicio</li>
            <li>Enviarte comunicaciones relacionadas con el servicio contratado</li>
          </ul>
        </Section>

        <Section title="4. Base jurídica del tratamiento">
          <ul>
            <li><strong>Ejecución de un contrato:</strong> tratamiento necesario para la prestación del servicio de entrenamiento personal y nutrición (art. 6.1.b RGPD)</li>
            <li><strong>Consentimiento:</strong> para el envío de comunicaciones comerciales, cuando lo hayas otorgado expresamente (art. 6.1.a RGPD)</li>
            <li><strong>Interés legítimo:</strong> para la gestión de la relación con clientes y la atención de consultas (art. 6.1.f RGPD)</li>
          </ul>
          <p>Los datos de salud facilitados voluntariamente para la elaboración del plan de entrenamiento se tratan con base en tu consentimiento explícito (art. 9.2.a RGPD).</p>
        </Section>

        <Section title="5. Conservación de los datos">
          <p>Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recogieron y, en su caso, para dar cumplimiento a las obligaciones legales. Una vez finalizada la relación contractual, los datos se bloquearán durante el plazo legalmente exigido y se eliminarán transcurrido dicho plazo.</p>
        </Section>

        <Section title="6. Destinatarios">
          <p>No cedemos tus datos a terceros salvo obligación legal. El servicio se presta a través de aplicaciones de terceros (como la plataforma de entrenamiento) cuyos encargados de tratamiento ofrecen las garantías adecuadas conforme al RGPD.</p>
        </Section>

        <Section title="7. Tus derechos">
          <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
          <ul>
            <li><strong>Acceso:</strong> conocer qué datos tratamos sobre ti</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado</li>
            <li><strong>Limitación del tratamiento:</strong> solicitar que se restrinja el tratamiento de tus datos</li>
          </ul>
          <p>Para ejercer estos derechos, dirígete a: <a href="mailto:lijas23@gmail.com" style={{ color: "#2563eb" }}>lijas23@gmail.com</a>, indicando el derecho que deseas ejercer y adjuntando una copia de tu DNI.</p>
          <p>Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>www.aepd.es</a>.</p>
        </Section>

        <Section title="8. Seguridad">
          <p>Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos personales frente a pérdida, uso indebido, acceso no autorizado o divulgación.</p>
        </Section>

        <Section title="9. Cambios en esta política">
          <p>Nos reservamos el derecho a actualizar esta Política de Privacidad. Cualquier cambio relevante será notificado mediante el sitio web. La versión vigente es la publicada en esta página.</p>
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
