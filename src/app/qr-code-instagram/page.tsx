import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "Instagram QR-Code erstellen – Kostenlos 2026",
  description: "Instagram QR-Code kostenlos erstellen. Profil per Scan verlinken.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-instagram" },
}

export default function InstagramQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="instagram" />
    </div>
  )
}
