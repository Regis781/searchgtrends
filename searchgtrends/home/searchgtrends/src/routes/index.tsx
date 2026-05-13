import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TrendCard } from '@/components/TrendCard'
import { CATEGORY_COLORS, type TrendCategory } from '@/data/trends'
import { useTrends } from '@/lib/useTrends'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'SearchGTrends — Tendances mondiales de recherche par pays' },
      { name: 'description', content: 'Les mots les plus recherchés sur Google par pays. Tendances en temps réel, historique 7 jours et classement par catégorie.' },
      { name: 'keywords', content: 'tendances google, mots recherchés, google trends par pays, recherches populaires' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const { countries, generatedAt, loading, isLive } = useTrends()
  const [selectedCode, setSelectedCode] = useState('FR')
  const [selectedCat, setSelectedCat] = useState<TrendCategory | 'Tous'>('Tous')
  const [showCharts, setShowCharts] = useState(false)

  const currentCountry = countries.find(c => c.code === selectedCode) ?? countries[0]

  const safeTrends = currentCountry?.trends ?? []

  const filtered = selectedCat === 'Tous'
    ? safeTrends
    : safeTrends.filter(t => t.category === selectedCat)

  const topGlobal = countries
    .flatMap(c => (c?.trends ?? []).map(t => ({ ...t, country: c })))
    .sort((a, b) => b.change - a.change)
    .slice(0, 5)

  const formatDate = (iso: string | null) => iso
    ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fc' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '64px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '6px 16px', marginBottom: 20, fontSize: 13 }}>
            <span className="live-dot" style={{ background: isLive ? '#4ade80' : '#fbbf24' }} />
            {loading ? 'Chargement...' : isLive ? "Données réelles · Mis à jour aujourd'hui" : 'Données simulées · Intégration API en cours'}
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
            Les mots les plus<br />recherchés dans le monde
          </h1>
          <p style={{ fontSize: 18, opacity: 0.85, marginBottom: 16, lineHeight: 1.6 }}>
            Explorez les tendances Google par pays et catégorie. <strong>{countries.length} pays</strong> couverts.
          </p>
          {generatedAt && (
            <p style={{ fontSize: 12, opacity: 0.55, marginBottom: 24 }}>Dernière mise à jour : {formatDate(generatedAt)}</p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/pays" style={{ background: 'white', color: '#4f46e5', padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Explorer par pays
            </Link>
            <Link to="/tendances" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
              Tendances mondiales
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e4e7ef' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', gap: 32, overflowX: 'auto' }}>
          {[
            { val: `${countries.length}`, label: 'Pays couverts' },
            { val: `${countries.reduce((s, c) => s + c.trends.length, 0)}`, label: 'Tendances actives' },
            { val: '7j', label: 'Historique' },
            { val: '6', label: 'Catégories' },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center', minWidth: 80 }}>
              <p className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#4f46e5' }}>{val}</p>
              <p style={{ fontSize: 12, color: '#6b7280' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', width: '100%', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>

          {/* Trends panel */}
          <section className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700 }}>Tendances par pays</h2>
              <button onClick={() => setShowCharts(!showCharts)}
                style={{ fontSize: 13, color: showCharts ? '#4f46e5' : '#6b7280', background: showCharts ? '#ede9fe' : '#f1f3f9', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontWeight: 500 }}>
                {showCharts ? '📊 Masquer graphiques' : '📊 Voir graphiques'}
              </button>
            </div>

            {/* Country tabs */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {countries.map(c => (
                <button key={c.code} onClick={() => setSelectedCode(c.code)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                    borderRadius: 10, border: '1px solid', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                    borderColor: selectedCode === c.code ? '#4f46e5' : '#e4e7ef',
                    background: selectedCode === c.code ? '#ede9fe' : 'white',
                    color: selectedCode === c.code ? '#4f46e5' : '#374151',
                  }}>
                  <span style={{ fontSize: 18 }}>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {(['Tous', ...Object.keys(CATEGORY_COLORS)] as (TrendCategory | 'Tous')[]).map(cat => {
                const color = cat === 'Tous' ? '#4f46e5' : CATEGORY_COLORS[cat as TrendCategory]
                const active = selectedCat === cat
                return (
                  <button key={cat} onClick={() => setSelectedCat(cat)}
                    style={{ padding: '4px 12px', borderRadius: 999, border: '1px solid', cursor: 'pointer', fontSize: 12, fontWeight: 500,
                      borderColor: active ? color : '#e4e7ef', background: active ? color + '15' : 'white', color: active ? color : '#6b7280' }}>
                    {cat}
                  </button>
                )
              })}
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
                <p>Chargement des tendances...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filtered.map((t, i) => <TrendCard key={t.keyword} trend={t} rank={i + 1} showChart={showCharts} />)}
              </div>
            )}
          </section>

          {/* Global explosions */}
          <section className="card" style={{ padding: 24 }}>
            <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🔥 Explosions mondiales</h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>Les tendances qui montent le plus vite en ce moment</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {topGlobal.map((t, i) => (
                <div key={t.keyword + i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#f8f9fc', borderRadius: 10 }}>
                  <span style={{ fontSize: 20 }}>{t.country.flag}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{t.keyword}</p>
                    <p style={{ fontSize: 12, color: '#6b7280' }}>{t.country.name} · {t.category}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>+{t.change}%</span>
                </div>
              ))}
            </div>
            <Link to="/tendances" style={{ display: 'block', marginTop: 16, textAlign: 'center', fontSize: 13, color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>
              Voir toutes les tendances →
            </Link>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
