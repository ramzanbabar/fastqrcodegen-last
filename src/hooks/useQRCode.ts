"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { defaultQRConfig, type QRConfig, type ErrorCorrectionLevel } from "@/lib/qrGenerator"
import { getQRTypeById, type QRType } from "@/lib/qrTypes"

export interface QRState {
  selectedType: QRType | null
  formData: Record<string, string>
  config: QRConfig
  logo: string | null
  isGenerating: boolean
  error: string | null
}

const STORAGE_KEY = "fastqrcodegen_state"

function getInitialState(): QRState {
  if (typeof window === "undefined") {
    return {
      selectedType: getQRTypeById("url") || null,
      formData: {},
      config: defaultQRConfig,
      logo: null,
      isGenerating: false,
      error: null,
    }
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<QRState>
      const typeId = parsed.selectedType?.id || "url"
      return {
        selectedType: getQRTypeById(typeId) || null,
        formData: parsed.formData || {},
        config: { ...defaultQRConfig, ...parsed.config },
        logo: parsed.logo || null,
        isGenerating: false,
        error: null,
      }
    }
  } catch {
    // Ignore parse errors
  }
  
  return {
    selectedType: getQRTypeById("url") || null,
    formData: {},
    config: defaultQRConfig,
    logo: null,
    isGenerating: false,
    error: null,
  }
}

export function useQRCode() {
  const [state, setState] = useState<QRState>(getInitialState)
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const typeParam = params.get("type")
    const dataParam = params.get("data")
    
    if (typeParam && dataParam) {
      const qrType = getQRTypeById(typeParam)
      if (qrType) {
        try {
          const data = JSON.parse(decodeURIComponent(dataParam))
          setState((prev) => ({
            ...prev,
            selectedType: qrType,
            formData: data,
          }))
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [])
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedType: state.selectedType ? { id: state.selectedType.id } : null,
          formData: state.formData,
          config: state.config,
          logo: state.logo,
        })
      )
    }
  }, [state.selectedType, state.formData, state.config, state.logo])
  
  const qrData = useMemo(() => {
    if (!state.selectedType) return ""
    try {
      return state.selectedType.encode(state.formData)
    } catch {
      return ""
    }
  }, [state.selectedType, state.formData])
  
  const selectType = useCallback((typeId: string) => {
    const qrType = getQRTypeById(typeId)
    setState((prev) => ({
      ...prev,
      selectedType: qrType || null,
      formData: {},
      error: null,
    }))
  }, [])
  
  const updateFormData = useCallback((field: string, value: string) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
      error: null,
    }))
  }, [])
  
  const updateConfig = useCallback((updates: Partial<QRConfig>) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, ...updates },
    }))
  }, [])
  
  const setLogo = useCallback((logo: string | null) => {
    setState((prev) => ({
      ...prev,
      logo,
      config: {
        ...prev.config,
        errorCorrectionLevel: logo ? "H" : prev.config.errorCorrectionLevel,
      },
    }))
  }, [])
  
  const setErrorCorrection = useCallback((level: ErrorCorrectionLevel) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, errorCorrectionLevel: level },
    }))
  }, [])
  
  const reset = useCallback(() => {
    setState({
      selectedType: getQRTypeById("url") || null,
      formData: {},
      config: defaultQRConfig,
      logo: null,
      isGenerating: false,
      error: null,
    })
  }, [])
  
  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }))
  }, [])
  
  const setIsGenerating = useCallback((isGenerating: boolean) => {
    setState((prev) => ({ ...prev, isGenerating }))
  }, [])
  
  const getShareableURL = useCallback(() => {
    if (!state.selectedType || !qrData) return null
    
    const params = new URLSearchParams()
    params.set("type", state.selectedType.id)
    params.set("data", encodeURIComponent(JSON.stringify(state.formData)))
    
    return `${window.location.origin}?${params.toString()}`
  }, [state.selectedType, state.formData, qrData])
  
  return {
    ...state,
    qrData,
    selectType,
    updateFormData,
    updateConfig,
    setLogo,
    setErrorCorrection,
    reset,
    setError,
    setIsGenerating,
    getShareableURL,
  }
}
