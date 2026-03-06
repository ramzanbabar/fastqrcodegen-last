import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Was ist ein QR-Code? – Alles was Sie wissen müssen",
  description: "Umfassende Einführung in QR-Codes: Funktionsweise, Geschichte und Anwendungsmöglichkeiten. Erfahren Sie alles über QR-Codes.",
}

export default function WasIstQRCodePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <header className="mb-8 not-prose">
          <span className="text-sm text-muted-foreground">15. Januar 2026 • 5 Min. Lesezeit</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">
            Was ist ein QR-Code? – Alles was Sie wissen müssen
          </h1>
        </header>

        <h2>Definition und Grundlagen</h2>
        <p>
          Ein QR-Code (Quick Response Code) ist ein zweidimensionaler Strichcode, der 1994 vom japanischen Unternehmen Denso Wave entwickelt wurde. Im Gegensatz zu herkömmlichen Barcodes, die nur horizontal Information speichern, können QR-Codes sowohl horizontal als auch vertikal Daten kodieren. Dadurch können sie deutlich mehr Informationen auf kleinem Raum speichern.
        </p>

        <h2>Wie funktioniert ein QR-Code?</h2>
        <p>
          Ein QR-Code besteht aus einem Muster aus schwarzen und weißen Quadraten, die in einer Matrix angeordnet sind. Die drei größeren Quadrate in den Ecken dienen als Positionsmarkierungen und helfen dem Scanner, den Code korrekt auszurichten. Die kleineren Muster in der Mitte enthalten die eigentlichen kodierten Daten.
        </p>

        <p>
          Beim Scannen wird das Muster von der Kamera erfasst und von einer Software decodiert. Moderne Smartphones können QR-Codes direkt mit der Standard-Kamera-App scannen, ohne dass eine zusätzliche App erforderlich ist.
        </p>

        <h2>Was kann in einem QR-Code gespeichert werden?</h2>
        <ul>
          <li>URLs und Webseiten-Links</li>
          <li>Text und Nachrichten</li>
          <li>Kontaktdaten (vCard)</li>
          <li>WLAN-Zugangsdaten</li>
          <li>E-Mail-Adressen und Telefonnummern</li>
          <li>Geografische Koordinaten</li>
          <li>Bankverbindungen (SEPA)</li>
          <li>Kalender-Events</li>
        </ul>

        <h2>Fehlerkorrektur</h2>
        <p>
          Ein besonderes Merkmal von QR-Codes ist die eingebaute Fehlerkorrektur. Es gibt vier Stufen (L, M, Q, H), die bestimmen, wie viel Prozent des Codes beschädigt sein können und trotzdem noch lesbar sind. Bei der höchsten Stufe (H) können bis zu 30% des Codes beschädigt oder verdeckt sein – ideal für QR-Codes mit Logo.
        </p>

        <h2>Anwendungsbereiche</h2>
        <p>
          QR-Codes finden heute in zahllosen Bereichen Anwendung: von Marketing und Werbung über Produktverpackungen bis hin zu digitalen Speisekarten in Restaurants. Die Pandemie hat die Verbreitung von QR-Codes zusätzlich beschleunigt, da sie berührungslose Interaktionen ermöglichen.
        </p>

        <h2>Vorteile von QR-Codes</h2>
        <ul>
          <li>Schneller Zugriff auf Informationen</li>
          <li>Keine manuelle Eingabe erforderlich</li>
          <li>Kostenlos zu erstellen und zu scannen</li>
          <li>Hohe Speicherkapazität</li>
          <li>Fehlertolerant</li>
          <li>Funktioniert auf fast allen Smartphones</li>
        </ul>

        <h2>Fazit</h2>
        <p>
          QR-Codes sind ein einfaches, aber mächtiges Werkzeug, um physische und digitale Welten zu verbinden. Mit einem kostenlosen QR-Code Generator wie FastQRCodeGen.online können Sie in Sekunden professionelle QR-Codes für jeden Zweck erstellen.
        </p>
      </article>
    </div>
  )
}
