import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/a-propos')({
  head: () => ({
    meta: [{ title: 'À propos | SearchGTrends' }],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '100px 24px 60px', flex: 1 }}>
        <h1 className="font-display" style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>À propos</h1>
        <p style={{ fontSize: 16, color: 'rgba(240,242,248,0.5)', lineHeight: 1.8, marginBottom: 40 }}>
          <strong style={{ color: '#f0f2f8' }}>SearchGTrends</strong> est un outil de veille des tendances de recherche mondiales. Nous analysons chaque jour les mots les plus tapés sur Google dans 10 pays pour rendre la donnée accessible à tous.
        </p>

        <div className="card" style={{ padding: 32, marginBottom: 24, background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.05))', borderColor: 'rgba(99,102,241,0.2)' }}>
          <h2 className="font-display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>🚀 Roadmap</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 0, listStyle: 'none' }}>
            {[
              ['✅', 'Interface et design premium'],
              ['✅', 'Données pour 10 pays'],
              ['✅', 'Fetch automatique quotidien (GitHub Actions)'],
              ['✅', 'Pages SEO par pays et catégorie'],
              ['✅', 'Analyse AI × GEO'],
              ['🔄', 'Intégration Google Trends API (juin 2026)'],
              ['🔄', 'Publication automatique X/LinkedIn'],
              ['🔄', 'Alertes email tendances'],
              ['🔄', 'Comparaison entre pays'],
              ['🔄', 'Export CSV des données'],
            ].map(([icon, text]) => (
              <li key={text} style={{ display: 'flex', gap: 12, fontSize: 14, color: icon === '✅' ? 'rgba(240,242,248,0.7)' : 'rgba(240,242,248,0.35)', alignItems: 'center' }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/trending" style={{ padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            🔥 Voir les tendances
          </Link>
          <Link to="/ai-geo" style={{ padding: '12px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a5b4fc', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            🤖 AI × GEO
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
