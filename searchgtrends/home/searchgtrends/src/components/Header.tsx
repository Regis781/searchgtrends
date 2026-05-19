import { Link, useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const path = useRouterState({ select: s => s.location.pathname })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [path])

  const nav = [
    ['/trending', '🔥 Trending Now'],
    ['/pays', 'Par pays'],
    ['/ai-geo', 'AI × GEO'],
    ['/tendances', 'Classement'],
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, insetInline: 0, zIndex: 100,
      background: scrolled ? 'rgba(7,8,13,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <span className="font-display" style={{ fontSize: 17, fontWeight: 800, color: '#f0f2f8', letterSpacing: '-0.02em' }}>
            Search<span className="gradient-text">GTrends</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {nav.map(([to, label]) => (
            <Link key={to} to={to} style={{
              padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500,
              textDecoration: 'none', transition: 'all 0.15s',
              color: path.startsWith(to) ? '#a5b4fc' : 'rgba(240,242,248,0.6)',
              background: path.startsWith(to) ? 'rgba(99,102,241,0.15)' : 'transparent',
            }}>
              {label}
            </Link>
          ))}
          <Link to="/trending" style={{
            marginLeft: 8, padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white',
            textDecoration: 'none', boxShadow: '0 0 20px rgba(99,102,241,0.3)',
          }}>
            Live →
          </Link>
        </nav>
      </div>
    </header>
  )
}
