"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Loader2, FileText, QrCode } from "lucide-react"
import { generateQRDataURL, type QRConfig } from "@/lib/qrGenerator"

interface BulkEntry {
  id: string
  type: string
  data: string
  label: string
}

export default function BulkGeneratorPage() {
  const [entries, setEntries] = useState<BulkEntry[]>([
    { id: "1", type: "url", data: "", label: "QR-1" }
  ])
  const [config] = useState<QRConfig>({
    data: "",
    width: 300,
    height: 300,
    dotsColor: "#000000",
    backgroundColor: "#ffffff",
    dotsStyle: "square",
    cornerSquareStyle: "square",
    cornerSquareColor: "#000000",
    cornerDotStyle: "square",
    cornerDotColor: "#000000",
    errorCorrectionLevel: "M",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const addEntry = () => {
    const newId = String(entries.length + 1)
    setEntries([...entries, { id: newId, type: "url", data: "", label: `QR-${newId}` }])
  }

  const updateEntry = (id: string, field: "data" | "label", value: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter(e => e.id !== id))
    }
  }

  const handleBulkDownload = async () => {
    setIsGenerating(true)
    setProgress(0)
    
    try {
      const JSZip = (await import("jszip")).default
      const zip = new JSZip()
      
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        if (!entry.data.trim()) continue
        
        const qrConfig: QRConfig = { ...config, data: entry.data }
        const dataURL = await generateQRDataURL(qrConfig)
        
        const base64 = dataURL.split(",")[1]
        if (base64) {
          const filename = `${entry.label || `qr-${i + 1}`}.png`
          zip.file(filename, base64, { base64: true })
        }
        
        setProgress(Math.round(((i + 1) / entries.length) * 100))
      }
      
      const content = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(content)
      const a = document.createElement("a")
      a.href = url
      a.download = `qr-codes-bulk-${Date.now()}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Bulk generation failed:", error)
    } finally {
      setIsGenerating(false)
      setProgress(0)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">
          Bulk-Generator 2026
        </Badge>
        <h1 className="text-3xl font-bold mb-4">
          Mehrere QR-Codes auf einmal erstellen
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Erstellen Sie mehrere QR-Codes gleichzeitig und laden Sie sie als ZIP-Datei herunter.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={entry.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <Label className="text-sm text-muted-foreground">Bezeichnung</Label>
                  <Input
                    value={entry.label}
                    onChange={(e) => updateEntry(entry.id, "label", e.target.value)}
                    placeholder="z.B. Visitenkarte-Max"
                    className="mt-1"
                  />
                </div>
                <div className="flex-[2]">
                  <Label className="text-sm text-muted-foreground">
                    Inhalt (URL, Text, etc.)
                  </Label>
                  <Textarea
                    value={entry.data}
                    onChange={(e) => updateEntry(entry.id, "data", e.target.value)}
                    placeholder="https://beispiel.de oder beliebiger Text"
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeEntry(entry.id)}
                    disabled={entries.length === 1}
                    className="text-red-500 hover:text-red-700"
                  >
                    Entfernen
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button variant="outline" onClick={addEntry}>
              + Weiterer QR-Code
            </Button>
            <Button 
              onClick={handleBulkDownload}
              disabled={isGenerating || entries.every(e => !e.data.trim())}
              className="flex-1 sm:flex-none"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {progress}% wird erstellt...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Alle als ZIP herunterladen
                </>
              )}
            </Button>
          </div>
          
          {isGenerating && (
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">So funktioniert&apos;s</h2>
          <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li>Fügen Sie beliebig viele QR-Codes hinzu</li>
            <li>Geben Sie für jeden QR-Code den Inhalt und eine Bezeichnung ein</li>
            <li>Klicken Sie auf &quot;Alle als ZIP herunterladen&quot;</li>
            <li>Entpacken Sie die ZIP-Datei und verwenden Sie die QR-Codes</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Hinweise</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            <li>Maximal 50 QR-Codes pro Download</li>
            <li>Alle QR-Codes werden als PNG mit 300x300 Pixel erstellt</li>
            <li>Die Bezeichnung wird als Dateiname verwendet</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
