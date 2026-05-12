export type TrendCategory = "Actualité" | "Sport" | "Tech" | "Divertissement" | "Santé" | "Économie";

export type TrendEntry = {
  keyword: string;
  volume: number;   // 0-100 index
  change: number;   // % vs yesterday
  category: TrendCategory;
  history: number[]; // last 7 days
};

export type CountryData = {
  code: string;
  name: string;
  flag: string;
  trends: TrendEntry[];
  updatedAt: string;
};

function h(base: number): number[] {
  return Array.from({ length: 7 }, (_, i) =>
    Math.max(5, Math.round(base * (0.7 + Math.random() * 0.5) * (1 + i * 0.04)))
  );
}

export const countries: CountryData[] = [
  {
    code: "FR", name: "France", flag: "🇫🇷",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "Ligue 1", volume: 98, change: +42, category: "Sport", history: h(80) },
      { keyword: "IA générative", volume: 94, change: +28, category: "Tech", history: h(70) },
      { keyword: "Météo Paris", volume: 91, change: +5, category: "Actualité", history: h(88) },
      { keyword: "Netflix nouveautés", volume: 87, change: -3, category: "Divertissement", history: h(90) },
      { keyword: "Élections municipales", volume: 85, change: +61, category: "Actualité", history: h(40) },
      { keyword: "Inflation 2025", volume: 79, change: +12, category: "Économie", history: h(65) },
      { keyword: "Roland Garros", volume: 75, change: +88, category: "Sport", history: h(30) },
      { keyword: "ChatGPT", volume: 72, change: -8, category: "Tech", history: h(80) },
      { keyword: "Remède grippe", volume: 68, change: +19, category: "Santé", history: h(55) },
      { keyword: "CAC 40", volume: 65, change: -2, category: "Économie", history: h(68) },
    ],
  },
  {
    code: "US", name: "États-Unis", flag: "🇺🇸",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "NBA Playoffs", volume: 99, change: +55, category: "Sport", history: h(75) },
      { keyword: "GPT-5", volume: 97, change: +120, category: "Tech", history: h(20) },
      { keyword: "Taylor Swift", volume: 95, change: +33, category: "Divertissement", history: h(85) },
      { keyword: "Stock market", volume: 90, change: +78, category: "Économie", history: h(35) },
      { keyword: "Hurricane season", volume: 88, change: +44, category: "Actualité", history: h(45) },
      { keyword: "Apple WWDC", volume: 84, change: +92, category: "Tech", history: h(10) },
      { keyword: "Immigration policy", volume: 80, change: +15, category: "Actualité", history: h(70) },
      { keyword: "Weight loss drug", volume: 76, change: +22, category: "Santé", history: h(60) },
      { keyword: "Super Bowl 2026", volume: 72, change: +11, category: "Sport", history: h(65) },
      { keyword: "Bitcoin", volume: 68, change: -14, category: "Économie", history: h(75) },
    ],
  },
  {
    code: "JP", name: "Japon", flag: "🇯🇵",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "アニメ新作", volume: 99, change: +40, category: "Divertissement", history: h(85) },
      { keyword: "地震速報", volume: 96, change: +200, category: "Actualité", history: h(10) },
      { keyword: "Nvidia GPU", volume: 92, change: +35, category: "Tech", history: h(70) },
      { keyword: "侍ジャパン", volume: 89, change: +67, category: "Sport", history: h(50) },
      { keyword: "ChatGPT 日本語", volume: 85, change: +18, category: "Tech", history: h(75) },
      { keyword: "花粉症対策", volume: 82, change: +90, category: "Santé", history: h(30) },
      { keyword: "円安ドル", volume: 78, change: +25, category: "Économie", history: h(60) },
      { keyword: "Netflix アニメ", volume: 74, change: +12, category: "Divertissement", history: h(70) },
      { keyword: "オリンピック2026", volume: 70, change: +44, category: "Sport", history: h(45) },
      { keyword: "選挙速報", volume: 66, change: +33, category: "Actualité", history: h(55) },
    ],
  },
  {
    code: "DE", name: "Allemagne", flag: "🇩🇪",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "Bundesliga", volume: 98, change: +38, category: "Sport", history: h(80) },
      { keyword: "KI Revolution", volume: 93, change: +52, category: "Tech", history: h(55) },
      { keyword: "Energiekosten", volume: 89, change: +17, category: "Économie", history: h(75) },
      { keyword: "Oktoberfest 2025", volume: 86, change: +110, category: "Divertissement", history: h(20) },
      { keyword: "Bundestag Wahlen", volume: 83, change: +29, category: "Actualité", history: h(65) },
      { keyword: "Tesla Fabrik", volume: 79, change: -5, category: "Tech", history: h(82) },
      { keyword: "Corona Variante", volume: 75, change: +45, category: "Santé", history: h(40) },
      { keyword: "DAX Aktien", volume: 71, change: +8, category: "Économie", history: h(70) },
      { keyword: "Champions League", volume: 67, change: +22, category: "Sport", history: h(58) },
      { keyword: "Wetter Berlin", volume: 63, change: +4, category: "Actualité", history: h(65) },
    ],
  },
  {
    code: "BR", name: "Brésil", flag: "🇧🇷",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "Campeonato Brasileiro", volume: 99, change: +60, category: "Sport", history: h(75) },
      { keyword: "Carnaval 2026", volume: 95, change: +85, category: "Divertissement", history: h(30) },
      { keyword: "IA no trabalho", volume: 91, change: +42, category: "Tech", history: h(60) },
      { keyword: "Lula governo", volume: 87, change: +18, category: "Actualité", history: h(70) },
      { keyword: "Dólar Real", volume: 84, change: +31, category: "Économie", history: h(65) },
      { keyword: "Dengue prevenção", volume: 80, change: +55, category: "Santé", history: h(45) },
      { keyword: "Netflix série", volume: 76, change: -7, category: "Divertissement", history: h(80) },
      { keyword: "Bitcoin preço", volume: 72, change: +20, category: "Économie", history: h(70) },
      { keyword: "Neymar retorno", volume: 68, change: +44, category: "Sport", history: h(50) },
      { keyword: "ChatGPT português", volume: 64, change: +15, category: "Tech", history: h(62) },
    ],
  },
  {
    code: "IN", name: "Inde", flag: "🇮🇳",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "IPL Cricket 2025", volume: 99, change: +75, category: "Sport", history: h(60) },
      { keyword: "AI Jobs India", volume: 96, change: +88, category: "Tech", history: h(40) },
      { keyword: "Monsoon forecast", volume: 92, change: +50, category: "Actualité", history: h(50) },
      { keyword: "Modi government", volume: 89, change: +22, category: "Actualité", history: h(75) },
      { keyword: "Bollywood new movie", volume: 85, change: +35, category: "Divertissement", history: h(70) },
      { keyword: "Sensex BSE", volume: 81, change: +13, category: "Économie", history: h(78) },
      { keyword: "ChatGPT Hindi", volume: 77, change: +60, category: "Tech", history: h(40) },
      { keyword: "Dengue symptoms", volume: 73, change: +40, category: "Santé", history: h(55) },
      { keyword: "Rupee Dollar", volume: 69, change: +8, category: "Économie", history: h(72) },
      { keyword: "Yoga benefits", volume: 65, change: +18, category: "Santé", history: h(62) },
    ],
  },
  {
    code: "GB", name: "Royaume-Uni", flag: "🇬🇧",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "Premier League", volume: 99, change: +45, category: "Sport", history: h(80) },
      { keyword: "King Charles health", volume: 94, change: +120, category: "Actualité", history: h(15) },
      { keyword: "AI regulation UK", volume: 90, change: +38, category: "Tech", history: h(60) },
      { keyword: "Cost of living", volume: 87, change: +15, category: "Économie", history: h(80) },
      { keyword: "Glastonbury 2025", volume: 83, change: +200, category: "Divertissement", history: h(5) },
      { keyword: "NHS waiting times", volume: 79, change: +22, category: "Santé", history: h(70) },
      { keyword: "FTSE 100", volume: 75, change: -3, category: "Économie", history: h(78) },
      { keyword: "Wimbledon", volume: 71, change: +88, category: "Sport", history: h(20) },
      { keyword: "Labour Party", volume: 67, change: +10, category: "Actualité", history: h(65) },
      { keyword: "BBC documentary", volume: 63, change: +5, category: "Divertissement", history: h(60) },
    ],
  },
  {
    code: "KR", name: "Corée du Sud", flag: "🇰🇷",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "K-드라마 신작", volume: 99, change: +50, category: "Divertissement", history: h(80) },
      { keyword: "삼성 갤럭시", volume: 95, change: +30, category: "Tech", history: h(75) },
      { keyword: "BTS 컴백", volume: 92, change: +150, category: "Divertissement", history: h(20) },
      { keyword: "코스피 주가", volume: 88, change: +12, category: "Économie", history: h(80) },
      { keyword: "손흥민 경기", volume: 84, change: +65, category: "Sport", history: h(50) },
      { keyword: "ChatGPT 한국어", volume: 80, change: +28, category: "Tech", history: h(65) },
      { keyword: "부동산 대출", volume: 76, change: +20, category: "Économie", history: h(72) },
      { keyword: "건강 다이어트", volume: 72, change: +15, category: "Santé", history: h(68) },
      { keyword: "대통령 선거", volume: 68, change: +35, category: "Actualité", history: h(55) },
      { keyword: "넷플릭스 한국", volume: 64, change: -8, category: "Divertissement", history: h(70) },
    ],
  },
  {
    code: "NG", name: "Nigeria", flag: "🇳🇬",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "AFCON 2025", volume: 99, change: +70, category: "Sport", history: h(55) },
      { keyword: "Naira exchange rate", volume: 96, change: +45, category: "Économie", history: h(70) },
      { keyword: "Afrobeats hits", volume: 92, change: +38, category: "Divertissement", history: h(80) },
      { keyword: "Fintech Nigeria", volume: 88, change: +60, category: "Tech", history: h(50) },
      { keyword: "Tinubu government", volume: 84, change: +25, category: "Actualité", history: h(70) },
      { keyword: "Nollywood movie", volume: 80, change: +15, category: "Divertissement", history: h(75) },
      { keyword: "Malaria treatment", volume: 76, change: +30, category: "Santé", history: h(65) },
      { keyword: "Bitcoin Nigeria", volume: 72, change: +55, category: "Économie", history: h(45) },
      { keyword: "AI Africa", volume: 68, change: +80, category: "Tech", history: h(30) },
      { keyword: "Lagos traffic", volume: 64, change: +10, category: "Actualité", history: h(62) },
    ],
  },
  {
    code: "MX", name: "Mexique", flag: "🇲🇽",
    updatedAt: new Date().toISOString(),
    trends: [
      { keyword: "Liga MX", volume: 99, change: +48, category: "Sport", history: h(78) },
      { keyword: "Sheinbaum gobierno", volume: 95, change: +32, category: "Actualité", history: h(70) },
      { keyword: "Peso dólar", volume: 91, change: +22, category: "Économie", history: h(80) },
      { keyword: "Narcos México", volume: 87, change: +15, category: "Actualité", history: h(75) },
      { keyword: "IA trabajo", volume: 83, change: +55, category: "Tech", history: h(45) },
      { keyword: "Telenovela nueva", volume: 79, change: +10, category: "Divertissement", history: h(78) },
      { keyword: "Diabetes prevención", volume: 75, change: +28, category: "Santé", history: h(68) },
      { keyword: "Bitcoin México", volume: 71, change: +35, category: "Économie", history: h(52) },
      { keyword: "Copa América", volume: 67, change: +90, category: "Sport", history: h(20) },
      { keyword: "ChatGPT español", volume: 63, change: +18, category: "Tech", history: h(60) },
    ],
  },
];

export const CATEGORIES: TrendCategory[] = ["Actualité", "Sport", "Tech", "Divertissement", "Santé", "Économie"];

export const CATEGORY_COLORS: Record<TrendCategory, string> = {
  "Actualité": "#4f46e5",
  "Sport": "#10b981",
  "Tech": "#06b6d4",
  "Divertissement": "#f59e0b",
  "Santé": "#ec4899",
  "Économie": "#8b5cf6",
};

export const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
