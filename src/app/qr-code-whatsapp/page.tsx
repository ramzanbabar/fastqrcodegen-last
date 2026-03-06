import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "WhatsApp QR-Code erstellen – Kostenlos 2026",
  description: "WhatsApp QR-Code kostenlos erstellen. Scannen & direkt chatten. Kein Account nötig. Download als PNG, SVG & PDF.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-whatsapp" },
}

export default function WhatsAppQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="whatsapp" />
    </div>
  )
}
