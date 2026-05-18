/**
 * fetch-trends.mjs
 * API : Google Trends sur RapidAPI (google-trends8.p.rapidapi.com)
 * Endpoint : /trendings?region_code=FR&date=2026-05-17&hl=fr-FR
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, '../public/data/trends.json')

const COUNTRIES = [
  { code: 'FR', name: 'France',        flag: '🇫🇷', geo: 'FR', hl: 'fr-FR' },
  { code: 'US', name: 'États-Unis',    flag: '🇺🇸', geo: 'US', hl: 'en-US' },
  { code: 'GB', name: 'Royaume-Uni',   flag: '🇬🇧', geo: 'GB', hl: 'en-GB' },
  { code: 'DE', name: 'Allemagne',     flag: '🇩🇪', geo: 'DE', hl: 'de-DE' },
  { code: 'JP', name: 'Japon',         flag: '🇯🇵', geo: 'JP', hl: 'ja-JP' },
  { code: 'BR', name: 'Brésil',        flag: '🇧🇷', geo: 'BR', hl: 'pt-BR' },
  { code: 'IN', name: 'Inde',          flag: '🇮🇳', geo: 'IN', hl: 'en-IN' },
  { code: 'KR', name: 'Corée du Sud',  flag: '🇰🇷', geo: 'KR', hl: 'ko-KR' },
  { code: 'MX', name: 'Mexique',       flag: '🇲🇽', geo: 'MX', hl: 'es-MX' },
  { code: 'NG', name: 'Nigeria',       flag: '🇳🇬', geo: 'NG', hl: 'en-NG' },
]

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const HOST = 'google-trends8.p.rapidapi.com'

const TODAY = new Date().toISOString().slice(0, 10)

if (!RAPIDAPI_KEY) {
  console.error('❌ RAPIDAPI_KEY manquante.')
  process.exit(1)
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

function guessCategory(keyword) {
  const k = keyword.toLowerCase()
  if (/foot|basket|tennis|sport|liga|league|nba|nfl|cricket|rugby|golf|olymp|champion/.test(k)) return 'Sport'
  if (/ai|tech|gpu|iphone|android|app|chatgpt|openai|google|meta|apple|robot|cyber/.test(k)) return 'Tech'
  if (/film|série|netflix|music|concert|album|movie|cinema|tv|show|star|celebrity|kpop|bts/.test(k)) return 'Divertissement'
  if (/santé|health|virus|vaccin|médecin|hospital|diet|covid|cancer|drug|symptom|dengue/.test(k)) return 'Santé'
  if (/bourse|stock|bitcoin|crypto|inflation|bank|dollar|euro|invest|market|naira|peso|rupee/.test(k)) return 'Économie'
  return 'Actualité'
}

function parseTrendings(data, geo) {
  // Format retourné par google-trends8 /trendings
  let items = []

  if (Array.isArray(data)) {
    items = data
  } else if (data?.trending_searches) {
    items = data.trending_searches
  } else if (data?.default?.trendingSearchesDays?.[0]?.trendingSearches) {
    items = data.default.trendingSearchesDays[0].trendingSearches
  } else if (typeof data === 'object') {
    // Essai de trouver un tableau dans les valeurs
    const arr = Object.values(data).find(v => Array.isArray(v))
    if (arr) items = arr
  }

  return items.slice(0, 10).map((item, i) => {
    const keyword =
      item?.query || item?.title?.query || item?.keyword ||
      item?.title || item?.term || String(item)

    const traffic = item?.formattedTrafficSize || ''
    const changeBase = traffic.includes('M') ? 80 : traffic.includes('K') ? 40 : 20

    return {
      keyword: String(keyword).trim(),
      volume: Math.max(20, 100 - i * 8),
      change: Math.round(changeBase + Math.random() * 40),
      category: guessCategory(String(keyword)),
      history: Array.from({ length: 7 }, () => Math.round(40 + Math.random() * 50)),
    }
  }).filter(t => t.keyword && t.keyword.length > 1)
}

async function fetchCountry(country) {
  const url = `https://${HOST}/trendings?region_code=${country.geo}&date=${TODAY}`
  console.log(`  → GET ${url}`)

  const res = await fetch(url, {
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': HOST,
    },
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`)
  }

  let json
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`JSON invalide: ${text.slice(0, 100)}`)
  }

  return json
}

function getFallback(code) {
  const fallbacks = {
    FR: ['Ligue 1','IA générative','Météo Paris','Netflix','CAC 40','Roland Garros','ChatGPT','Inflation','Grève','Macron'],
    US: ['NBA','GPT-5','Taylor Swift','Stock market','Hurricane','Apple','Immigration','Bitcoin','Super Bowl','Netflix'],
    GB: ['Premier League','NHS','AI regulation','Cost of living','Wimbledon','FTSE','Labour Party','BBC','King Charles','Brexit'],
    DE: ['Bundesliga','KI','Energiekosten','Oktoberfest','Bundestag','Tesla','DAX','Champions League','Wetter','Inflation'],
    JP: ['アニメ','地震','Nvidia','野球','ChatGPT','花粉症','円安','Netflix','オリンピック','選挙'],
    BR: ['Futebol','Carnaval','IA','Lula','Dólar','Dengue','Netflix','Bitcoin','Neymar','ChatGPT'],
    IN: ['Cricket IPL','AI Jobs','Monsoon','Modi','Bollywood','Sensex','ChatGPT','Dengue','Rupee','Yoga'],
    KR: ['K-드라마','삼성','BTS','코스피','손흥민','ChatGPT','부동산','건강','선거','넷플릭스'],
    MX: ['Liga MX','Sheinbaum','Peso','Narcos','IA','Telenovela','Diabetes','Bitcoin','Copa','ChatGPT'],
    NG: ['AFCON','Naira','Afrobeats','Fintech','Tinubu','Nollywood','Malaria','Bitcoin','AI Africa','Lagos'],
  }
  return (fallbacks[code] || fallbacks['FR']).map((keyword, i) => ({
    keyword,
    volume: Math.max(20, 95 - i * 7),
    change: Math.round(Math.random() * 50 + 2),
    category: guessCategory(keyword),
    history: Array.from({ length: 7 }, () => Math.round(40 + Math.random() * 50)),
  }))
}

async function main() {
  console.log('🚀 fetch-trends démarré')
  console.log(`📅 ${new Date().toISOString()}`)
  console.log(`🌍 ${COUNTRIES.length} pays à récupérer\n`)

  mkdirSync(join(__dirname, '../public/data'), { recursive: true })

  const results = []
  let apiSuccess = 0

  for (const country of COUNTRIES) {
    console.log(`🔍 Fetching ${country.flag} ${country.name} (${country.geo})...`)
    try {
      const raw = await fetchCountry(country)
      const trends = parseTrendings(raw, country.geo)

      if (trends.length === 0) {
        console.log(`  ⚠️  0 tendances parsées — fallback`)
        results.push({ ...country, trends: getFallback(country.code), updatedAt: new Date().toISOString(), source: 'fallback' })
      } else {
        console.log(`  ✅ ${trends.length} tendances`)
        results.push({ ...country, trends, updatedAt: new Date().toISOString(), source: 'api' })
        apiSuccess++
      }
    } catch (err) {
      console.log(`  ❌ ${err.message} — fallback`)
      results.push({ ...country, trends: getFallback(country.code), updatedAt: new Date().toISOString(), source: 'fallback' })
    }

    await sleep(1500)
  }

  const output = { generatedAt: new Date().toISOString(), countries: results }
  writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf-8')

  console.log(`\n✅ trends.json généré`)
  console.log(`📊 ${apiSuccess}/${COUNTRIES.length} pays avec données API réelles`)
}

main().catch(err => {
  console.error('💥', err)
  process.exit(1)
})
