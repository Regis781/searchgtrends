import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  const path = useRouterState({ select: s => s.location.pathname })

  const nav = [
    ["/", "Accueil"],
    ["/pays", "Par pays"],
    ["/tendances", "Tendances"],
    ["/a-propos", "À propos"],
  ]

  return (
    <header style={{ background: 'white', borderBottom: '1px solid #e4e7ef', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: '#4f46e5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#0f1117' }}>
            Search<span style={{ color: '#4f46e5' }}>GTrends</span>
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 4 }} className="desktop-nav">
          {nav.map(([to, label]) => (
            <Link key={to} to={to} style={{
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              color: path === to ? '#4f46e5' : '#6b7280',
              background: path === to ? '#ede9fe' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 999, padding: '4px 12px' }}>
            <span className="live-dot" />
            <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>Live</span>
          </div>
        </div>
      </div>
    </header>
  )
}
