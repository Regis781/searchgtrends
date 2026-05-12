import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { countries, CATEGORY_COLORS, CATEGORIES, type TrendCategory } from '@/data/trends'
import { useState } from 'react'

export const Route = createFileRoute('/tendances/')({
  head: () => ({
    meta: [
      { title: 'Tendances mondiales de recherche | SearchGTrends' },
      { name: 'description', content: 'Les tendances de recherche Google les plus explosives dans le monde. Classement mondial par hausse, catégorie et pays.' },
    ],
  }),
  component: TendancesPage,
})

function TendancesPage() {
  const [cat, setCat] = useState<TrendCategory | 'Tous'>('Tous')

  const all = countries.flatMap(c => c.trends.map(t => ({ ...t, country: c })))
  const filtered = cat === 'Tous' ? all : all.filter(t => t.category === cat)
  const byRise = [...filtered].sort((a, b) => b.change - a.change).slice(0, 20)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fc' }}>
      <Header />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px', width: '100%', flex: 1 }}>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Tendances mondiales</h1>
        <p style={{ color: '#6b7280', marginBottom: 28 }}>Les recherches qui explosent en ce moment, tous pays confondus</p>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
          {(['Tous', ...CATEGORIES] as (TrendCategory | 'Tous')[]).map(c => {
            const color = c === 'Tous' ? '#4f46e5' : CATEGORY_COLORS[c as TrendCategory]
            const active = cat === c
            return (
              <button key={c} onClick={() => setCat(c)}
                style={{
                  padding: '6px 16px', borderRadius: 999, border: '1px solid', cursor: 'pointer',
                  fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                  borderColor: active ? color : '#e4e7ef',
                  background: active ? color + '15' : 'white',
                  color: active ? color : '#6b7280',
                }}
              >
                {c}
              </button>
            )
          })}
        </div>

        {/* Ranking */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f3f9', background: '#f8f9fc', display: 'flex', gap: 16, fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span style={{ minWidth: 30 }}>#</span>
            <span style={{ flex: 1 }}>Mot-clé</span>
            <span style={{ minWidth: 80 }}>Pays</span>
            <span style={{ minWidth: 80 }}>Catégorie</span>
            <span style={{ minWidth: 60, textAlign: 'right' }}>Hausse</span>
          </div>
          {byRise.map((t, i) => {
            const color = CATEGORY_COLORS[t.category]
            return (
              <Link key={t.keyword + i} to="/pays/$code" params={{ code: t.country.code }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 20px', borderBottom: '1px solid #f8f9fc', textDecoration: 'none', color: 'inherit', transition: 'background 0.1s' }}
              >
                <span style={{ minWidth: 30, fontWeight: 700, color: i < 3 ? '#4f46e5' : '#d1d5db', fontFamily: 'Space Grotesk' }}>{i + 1}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{t.keyword}</span>
                <span style={{ minWidth: 80, fontSize: 13, color: '#6b7280' }}>
                  {t.country.flag} {t.country.name}
                </span>
                <span className="badge" style={{ minWidth: 80, background: color + '15', color, justifyContent: 'center' }}>
                  {t.category}
                </span>
                <span style={{ minWidth: 60, textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#10b981' }}>
                  +{t.change}%
                </span>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
