import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTrends } from '@/lib/useTrends'
import { CATEGORY_COLORS, type TrendCategory } from '@/data/trends'

export const Route = createFileRoute('/pays/')({
  head: () => ({
    meta: [
      { title: 'Tendances Google par pays — 10 pays analysés | SearchGTrends' },
      { name: 'description', content: 'Les mots les plus recherchés sur Google dans 10 pays : France, USA, UK, Japon, Allemagne, Brésil, Inde, Corée, Mexique, Nigeria. Données quotidiennes.' },
      { name: 'keywords', content: 'google trends france, recherches populaires usa, tendances japon, mots recherchés allemagne' },
    ],
  }),
  component: PaysPage,
})

function PaysPage() {
  const { countries, generatedAt } = useTrends()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px 60px', width: '100%', flex: 1 }}>

        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>🌍 Explorer</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Tendances par pays
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(240,242,248,0.45)' }}>
            {countries.length} pays analysés · Mis à jour quotidiennement
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {countries.map(c => {
            const top = [...c.trends].sort((a, b) => b.change - a.change)[0]
            const topVol = [...c.trends].sort((a, b) => b.volume - a.volume)[0]
            return (
              <Link key={c.code} to="/pays/$code" params={{ code: c.code }} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 24, cursor: 'pointer', transition: 'all 0.2s', height: '100%' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}>

                  {/* Flag + name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <span style={{ fontSize: 36 }}>{c.flag}</span>
                    <div>
                      <p className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>{c.name}</p>
                      <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.35)' }}>{c.trends.length} tendances analysées</p>
                    </div>
                  </div>

                  {/* Top trends */}
                  <div style={{ marginBottom: 16 }}>
                    {c.trends.slice(0, 4).map((t, i) => {
                      const col = CATEGORY_COLORS[t.category as TrendCategory] ?? '#6366f1'
                      return (
                        <div key={t.keyword} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(240,242,248,0.2)', minWidth: 16 }}>{i + 1}</span>
                          <span style={{ fontSize: 13, flex: 1, color: 'rgba(240,242,248,0.8)', fontWeight: 500 }}>{t.keyword}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: col }}>{t.category}</span>
                          <span style={{ fontSize: 12, fontWeight: 800, color: '#34d399' }}>+{t.change}%</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Hot badge */}
                  {top && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(244,63,94,0.08)', borderRadius: 8, border: '1px solid rgba(244,63,94,0.15)' }}>
                      <span style={{ fontSize: 14 }}>🔥</span>
                      <span style={{ fontSize: 12, color: '#fb7185', fontWeight: 600 }}>En explosion : <strong>{top.keyword}</strong> (+{top.change}%)</span>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* SEO content */}
        <section style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { flag: '🇫🇷', pays: 'France', desc: 'Football, politique et Netflix dominent les recherches françaises. La Ligue 1 génère des pics massifs le week-end.' },
            { flag: '🇺🇸', pays: 'États-Unis', desc: 'NBA, IA et célébrités : les américains cherchent sport et divertissement en priorité, avec des pics tech lors des keynotes Apple.' },
            { flag: '🇯🇵', pays: 'Japon', desc: "L'anime et les séismes dominent les tendances japonaises. Les recherches tech explosent lors des sorties Nvidia." },
            { flag: '🇳🇬', pays: 'Nigeria', desc: 'Le football africain, l\'Afrobeats et le Bitcoin sont les sujets qui passionnent les nigérians en ce moment.' },
          ].map(({ flag, pays, desc }) => (
            <div key={pays} style={{ padding: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: 20, marginBottom: 8 }}>{flag} <strong style={{ fontSize: 15 }}>{pays}</strong></p>
              <p style={{ fontSize: 13, color: 'rgba(240,242,248,0.4)', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </section>

      </main>
      <Footer />
    </div>
  )
}
