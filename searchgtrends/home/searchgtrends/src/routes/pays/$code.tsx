import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTrends } from '@/lib/useTrends'
import { CATEGORY_COLORS, CATEGORIES, type TrendCategory } from '@/data/trends'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

// Contenu SEO statique par pays
const COUNTRY_CONTENT: Record<string, {
  title: string
  intro: string
  context: string
  searchBehavior: string
  topCategories: string
  funFact: string
}> = {
  FR: {
    title: 'Tendances Google en France',
    intro: 'La France représente l\'un des marchés Internet les plus dynamiques d\'Europe avec plus de 54 millions d\'internautes actifs. Les recherches françaises reflètent une culture unique mêlant passion pour le football, l\'actualité politique et une adoption rapide des nouvelles technologies.',
    context: 'Le marché français se distingue par sa forte appétence pour l\'information (France Info, Le Monde, BFMTV figurent parmi les sites les plus visités) et le sport, notamment la Ligue 1 et Roland Garros. L\'actualité politique génère des pics de recherche massifs lors des élections ou des annonces gouvernementales.',
    searchBehavior: 'Les Français recherchent davantage le week-end pour le sport et en semaine pour l\'actualité économique. Les événements locaux comme les grèves ou les manifestations génèrent des pics immédiats et très concentrés dans le temps.',
    topCategories: 'Sport (Ligue 1, PSG, Équipe de France), Actualité politique (Macron, gouvernement, élections), Tech (IA générative, ChatGPT, smartphones), Économie (CAC 40, inflation, immobilier)',
    funFact: 'La France est l\'un des rares pays où les recherches météo figurent systématiquement dans le top 10 — les Français vérifient la météo en moyenne 3 fois par jour selon les études comportementales.',
  },
  US: {
    title: 'Trending Searches in the United States',
    intro: 'The United States is the world\'s largest digital market with over 310 million internet users. American search trends are shaped by entertainment, sports leagues, and a constant stream of political news that influences global conversation.',
    context: 'The US market is characterized by strong sports culture (NBA, NFL, MLB), celebrity news cycles, and rapid adoption of new technologies. Events like the Super Bowl, NBA Playoffs, or Apple keynotes trigger massive search spikes visible in real-time.',
    searchBehavior: 'Americans tend to search more intensively during major live events. Breaking news from CNN or Fox News creates immediate search bursts. Entertainment-related searches peak on weekends, while financial searches (stock market, crypto) are more consistent throughout the week.',
    topCategories: 'Sports (NBA, NFL, Super Bowl), Entertainment (Taylor Swift, Netflix, movies), Tech (GPT-5, Apple, AI), Finance (Stock market, Bitcoin, crypto)',
    funFact: 'The US generates approximately 16% of all global Google searches despite representing only 4% of the world\'s population — reflecting both internet penetration and search behavior intensity.',
  },
  GB: {
    title: 'Google Search Trends in the United Kingdom',
    intro: 'The United Kingdom has one of the highest internet penetration rates in Europe at 97%. British search trends are heavily influenced by the Premier League, the Royal Family, and a uniquely British sense of humor that shapes viral content.',
    context: 'The UK market blends American pop culture influence with distinctly British concerns: NHS waiting times, cost of living, Brexit aftermath, and the Premier League dominate search patterns. The BBC remains a primary news destination, shaping what topics enter the search conversation.',
    searchBehavior: 'British searches peak around major sporting events (Wimbledon, Premier League matchdays) and political announcements. The cost of living crisis has maintained consistently high searches around energy prices and inflation since 2022.',
    topCategories: 'Football (Premier League, specific clubs), Royal Family news, NHS & Health, Cost of living & Finance',
    funFact: 'Wimbledon generates the highest single-event search spike in the UK calendar — surpassing even general elections in terms of short-term search volume intensity.',
  },
  DE: {
    title: 'Google-Trends in Deutschland',
    intro: 'Deutschland ist mit über 77 Millionen Internetnutzern der größte digitale Markt in der EU. Deutsche Suchanfragen spiegeln eine technologieaffine, wirtschaftlich orientierte Gesellschaft wider, in der Fußball und Ingenieurswesen gleichermaßen dominieren.',
    context: 'Der deutsche Markt zeichnet sich durch starkes Interesse an wirtschaftlichen Themen (DAX, Energiekosten, Inflation), Bundesliga und Technologie aus. Deutsche suchen häufig nach detaillierten Informationen — weniger nach Unterhaltung, mehr nach Fakten.',
    searchBehavior: 'Deutsche Suchanfragen sind stark von Wochentagen abhängig: Wirtschaft und Politik dominieren Werktage, Sport und Unterhaltung die Wochenenden. Saisonale Themen wie Oktoberfest oder Weihnachtsmärkte erzeugen jährliche Spitzen.',
    topCategories: 'Fußball (Bundesliga, Champions League), Wirtschaft (DAX, Inflation, Energiepreise), Technologie (KI, Tesla, E-Mobilität), Politik (Bundestag, Wahlen)',
    funFact: 'Deutschland ist das einzige große europäische Land, in dem Suchbegriffe rund um Datenschutz (DSGVO, VPN, Datensicherheit) regelmäßig in den Top-50 erscheinen.',
  },
  JP: {
    title: '日本のGoogleトレンド分析',
    intro: '日本は約1億人のインターネットユーザーを持つ、アジア有数のデジタル市場です。日本の検索傾向は、アニメ・マンガ文化、地震速報、そして世界最先端のテクノロジーへの関心を反映しています。',
    context: '日本市場はアニメ・エンターテインメントと最先端技術が共存する独特の市場です。地震速報は常に検索上位に位置し、自然災害への高い関心を示しています。NvidiaのGPUや生成AIへの検索は他のアジア諸国より3倍高いという特徴があります。',
    searchBehavior: '日本の検索は時間帯により大きく変化します。朝の通勤時間帯（7-9時）はニュース検索が急増し、夜間（21-23時）はエンターテインメントとアニメ関連の検索が最高潮に達します。',
    topCategories: 'アニメ・エンターテインメント、地震・気象情報、テクノロジー（GPU、AI）、スポーツ（プロ野球、侍ジャパン）',
    funFact: '日本は世界で最もアニメ関連の検索が多い国です。新しいアニメシーズン開始時には、関連検索が通常の5〜10倍に達することがあります。',
  },
  BR: {
    title: 'Tendências de Pesquisa no Brasil',
    intro: 'O Brasil é o maior mercado digital da América Latina, com mais de 165 milhões de usuários de internet. As tendências de busca brasileiras refletem a paixão nacional pelo futebol, a efervescência cultural do Carnaval e uma crescente adoção de tecnologias financeiras.',
    context: 'O mercado brasileiro é marcado por picos de busca ligados ao calendário esportivo (Campeonato Brasileiro, Copa do Mundo) e festas populares. A instabilidade da moeda gera buscas constantes sobre câmbio, enquanto o preço do dólar em reais é um dos termos mais pesquisados no país.',
    searchBehavior: 'As buscas brasileiras têm forte caráter social e emocional. Eventos ao vivo como jogos de futebol ou shows musicais geram picos imensos e imediatos. O WhatsApp é o principal canal de difusão de temas virais antes que eles apareçam no Google.',
    topCategories: 'Futebol (Brasileirão, Seleção, clubes), Carnaval & Entretenimento, Tecnologia (IA, ChatGPT), Finanças (Bitcoin, Dólar, inflação)',
    funFact: 'O Brasil é o país com maior crescimento de buscas relacionadas a IA generativa na América Latina — superando México e Argentina juntos em termos de volume de pesquisa sobre ChatGPT.',
  },
  IN: {
    title: 'Google Search Trends in India',
    intro: 'India is the world\'s fastest-growing internet market with over 900 million users and still expanding rapidly. Indian search trends are defined by cricket, Bollywood, and a massive technology-first generation driving AI and fintech adoption.',
    context: 'India\'s digital landscape is uniquely diverse: searches span 22 official languages, though English and Hindi dominate. Cricket — particularly IPL — generates search volumes comparable to the Super Bowl in the US. The monsoon season creates predictable weather-related search spikes every June-September.',
    searchBehavior: 'Indian users show strong mobile-first behavior with 75%+ of searches on smartphones. Evening hours (6-10 PM IST) see the highest search activity, coinciding with peak entertainment consumption. Regional news events can generate hyper-local search spikes invisible in aggregate national data.',
    topCategories: 'Cricket (IPL, Team India), Bollywood (new releases, celebrities), Technology (AI jobs, ChatGPT, smartphones), Health (Dengue, monsoon diseases)',
    funFact: 'India overtook the United States as the country with the most Google searches per day in 2023 — a historic shift reflecting the country\'s digital transformation speed.',
  },
  KR: {
    title: '한국의 구글 트렌드 분석',
    intro: '대한민국은 세계 최고 수준의 인터넷 보급률(98%)을 자랑하는 디지털 선진국입니다. 한국의 검색 트렌드는 K-드라마, K-팝, 삼성 등 글로벌 문화 현상과 첨단 기술 혁신을 반영합니다.',
    context: '한국 시장은 엔터테인먼트와 기술이 독특하게 결합된 시장입니다. K-팝 컴백과 K-드라마 공개는 즉각적인 글로벌 파급 효과를 일으키며 국내 검색량을 폭발적으로 증가시킵니다. 부동산과 주식 관련 검색도 높은 관심을 받고 있습니다.',
    searchBehavior: '한국 이용자들은 실시간 이슈에 매우 민감하게 반응합니다. BTS나 블랙핑크 관련 소식은 공개 후 수 분 내에 검색량이 정점에 달합니다. 주요 스포츠 경기(손흥민, 야구)도 실시간 검색 급증을 유발합니다.',
    topCategories: 'K-드라마 & K-팝, 삼성 & 기술 혁신, 주식 & 부동산, 스포츠 (손흥민, 야구)',
    funFact: '한국은 전 세계에서 1인당 넷플릭스 K-콘텐츠 검색 비율이 가장 높은 나라입니다. 새로운 K-드라마가 공개될 때마다 관련 검색어가 전 세계적으로 동시에 급증하는 패턴이 관찰됩니다.',
  },
  MX: {
    title: 'Tendencias de Búsqueda en México',
    intro: 'México es el segundo mercado digital más grande de América Latina con más de 88 millones de usuarios de internet. Las búsquedas mexicanas reflejan una sociedad vibrante donde el fútbol, la política y una cultura digital en rápida evolución coexisten.',
    context: 'El mercado mexicano se caracteriza por el dominio de la Liga MX y la Selección Nacional, así como por el interés constante en temas económicos como el tipo de cambio peso-dólar. Las telenovelas siguen siendo relevantes, aunque compiten cada vez más con plataformas de streaming.',
    searchBehavior: 'Las búsquedas mexicanas muestran patrones fuertemente estacionales: Día de Muertos, Navidad, el Mundial y las elecciones presidenciales generan picos masivos y predecibles. Las búsquedas relacionadas con seguridad y noticias de última hora también son frecuentes.',
    topCategories: 'Fútbol (Liga MX, Selección, Champions), Política (gobierno, elecciones), Economía (tipo de cambio, inflación), Entretenimiento (telenovelas, Netflix)',
    funFact: 'México es el país hispanohablante con mayor crecimiento en búsquedas de inteligencia artificial, superando a España y Argentina — reflejando la adopción tecnológica acelerada de la generación millennial mexicana.',
  },
  NG: {
    title: 'Google Search Trends in Nigeria',
    intro: 'Nigeria is Africa\'s largest digital market with over 100 million internet users and the continent\'s most vibrant tech ecosystem — home to a booming fintech sector and a global cultural export machine with Afrobeats leading the way.',
    context: 'Nigeria\'s search landscape is dominated by football (Super Eagles, AFCON), Afrobeats music, and a strong interest in cryptocurrency and fintech — partly driven by Naira volatility. Nollywood remains the world\'s second-largest film industry by output, generating significant search traffic.',
    searchBehavior: 'Nigerian users are highly mobile-first (90%+ mobile searches) and heavily influenced by WhatsApp-driven viral content. Fintech searches (Flutterwave, Opay, crypto) are consistently high, reflecting the country\'s position as Africa\'s fintech capital.',
    topCategories: 'Football (Super Eagles, AFCON, EPL), Afrobeats (Burna Boy, Wizkid, new releases), Crypto & Fintech (Naira exchange rate, Bitcoin), Nollywood',
    funFact: 'Nigeria has the highest per-capita interest in cryptocurrency of any country worldwide according to Google Trends data — driven by the need to hedge against Naira depreciation and limited access to traditional banking.',
  },
}

