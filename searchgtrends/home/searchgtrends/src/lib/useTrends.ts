/**
 * useTrends.ts
 * 
 * Charge les données depuis /data/trends.json (généré chaque jour par GitHub Actions)
 * Fallback sur les données statiques si le fichier n'existe pas encore
 */

import { useState, useEffect } from 'react'
import { countries as staticCountries } from '@/data/trends'
import type { CountryData } from '@/data/trends'

type TrendsState = {
  countries: CountryData[]
  generatedAt: string | null
  loading: boolean
  error: string | null
  isLive: boolean  // true = données API, false = données statiques
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
        // Ajout d'un cache-buster pour forcer le rechargement quotidien
        const today = new Date().toISOString().split('T')[0]
        const res = await fetch(`/data/trends.json?v=${today}`, {
          signal: controller.signal,
          cache: 'no-cache',
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const json = await res.json()

        // Validation basique
        if (!json.countries || !Array.isArray(json.countries)) {
          throw new Error('Format invalide')
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

        console.warn('trends.json non disponible, utilisation des données statiques:', err)
        setState(prev => ({
          ...prev,
          loading: false,
          error: null, // Pas d'erreur visible — fallback silencieux
          isLive: false,
        }))
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return state
}
