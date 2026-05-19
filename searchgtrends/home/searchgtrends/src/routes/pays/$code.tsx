import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTrends } from '@/lib/useTrends'
import { CATEGORY_COLORS, CATEGORIES, type TrendCategory } from '@/data/trends'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

export const Route = createFileRoute('/pays/$code')({
  component: CountryPage,
})

function CountryPage() {
  const { code } = Route.useParams()
  const { countries } = useTrends()
  const [cat, setCat] = useState<TrendCategory | 'Tous'>('Tous')
  const [showChart, setShowChart] = useState(false)

  const country = countries.find(c => c.code === code.toUpperCase())
  if (!country) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 48 }}>🔍</p>
      <p style={{ fontSize: 18, fontWeight: 700 }}>Pays introuvable</p>
      <Link to="/pays" style={{ color: '#6366f1', textDecoration: 'none' }}>← Retour aux pays</Link>
    </div>
  )

  const filtered = cat === 'Tous' ? country.trends : country.trends.filter(t => t.category === cat)
  const topRise = [...country.trends].sort((a, b) => b.change - a.change)[0]
  const topVol = [...country.trends].sort((a, b) => b.volume - a.volume)[0]
  const freeCount = country.trends.filter(t => t.change > 50).length

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 24px 60px', width: '100%', flex: 1 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(240,242,248,0.3)', marginBottom: 32, alignItems: 'center' }}>
          <Link to="/" style={{ color: 'rgba(240,242,248,0.3)', textDecoration: 'none' }}>Accueil</Link>
          <span>/</span>
          <Link to="/pays" style={{ color: 'rgba(240,242,248,0.3)', textDecoration: 'none' }}>Pays</Link>
          <span>/</span>
          <span style={{ color: '#f0f2f8' }}>{country.name}</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 40 }}>
          <span style={{ fontSize: 64 }}>{country.flag}</span>
          <div>
            <h1 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
              Tendances en {country.name}
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.4)' }}>
              {country.trends.length} tendances · {freeCount} en forte hausse
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 40 }}>
          {[
            { label: '🔥 Plus forte hausse', val: topRise?.keyword, sub: `+${topRise?.change}%`, color: '#f43f5e' },
            { label: '📈 Plus populaire', val: topVol?.keyword, sub: `Volume ${topVol?.volume}`, color: '#6366f1' },
            { label: '⚡ En explosion', val: `${freeCount}`, sub: 'tendances +50%', color: '#f59e0b' },
          ].map(({ label, val, sub, color }) => (
            <div key={label} className="card" style={{ padding: 20, borderLeft: `3px solid ${color}` }}>
              <p style={{ fontSize: 11, color: 'rgba(240,242,248,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{label}</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: '#f0f2f8', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</p>
              <p style={{ fontSize: 12, color, fontWeight: 700 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['Tous', ...CATEGORIES] as (TrendCategory | 'Tous')[]).map(c => {
              const color = c === 'Tous' ? '#6366f1' : CATEGORY_COLORS[c as TrendCategory]
              const active = cat === c
              return (
                <button key={c} onClick={() => setCat(c)}
                  style={{ padding: '5px 14px', borderRadius: 999, border: '1px solid', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: 'none', transition: 'all 0.15s',
                    borderColor: active ? color : 'rgba(255,255,255,0.08)', color: active ? color : 'rgba(240,242,248,0.4)',
                    boxShadow: active ? `0 0 10px ${color}25` : 'none' }}>
                  {c}
                </button>
              )
            })}
          </div>
          <button onClick={() => setShowChart(!showChart)}
            style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'rgba(240,242,248,0.5)' }}>
            {showChart ? '📉 Masquer graphiques' : '📊 Voir graphiques'}
          </button>
        </div>

        {/* Trends list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((t, i) => {
            const color = CATEGORY_COLORS[t.category as TrendCategory] ?? '#6366f1'
            const chartData = t.history.map((v, j) => ({ day: DAYS[j], v }))
            return (
              <div key={t.keyword} className="card" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span className="font-display" style={{ fontSize: 20, fontWeight: 800, color: 'rgba(240,242,248,0.15)', minWidth: 28, textAlign: 'right' }}>{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{t.keyword}</span>
                      <span className="badge" style={{ background: color + '18', color, border: `1px solid ${color}25` }}>{t.category}</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99 }}>
                      <div style={{ height: '100%', width: `${t.volume}%`, background: `linear-gradient(90deg, ${color}, ${color}80)`, borderRadius: 99 }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: t.change > 0 ? '#34d399' : '#f43f5e', minWidth: 60, textAlign: 'right' }}>
                    {t.change > 0 ? '+' : ''}{t.change}%
                  </span>
                </div>
                {showChart && (
                  <div style={{ height: 60, marginTop: 12 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                        <defs>
                          <linearGradient id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'rgba(240,242,248,0.25)' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: '#0e1018', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#f0f2f8' }} formatter={(v: number) => [v, 'Volume']} />
                        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#g${i})`} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/pays" style={{ fontSize: 13, color: 'rgba(240,242,248,0.4)', textDecoration: 'none' }}>← Tous les pays</Link>
          <Link to="/trending" style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>🔥 Trending Now →</Link>
          <Link to="/ai-geo" style={{ fontSize: 13, color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}>🤖 Analyse AI ×GEO →</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
