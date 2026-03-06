"use client"

import { useState, useEffect, useCallback } from "react"
import type { QRType } from "@/lib/qrTypes"
import type { QRConfig } from "@/lib/qrGenerator"

export interface FavoriteItem {
  id: string
  name: string
  typeId: string
  typeName: string
  formData: Record<string, string>
  config: QRConfig
  preview: string
  createdAt: string
}

const STORAGE_KEY = "fastqrcodegen_favorites"

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function useQRFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    if (typeof window === "undefined") return
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteItem[]
        setFavorites(parsed)
      }
    } catch {
      // Ignore parse errors
    }
    
    setIsLoaded(true)
  }, [])
  
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Ignore storage errors
    }
  }, [favorites, isLoaded])
  
  const addToFavorites = useCallback((
    name: string,
    qrType: QRType,
    formData: Record<string, string>,
    config: QRConfig,
    preview: string
  ) => {
    const newItem: FavoriteItem = {
      id: generateId(),
      name,
      typeId: qrType.id,
      typeName: qrType.name,
      formData,
      config,
      preview,
      createdAt: new Date().toISOString(),
    }
    
    setFavorites((prev) => [newItem, ...prev])
    return newItem
  }, [])
  
  const removeFromFavorites = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }, [])
  
  const renameFavorite = useCallback((id: string, newName: string) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    )
  }, [])
  
  const isFavorite = useCallback((preview: string) => {
    return favorites.some((item) => item.preview === preview)
  }, [favorites])
  
  const getFavoriteById = useCallback((id: string) => {
    return favorites.find((item) => item.id === id)
  }, [favorites])
  
  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])
  
  return {
    favorites,
    isLoaded,
    addToFavorites,
    removeFromFavorites,
    renameFavorite,
    isFavorite,
    getFavoriteById,
    clearFavorites,
  }
}
