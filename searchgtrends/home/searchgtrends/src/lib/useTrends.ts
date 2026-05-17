import { useState, useEffect } from 'react'
import { countries as staticCountries } from '@/data/trends'
import type { CountryData } from '@/data/trends'

type TrendsState = {
  countries: CountryData[]
  generatedAt: string | null
  loading: boolean
  error: string | null
  isLive: boolean
}

export function useTrends(): TrendsState {
  const [state, setState] = useState<TrendsState>({
    countries: staticCountries,
    generatedAt: null,
    loading: true,
    error: null,
    isLive: false,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const today = new Date().toISOString().split('T')[0]
        const res = await fetch(`/data/trends.json?v=${today}`, {
          signal: controller.signal,
          cache: 'no-cache',
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const json = await res.json()

        // Si le fichier est invalide ou vide (placeholder), on garde les données statiques
        if (!json.countries || !Array.isArray(json.countries) || json.countries.length === 0) {
          setState(prev => ({ ...prev, loading: false }))
          return
        }

        setState({
          countries: json.countries,
          generatedAt: json.generatedAt || null,
          loading: false,
          error: null,
          isLive: json.countries.some((c: CountryData & { source?: string }) => c.source === 'api'),
        })
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        // Fallback silencieux sur les données statiques
        setState(prev => ({ ...prev, loading: false, isLive: false }))
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return state
}
