import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nutzungsbedingungen",
  description: "Nutzungsbedingungen von FastQRCodeGen.online. Die rechtlichen Bedingungen für die Nutzung unseres QR-Code Generators.",
}

export default function NutzungsbedingungenPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Nutzungsbedingungen</h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-400">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">1. Geltungsbereich</h2>
          <p>
            Diese Nutzungsbedingungen regeln die Nutzung des kostenlosen QR-Code Generators FastQRCodeGen.online. Mit der Nutzung dieser Website erklären Sie sich mit diesen Bedingungen einverstanden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">2. Dienstleistungsbeschreibung</h2>
          <p>
            FastQRCodeGen.online ist ein kostenloser Online-Dienst zur Erstellung von QR-Codes. Die Dienstleistung umfasst:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Generierung von QR-Codes in verschiedenen Formaten</li>
            <li>Anpassung von Design und Farben</li>
            <li>Download als PNG, SVG, JPEG, WebP und PDF</li>
            <li>21 verschiedene QR-Code Typen</li>
            <li>Bulk-Generierung und QR-Code Scanner</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">3. Kostenlose Nutzung</h2>
          <p>
            Die Nutzung von FastQRCodeGen.online ist kostenlos. Es fallen keine Gebühren für die Erstellung, Anpassung oder den Download von QR-Codes an. Eine Registrierung ist nicht erforderlich.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">4. Haftungsbeschränkung</h2>
          <p>
            Die Nutzung des Dienstes erfolgt auf eigene Verantwortung. Der Betreiber übernimmt keine Haftung für:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Die Verfügbarkeit des Dienstes</li>
            <li>Die Richtigkeit und Vollständigkeit generierter QR-Codes</li>
            <li>Schäden, die durch die Nutzung der generierten QR-Codes entstehen</li>
            <li>Inhalte, auf die generierte QR-Codes verweisen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">5. Erlaubte Nutzung</h2>
          <p>
            Sie dürfen die generierten QR-Codes für private und kommerzielle Zwecke nutzen. Dies umfasst:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Print-Materialien (Visitenkarten, Flyer, Plakate)</li>
            <li>Digitale Medien (Websites, E-Mails, soziale Medien)</li>
            <li>Produktverpackungen und Etiketten</li>
            <li>Werbe- und Marketingmaterialien</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">6. Verbotene Nutzung</h2>
          <p>
            Es ist untersagt, den Dienst für folgende Zwecke zu nutzen:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Illegale, schädigende oder betrügerische Inhalte</li>
            <li>Verbreitung von Malware oder Viren</li>
            <li>Phishing oder Identitätsdiebstahl</li>
            <li>Verletzung von Urheberrechten Dritter</li>
            <li>Automatisierte Massenabfragen (Scraping)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">7. Geistiges Eigentum</h2>
          <p>
            Die generierten QR-Codes stehen Ihnen zur freien Verfügung. Sie benötigen keine Quellenangabe oder Lizenzzahlung. Die Website selbst, inklusive Design, Code und Marken, bleibt Eigentum des Betreibers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">8. Änderung der Bedingungen</h2>
          <p>
            Der Betreiber behält sich vor, diese Nutzungsbedingungen jederzeit zu ändern. Die aktuellen Bedingungen sind stets auf dieser Seite einsehbar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">9. Anwendbares Recht</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Ausschließlicher Gerichtsstand ist Berlin, soweit gesetzlich zulässig.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">10. Kontakt</h2>
          <p>
            Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns:
          </p>
          <div className="bg-muted/50 p-6 rounded-lg mt-4">
            <p>E-Mail: info@fastqrcodegen.online</p>
          </div>
        </section>
      </div>
    </div>
  )
}
