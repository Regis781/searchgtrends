import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/methodologie/')({
  head: () => ({
    meta: [
      { title: 'Méthodologie — Comment SearchGTrends calcule les tendances Google' },
      { name: 'description', content: 'Comment SearchGTrends collecte, traite et publie les tendances Google. Explication de notre méthode de calcul, sources de données, fréquence de mise à jour et limites connues.' },
      { name: 'keywords', content: 'méthodologie google trends, calcul tendances recherche, source données trends, api google trends explication, indice popularité recherche' },
      { property: 'og:title', content: 'Méthodologie SearchGTrends — Transparence totale sur nos données' },
      { property: 'og:description', content: 'Comment nous collectons et traitons les tendances Google dans 10 pays chaque jour.' },
    ],
    links: [{ rel: 'canonical', href: 'https://www.searchgtrends.com/methodologie' }],
  }),
  component: MethodologiePage,
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 64 }}>
      <h2 className="font-display" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 20, color: '#f0f2f8' }}>{title}</h2>
      {children}
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: 'rgba(240,242,248,0.55)', lineHeight: 1.8, marginBottom: 14 }}>{children}</p>
}

function MethodologiePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px 60px', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Transparence</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
            Notre méthodologie
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(240,242,248,0.5)', lineHeight: 1.8 }}>
            Transparence totale sur la façon dont SearchGTrends collecte, traite et publie les données de tendances Google. Cette page explique chaque étape de notre pipeline de données.
          </p>
        </div>

        {/* Table of contents */}
        <div className="card" style={{ padding: 24, marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(240,242,248,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Table des matières</p>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              '1. Source des données',
              '2. Fréquence de collecte',
              '3. Pays couverts',
              '4. Calcul de l\'indice de popularité',
              '5. Calcul de la variation',
              '6. Catégorisation automatique',
              '7. Système de fallback',
              '8. Limites connues',
              '9. Évolutions prévues',
            ].map(item => (
              <li key={item} style={{ fontSize: 14, color: 'rgba(240,242,248,0.5)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: '#6366f1', fontSize: 12 }}>→</span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <Section title="1. Source des données">
          <P>SearchGTrends utilise l'<strong style={{ color: '#f0f2f8' }}>API Google Trends via RapidAPI</strong> (endpoint <code style={{ background: 'rgba(99,102,241,0.15)', padding: '2px 6px', borderRadius: 4, fontSize: 13, color: '#a5b4fc' }}>google-trends8.p.rapidapi.com</code>). Cette API est un wrapper officiel autour des données publiques de Google Trends.</P>
          <P>Google Trends mesure l'<strong style={{ color: '#f0f2f8' }}>intérêt de recherche relatif</strong> pour des termes, normalisé sur une échelle de 0 à 100. Un score de 100 représente le pic d'intérêt pour un terme donné sur la période analysée. Un score de 50 indique un intérêt deux fois moins important. Un score de 0 signifie moins de 1% d'intérêt par rapport au pic.</P>
          <P>Ces données reflètent les recherches effectuées sur <strong style={{ color: '#f0f2f8' }}>Google Search</strong> — soit plus de 8,5 milliards de recherches quotidiennes mondiales selon les estimations actuelles.</P>
        </Section>

        <Section title="2. Fréquence de collecte">
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              {[
                { time: '06:00 UTC', label: 'Déclenchement GitHub Actions', color: '#6366f1' },
                { time: '06:01', label: 'Collecte API (10 pays × ~1.5s)', color: '#a855f7' },
                { time: '06:17', label: 'Commit trends.json', color: '#06b6d4' },
                { time: '06:18', label: 'Redéploiement Vercel', color: '#10b981' },
              ].map(({ time, label, color }, i, arr) => (
                <div key={time} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 12, fontWeight: 800, color }}>{time}</p>
                    <p style={{ fontSize: 11, color: 'rgba(240,242,248,0.35)', maxWidth: 100, lineHeight: 1.4 }}>{label}</p>
                  </div>
                  {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 18 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
          <P>La collecte est déclenchée automatiquement chaque jour à <strong style={{ color: '#f0f2f8' }}>6h00 UTC (8h00 heure de Paris)</strong> via un workflow GitHub Actions planifié (cron job). Le processus complet — collecte, traitement, commit et déploiement — prend en moyenne 35 secondes.</P>
          <P>En cas d'échec de l'API pour un pays donné, le système utilise automatiquement les données de la veille pour ce pays (système de fallback), garantissant que le site reste fonctionnel même en cas de perturbation.</P>
        </Section>

        <Section title="3. Pays couverts">
          <P>La version actuelle couvre <strong style={{ color: '#f0f2f8' }}>10 pays</strong> représentant ensemble plus de 4 milliards d'utilisateurs Internet :</P>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
            {[
              ['🇫🇷', 'France', 'fr-FR', 'Européen francophone'],
              ['🇺🇸', 'États-Unis', 'en-US', 'Plus grand marché Internet'],
              ['🇬🇧', 'Royaume-Uni', 'en-GB', 'Européen anglophone'],
              ['🇩🇪', 'Allemagne', 'de-DE', 'Premier marché européen'],
              ['🇯🇵', 'Japon', 'ja-JP', 'Leader tech asiatique'],
              ['🇧🇷', 'Brésil', 'pt-BR', 'Premier marché Amérique latine'],
              ['🇮🇳', 'Inde', 'en-IN', 'Plus forte croissance Internet'],
              ['🇰🇷', 'Corée du Sud', 'ko-KR', 'Innovation & culture K-pop'],
              ['🇲🇽', 'Mexique', 'es-MX', 'Second marché hispanophone'],
              ['🇳🇬', 'Nigeria', 'en-NG', 'Premier marché africain'],
            ].map(([flag, name, locale, note]) => (
              <div key={name} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{flag}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#f0f2f8' }}>{name} <span style={{ color: 'rgba(240,242,248,0.3)', fontWeight: 400 }}>({locale})</span></p>
                  <p style={{ fontSize: 11, color: 'rgba(240,242,248,0.3)' }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
          <P>Le choix de ces pays couvre 5 continents et permet une vision réellement mondiale des tendances de recherche, tout en restant dans les limites du plan gratuit de l'API (500 requêtes/mois).</P>
        </Section>

        <Section title="4. Calcul de l'indice de popularité">
          <P>L'indice de popularité affiché (0–100) correspond directement au <strong style={{ color: '#f0f2f8' }}>Google Trends Interest Score</strong> renvoyé par l'API. Cet indice est :</P>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {[
              'Normalisé sur une échelle de 0 à 100 (100 = pic absolu sur la période)',
              'Relatif — il compare les termes entre eux, pas en volumes absolus',
              'Calculé sur une fenêtre glissante de 24h pour les tendances "trending now"',
              'Basé sur un échantillon représentatif des recherches, pas exhaustif',
            ].map(item => (
              <li key={item} style={{ fontSize: 14, color: 'rgba(240,242,248,0.5)', lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
          <P>⚠️ <strong style={{ color: '#f0f2f8' }}>Important</strong> : un score de 100 ne signifie pas "100 millions de recherches". Cela signifie que c'est le terme le plus populaire sur la période. Un score de 50 indique un volume deux fois moins élevé que le pic — pas 50 millions de recherches.</P>
        </Section>

        <Section title="5. Calcul de la variation">
          <P>Le pourcentage de variation affiché (+X%) représente l'<strong style={{ color: '#f0f2f8' }}>évolution de l'intérêt de recherche par rapport à la veille</strong>. Par exemple :</P>
          <div className="card" style={{ padding: 20, marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
              {[
                { val: '+88%', label: 'Roland Garros', desc: 'Début du tournoi — forte hausse soudaine', color: '#34d399' },
                { val: '+5%', label: 'Météo Paris', desc: 'Légère hausse — terme régulier', color: '#6366f1' },
                { val: '-8%', label: 'ChatGPT', desc: 'Légère baisse après période de pic', color: '#f43f5e' },
              ].map(({ val, label, desc, color }) => (
                <div key={label}>
                  <p className="font-display" style={{ fontSize: 28, fontWeight: 800, color, marginBottom: 4 }}>{val}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 11, color: 'rgba(240,242,248,0.3)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <P>Les variations supérieures à +100% indiquent un terme qui était quasi-inexistant la veille et devient soudainement viral — souvent lié à un événement, une annonce ou un phénomène culturel soudain.</P>
        </Section>

        <Section title="6. Catégorisation automatique">
          <P>Chaque terme collecté est automatiquement assigné à l'une des <strong style={{ color: '#f0f2f8' }}>6 catégories</strong> par notre algorithme de classification basé sur des mots-clés :</P>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
            {[
              { cat: '⚽ Sport', keywords: 'foot, basket, tennis, league, NBA, NFL, cricket, rugby, olymp...' },
              { cat: '💻 Tech', keywords: 'AI, GPU, iPhone, Android, ChatGPT, OpenAI, Apple, Meta...' },
              { cat: '📰 Actualité', keywords: 'élection, guerre, politique, météo, gouvernement, ministre...' },
              { cat: '🎭 Divertissement', keywords: 'Netflix, film, série, musique, concert, K-pop, celebrity...' },
              { cat: '🏥 Santé', keywords: 'virus, vaccin, médecin, symptôme, cancer, dengue, diet...' },
              { cat: '💰 Économie', keywords: 'bourse, Bitcoin, crypto, inflation, dollar, euro, invest...' },
            ].map(({ cat, keywords }) => (
              <div key={cat} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{cat}</p>
                <p style={{ fontSize: 11, color: 'rgba(240,242,248,0.3)', fontFamily: 'monospace' }}>{keywords}</p>
              </div>
            ))}
          </div>
          <P>Les termes ne correspondant à aucune catégorie spécifique sont classés en <strong style={{ color: '#f0f2f8' }}>Actualité</strong> par défaut. La précision de ce système est estimée à ~75% — une classification IA plus précise est prévue dans une prochaine version.</P>
        </Section>

        <Section title="7. Système de fallback">
          <P>Pour garantir la disponibilité du site 24h/24, SearchGTrends implémente un système de fallback à deux niveaux :</P>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {[
              { level: 'Niveau 1', desc: 'Si l\'API échoue pour un pays spécifique → utilisation des données statiques pré-configurées pour ce pays', color: '#f59e0b' },
              { level: 'Niveau 2', desc: 'Si le fichier trends.json est vide ou corrompu → utilisation des données statiques du code source', color: '#f43f5e' },
            ].map(({ level, desc, color }) => (
              <div key={level} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: `1px solid ${color}20` }}>
                <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 70, flexShrink: 0 }}>{level}</span>
                <span style={{ fontSize: 13, color: 'rgba(240,242,248,0.5)', lineHeight: 1.6 }}>{desc}</span>
              </div>
            ))}
          </div>
          <P>Le badge d'état en haut de chaque page indique si les données affichées sont des données API réelles ou des données de fallback.</P>
        </Section>

        <Section title="8. Limites connues">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {[
              'Les données Google Trends sont relatives et non absolues — impossible de connaître le volume réel de recherches.',
              'Le plan gratuit RapidAPI est limité à 500 requêtes/mois — suffisant pour 1 collecte/jour × 10 pays, mais sans marge pour des tests excessifs.',
              'La catégorisation automatique par mots-clés a une précision ~75% — des erreurs de classification sont possibles.',
              'Les tendances très récentes (dernières heures) peuvent ne pas encore apparaître dans la collecte du matin.',
              'Certains pays comme la Chine ou la Russie ont des données Google limitées du fait de leur marché de recherche national spécifique.',
            ].map((limit, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'rgba(244,63,94,0.04)', borderRadius: 8, border: '1px solid rgba(244,63,94,0.12)' }}>
                <span style={{ color: '#f87171', fontSize: 14, flexShrink: 0 }}>⚠️</span>
                <span style={{ fontSize: 13, color: 'rgba(240,242,248,0.5)', lineHeight: 1.6 }}>{limit}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="9. Évolutions prévues">
          <P>La méthodologie de SearchGTrends est amenée à évoluer :</P>
          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🤖', text: 'Classification IA des tendances avec un modèle de langage pour une catégorisation plus précise' },
              { icon: '📊', text: 'Données historiques sur 30 jours pour identifier les tendances longues durée' },
              { icon: '🌍', text: 'Extension à 25 pays couverts (phase 2)' },
              { icon: '🔔', text: 'Alertes en temps réel pour les pics de tendances anormaux' },
              { icon: '📡', text: 'API publique pour permettre aux développeurs d\'accéder aux données' },
            ].map(({ icon, text }) => (
              <li key={text} style={{ display: 'flex', gap: 12, fontSize: 14, color: 'rgba(240,242,248,0.55)', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </Section>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
          <Link to="/a-propos" style={{ padding: '12px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a5b4fc', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            ← À propos
          </Link>
          <Link to="/trending" style={{ padding: '12px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            🔥 Voir les tendances
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  )
}
