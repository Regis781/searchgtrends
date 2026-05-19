import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <span className="font-display" style={{ fontSize: 16, fontWeight: 800 }}>SearchGTrends</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(240,242,248,0.4)', lineHeight: 1.7, maxWidth: 260 }}>
              Les mots les plus recherchés dans le monde, en temps réel. 10 pays, 6 catégories, mis à jour chaque jour.
            </p>
          </div>
          {[
            { title: 'Explorer', links: [['/trending', '🔥 Trending Now'], ['/pays', 'Par pays'], ['/tendances', 'Classement mondial'], ['/ai-geo', 'AI × GEO']] },
            { title: 'Catégories', links: [['/categorie/sport', 'Sport'], ['/categorie/tech', 'Tech'], ['/categorie/actualite', 'Actualité'], ['/categorie/divertissement', 'Divertissement']] },
            { title: 'Projet', links: [['/a-propos', 'À propos'], ['/a-propos', 'Roadmap'], ['/a-propos', 'API']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(240,242,248,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>{title}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([to, label]) => (
                  <li key={label}>
                    <Link to={to} style={{ fontSize: 13, color: 'rgba(240,242,248,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#a5b4fc')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,242,248,0.5)')}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.25)' }}>© {new Date().getFullYear()} SearchGTrends — Données mises à jour quotidiennement</p>
          <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.25)' }}>Propulsé par RapidAPI Google Trends</p>
        </div>
      </div>
    </footer>
  )
}
