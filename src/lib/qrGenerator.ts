export type DotStyle = "square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded"
export type CornerSquareStyle = "dot" | "square" | "extra-rounded"
export type CornerDotStyle = "dot" | "square"
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"

export interface QRConfig {
  data: string
  width: number
  height: number
  dotsColor: string
  backgroundColor: string
  dotsStyle: DotStyle
  cornerSquareStyle: CornerSquareStyle
  cornerSquareColor: string
  cornerDotStyle: CornerDotStyle
  cornerDotColor: string
  errorCorrectionLevel: ErrorCorrectionLevel
  logo?: string
  logoSize?: number
  logoMargin?: number
}

export const defaultQRConfig: QRConfig = {
  data: "https://fastqrcodegen.online",
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
}

interface QRCodeStylingOptions {
  width?: number
  height?: number
  type?: "canvas" | "svg"
  data?: string
  margin?: number
  dotsOptions?: {
    color?: string
    type?: DotStyle
  }
  backgroundOptions?: {
    color?: string
  }
  cornersSquareOptions?: {
    type?: CornerSquareStyle
    color?: string
  }
  cornersDotOptions?: {
    type?: CornerDotStyle
    color?: string
  }
  image?: string
  imageOptions?: {
    crossOrigin?: string
    margin?: number
    imageSize?: number
    hideBackgroundDots?: boolean
  }
  qrOptions?: {
    typeNumber?: number
    mode?: string
    errorCorrectionLevel?: ErrorCorrectionLevel
  }
}

interface QRCodeStylingInstance {
  getRawData: (format: "png" | "svg" | "jpeg" | "webp") => Promise<Blob | null>
  update: (options: Partial<QRCodeStylingOptions>) => void
  append: (element: HTMLElement) => void
  download: (options?: { name?: string; extension?: "png" | "svg" | "jpeg" | "webp" }) => Promise<void>
}

export async function generateQRCode(config: QRConfig): Promise<QRCodeStylingInstance> {
  const QRCodeStylingModule = await import("qr-code-styling")
  const QRCodeStyling = QRCodeStylingModule.default

  const options: QRCodeStylingOptions = {
    width: config.width,
    height: config.height,
    type: "canvas",
    data: config.data,
    margin: 10,
    dotsOptions: {
      color: config.dotsColor,
      type: config.dotsStyle,
    },
    backgroundOptions: {
      color: config.backgroundColor,
    },
    cornersSquareOptions: {
      type: config.cornerSquareStyle,
      color: config.cornerSquareColor,
    },
    cornersDotOptions: {
      type: config.cornerDotStyle,
      color: config.cornerDotColor,
    },
    qrOptions: {
      errorCorrectionLevel: config.errorCorrectionLevel,
    },
  }

  if (config.logo) {
    options.image = config.logo
    options.imageOptions = {
      crossOrigin: "anonymous",
      margin: config.logoMargin ?? 5,
      imageSize: config.logoSize ?? 0.3,
      hideBackgroundDots: true,
    }
  }

  return new QRCodeStyling(options) as QRCodeStylingInstance
}

export async function generateQRDataURL(config: QRConfig): Promise<string> {
  const qrCode = await generateQRCode(config)
  const blob = await qrCode.getRawData("png")
  
  if (!blob) {
    throw new Error("QR-Code Generierung fehlgeschlagen")
  }
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export async function generateQRSVG(config: QRConfig): Promise<string> {
  const qrCode = await generateQRCode({ ...config, width: 800, height: 800 })
  const blob = await qrCode.getRawData("svg")
  
  if (!blob) {
    throw new Error("QR-Code SVG Generierung fehlgeschlagen")
  }
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsText(blob)
  })
}

export async function generateQRPDF(config: QRConfig, title?: string): Promise<Blob> {
  const jspdfModule = await import("jspdf")
  const { jsPDF } = jspdfModule
  
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const qrDataUrl = await generateQRDataURL({ ...config, width: 800, height: 800 })
  
  const pageWidth = pdf.internal.pageSize.getWidth()
  const qrSize = 80
  const x = (pageWidth - qrSize) / 2
  const y = 40

  pdf.addImage(qrDataUrl, "PNG", x, y, qrSize, qrSize)

  if (title) {
    pdf.setFontSize(16)
    pdf.text(title, pageWidth / 2, y + qrSize + 20, { align: "center" })
  }

  pdf.setFontSize(10)
  pdf.setTextColor(128)
  pdf.text("Erstellt mit FastQRCodeGen.online", pageWidth / 2, 280, { align: "center" })

  return pdf.output("blob")
}

export async function downloadQRCode(
  config: QRConfig,
  format: "png" | "svg" | "jpeg" | "webp" | "pdf",
  filename = "qrcode"
): Promise<void> {
  if (format === "pdf") {
    const blob = await generateQRPDF(config)
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return
  }

  const qrCode = await generateQRCode(config)
  await qrCode.download({ name: filename, extension: format })
}

export async function appendQRCode(
  config: QRConfig,
  container: HTMLElement
): Promise<void> {
  const qrCode = await generateQRCode(config)
  container.innerHTML = ""
  qrCode.append(container)
}

export function estimateQRScanners(data: string): number {
  const length = data.length
  if (length <= 20) return 21
  if (length <= 40) return 25
  if (length <= 60) return 29
  if (length <= 80) return 33
  if (length <= 100) return 37
  if (length <= 120) return 41
  return 45
}

export function getRecommendedErrorCorrection(hasLogo: boolean): ErrorCorrectionLevel {
  return hasLogo ? "H" : "M"
}

export function calculateQRVersion(data: string, errorLevel: ErrorCorrectionLevel): number {
  const length = data.length
  const errorLevelMultipliers: Record<ErrorCorrectionLevel, number> = {
    L: 1,
    M: 0.9,
    Q: 0.8,
    H: 0.7,
  }
  
  const effectiveLength = Math.ceil(length / errorLevelMultipliers[errorLevel])
  
  if (effectiveLength <= 17) return 1
  if (effectiveLength <= 32) return 2
  if (effectiveLength <= 53) return 3
  if (effectiveLength <= 78) return 4
  if (effectiveLength <= 106) return 5
  if (effectiveLength <= 134) return 6
  if (effectiveLength <= 154) return 7
  return Math.min(Math.ceil((effectiveLength - 154) / 20) + 8, 40)
}
