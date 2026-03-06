import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "E-Mail QR-Code erstellen – Kostenlos 2026",
  description: "E-Mail QR-Code kostenlos erstellen. Scannen & direkt E-Mail senden.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-email" },
}

export default function EmailQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="email" />
    </div>
  )
}
