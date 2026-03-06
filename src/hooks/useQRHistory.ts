"use client"

import { useState, useEffect, useCallback } from "react"
import type { QRType } from "@/lib/qrTypes"
import type { QRConfig } from "@/lib/qrGenerator"

export interface HistoryItem {
  id: string
  typeId: string
  typeName: string
  formData: Record<string, string>
  config: QRConfig
  preview: string
  createdAt: string
}

const STORAGE_KEY = "fastqrcodegen_history"
const MAX_ITEMS = 20

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function useQRHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Load history from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as HistoryItem[]
        setHistory(parsed)
      }
    } catch {
      // Ignore parse errors
    }
    
    setIsLoaded(true)
  }, [])
  
  // Save history to localStorage
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch {
      // Ignore storage errors
    }
  }, [history, isLoaded])
  
  const addToHistory = useCallback((
    qrType: QRType,
    formData: Record<string, string>,
    config: QRConfig,
    preview: string
  ) => {
    if (!preview) return
    
    const newItem: HistoryItem = {
      id: generateId(),
      typeId: qrType.id,
      typeName: qrType.name,
      formData,
      config,
      preview,
      createdAt: new Date().toISOString(),
    }
    
    setHistory((prev) => {
      // Remove duplicates by preview URL
      const filtered = prev.filter((item) => item.preview !== preview)
      // Add new item at beginning and limit to MAX_ITEMS
      return [newItem, ...filtered].slice(0, MAX_ITEMS)
    })
  }, [])
  
  const removeFromHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }, [])
  
  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])
  
  const getRecentItems = useCallback((count = 5) => {
    return history.slice(0, count)
  }, [history])
  
  return {
    history,
    isLoaded,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentItems,
  }
}
