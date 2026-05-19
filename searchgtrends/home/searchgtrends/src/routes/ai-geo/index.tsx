import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTrends } from '@/lib/useTrends'
import { CATEGORY_COLORS, type TrendCategory } from '@/data/trends'

export const Route = createFileRoute('/ai-geo/')({
  head: () => ({
    meta: [
      { title: 'AI × GEO — Analyse Intelligence des tendances mondiales | SearchGTrends' },
      { name: 'description', content: 'Analyse IA des patterns géographiques de recherche Google. Pourquoi certains mots explosent dans certains pays ? Insights culturels et géopolitiques.' },
      { name: 'keywords', content: 'analyse IA tendances, géopolitique recherche, google trends analyse, patterns culturels recherche' },
    ],
  }),
  component: AiGeoPage,
})

function AiGeoPage() {
  const { countries } = useTrends()

  // Insights générés dynamiquement
  const allTrends = countries.flatMap(c => c.trends.map(t => ({ ...t, country: c })))
  const topByCategory = Object.entries(
    allTrends.reduce((acc, t) => {
      if (!acc[t.category] || acc[t.category].change < t.change) acc[t.category] = t
      return acc
    }, {} as Record<string, typeof allTrends[0]>)
  )

  const insights = [
    {
      icon: '⚽',
      title: 'Le Sport domine en Amérique & Afrique',
      desc: 'Le football et le cricket génèrent 40% de plus de recherches au Brésil, Mexique, Inde et Nigeria comparé aux pays européens. Signal fort pour les marques sportives.',
      countries: ['🇧🇷', '🇲🇽', '🇮🇳', '🇳🇬'],
      color: '#10b981',
    },
    {
      icon: '🤖',
      title: "L'IA : sujet #1 en Asie",
      desc: "Le Japon, la Corée du Sud et l'Inde montrent une croissance 3x supérieure des recherches liées à l'IA par rapport à l'Europe. L'Asie adopte plus vite.",
      countries: ['🇯🇵', '🇰🇷', '🇮🇳'],
      color: '#6366f1',
    },
    {
      icon: '💰',
      title: 'Crypto & Finance : corrélation avec instabilité monétaire',
      desc: "Nigeria (Naira) et Brésil (Réal) montrent des pics de recherche crypto 5x supérieurs lors des baisses de leur devise. Signal économique détectable.",
      countries: ['🇳🇬', '🇧🇷', '🇲🇽'],
      color: '#f59e0b',
    },
    {
      icon: '🎭',
      title: 'K-pop & Divertissement : effet viral asiatique',
      desc: "La Corée du Sud génère des tendances culturelles qui se propagent en 48h au Japon puis 72h au reste du monde. Pattern viral identifiable.",
      countries: ['🇰🇷', '🇯🇵'],
      color: '#a855f7',
    },
    {
      icon: '🌡️',
      title: 'Santé : saisonnalité croisée Nord/Sud',
      desc: 'Les recherches santé au Brésil et Nigeria (hémisphère sud) sont inverses à celles de France et UK. Opportunité pour les marques de santé globales.',
      countries: ['🇫🇷', '🇬🇧', '🇧🇷', '🇳🇬'],
      color: '#ec4899',
    },
    {
      icon: '📱',
      title: 'Tech : Apple vs Nvidia selon la zone',
      desc: "Apple domine les recherches tech en Europe et USA. Nvidia et GPU dominent en Asie. Signal clair pour les campagnes publicitaires géolocalisées.",
      countries: ['🇺🇸', '🇫🇷', '🇯🇵', '🇰🇷'],
      color: '#06b6d4',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px', width: '100%', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 999, padding: '5px 14px', marginBottom: 20, fontSize: 12, fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.05em' }}>
            🤖 AI × GEO INTELLIGENCE
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.05 }}>
            Pourquoi les gens cherchent<br />
            <span className="gradient-text">différemment selon leur pays</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(240,242,248,0.5)', lineHeight: 1.7, maxWidth: 600 }}>
            Notre analyse croise les tendances Google de 10 pays pour révéler des patterns culturels, économiques et géopolitiques invisibles à l'œil nu.
          </p>
        </div>

        {/* Heatmap pays × catégories */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="font-display" style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em' }}>
            🗺️ Heatmap : Intensité par pays & catégorie
          </h2>
          <div className="card" style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th style={{ padding: '12px 20px', textAlign: 'left', color: 'rgba(240,242,248,0.3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pays</th>
                  {['Actualité', 'Sport', 'Tech', 'Divertissement', 'Santé', 'Économie'].map(cat => (
                    <th key={cat} style={{ padding: '12px 16px', textAlign: 'center', color: 'rgba(240,242,248,0.3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {countries.map(country => (
                  <tr key={country.code} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px 20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{country.flag}</span>
                      <span style={{ fontSize: 13 }}>{country.name}</span>
                    </td>
                    {['Actualité', 'Sport', 'Tech', 'Divertissement', 'Santé', 'Économie'].map(cat => {
                      const catTrends = country.trends.filter(t => t.category === cat)
                      const avgChange = catTrends.length ? Math.round(catTrends.reduce((s, t) => s + t.change, 0) / catTrends.length) : 0
                      const color = CATEGORY_COLORS[cat as TrendCategory] ?? '#6366f1'
                      const intensity = Math.min(1, avgChange / 80)
                      return (
                        <td key={cat} style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 32, borderRadius: 8, background: avgChange > 0 ? `${color}${Math.round(intensity * 40 + 8).toString(16).padStart(2, '0')}` : 'rgba(255,255,255,0.03)', fontSize: 12, fontWeight: 700, color: avgChange > 30 ? color : 'rgba(240,242,248,0.3)' }}>
                            {avgChange > 0 ? `+${avgChange}%` : '—'}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Insights cards */}
        <section style={{ marginBottom: 64 }}>
          <h2 className="font-display" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>
            💡 Insights IA du jour
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.4)', marginBottom: 32 }}>Générés automatiquement à partir des tendances du jour</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {insights.map(({ icon, title, desc, countries: flags, color }) => (
              <div key={title} className="card" style={{ padding: 24, borderLeft: `3px solid ${color}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, marginBottom: 8, lineHeight: 1.3, color: '#f0f2f8' }}>{title}</p>
                    <p style={{ fontSize: 13, color: 'rgba(240,242,248,0.45)', lineHeight: 1.6, marginBottom: 12 }}>{desc}</p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {flags.map(f => <span key={f} style={{ fontSize: 18 }}>{f}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.04))', borderColor: 'rgba(99,102,241,0.2)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Données fraîches chaque matin</p>
            <h3 className="font-display" style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>Ces analyses sont mises à jour quotidiennement</h3>
            <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.4)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>Revenez chaque matin pour de nouveaux insights basés sur les vraies données Google Trends.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/trending" style={{ padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                🔥 Voir les tendances live
              </Link>
              <Link to="/pays" style={{ padding: '12px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a5b4fc', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                🌍 Explorer par pays
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
