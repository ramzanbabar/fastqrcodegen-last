"use client"

import { useState, useCallback } from "react"

export function useClipboard() {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const copyToClipboard = useCallback(async (text: string) => {
    setCopied(false)
    setError(null)
    
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setError("Zwischenablage nicht verfügbar")
      return false
    }
    
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      
      setTimeout(() => {
        setCopied(false)
      }, 2000)
      
      return true
    } catch {
      setError("Kopieren fehlgeschlagen")
      return false
    }
  }, [])
  
  const copyImageToClipboard = useCallback(async (blob: Blob) => {
    setCopied(false)
    setError(null)
    
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setError("Zwischenablage nicht verfügbar")
      return false
    }
    
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ])
      setCopied(true)
      
      setTimeout(() => {
        setCopied(false)
      }, 2000)
      
      return true
    } catch {
      setError("Bild kopieren fehlgeschlagen")
      return false
    }
  }, [])
  
  const copyDataURLToClipboard = useCallback(async (dataURL: string) => {
    setCopied(false)
    setError(null)
    
    try {
      const response = await fetch(dataURL)
      const blob = await response.blob()
      return copyImageToClipboard(blob)
    } catch {
      setError("Bild kopieren fehlgeschlagen")
      return false
    }
  }, [copyImageToClipboard])
  
  const clearError = useCallback(() => {
    setError(null)
  }, [])
  
  return {
    copied,
    error,
    copyToClipboard,
    copyImageToClipboard,
    copyDataURLToClipboard,
    clearError,
  }
}
