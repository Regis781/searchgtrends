import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTrends } from '@/lib/useTrends'
import { CATEGORY_COLORS, CATEGORIES, type TrendCategory } from '@/data/trends'

export const Route = createFileRoute('/trending/')({
  head: () => ({
    meta: [
      { title: 'Trending Now — Recherches qui explosent en ce moment | SearchGTrends' },
      { name: 'description', content: 'Les recherches Google qui augmentent le plus vite dans le monde en ce moment. Classement en temps réel par pays et catégorie.' },
      { name: 'keywords', content: 'trending now, recherches virales, google trends live, tendances explosives 2026' },
    ],
  }),
  component: TrendingPage,
})

function TrendingPage() {
  const { countries, generatedAt, isLive } = useTrends()
  const [cat, setCat] = useState<TrendCategory | 'Tous'>('Tous')

  const all = countries.flatMap(c => c.trends.map(t => ({ ...t, country: c })))
  const filtered = cat === 'Tous' ? all : all.filter(t => t.category === cat)
  const ranked = [...filtered].sort((a, b) => b.change - a.change)

  const top3 = ranked.slice(0, 3)
  const rest = ranked.slice(3, 30)

  const formatDate = (iso: string | null) => iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 24px 60px', width: '100%', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 999, padding: '5px 14px', marginBottom: 20, fontSize: 12, fontWeight: 700, color: '#fb7185', letterSpacing: '0.05em' }}>
            <span className="live-dot" style={{ background: '#f43f5e' }} />
            TRENDING NOW
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12, lineHeight: 1.1 }}>
            Ce qui explose<br /><span className="gradient-text-warm">en ce moment</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(240,242,248,0.45)' }}>
            {generatedAt ? `Mis à jour le ${formatDate(generatedAt)}` : 'Données simulées'} · {ranked.length} tendances analysées
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          {(['Tous', ...CATEGORIES] as (TrendCategory | 'Tous')[]).map(c => {
            const color = c === 'Tous' ? '#6366f1' : CATEGORY_COLORS[c as TrendCategory]
            const active = cat === c
            return (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: '6px 16px', borderRadius: 999, border: '1px solid', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.15s', background: 'none',
                  borderColor: active ? color : 'rgba(255,255,255,0.08)', color: active ? color : 'rgba(240,242,248,0.4)',
                  boxShadow: active ? `0 0 12px ${color}30` : 'none' }}>
                {c}
              </button>
            )
          })}
        </div>

        {/* Podium top 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {top3.map((t, i) => {
            const color = CATEGORY_COLORS[t.category as TrendCategory] ?? '#6366f1'
            const medals = ['🥇', '🥈', '🥉']
            return (
              <div key={t.keyword} className="card" style={{ padding: 24, background: i === 0 ? 'linear-gradient(135deg, rgba(244,63,94,0.08), rgba(245,158,11,0.05))' : 'var(--surface)', borderColor: i === 0 ? 'rgba(244,63,94,0.25)' : 'rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{medals[i]}</div>
                <p style={{ fontSize: 11, color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{t.category}</p>
                <p style={{ fontSize: 18, fontWeight: 800, marginBottom: 4, lineHeight: 1.2 }}>{t.keyword}</p>
                <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.4)', marginBottom: 12 }}>{t.country.flag} {t.country.name}</p>
                <p className="font-display" style={{ fontSize: 32, fontWeight: 800, color: '#34d399' }}>+{t.change}%</p>
              </div>
            )
          })}
        </div>

        {/* Full list */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 16, fontSize: 11, color: 'rgba(240,242,248,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <span style={{ minWidth: 30 }}>#</span>
            <span style={{ flex: 1 }}>Mot-clé</span>
            <span style={{ minWidth: 100 }}>Pays</span>
            <span style={{ minWidth: 100 }}>Catégorie</span>
            <span style={{ minWidth: 70, textAlign: 'right' }}>Hausse</span>
          </div>
          {rest.map((t, i) => {
            const color = CATEGORY_COLORS[t.category as TrendCategory] ?? '#6366f1'
            return (
              <Link key={t.keyword + i} to="/pays/$code" params={{ code: t.country.code }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', textDecoration: 'none', color: 'inherit', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span className="font-display" style={{ minWidth: 30, fontSize: 16, fontWeight: 800, color: 'rgba(240,242,248,0.15)' }}>{i + 4}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 700 }}>{t.keyword}</span>
                <span style={{ minWidth: 100, fontSize: 13, color: 'rgba(240,242,248,0.4)' }}>{t.country.flag} {t.country.name}</span>
                <span className="badge" style={{ minWidth: 100, background: color + '18', color, border: `1px solid ${color}25`, justifyContent: 'center' }}>{t.category}</span>
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
