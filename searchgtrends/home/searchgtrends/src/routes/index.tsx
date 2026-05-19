import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTrends } from '@/lib/useTrends'
import { CATEGORY_COLORS, type TrendCategory } from '@/data/trends'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'SearchGTrends — Les mots les plus recherchés dans le monde' },
      { name: 'description', content: 'Découvrez en temps réel les mots les plus recherchés sur Google dans 10 pays. Tendances mondiales, analyse IA et classements par catégorie.' },
      { name: 'keywords', content: 'google trends, tendances recherche, mots recherchés, trending searches, analyse SEO mondiale' },
      { property: 'og:title', content: 'SearchGTrends — Les recherches mondiales en temps réel' },
      { property: 'og:description', content: 'Tendances Google dans 10 pays. Mis à jour chaque jour automatiquement.' },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const { countries, generatedAt, loading, isLive } = useTrends()
  const [activeCountry, setActiveCountry] = useState('FR')

  const country = countries.find(c => c.code === activeCountry) ?? countries[0]
  const top5Global = countries.flatMap(c => c.trends.map(t => ({ ...t, country: c }))).sort((a, b) => b.change - a.change).slice(0, 8)
  const formatDate = (iso: string | null) => iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '15%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 820, zIndex: 1 }}>
          {/* Live badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 999, padding: '6px 16px', marginBottom: 32, fontSize: 12, fontWeight: 600, color: '#34d399', letterSpacing: '0.05em' }}>
            <span className="live-dot" />
            {loading ? 'Chargement...' : isLive ? 'DONNÉES RÉELLES · MIS À JOUR AUJOURD\'HUI' : `MIS À JOUR LE ${formatDate(generatedAt) ?? '...'}`}
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24, color: '#f0f2f8' }}>
            Ce que le monde<br />
            <span className="gradient-text">recherche en ce moment</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(240,242,248,0.55)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 48px' }}>
            Les mots les plus tapés sur Google dans <strong style={{ color: 'rgba(240,242,248,0.85)' }}>10 pays</strong>, mis à jour chaque jour. Tendances, explosions virales et analyse IA incluses.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <Link to="/trending" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 0 30px rgba(99,102,241,0.35)', letterSpacing: '-0.01em' }}>
              🔥 Voir les tendances live
            </Link>
            <Link to="/ai-geo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a5b4fc', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              🤖 Analyse AI × GEO
            </Link>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { val: '10', label: 'Pays analysés' },
              { val: '100+', label: 'Tendances/jour' },
              { val: '6', label: 'Catégories' },
              { val: '7j', label: "D'historique" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p className="font-display" style={{ fontSize: 28, fontWeight: 800, color: '#f0f2f8', letterSpacing: '-0.02em' }}>{val}</p>
                <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '12px 0', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
        <div className="ticker-inner" style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...top5Global, ...top5Global].map((t, i) => (
            <span key={i} style={{ fontSize: 13, color: 'rgba(240,242,248,0.5)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>{t.country.flag}</span>
              <span style={{ fontWeight: 600, color: 'rgba(240,242,248,0.8)' }}>{t.keyword}</span>
              <span style={{ color: '#34d399', fontWeight: 700 }}>+{t.change}%</span>
              <span style={{ color: 'rgba(240,242,248,0.2)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%', flex: 1 }}>

        {/* ── TRENDING NOW PREVIEW ── */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>En ce moment</p>
              <h2 className="font-display" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em' }}>🔥 Explosions mondiales</h2>
            </div>
            <Link to="/trending" style={{ fontSize: 13, color: '#a5b4fc', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              Voir tout <span>→</span>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {top5Global.slice(0, 6).map((t, i) => {
              const color = CATEGORY_COLORS[t.category as TrendCategory] ?? '#6366f1'
              return (
                <div key={i} className="card" style={{ padding: '20px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '18', border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {t.country.flag}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#f0f2f8', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.keyword}</p>
                    <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.4)' }}>{t.country.name} · {t.category}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: '#34d399' }}>+{t.change}%</p>
                    <div style={{ height: 3, width: 48, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginTop: 4 }}>
                      <div style={{ height: '100%', width: `${Math.min(100, t.volume)}%`, background: color, borderRadius: 99 }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── COUNTRY EXPLORER ── */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Explorer</p>
              <h2 className="font-display" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em' }}>Top recherches par pays</h2>
            </div>
            <Link to="/pays" style={{ fontSize: 13, color: '#a5b4fc', textDecoration: 'none', fontWeight: 600 }}>Tous les pays →</Link>
          </div>

          {/* Country selector */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {countries.map(c => (
              <button key={c.code} onClick={() => setActiveCountry(c.code)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                  borderRadius: 10, border: '1px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  transition: 'all 0.15s', background: 'none',
                  borderColor: activeCountry === c.code ? '#6366f1' : 'rgba(255,255,255,0.08)',
                  color: activeCountry === c.code ? '#a5b4fc' : 'rgba(240,242,248,0.5)',
                  boxShadow: activeCountry === c.code ? '0 0 16px rgba(99,102,241,0.2)' : 'none',
                }}>
                <span style={{ fontSize: 18 }}>{c.flag}</span>
                {c.name}
              </button>
            ))}
          </div>

          {/* Top 5 list */}
          {country && (
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{country.flag}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700 }}>{country.name}</p>
                  <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.4)' }}>Top {country.trends.length} recherches</p>
                </div>
              </div>
              {country.trends.slice(0, 5).map((t, i) => {
                const color = CATEGORY_COLORS[t.category as TrendCategory] ?? '#6366f1'
                return (
                  <div key={t.keyword} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span className="font-display" style={{ fontSize: 22, fontWeight: 800, color: 'rgba(240,242,248,0.15)', minWidth: 30, textAlign: 'right' }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{t.keyword}</p>
                      <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 99 }}>
                        <div style={{ height: '100%', width: `${t.volume}%`, background: `linear-gradient(90deg, ${color}, ${color}80)`, borderRadius: 99, transition: 'width 0.5s' }} />
                      </div>
                    </div>
                    <span className="badge" style={{ background: color + '18', color, border: `1px solid ${color}30` }}>{t.category}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: t.change > 0 ? '#34d399' : '#f43f5e', minWidth: 60, textAlign: 'right' }}>
                      {t.change > 0 ? '+' : ''}{t.change}%
                    </span>
                  </div>
                )
              })}
              <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Link to="/pays/$code" params={{ code: country.code }} style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
                  Voir les {country.trends.length} tendances de {country.name} →
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* ── SEO PAGES GRID ── */}
        <section style={{ marginBottom: 80 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Guides</p>
          <h2 className="font-display" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 32 }}>Explorer par thème</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {[
              { to: '/trending', emoji: '🔥', title: 'Trending Now', desc: 'Les recherches qui explosent en ce moment', color: '#f43f5e' },
              { to: '/ai-geo', emoji: '🤖', title: 'AI × GEO Analysis', desc: 'Analyse IA des patterns géographiques', color: '#6366f1' },
              { to: '/categorie/sport', emoji: '⚽', title: 'Sport', desc: 'Foot, NBA, Tennis et plus', color: '#10b981' },
              { to: '/categorie/tech', emoji: '💻', title: 'Tech & IA', desc: 'ChatGPT, Apple, GPU...', color: '#06b6d4' },
              { to: '/categorie/actualite', emoji: '📰', title: 'Actualité', desc: 'Politique, économie, monde', color: '#f59e0b' },
              { to: '/pays', emoji: '🌍', title: 'Par pays', desc: '10 pays analysés en profondeur', color: '#a855f7' },
            ].map(({ to, emoji, title, desc, color }) => (
              <Link key={to} to={to} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 20, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = color + '40'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{emoji}</div>
                  <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: '#f0f2f8' }}>{title}</p>
                  <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.4)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── AI TEASER ── */}
        <section>
          <div className="card" style={{ padding: '48px', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.05))', borderColor: 'rgba(99,102,241,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent)', borderRadius: '50%' }} />
            <div style={{ position: 'relative', maxWidth: 600 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>🤖 Nouvelle fonctionnalité</p>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>
                AI × GEO Intelligence
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(240,242,248,0.55)', lineHeight: 1.7, marginBottom: 28 }}>
                Comprenez pourquoi certains mots explosent dans certains pays. Notre analyse IA croise les tendances géographiques pour révéler les patterns culturels cachés.
              </p>
              <Link to="/ai-geo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Découvrir l'analyse AI →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
