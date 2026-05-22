import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact | SearchGTrends' },
      { name: 'description', content: 'Contactez l\'équipe SearchGTrends pour toute question, signalement d\'erreur, partenariat ou demande RGPD.' },
      { name: 'robots', content: 'noindex, follow' },
    ],
  }),
  component: ContactPage,
})

// Email obfusqué — protection anti-spam
const EMAIL_PARTS = ['searchgtrends', '@', 'gmail', '.', 'com']

function ContactPage() {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const email = EMAIL_PARTS.join('')

  function revealEmail() {
    setRevealed(true)
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '100px 24px 60px', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(240,242,248,0.3)', marginBottom: 24 }}>
            <Link to="/" style={{ color: 'rgba(240,242,248,0.3)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>✉️ Nous écrire</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Contact
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(240,242,248,0.5)', lineHeight: 1.8, maxWidth: 520 }}>
            Une question, une suggestion, un bug à signaler ou une demande RGPD ? Nous lisons chaque message et répondons sous 48h.
          </p>
        </div>

        {/* Motifs de contact */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
            {[
              { icon: '🐛', title: 'Signaler un bug', desc: 'Une donnée incorrecte, une page cassée, un comportement inattendu' },
              { icon: '💡', title: 'Suggestion', desc: 'Une idée d\'amélioration, un pays à ajouter, une fonctionnalité souhaitée' },
              { icon: '🛡️', title: 'Demande RGPD', desc: 'Exercer vos droits : accès, rectification, effacement de données' },
              { icon: '🤝', title: 'Partenariat', desc: 'Collaboration, presse, intégration ou utilisation des données' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.4)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Email card */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Adresse email
          </h2>

          <div className="card" style={{ padding: 32, background: 'linear-gradient(135deg, rgba(6,182,212,0.06), rgba(99,102,241,0.04))', borderColor: 'rgba(6,182,212,0.2)' }}>
            {!revealed ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
                <p style={{ fontSize: 15, color: 'rgba(240,242,248,0.5)', marginBottom: 24, lineHeight: 1.7 }}>
                  Pour protéger notre adresse des robots spam, elle est masquée par défaut.<br />
                  Cliquez pour la révéler.
                </p>
                <button
                  onClick={revealEmail}
                  style={{
                    padding: '12px 32px', borderRadius: 10,
                    background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
                    color: 'white', fontWeight: 700, fontSize: 15,
                    border: 'none', cursor: 'pointer',
                    boxShadow: '0 0 24px rgba(6,182,212,0.25)',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Révéler l'adresse email
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                  Adresse email
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href={`mailto:${email}`}
                    style={{
                      fontSize: 22, fontWeight: 800, color: '#f0f2f8',
                      textDecoration: 'none', fontFamily: 'monospace',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {email}
                  </a>
                  <button
                    onClick={copyEmail}
                    style={{
                      padding: '6px 16px', borderRadius: 8,
                      background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${copied ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}`,
                      color: copied ? '#34d399' : 'rgba(240,242,248,0.5)',
                      cursor: 'pointer', fontSize: 13, fontWeight: 600,
                      transition: 'all 0.2s',
                    }}
                  >
                    {copied ? '✅ Copié !' : '📋 Copier'}
                  </button>
                  <a
                    href={`mailto:${email}?subject=Contact SearchGTrends`}
                    style={{
                      padding: '6px 16px', borderRadius: 8,
                      background: 'rgba(99,102,241,0.15)',
                      border: '1px solid rgba(99,102,241,0.3)',
                      color: '#a5b4fc', cursor: 'pointer',
                      fontSize: 13, fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    ✉️ Ouvrir dans mon client mail
                  </a>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.3)', marginTop: 12, lineHeight: 1.6 }}>
                  Délai de réponse habituel : <strong style={{ color: 'rgba(240,242,248,0.5)' }}>24 à 48h</strong> en jours ouvrés
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Conseils pour bien écrire */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Pour une réponse rapide
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '✏️', tip: 'Précisez le motif de votre message dès l\'objet (ex : "Bug page France", "Demande RGPD")' },
              { icon: '📸', tip: 'Pour un bug, joignez une capture d\'écran et l\'URL de la page concernée' },
              { icon: '🌍', tip: 'Pour une demande RGPD, indiquez le type de droit que vous souhaitez exercer' },
              { icon: '🤝', tip: 'Pour un partenariat, décrivez brièvement votre projet et ce que vous proposez' },
            ].map(({ icon, tip }) => (
              <div key={tip} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                <p style={{ fontSize: 13, color: 'rgba(240,242,248,0.5)', lineHeight: 1.7 }}>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Liens légaux */}
        <div style={{ padding: '20px', background: 'rgba(99,102,241,0.06)', borderRadius: 12, border: '1px solid rgba(99,102,241,0.15)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(240,242,248,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Documents légaux</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              ['/legal/mentions-legales', 'Mentions légales'],
              ['/legal/confidentialite', 'Confidentialité'],
              ['/legal/cookies', 'Cookies'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <Link key={to} to={to} style={{ fontSize: 13, color: '#a5b4fc', textDecoration: 'none', fontWeight: 500 }}>{label}</Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
