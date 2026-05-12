import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TrendCard } from '@/components/TrendCard'
import { countries, CATEGORIES, CATEGORY_COLORS, type TrendCategory } from '@/data/trends'

export const Route = createFileRoute('/pays/$code')({
  loader: ({ params }) => {
    const c = countries.find(c => c.code === params.code.toUpperCase())
    if (!c) throw notFound()
    return c
  },
  head: ({ loaderData: c }) => ({
    meta: [
      { title: `Tendances ${c?.name} — Recherches populaires | SearchGTrends` },
      { name: 'description', content: `Les ${c?.trends.length} mots les plus recherchés en ${c?.name} en ce moment. Tendances Google, historique 7 jours et catégories.` },
    ],
  }),
  component: CountryPage,
})

function CountryPage() {
  const c = Route.useLoaderData()
  const [cat, setCat] = useState<TrendCategory | 'Tous'>('Tous')
  const filtered = cat === 'Tous' ? c.trends : c.trends.filter(t => t.category === cat)

  const topRise = [...c.trends].sort((a, b) => b.change - a.change)[0]
  const topVolume = [...c.trends].sort((a, b) => b.volume - a.volume)[0]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fc' }}>
      <Header />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px', width: '100%', flex: 1 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, fontSize: 13, color: '#9ca3af', marginBottom: 24 }}>
          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Accueil</Link>
          <span>/</span>
          <Link to="/pays" style={{ color: '#6b7280', textDecoration: 'none' }}>Pays</Link>
          <span>/</span>
          <span>{c.name}</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <span style={{ fontSize: 52 }}>{c.flag}</span>
          <div>
            <h1 className="font-display" style={{ fontSize: 36, fontWeight: 700 }}>Tendances en {c.name}</h1>
            <p style={{ color: '#6b7280', fontSize: 14 }}>{c.trends.length} tendances · Mis à jour il y a quelques minutes</p>
          </div>
        </div>

        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🔥', label: 'Plus forte hausse', val: topRise.keyword, sub: `+${topRise.change}%`, color: '#ef4444' },
            { icon: '📈', label: 'Plus populaire', val: topVolume.keyword, sub: `Volume ${topVolume.volume}`, color: '#4f46e5' },
            { icon: '📊', label: 'Tendances actives', val: `${c.trends.length}`, sub: '10 mots-clés', color: '#10b981' },
          ].map(({ icon, label, val, sub, color }) => (
            <div key={label} className="card" style={{ padding: 16 }}>
              <p style={{ fontSize: 22, marginBottom: 6 }}>{icon}</p>
              <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color }}>{val}</p>
              <p style={{ fontSize: 12, color: '#6b7280' }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {(['Tous', ...CATEGORIES] as (TrendCategory | 'Tous')[]).map(c2 => {
            const color = c2 === 'Tous' ? '#4f46e5' : CATEGORY_COLORS[c2 as TrendCategory]
            const active = cat === c2
            return (
              <button key={c2} onClick={() => setCat(c2)}
                style={{
                  padding: '5px 14px', borderRadius: 999, border: '1px solid', cursor: 'pointer',
                  fontSize: 12, fontWeight: 500, transition: 'all 0.15s',
                  borderColor: active ? color : '#e4e7ef',
                  background: active ? color + '15' : 'white',
                  color: active ? color : '#6b7280',
                }}
              >
                {c2}
              </button>
            )
          })}
        </div>

        {/* Trends with charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((t, i) => (
            <TrendCard key={t.keyword} trend={t} rank={i + 1} showChart={true} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
