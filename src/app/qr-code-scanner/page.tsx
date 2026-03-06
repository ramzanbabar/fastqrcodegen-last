"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, StopCircle, Copy, ExternalLink, Check, AlertCircle } from "lucide-react"

export default function QRScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number>(0)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [copied, setCopied] = useState(false)

  const stopCamera = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setScanning(false)
  }, [])

  const tick = useCallback(async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.readyState !== 4) {
      rafRef.current = requestAnimationFrame(tick)
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    try {
      const jsQR = (await import("jsqr")).default
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        setResult(code.data)
        stopCamera()
        return
      }
    } catch {
      // jsQR import failed — ignore and retry
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [stopCamera])

  const startCamera = useCallback(async () => {
    if (typeof window === "undefined") return
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Kamera wird von deinem Browser nicht unterstützt.")
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setScanning(true)
      setError(null)
      tick()
    } catch {
      setError(
        "Kamera-Zugriff verweigert. Bitte erlaube den Kamera-Zugriff in deinen Browser-Einstellungen."
      )
    }
  }, [tick])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openUrl = () => {
    if (result && (result.startsWith("http://") || result.startsWith("https://"))) {
      window.open(result, "_blank")
    }
  }

  const isUrl = result && (result.startsWith("http://") || result.startsWith("https://"))

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">
          Scanner 2026
        </Badge>
        <h1 className="text-3xl font-bold mb-4">
          QR Code Scanner – Kostenlos 2026
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Scannen Sie QR-Codes mit Ihrer Kamera. Alle Daten bleiben auf Ihrem Gerät.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          {!scanning && !result && (
            <div className="text-center">
              <div className="mb-6 p-8 border-2 border-dashed border-border rounded-xl">
                <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Klicken Sie auf den Button, um die Kamera zu starten
                </p>
                <Button onClick={startCamera} size="lg">
                  <Camera className="mr-2 h-5 w-5" />
                  Kamera starten
                </Button>
              </div>
            </div>
          )}

          {scanning && (
            <div className="relative">
              <video 
                ref={videoRef} 
                className="w-full rounded-xl bg-black" 
                playsInline 
                muted 
                autoPlay
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 border-4 border-primary rounded-xl opacity-50" />
              </div>
              <Button 
                onClick={stopCamera} 
                variant="destructive" 
                className="mt-4 w-full"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Scanner stoppen
              </Button>
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold text-green-800 dark:text-green-200">
                    QR-Code erkannt:
                  </span>
                </div>
                <p className="break-all text-sm mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  {result}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Kopieren
                      </>
                    )}
                  </Button>
                  {isUrl && (
                    <Button onClick={openUrl} size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Öffnen
                    </Button>
                  )}
                  <Button 
                    onClick={() => {
                      setResult(null)
                      setError(null)
                    }} 
                    variant="outline" 
                    size="sm"
                  >
                    Neuer Scan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6 text-gray-600 dark:text-gray-400 text-sm">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">So funktioniert&apos;s</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Klicken Sie auf &quot;Kamera starten&quot;</li>
            <li>Erlauben Sie den Kamera-Zugriff</li>
            <li>Halten Sie den QR-Code vor die Kamera</li>
            <li>Das Ergebnis wird automatisch angezeigt</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">Datenschutz</h2>
          <p>
            Alle Scans erfolgen lokal in Ihrem Browser. Es werden keine Daten an Server übertragen oder gespeichert.
          </p>
        </section>
      </div>
    </div>
  )
}
