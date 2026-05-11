import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml;q=0.9, */*;q=0.8',
  },
  timeout: 5000,
});

export default async function handler(req, res) {
  const country = req.query.country || 'FR';
  const url = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${country.toUpperCase()}`;

  // TOP 10 de secours (si Google bloque la requête)
  const fallbackTrends = [
    { title: "Actualités Nationales", traffic: "500K+ recherches", link: "https://news.google.com" },
    { title: "Météo de demain", traffic: "200K+ recherches", link: "https://www.google.com/search?q=meteo" },
    { title: "Résultats Sportifs", traffic: "100K+ recherches", link: "https://www.google.com/search?q=sport" },
    { title: "Nouveautés Netflix", traffic: "80K+ recherches", link: "https://www.netflix.com" },
    { title: "Bourse & Finance", traffic: "70K+ recherches", link: "https://www.google.com/search?q=bourse" },
    { title: "Recettes de cuisine", traffic: "60K+ recherches", link: "https://www.google.com/search?q=recette" },
    { title: "Tendances TikTok", traffic: "50K+ recherches", link: "https://www.tiktok.com" },
    { title: "Sorties Cinéma", traffic: "40K+ recherches", link: "https://www.allocine.fr" },
    { title: "Promotions Amazon", traffic: "30K+ recherches", link: "https://www.amazon.fr" },
    { title: "Jeux Vidéo News", traffic: "20K+ recherches", link: "https://www.jeuxvideo.com" }
  ];

  try {
    const feed = await parser.parseURL(url);
    
    // On prend les 10 premiers résultats du flux RSS
    const trends = feed.items.slice(0, 10).map(item => ({
      title: item.title,
      traffic: item.contentSnippet || 'Volume élevé',
      link: item.link
    }));

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(trends);

  } catch (error) {
    console.error("Mode secours activé");
    res.setHeader('Access-Control-Allow-Origin', '*');
    // On renvoie le TOP 10 de secours
    return res.status(200).json(fallbackTrends);
  }
}
