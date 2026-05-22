import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <span className="font-display" style={{ fontSize: 15, fontWeight: 800 }}>SearchGTrends</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.3)', lineHeight: 1.7 }}>
              Mots les plus recherchés sur Google dans 10 pays. Mis à jour chaque matin.
            </p>
          </div>
          {[
            { title: 'Explorer', links: [['/trending', '🔥 Trending Now'], ['/pays', 'Par pays'], ['/tendances', 'Classement'], ['/ai-geo', 'AI × GEO']] },
            { title: 'Catégories', links: [['/categorie/sport', '⚽ Sport'], ['/categorie/tech', '💻 Tech'], ['/categorie/actualite', '📰 Actualité'], ['/categorie/economie', '💰 Économie']] },
            { title: 'À propos', links: [['/a-propos', 'Notre mission'], ['/methodologie', 'Méthodologie'], ['/a-propos', 'Roadmap'], ['/contact', 'Contact']] },
            { title: 'Légal', links: [['/legal/mentions-legales', 'Mentions légales'], ['/legal/confidentialite', 'Confidentialité'], ['/legal/cookies', 'Cookies'], ['/contact', 'Contact RGPD']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(240,242,248,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>{title}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([to, label]) => (
                  <li key={label}>
                    <Link to={to} style={{ fontSize: 13, color: 'rgba(240,242,248,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#a5b4fc')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,242,248,0.4)')}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.2)' }}>© {new Date().getFullYear()} SearchGTrends — Données mises à jour quotidiennement</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/legal/mentions-legales" style={{ fontSize: 12, color: 'rgba(240,242,248,0.2)', textDecoration: 'none' }}>Mentions légales</Link>
            <Link to="/legal/confidentialite" style={{ fontSize: 12, color: 'rgba(240,242,248,0.2)', textDecoration: 'none' }}>Confidentialité</Link>
            <Link to="/legal/cookies" style={{ fontSize: 12, color: 'rgba(240,242,248,0.2)', textDecoration: 'none' }}>Cookies</Link>
            <Link to="/contact" style={{ fontSize: 12, color: 'rgba(240,242,248,0.2)', textDecoration: 'none' }}>Contact</Link>
            <a href="/sitemap.xml" style={{ fontSize: 12, color: 'rgba(240,242,248,0.2)', textDecoration: 'none' }}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