export const Route = createFileRoute('/pays/$code')({
  component: CountryPage,
})

function CountryPage() {
  const { code } = Route.useParams()
  const { countries } = useTrends()
  const [cat, setCat] = useState<TrendCategory | 'Tous'>('Tous')
  const [showChart, setShowChart] = useState(false)

  const country = countries.find(c => c.code === code.toUpperCase())
  const content = COUNTRY_CONTENT[code.toUpperCase()]

  if (!country) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 48 }}>🔍</p>
      <p style={{ fontSize: 18, fontWeight: 700 }}>Pays introuvable</p>
      <Link to="/pays" style={{ color: '#6366f1', textDecoration: 'none' }}>← Retour aux pays</Link>
    </div>
  )

  const filtered = cat === 'Tous' ? country.trends : country.trends.filter(t => t.category === cat)
  const topRise = [...country.trends].sort((a, b) => b.change - a.change)[0]
  const topVol = [...country.trends].sort((a, b) => b.volume - a.volume)[0]
  const explosions = country.trends.filter(t => t.change > 50).length

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 24px 60px', width: '100%', flex: 1 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(240,242,248,0.3)', marginBottom: 32, alignItems: 'center' }}>
          <Link to="/" style={{ color: 'rgba(240,242,248,0.3)', textDecoration: 'none' }}>Accueil</Link>
          <span>/</span>
          <Link to="/pays" style={{ color: 'rgba(240,242,248,0.3)', textDecoration: 'none' }}>Pays</Link>
          <span>/</span>
          <span>{country.name}</span>
        </div>

        {/* Hero */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 40 }}>
          <span style={{ fontSize: 72, lineHeight: 1 }}>{country.flag}</span>
          <div>
            <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8, lineHeight: 1.1 }}>
              {content?.title ?? `Tendances Google — ${country.name}`}
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.4)' }}>
              {country.trends.length} tendances analysées · {explosions} en forte hausse
            </p>
          </div>
        </div>

        {/* Intro SEO text */}
        {content && (
          <div className="card" style={{ padding: 28, marginBottom: 36, borderLeft: '3px solid #6366f1' }}>
            <p style={{ fontSize: 15, color: 'rgba(240,242,248,0.6)', lineHeight: 1.8 }}>{content.intro}</p>
          </div>
        )}

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36 }}>
          {[
            { label: '🔥 Plus forte hausse', val: topRise?.keyword, sub: `+${topRise?.change}%`, color: '#f43f5e' },
            { label: '📈 Plus populaire', val: topVol?.keyword, sub: `Volume ${topVol?.volume}`, color: '#6366f1' },
            { label: '⚡ En explosion', val: `${explosions}`, sub: 'tendances > +50%', color: '#f59e0b' },
          ].map(({ label, val, sub, color }) => (
            <div key={label} className="card" style={{ padding: 20, borderLeft: `3px solid ${color}` }}>
              <p style={{ fontSize: 11, color: 'rgba(240,242,248,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#f0f2f8', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</p>
              <p style={{ fontSize: 12, color, fontWeight: 700 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['Tous', ...CATEGORIES] as (TrendCategory | 'Tous')[]).map(c => {
              const color = c === 'Tous' ? '#6366f1' : CATEGORY_COLORS[c as TrendCategory]
              const active = cat === c
              return (
                <button key={c} onClick={() => setCat(c)}
                  style={{ padding: '5px 14px', borderRadius: 999, border: '1px solid', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: 'none', transition: 'all 0.15s',
                    borderColor: active ? color : 'rgba(255,255,255,0.08)', color: active ? color : 'rgba(240,242,248,0.4)',
                    boxShadow: active ? `0 0 10px ${color}25` : 'none' }}>
                  {c}
                </button>
              )
            })}
          </div>
          <button onClick={() => setShowChart(!showChart)}
            style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: showChart ? '#a5b4fc' : 'rgba(240,242,248,0.4)' }}>
            {showChart ? '📉 Masquer graphiques' : '📊 Graphiques 7j'}
          </button>
        </div>

        {/* Trends */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 56 }}>
          {filtered.map((t, i) => {
            const color = CATEGORY_COLORS[t.category as TrendCategory] ?? '#6366f1'
            const chartData = t.history.map((v, j) => ({ day: DAYS[j], v }))
            return (
              <div key={t.keyword} className="card" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span className="font-display" style={{ fontSize: 20, fontWeight: 800, color: 'rgba(240,242,248,0.15)', minWidth: 28, textAlign: 'right' }}>{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{t.keyword}</span>
                      <span className="badge" style={{ background: color + '18', color, border: `1px solid ${color}25` }}>{t.category}</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99 }}>
                      <div style={{ height: '100%', width: `${t.volume}%`, background: `linear-gradient(90deg, ${color}, ${color}60)`, borderRadius: 99 }} />
                    </div>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 800, color: t.change > 0 ? '#34d399' : '#f43f5e', minWidth: 60, textAlign: 'right' }}>
                    {t.change > 0 ? '+' : ''}{t.change}%
                  </span>
                </div>
                {showChart && (
                  <div style={{ height: 60, marginTop: 12 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                        <defs>
                          <linearGradient id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'rgba(240,242,248,0.2)' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: '#0e1018', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [v, 'Volume']} />
                        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#g${i})`} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* SEO rich content */}
        {content && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>
              Comprendre les recherches en {country.name}
            </h2>
            {[
              { label: '🌐 Contexte digital', text: content.context },
              { label: '🔍 Comportement de recherche', text: content.searchBehavior },
              { label: '📊 Catégories dominantes', text: content.topCategories },
              { label: '💡 Le saviez-vous ?', text: content.funFact },
            ].map(({ label, text }) => (
              <div key={label} style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc', marginBottom: 8 }}>{label}</p>
                <p style={{ fontSize: 14, color: 'rgba(240,242,248,0.5)', lineHeight: 1.75 }}>{text}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/pays" style={{ fontSize: 13, color: 'rgba(240,242,248,0.4)', textDecoration: 'none' }}>← Tous les pays</Link>
          <Link to="/trending" style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>🔥 Trending Now →</Link>
          <Link to="/ai-geo" style={{ fontSize: 13, color: '#a855f7', textDecoration: 'none', fontWeight: 600 }}>🤖 AI × GEO →</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
