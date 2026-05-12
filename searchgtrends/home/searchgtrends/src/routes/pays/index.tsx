import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { countries, CATEGORY_COLORS } from '@/data/trends'

export const Route = createFileRoute('/pays/')({
  head: () => ({
    meta: [
      { title: 'Tendances par pays | SearchGTrends' },
      { name: 'description', content: `Explorez les mots les plus recherchés dans ${countries.length} pays. Tendances Google par pays en temps réel.` },
    ],
  }),
  component: PaysPage,
})

function PaysPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fc' }}>
      <Header />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', width: '100%', flex: 1 }}>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Tendances par pays</h1>
        <p style={{ color: '#6b7280', marginBottom: 32 }}>{countries.length} pays couverts — cliquez pour voir les tendances détaillées</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {countries.map(c => {
            const top3 = c.trends.slice(0, 3)
            const topRise = [...c.trends].sort((a, b) => b.change - a.change)[0]
            return (
              <Link key={c.code} to="/pays/$code" params={{ code: c.code }}
                style={{ textDecoration: 'none' }}
              >
                <div className="card" style={{ padding: 20, transition: 'all 0.15s', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 32 }}>{c.flag}</span>
                    <div>
                      <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f1117' }}>{c.name}</h2>
                      <p style={{ fontSize: 12, color: '#9ca3af' }}>{c.trends.length} tendances actives</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    {top3.map((t, i) => (
                      <div key={t.keyword} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: i < 2 ? '1px solid #f1f3f9' : 'none' }}>
                        <span style={{ fontSize: 12, color: '#d1d5db', fontWeight: 600, minWidth: 16 }}>{i + 1}</span>
                        <span style={{ fontSize: 13, flex: 1, color: '#374151' }}>{t.keyword}</span>
                        <span style={{ fontSize: 11, color: t.change > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                          {t.change > 0 ? '+' : ''}{t.change}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: '#fef3c7', borderRadius: 8 }}>
                    <span style={{ fontSize: 14 }}>🔥</span>
                    <span style={{ fontSize: 12, color: '#92400e', fontWeight: 500 }}>En explosion : <strong>{topRise.keyword}</strong></span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
