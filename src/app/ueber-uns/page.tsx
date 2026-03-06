import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Über uns – FastQRCodeGen.online",
  description: "Erfahren Sie mehr über FastQRCodeGen.online – Ihren kostenlosen QR-Code Generator für 2026.",
}

export default function UeberUnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Über uns</h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-400">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Unsere Mission</h2>
          <p>
            FastQRCodeGen.online wurde mit einer einfachen Mission gegründet: QR-Codes für jedermann zugänglich zu machen. In einer zunehmend digitalen Welt sind QR-Codes aus dem Alltag nicht mehr wegzudenken – sei es für Marketing, Geschäftskontakte oder private Zwecke.
          </p>
          <p className="mt-4">
            Wir glauben, dass großartige Tools nicht kompliziert sein müssen. Deshalb haben wir einen QR-Code Generator entwickelt, der:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Blitzschnell funktioniert</li>
            <li>Completely kostenlos ist</li>
            <li>Keine Registrierung erfordert</li>
            <li>Die Privatsphäre respektiert</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Was uns auszeichnet</h2>
          
          <h3 className="text-lg font-medium text-foreground mb-2">100% Client-seitig</h3>
          <p>
            Im Gegensatz zu vielen anderen QR-Code Generatoren werden alle QR-Codes direkt in Ihrem Browser erstellt. Ihre Daten verlassen niemals Ihr Gerät. Das bedeutet maximale Privatsphäre und Geschwindigkeit.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-2 mt-4">21 QR-Code Typen</h3>
          <p>
            Von einfachen URLs bis hin zu komplexen SEPA-Überweisungen – wir unterstützen 21 verschiedene QR-Code Typen für jeden Anwendungsfall.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-2 mt-4">Professionelle Anpassungen</h3>
          <p>
            Passen Sie Farben, Formen und fügen Sie Ihr eigenes Logo hinzu. Erstellen Sie QR-Codes, die zu Ihrer Marke passen.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-2 mt-4">Multiple Export-Formate</h3>
          <p>
            Laden Sie Ihre QR-Codes als PNG, SVG, JPEG, WebP oder PDF herunter – perfekt für jeden Einsatzzweck, vom Digital bis zum Druck.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Unser Team</h2>
          <p>
            Hinter FastQRCodeGen.online steht ein kleines, leidenschaftliches Team aus Deutschland. Wir entwickeln und pflegen diesen Dienst in unserer Freizeit, weil wir an das Potenzial von QR-Codes glauben und der Community etwas zurückgeben möchten.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">DSGVO-konform</h2>
          <p>
            Als deutsches Unternehmen nehmen wir Datenschutz ernst. Unsere Website ist vollständig DSGVO-konform. Alle Datenverarbeitung erfolgt entweder client-seitig oder gemäß den strengen europäischen Datenschutzrichtlinien.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Kontakt</h2>
          <p>
            Haben Sie Fragen, Anregungen oder Feedback? Wir freuen uns von Ihnen zu hören:
          </p>
          <div className="bg-muted/50 p-6 rounded-lg mt-4">
            <p>E-Mail: info@fastqrcodegen.online</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Unterstützen Sie uns</h2>
          <p>
            FastQRCodeGen.online ist und bleibt kostenlos. Wenn Sie unser Projekt unterstützen möchten, können Sie:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Uns weiterempfehlen</li>
            <li>Uns auf Social Media folgen</li>
            <li>Feedback und Verbesserungsvorschläge senden</li>
          </ul>
          <p className="mt-4">
            Vielen Dank, dass Sie FastQRCodeGen.online nutzen!
          </p>
        </section>
      </div>
    </div>
  )
}
