import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/legal/mentions-legales')({
  head: () => ({
    meta: [
      { title: 'Mentions légales | SearchGTrends' },
      { name: 'description', content: 'Mentions légales de SearchGTrends — informations sur l\'éditeur, l\'hébergeur et les responsabilités.' },
      { name: 'robots', content: 'noindex, follow' },
    ],
  }),
  component: MentionsLegalesPage,
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

function MentionsLegalesPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '100px 24px 60px', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(240,242,248,0.3)', marginBottom: 24, alignItems: 'center' }}>
            <Link to="/" style={{ color: 'rgba(240,242,248,0.3)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span>Mentions légales</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>⚖️ Légal</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Mentions légales
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.35)' }}>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        <Section title="1. Éditeur du site">
          <P>Le site <strong style={{ color: '#f0f2f8' }}>SearchGTrends</strong> (accessible à l'adresse www.searchgtrends.com) est édité à titre personnel par :</P>
          <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 12 }}>
            <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.6)', lineHeight: 1.8 }}>
              <strong style={{ color: '#f0f2f8' }}>Responsable de publication :</strong> SearchGTrends<br />
              <strong style={{ color: '#f0f2f8' }}>Contact :</strong> <a href="#contact" style={{ color: '#6366f1', textDecoration: 'none' }}>via la page Contact</a><br />
              <strong style={{ color: '#f0f2f8' }}>Statut :</strong> Site personnel à caractère informatif, sans activité commerciale<br />
              <strong style={{ color: '#f0f2f8' }}>Pays :</strong> France
            </p>
          </div>
        </Section>

        <Section title="2. Hébergement">
          <P>Le site SearchGTrends est hébergé par :</P>
          <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 12 }}>
            <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.6)', lineHeight: 1.8 }}>
              <strong style={{ color: '#f0f2f8' }}>Vercel Inc.</strong><br />
              340 Pine Street, Suite 701<br />
              San Francisco, CA 94104 — États-Unis<br />
              Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'none' }}>vercel.com</a>
            </p>
          </div>
          <P>Le code source est hébergé sur :</P>
          <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.6)', lineHeight: 1.8 }}>
              <strong style={{ color: '#f0f2f8' }}>GitHub, Inc. (Microsoft Corporation)</strong><br />
              88 Colin P. Kelly Jr. Street<br />
              San Francisco, CA 94107 — États-Unis<br />
              Site web : <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'none' }}>github.com</a>
            </p>
          </div>
        </Section>

        <Section title="3. Données présentées">
          <P>Les données de tendances affichées sur SearchGTrends proviennent de <strong style={{ color: '#f0f2f8' }}>Google Trends</strong> via l'API RapidAPI (google-trends8.p.rapidapi.com). Ces données sont la propriété de Google LLC et sont utilisées conformément aux conditions d'utilisation de l'API.</P>
          <P>SearchGTrends ne garantit pas l'exactitude, l'exhaustivité ou l'actualité des données affichées. Ces données sont fournies à titre informatif uniquement et ne constituent pas un conseil professionnel (marketing, financier, médical ou autre).</P>
          <P>Les pourcentages de variation et indices de popularité sont des indicateurs relatifs, normalisés par Google, et ne représentent pas des volumes absolus de recherches.</P>
        </Section>

        <Section title="4. Propriété intellectuelle">
          <P>L'ensemble du contenu original de ce site (design, textes, code source, graphiques, logo) est la propriété de SearchGTrends. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.</P>
          <P>Les marques et logos tiers mentionnés (Google, RapidAPI, Vercel, GitHub, React, etc.) sont la propriété de leurs détenteurs respectifs. Leur mention ne constitue pas un partenariat ou une endorsement.</P>
        </Section>

        <Section title="5. Responsabilité">
          <P>SearchGTrends s'efforce de fournir des informations exactes et à jour. Cependant, l'éditeur ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur ce site. En conséquence, l'éditeur décline toute responsabilité pour :</P>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {[
              'Toute imprécision, inexactitude ou omission dans les données affichées',
              'Tout dommage résultant d\'une intrusion frauduleuse d\'un tiers',
              'L\'indisponibilité temporaire du site due à des opérations de maintenance',
              'L\'utilisation faite des données par les visiteurs du site',
            ].map(item => (
              <li key={item} style={{ fontSize: 14, color: 'rgba(240,242,248,0.5)', lineHeight: 1.7 }}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="6. Liens hypertextes">
          <P>Le site SearchGTrends peut contenir des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de protection des données ou leur disponibilité.</P>
          <P>La création de liens hypertextes vers le site SearchGTrends est autorisée sans accord préalable, à condition que ces liens ne soient pas utilisés à des fins commerciales ou publicitaires et n'induisent pas en erreur l'utilisateur sur l'origine du contenu.</P>
        </Section>

        <Section title="7. Droit applicable">
          <P>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.</P>
          <P>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter via la <Link to="/contact" style={{ color: '#6366f1', textDecoration: 'none' }}>page Contact</Link>.</P>
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
