import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "Text QR-Code erstellen – Kostenlos 2026",
  description: "Text QR-Code kostenlos erstellen. Jeder beliebige Text als QR-Code.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-text" },
}

export default function TextQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="text" />
    </div>
  )
}
