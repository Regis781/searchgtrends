import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/a-propos')({
  head: () => ({
    meta: [
      { title: 'À propos de SearchGTrends — Tendances Google mondiales en temps réel' },
      { name: 'description', content: 'SearchGTrends analyse chaque jour les recherches Google les plus populaires dans 10 pays. Découvrez notre mission, notre méthode et notre vision pour démocratiser l\'accès aux données de tendances mondiales.' },
      { name: 'keywords', content: 'about searchgtrends, tendances google analyse, outil veille tendances, données recherche mondiale, google trends open data' },
      { property: 'og:title', content: 'À propos de SearchGTrends' },
      { property: 'og:description', content: 'Notre mission : rendre les tendances Google accessibles à tous.' },
    ],
    links: [{ rel: 'canonical', href: 'https://www.searchgtrends.com/a-propos' }],
  }),
  component: AboutPage,
})

function AboutPage() {
  const stats = [
    { val: '10', label: 'Pays analysés', desc: 'France, USA, UK, Allemagne, Japon, Brésil, Inde, Corée du Sud, Mexique, Nigeria' },
    { val: '100+', label: 'Tendances/jour', desc: 'Mots-clés collectés et analysés chaque matin automatiquement' },
    { val: '365', label: 'Jours/an', desc: 'Mise à jour quotidienne sans interruption via GitHub Actions' },
    { val: '6', label: 'Catégories', desc: 'Actualité, Sport, Tech, Divertissement, Santé, Économie' },
  ]

  const team = [
    { role: 'Vision & Stratégie', desc: 'Rendre les données de tendances Google accessibles gratuitement à tous — créateurs de contenu, journalistes, analystes et curieux.' },
    { role: 'Technologie', desc: 'Stack moderne : React 19, TanStack Router, Vite 8, TypeScript strict. Données via RapidAPI Google Trends, automatisées par GitHub Actions.' },
    { role: 'Design', desc: 'Interface premium pensée pour la lisibilité des données : dark mode, typographie soignée, visualisations claires et accessibles.' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '100px 24px 60px', flex: 1 }}>

        {/* Hero */}
        <div style={{ marginBottom: 72 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Notre histoire</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}>
            Rendre visible ce que<br />
            <span className="gradient-text">le monde recherche</span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(240,242,248,0.6)', lineHeight: 1.8, maxWidth: 640 }}>
            SearchGTrends est né d'une conviction simple : les données de recherche Google sont parmi les indicateurs les plus précis de ce qui préoccupe, fascine ou passionne une population — mais elles restent souvent inaccessibles ou illisibles pour le grand public.
          </p>
        </div>

        {/* Mission */}
        <section style={{ marginBottom: 72 }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24 }}>Notre mission</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🔍', title: 'Transparence', desc: 'Rendre publiques et lisibles les données de tendances Google que des entreprises payent des milliers d\'euros pour accéder. Nous les mettons à disposition gratuitement.' },
              { icon: '🌍', title: 'Perspective globale', desc: 'Ce qui est viral en France ne l\'est pas forcément au Japon ou au Nigeria. Comprendre ces différences culturelles est essentiel dans un monde interconnecté.' },
              { icon: '⚡', title: 'Réactivité', desc: 'Les tendances bougent vite. Notre système automatisé récupère et publie les données chaque matin à 8h, sans intervention humaine.' },
              { icon: '🤖', title: 'Intelligence', desc: 'Au-delà des chiffres bruts, notre module AI × GEO croise les données pour révéler des patterns géographiques et culturels invisibles à l\'œil nu.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#f0f2f8' }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(240,242,248,0.45)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section style={{ marginBottom: 72 }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24 }}>SearchGTrends en chiffres</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {stats.map(({ val, label, desc }) => (
              <div key={label} className="card" style={{ padding: 24 }}>
                <p className="font-display" style={{ fontSize: 40, fontWeight: 800, color: '#6366f1', letterSpacing: '-0.03em', marginBottom: 4 }}>{val}</p>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.35)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works summary */}
        <section style={{ marginBottom: 72 }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Comment ça fonctionne</h2>
          <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.4)', marginBottom: 28 }}>Vue simplifiée — <Link to="/methodologie" style={{ color: '#6366f1', textDecoration: 'none' }}>voir la méthodologie complète →</Link></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { step: '01', title: 'Collecte automatique', desc: 'Chaque matin à 6h UTC, un script GitHub Actions interroge l\'API Google Trends via RapidAPI pour les 10 pays configurés.' },
              { step: '02', title: 'Traitement et enrichissement', desc: 'Les mots-clés collectés sont catégorisés (Sport, Tech, Actualité...) et enrichis avec leur variation sur 7 jours.' },
              { step: '03', title: 'Publication', desc: 'Les données sont commitées dans le repo GitHub, déclenchant automatiquement un redéploiement Vercel en moins de 60 secondes.' },
              { step: '04', title: 'Affichage', desc: 'Le site charge les données fraîches depuis /data/trends.json avec un fallback intelligent sur les données de la veille si la collecte échoue.' },
            ].map(({ step, title, desc }, i, arr) => (
              <div key={step} style={{ display: 'flex', gap: 20, paddingBottom: i < arr.length - 1 ? 28 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#a5b4fc' }}>{step}</div>
                  {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.06)', marginTop: 8 }} />}
                </div>
                <div style={{ paddingBottom: 8 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, marginTop: 8 }}>{title}</p>
                  <p style={{ fontSize: 13, color: 'rgba(240,242,248,0.45)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section style={{ marginBottom: 72 }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24 }}>Stack technique</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { name: 'React 19', role: 'UI Framework', color: '#06b6d4' },
              { name: 'TanStack Router', role: 'Routing & SEO', color: '#f59e0b' },
              { name: 'Vite 8', role: 'Build tool', color: '#a855f7' },
              { name: 'TypeScript', role: 'Type safety', color: '#6366f1' },
              { name: 'GitHub Actions', role: 'Automatisation', color: '#10b981' },
              { name: 'Vercel', role: 'Déploiement', color: '#f0f2f8' },
              { name: 'RapidAPI', role: 'Données Trends', color: '#f43f5e' },
              { name: 'Recharts', role: 'Visualisations', color: '#06b6d4' },
              { name: 'Tailwind CSS v4', role: 'Styles', color: '#a855f7' },
            ].map(({ name, role, color }) => (
              <div key={name} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 2 }}>{name}</p>
                <p style={{ fontSize: 11, color: 'rgba(240,242,248,0.3)' }}>{role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section style={{ marginBottom: 56 }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 24 }}>Roadmap</h2>
          <div className="card" style={{ padding: 32, background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.04))', borderColor: 'rgba(99,102,241,0.2)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['✅', 'done', 'Interface premium dark mode'],
                ['✅', 'done', 'Données simulées pour 10 pays'],
                ['✅', 'done', 'Fetch automatique quotidien (GitHub Actions)'],
                ['✅', 'done', 'Pages SEO par pays, catégorie et tendance'],
                ['✅', 'done', 'Analyse AI × GEO Intelligence'],
                ['✅', 'done', 'Page Méthodologie et À propos'],
                ['🔄', 'progress', 'Intégration Google Trends API réelle (juin 2026)'],
                ['🔄', 'progress', 'Publication automatique X/LinkedIn avec screenshots'],
                ['📋', 'todo', 'Alertes email tendances personnalisées'],
                ['📋', 'todo', 'Comparaison entre 2 pays en temps réel'],
                ['📋', 'todo', 'Export CSV et API publique'],
                ['📋', 'todo', '25 pays couverts (phase 2)'],
              ].map(([icon, status, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 16, width: 24 }}>{icon}</span>
                  <span style={{ fontSize: 14, color: status === 'done' ? 'rgba(240,242,248,0.75)' : status === 'progress' ? '#a5b4fc' : 'rgba(240,242,248,0.3)', fontWeight: status === 'done' ? 500 : 400 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/trending" style={{ padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            🔥 Voir les tendances live
          </Link>
          <Link to="/methodologie" style={{ padding: '12px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a5b4fc', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            📊 Notre méthodologie
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  )
}
