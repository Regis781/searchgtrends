import { createFileRoute } from '@tanstack/react-router'
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fc' }}>
      <Header />
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '60px 24px', flex: 1 }}>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>À propos de SearchGTrends</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: '#374151', lineHeight: 1.7 }}>
          <p>
            <strong>SearchGTrends</strong> est un outil de visualisation des tendances de recherche mondiales. 
            Notre mission : rendre les données de recherche Google accessibles, lisibles et exploitables pour tous.
          </p>
          <p>
            Actuellement en version <strong>bêta avec données simulées</strong>, le site intégrera prochainement l'API Google Trends officielle pour afficher des données en temps réel.
          </p>

          <div style={{ background: '#ede9fe', border: '1px solid #c4b5fd', borderRadius: 12, padding: 20, marginTop: 8 }}>
            <h2 style={{ fontWeight: 700, color: '#4f46e5', marginBottom: 8 }}>🚀 Roadmap</h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, color: '#4f46e5' }}>
              <li>✅ Interface et design v1</li>
              <li>✅ Données simulées pour 10 pays</li>
              <li>🔄 Intégration Google Trends API</li>
              <li>🔄 Alertes tendances par email</li>
              <li>🔄 Comparaison entre pays</li>
              <li>🔄 Export CSV des données</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
