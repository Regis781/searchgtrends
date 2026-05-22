import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/legal/confidentialite')({
  head: () => ({
    meta: [
      { title: 'Politique de confidentialité RGPD | SearchGTrends' },
      { name: 'description', content: 'Politique de confidentialité de SearchGTrends — comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.' },
      { name: 'robots', content: 'noindex, follow' },
    ],
  }),
  component: ConfidentialitePage,
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

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: color + '18', color, border: `1px solid ${color}30`, marginRight: 8 }}>
      {children}
    </span>
  )
}

function ConfidentialitePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '100px 24px 60px', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(240,242,248,0.3)', marginBottom: 24 }}>
            <Link to="/" style={{ color: 'rgba(240,242,248,0.3)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span>Politique de confidentialité</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>🛡️ RGPD</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Politique de confidentialité
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.35)', marginBottom: 20 }}>
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div style={{ padding: '16px 20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10 }}>
            <p style={{ fontSize: 14, color: '#34d399', lineHeight: 1.7 }}>
              ✅ <strong>En résumé :</strong> SearchGTrends collecte très peu de données. Nous n'utilisons pas de cookies publicitaires, ne vendons aucune donnée et ne créons aucun profil utilisateur. Conformité RGPD maximale.
            </p>
          </div>
        </div>

        <Section title="1. Responsable du traitement">
          <P>Le responsable du traitement des données collectées sur le site SearchGTrends (www.searchgtrends.com) est l'éditeur du site, joignable via la <Link to="/contact" style={{ color: '#6366f1', textDecoration: 'none' }}>page Contact</Link>.</P>
          <P>SearchGTrends est un site informatif personnel sans activité commerciale, basé en France et soumis au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679).</P>
        </Section>

        <Section title="2. Données collectées">
          <P>SearchGTrends adopte une approche de <strong style={{ color: '#f0f2f8' }}>minimisation stricte des données</strong>. Voici un état précis des données collectées :</P>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {[
              { type: 'Données de navigation', collected: '✅ Oui (anonymisées)', detail: 'Pages visitées, durée de visite, pays de provenance — via Vercel Analytics (agrégées, sans identification individuelle)', color: '#f59e0b' },
              { type: 'Adresse IP', collected: '⚠️ Transitoire', detail: 'L\'adresse IP transite par les serveurs Vercel pour le routage réseau mais n\'est pas stockée par SearchGTrends', color: '#6366f1' },
              { type: 'Cookies publicitaires', collected: '🚫 Non', detail: 'Aucun cookie publicitaire, de tracking ou de retargeting n\'est utilisé', color: '#10b981' },
              { type: 'Données d\'inscription', collected: '🚫 Non', detail: 'Aucun compte utilisateur, aucune inscription possible', color: '#10b981' },
              { type: 'Formulaire de contact', collected: '✅ Oui (volontaire)', detail: 'Uniquement l\'adresse email fournie volontairement lors d\'une prise de contact', color: '#f59e0b' },
            ].map(({ type, collected, detail, color }) => (
              <div key={type} style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#f0f2f8' }}>{type}</p>
                  <Badge color={color}>{collected}</Badge>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.4)', lineHeight: 1.6 }}>{detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="3. Finalités du traitement">
          <P>Les données de navigation anonymisées sont collectées pour les finalités suivantes :</P>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {[
              'Analyse statistique du trafic pour améliorer le contenu (quelles pages sont les plus visitées)',
              'Détection des erreurs techniques (pages cassées, temps de chargement anormaux)',
              'Compréhension géographique de l\'audience (sans identification individuelle)',
            ].map(item => (
              <li key={item} style={{ fontSize: 14, color: 'rgba(240,242,248,0.5)', lineHeight: 1.7 }}>{item}</li>
            ))}
          </ul>
          <P>La base légale de ce traitement est l'<strong style={{ color: '#f0f2f8' }}>intérêt légitime</strong> (Article 6.1.f du RGPD), les données étant strictement anonymisées et agrégées.</P>
        </Section>

        <Section title="4. Sous-traitants et transferts">
          <P>SearchGTrends utilise les services tiers suivants susceptibles de traiter des données :</P>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {[
              { name: 'Vercel Inc.', role: 'Hébergement & Analytics', rgpd: 'DPA disponible', location: '🇺🇸 USA (Standard Contractual Clauses)', link: 'https://vercel.com/legal/privacy-policy' },
              { name: 'GitHub Inc.', role: 'Hébergement code source', rgpd: 'DPA disponible', location: '🇺🇸 USA (Standard Contractual Clauses)', link: 'https://docs.github.com/privacy' },
              { name: 'RapidAPI', role: 'Données Google Trends', rgpd: 'Politique disponible', location: '🇺🇸 USA', link: 'https://rapidapi.com/privacy' },
              { name: 'Google Fonts', role: 'Polices typographiques', rgpd: 'Conforme RGPD', location: '🇺🇸 USA (SCCs)', link: 'https://developers.google.com/fonts/faq/privacy' },
            ].map(({ name, role, rgpd, location, link }) => (
              <div key={name} style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 700, color: '#6366f1', textDecoration: 'none' }}>{name}</a>
                  <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.4)' }}>{role} · {location}</p>
                </div>
                <Badge color="#10b981">{rgpd}</Badge>
              </div>
            ))}
          </div>
          <P>Ces transferts hors UE s'effectuent dans le cadre des garanties appropriées prévues par le RGPD (Clauses Contractuelles Types adoptées par la Commission européenne).</P>
        </Section>

        <Section title="5. Durée de conservation">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { type: 'Données analytiques anonymisées', duree: '13 mois glissants' },
              { type: 'Emails de contact', duree: '3 ans à compter du dernier contact' },
              { type: 'Données techniques (logs)', duree: '30 jours (gérés par Vercel)' },
            ].map(({ type, duree }) => (
              <div key={type} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'rgba(240,242,248,0.6)' }}>{type}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc' }}>{duree}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="6. Vos droits RGPD">
          <P>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</P>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[
              { droit: '👁️ Droit d\'accès', desc: 'Obtenir une copie de vos données personnelles que nous détenons' },
              { droit: '✏️ Droit de rectification', desc: 'Corriger des données inexactes vous concernant' },
              { droit: '🗑️ Droit à l\'effacement', desc: 'Demander la suppression de vos données ("droit à l\'oubli")' },
              { droit: '⏸️ Droit à la limitation', desc: 'Limiter le traitement de vos données dans certains cas' },
              { droit: '📦 Droit à la portabilité', desc: 'Recevoir vos données dans un format structuré et lisible' },
              { droit: '🚫 Droit d\'opposition', desc: 'Vous opposer au traitement basé sur l\'intérêt légitime' },
            ].map(({ droit, desc }) => (
              <div key={droit} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#f0f2f8' }}>{droit}</p>
                <p style={{ fontSize: 12, color: 'rgba(240,242,248,0.4)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
          <P>Pour exercer ces droits, contactez-nous via la <Link to="/contact" style={{ color: '#6366f1', textDecoration: 'none' }}>page Contact</Link>. Nous répondrons dans un délai maximum de <strong style={{ color: '#f0f2f8' }}>30 jours</strong>.</P>
          <P>Vous disposez également du droit d'introduire une réclamation auprès de la <strong style={{ color: '#f0f2f8' }}>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'none' }}>www.cnil.fr</a></P>
        </Section>

        <Section title="7. Sécurité">
          <P>SearchGTrends met en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données contre la perte, la destruction, l'altération ou l'accès non autorisé :</P>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Connexion HTTPS obligatoire (TLS 1.3) pour toutes les communications',
              'Hébergement sur infrastructure Vercel avec chiffrement au repos',
              'Aucune donnée sensible stockée en clair',
              'Headers de sécurité HTTP stricts (CSP, HSTS, X-Frame-Options)',
              'Revue régulière des accès aux systèmes',
            ].map(item => (
              <li key={item} style={{ fontSize: 14, color: 'rgba(240,242,248,0.5)', lineHeight: 1.7 }}>{item}</li>
            ))}
          </ul>
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
