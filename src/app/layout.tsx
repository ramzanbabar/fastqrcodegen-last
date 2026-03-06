import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers/Providers"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import GdprBanner from "@/components/layout/GdprBanner"
import AnnouncementBar from "@/components/layout/AnnouncementBar"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "QR Code Generator 2026 – Kostenlos & Sofort | FastQRCodeGen.online",
    template: "%s | FastQRCodeGen.online"
  },
  description: "QR-Code kostenlos erstellen 2026: 21 Typen (URL, WhatsApp, WiFi, vCard & mehr). Sofort-Download als PNG, SVG & PDF. Kein Account nötig.",
  metadataBase: new URL("https://fastqrcodegen.online"),
  openGraph: {
    locale: "de_DE",
    type: "website",
    siteName: "FastQRCodeGen.online",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <Providers>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <GdprBanner />
        </Providers>
      </body>
    </html>
  )
}
