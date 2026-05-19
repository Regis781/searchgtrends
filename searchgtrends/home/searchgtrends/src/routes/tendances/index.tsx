import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTrends } from '@/lib/useTrends'
import { CATEGORY_COLORS, CATEGORIES, type TrendCategory } from '@/data/trends'

export const Route = createFileRoute('/tendances/')({
  head: () => ({
    meta: [
      { title: 'Classement mondial des tendances Google | SearchGTrends' },
      { name: 'description', content: 'Classement mondial des recherches Google les plus virales. Filtrez par catégorie, pays et hausse. Données mises à jour quotidiennement.' },
    ],
  }),
  component: TendancesPage,
})

function TendancesPage() {
  const { countries } = useTrends()
  const [cat, setCat] = useState<TrendCategory | 'Tous'>('Tous')
  const all = countries.flatMap(c => c.trends.map(t => ({ ...t, country: c })))
  const filtered = cat === 'Tous' ? all : all.filter(t => t.category === cat)
  const ranked = [...filtered].sort((a, b) => b.change - a.change).slice(0, 30)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '100px 24px 60px', width: '100%', flex: 1 }}>
        <h1 className="font-display" style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Classement mondial</h1>
        <p style={{ color: 'rgba(240,242,248,0.4)', marginBottom: 36 }}>Top 30 des tendances les plus explosives — tous pays confondus</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {(['Tous', ...CATEGORIES] as (TrendCategory | 'Tous')[]).map(c => {
            const color = c === 'Tous' ? '#6366f1' : CATEGORY_COLORS[c as TrendCategory]
            const active = cat === c
            return (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: '6px 16px', borderRadius: 999, border: '1px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: 'none', transition: 'all 0.15s',
                  borderColor: active ? color : 'rgba(255,255,255,0.08)', color: active ? color : 'rgba(240,242,248,0.4)',
                  boxShadow: active ? `0 0 12px ${color}30` : 'none' }}>
                {c}
              </button>
            )
          })}
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 16, fontSize: 11, color: 'rgba(240,242,248,0.25)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <span style={{ minWidth: 30 }}>#</span>
            <span style={{ flex: 1 }}>Mot-clé</span>
            <span style={{ minWidth: 120 }}>Pays</span>
            <span style={{ minWidth: 110 }}>Catégorie</span>
            <span style={{ minWidth: 70, textAlign: 'right' }}>Hausse</span>
          </div>
          {ranked.map((t, i) => {
            const color = CATEGORY_COLORS[t.category as TrendCategory] ?? '#6366f1'
            return (
              <Link key={t.keyword + i} to="/pays/$code" params={{ code: t.country.code }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '13px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', textDecoration: 'none', color: 'inherit', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span className="font-display" style={{ minWidth: 30, fontSize: 16, fontWeight: 800, color: i < 3 ? '#f59e0b' : 'rgba(240,242,248,0.15)' }}>{i + 1}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 700 }}>{t.keyword}</span>
                <span style={{ minWidth: 120, fontSize: 13, color: 'rgba(240,242,248,0.4)' }}>{t.country.flag} {t.country.name}</span>
                <span className="badge" style={{ minWidth: 110, background: color + '18', color, border: `1px solid ${color}25`, justifyContent: 'center' }}>{t.category}</span>
                <span style={{ minWidth: 70, textAlign: 'right', fontSize: 14, fontWeight: 800, color: '#34d399' }}>+{t.change}%</span>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
