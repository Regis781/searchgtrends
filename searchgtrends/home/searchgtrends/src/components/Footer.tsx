import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e4e7ef', marginTop: 'auto', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <span className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#0f1117' }}>
            Search<span style={{ color: '#4f46e5' }}>GTrends</span>
          </span>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
            Données simulées — intégration Google Trends API en cours
          </p>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[["/pays", "Par pays"], ["/tendances", "Tendances"], ["/a-propos", "À propos"]].map(([to, label]) => (
            <Link key={to} to={to} style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#9ca3af' }}>© {new Date().getFullYear()} SearchGTrends</p>
      </div>
    </footer>
  )
}
