import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/legal/cookies')({
  head: () => ({
    meta: [
      { title: 'Politique cookies | SearchGTrends' },
      { name: 'description', content: 'Politique d\'utilisation des cookies sur SearchGTrends. Aucun cookie publicitaire. Explication détaillée des cookies techniques utilisés.' },
      { name: 'robots', content: 'noindex, follow' },
    ],
  }),
  component: CookiesPage,
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16, color: '#f0f2f8', paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.55)', lineHeight: 1.85, marginBottom: 12 }}>{children}</p>
}

function CookiesPage() {
  const cookies = [
    {
      name: '__vercel_live_token',
      provider: 'Vercel',
      purpose: 'Nécessaire au bon fonctionnement des déploiements et previews Vercel',
      type: 'Technique',
      duration: 'Session',
      essential: true,
    },
    {
      name: '_ga, _ga_*',
      provider: 'N/A',
      purpose: 'Non utilisé — SearchGTrends n\'intègre pas Google Analytics',
      type: 'Analytique',
      duration: '—',
      essential: false,
      used: false,
    },
    {
      name: 'Cookies publicitaires',
      provider: 'N/A',
      purpose: 'Non utilisé — aucune publicité sur SearchGTrends',
      type: 'Publicitaire',
      duration: '—',
      essential: false,
      used: false,
    },
    {
      name: 'Cookies de réseaux sociaux',
      provider: 'N/A',
      purpose: 'Non utilisé — aucun bouton de partage social intégré',
      type: 'Social',
      duration: '—',
      essential: false,
      used: false,
    },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '100px 24px 60px', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(240,242,248,0.3)', marginBottom: 24 }}>
            <Link to="/" style={{ color: 'rgba(240,242,248,0.3)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span>Politique cookies</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>🍪 Cookies</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Politique cookies
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.35)', marginBottom: 20 }}>
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div style={{ padding: '16px 20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10 }}>
            <p style={{ fontSize: 14, color: '#34d399', lineHeight: 1.7 }}>
              🎉 <strong>Bonne nouvelle :</strong> SearchGTrends utilise un minimum absolu de cookies. Zéro cookie publicitaire. Zéro tracking. Zéro profilage.
            </p>
          </div>
        </div>

        <Section title="1. Qu'est-ce qu'un cookie ?">
          <P>Un cookie est un petit fichier texte déposé sur votre navigateur par un site web lors de votre visite. Il permet au site de mémoriser des informations sur votre passage, comme vos préférences de navigation ou votre état de connexion.</P>
          <P>La législation européenne (Directive ePrivacy et RGPD) impose aux sites web d'informer les utilisateurs sur l'utilisation des cookies et d'obtenir leur consentement pour les cookies non essentiels.</P>
        </Section>

        <Section title="2. Cookies utilisés sur SearchGTrends">
          <P>SearchGTrends adopte une politique de <strong style={{ color: '#f0f2f8' }}>cookies minimaliste</strong>. Voici le tableau exhaustif des cookies présents ou absents :</P>

          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {['Cookie', 'Fournisseur', 'Finalité', 'Durée', 'Statut'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'rgba(240,242,248,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cookies.map((c, i) => (
                  <tr key={c.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 12, color: '#a5b4fc', verticalAlign: 'top' }}>{c.name}</td>
                    <td style={{ padding: '12px 14px', color: 'rgba(240,242,248,0.6)', verticalAlign: 'top' }}>{c.provider}</td>
                    <td style={{ padding: '12px 14px', color: 'rgba(240,242,248,0.45)', fontSize: 12, lineHeight: 1.6, verticalAlign: 'top' }}>{c.purpose}</td>
                    <td style={{ padding: '12px 14px', color: 'rgba(240,242,248,0.4)', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{c.duration}</td>
                    <td style={{ padding: '12px 14px', verticalAlign: 'top' }}>
                      {c.used === false ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}>
                          🚫 Absent
                        </span>
                      ) : c.essential ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }}>
                          ⚙️ Technique
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)' }}>
                          ⚠️ Optionnel
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="3. Cookies strictement nécessaires">
          <P>Ces cookies sont indispensables au fonctionnement technique du site. Ils ne nécessitent pas votre consentement au titre de l'article 82 de la loi Informatique et Libertés.</P>
          <div style={{ padding: '16px 20px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 10 }}>
            <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.6)', lineHeight: 1.7 }}>
              <strong style={{ color: '#a5b4fc' }}>Infrastructure Vercel :</strong> Vercel peut déposer des cookies techniques liés à la gestion du réseau CDN et aux fonctionnalités de sécurité (protection contre les attaques DDoS, gestion des sessions de déploiement). Ces cookies n'identifient pas l'utilisateur et ne sont pas partagés avec des tiers.
            </p>
          </div>
        </Section>

        <Section title="4. Ce que SearchGTrends n'utilise PAS">
          <P>Nous tenons à être transparents sur les pratiques que SearchGTrends <strong style={{ color: '#f43f5e' }}>n'utilise pas</strong> :</P>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '🚫', label: 'Google Analytics ou tout autre outil d\'analytics avec cookies' },
              { icon: '🚫', label: 'Publicités (Google Ads, Meta Ads, etc.)' },
              { icon: '🚫', label: 'Pixels de tracking Facebook, TikTok, LinkedIn' },
              { icon: '🚫', label: 'Boutons de partage réseaux sociaux (qui déposent des cookies tiers)' },
              { icon: '🚫', label: 'Chatbots ou widgets tiers' },
              { icon: '🚫', label: 'A/B testing avec cookies' },
              { icon: '🚫', label: 'Retargeting ou remarketing publicitaire' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', gap: 12, padding: '10px 16px', background: 'rgba(244,63,94,0.04)', borderRadius: 8, border: '1px solid rgba(244,63,94,0.1)' }}>
                <span>{icon}</span>
                <span style={{ fontSize: 13, color: 'rgba(240,242,248,0.55)' }}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="5. Gestion de vos préférences">
          <P>Étant donné que SearchGTrends n'utilise pas de cookies nécessitant un consentement, aucun bandeau cookies n'est affiché. Cette approche est conforme aux recommandations de la CNIL pour les sites n'utilisant que des cookies techniques strictement nécessaires.</P>
          <P>Si vous souhaitez malgré tout bloquer tous les cookies, vous pouvez configurer votre navigateur :</P>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { browser: '🦊 Firefox', link: 'https://support.mozilla.org/fr/kb/cookies', label: 'Guide cookies Firefox' },
              { browser: '🌐 Chrome', link: 'https://support.google.com/chrome/answer/95647', label: 'Guide cookies Chrome' },
              { browser: '🧭 Safari', link: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac', label: 'Guide cookies Safari' },
              { browser: '🔷 Edge', link: 'https://support.microsoft.com/fr-fr/windows/supprimer-et-g%C3%A9rer-les-cookies', label: 'Guide cookies Edge' },
            ].map(({ browser, link, label }) => (
              <a key={browser} href={link} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'rgba(240,242,248,0.7)' }}>{browser}</span>
                <span style={{ fontSize: 11, color: '#6366f1' }}>{label} →</span>
              </a>
            ))}
          </div>
        </Section>

        <Section title="6. Mise à jour de cette politique">
          <P>Cette politique cookies peut être mise à jour pour refléter des changements dans nos pratiques ou la réglementation applicable. La date de dernière mise à jour est indiquée en haut de cette page.</P>
          <P>Pour toute question, contactez-nous via la <Link to="/contact" style={{ color: '#6366f1', textDecoration: 'none' }}>page Contact</Link>.</P>
        </Section>

        {/* Nav légal */}
        <div style={{ marginTop: 48, padding: '20px', background: 'rgba(99,102,241,0.06)', borderRadius: 12, border: '1px solid rgba(99,102,241,0.15)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(240,242,248,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Documents légaux</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              ['/legal/mentions-legales', 'Mentions légales'],
              ['/legal/confidentialite', 'Politique de confidentialité'],
              ['/legal/cookies', 'Politique cookies'],
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
