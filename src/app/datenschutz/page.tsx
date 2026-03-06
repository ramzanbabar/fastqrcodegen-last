import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutz – DSGVO konform",
  description: "Datenschutzerklärung von FastQRCodeGen.online. Informationen zur Verarbeitung Ihrer Daten gemäß DSGVO.",
}

export default function DatenschutzPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-400">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">1. Datenschutz auf einen Blick</h2>
          
          <h3 className="text-lg font-medium text-foreground mb-2">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-2 mt-4">Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <p className="mt-4">
            <strong>Wie erfassen wir Ihre Daten?</strong><br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.
          </p>

          <p className="mt-4">
            <strong>Wofür nutzen wir Ihre Daten?</strong><br />
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">2. Hosting und Content Delivery Network (CDN)</h2>
          <p>
            Diese Website wird bei Vercel Inc. gehostet. Vercel ist ein US-amerikanischer Anbieter von Cloud-Diensten. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">3. QR-Code Generierung – Client-seitige Verarbeitung</h2>
          <p>
            <strong>Besonderes Merkmal dieses Services:</strong> Alle QR-Codes werden vollständig in Ihrem Browser (client-seitig) generiert. Die von Ihnen eingegebenen Daten (URLs, Texte, Kontaktdaten etc.) verlassen zu keiner Zeit Ihren Computer und werden nicht an unsere Server übertragen.
          </p>
          <p className="mt-4">
            Das bedeutet:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Wir speichern keine QR-Code-Inhalte</li>
            <li>Wir haben keinen Zugriff auf Ihre eingegebenen Daten</li>
            <li>Alle Verarbeitung erfolgt lokal in Ihrem Browser</li>
            <li>Ihre Privatsphäre ist zu 100% geschützt</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">4. Cookies</h2>
          <p>
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Wir verwenden ausschließlich technische Cookies, die für den Betrieb der Website notwendig sind, sowie – nach Ihrer Einwilligung – Cookies für Analyse und Werbung.
          </p>
          
          <h3 className="text-lg font-medium text-foreground mb-2 mt-4">Technisch notwendige Cookies</h3>
          <p>
            Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie speichern:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Ihre Cookie-Einwilligungspräferenzen</li>
            <li>Ihre Theme-Einstellung (hell/dunkel)</li>
          </ul>

          <h3 className="text-lg font-medium text-foreground mb-2 mt-4">Analyse- und Werbe-Cookies</h3>
          <p>
            Diese Cookies werden nur nach Ihrer ausdrücklichen Einwilligung gesetzt. Sie dienen dazu, die Website-Nutzung zu analysieren und personalisierte Werbung anzuzeigen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">5. Ihre Rechte</h2>
          <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">6. Kontakt für Datenschutzanfragen</h2>
          <p>
            Bei Fragen zum Datenschutz können Sie uns kontaktieren:
          </p>
          <div className="bg-muted/50 p-6 rounded-lg mt-4">
            <p>E-Mail: datenschutz@fastqrcodegen.online</p>
          </div>
        </section>
      </div>
    </div>
  )
}
