import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "Event QR-Code erstellen – Kalender-Event 2026",
  description: "Event QR-Code kostenlos erstellen. Termin per Scan in den Kalender eintragen.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-event" },
}

export default function EventQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="event" />
    </div>
  )
}
