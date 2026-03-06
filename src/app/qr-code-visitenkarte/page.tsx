import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "vCard QR-Code erstellen – Visitenkarte digital 2026",
  description: "Digitale Visitenkarte als QR-Code erstellen. Kontaktdaten per Scan speichern. vCard-Format.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-visitenkarte" },
}

export default function VCardQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="vcard" />
    </div>
  )
}
