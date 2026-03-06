import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "Farbigen QR-Code erstellen – Kostenlos 2026",
  description: "Farbigen QR-Code kostenlos erstellen. Individuelle Farben und Designs.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-farbe-aendern" },
}

export default function ColorQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator />
    </div>
  )
}
