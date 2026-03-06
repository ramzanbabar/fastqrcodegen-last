import Link from "next/link"
import { QrCode } from "lucide-react"

const footerLinks = {
  qrTypes: [
    { name: "URL QR-Code", href: "/qr-code-url" },
    { name: "WhatsApp QR-Code", href: "/qr-code-whatsapp" },
    { name: "WiFi QR-Code", href: "/qr-code-wifi" },
    { name: "Visitenkarte QR-Code", href: "/qr-code-visitenkarte" },
    { name: "E-Mail QR-Code", href: "/qr-code-email" },
    { name: "SEPA QR-Code", href: "/qr-code-sepa" },
  ],
  tools: [
    { name: "Bulk-Generator", href: "/bulk-qr-code" },
    { name: "QR-Code Scanner", href: "/qr-code-scanner" },
    { name: "QR mit Logo", href: "/qr-code-mit-logo" },
    { name: "Farbiger QR-Code", href: "/qr-code-farbe-aendern" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Was ist ein QR-Code?", href: "/blog/was-ist-ein-qr-code" },
    { name: "QR-Code Marketing 2026", href: "/blog/qr-code-marketing-2026" },
    { name: "QR für Restaurants", href: "/blog/qr-code-restaurant-2026" },
  ],
  legal: [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "Nutzungsbedingungen", href: "/nutzungsbedingungen" },
    { name: "Kontakt", href: "/kontakt" },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <QrCode className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">FastQRCodeGen</span>
                <span className="text-xs text-muted-foreground">.online</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Der kostenlose QR-Code Generator für 2026. Erstellen Sie professionelle QR-Codes in Sekunden.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground">QR-Code Typen</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.qrTypes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground">Tools</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground">Ressourcen</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground">Rechtliches</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} FastQRCodeGen.online. Alle Rechte vorbehalten.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ in Germany
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
