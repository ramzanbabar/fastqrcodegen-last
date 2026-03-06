export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || ""

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function initGA4(): void {
  if (typeof window === "undefined" || !GA4_MEASUREMENT_ID) return
  
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
  script.async = true
  document.head.appendChild(script)
  
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA4_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    language: "de",
  })
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export function trackQRCodeGenerated(qrType: string): void {
  trackEvent("qr_generated", "QR Code", qrType)
}

export function trackQRCodeDownload(format: string): void {
  trackEvent("qr_downloaded", "Download", format)
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  
  window.gtag("config", GA4_MEASUREMENT_ID, {
    page_path: path,
  })
}

export function trackError(error: string, fatal = false): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  
  window.gtag("event", "exception", {
    description: error,
    fatal,
  })
}

export function trackTiming(name: string, value: number): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  
  window.gtag("event", "timing_complete", {
    name,
    value,
    event_category: "Performance",
  })
}

export function trackOutboundLink(url: string): void {
  trackEvent("click", "outbound", url)
}

export function trackShare(method: string, contentType: string): void {
  trackEvent("share", contentType, method)
}
