import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
  },
});

export default async function handler(req, res) {
  const country = req.query.country || 'FR';
  const url = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${country.toUpperCase()}`;

  try {
    const feed = await parser.parseURL(url);
    const trends = feed.items.map(item => ({
      title: item.title,
      traffic: item.contentSnippet || 'Volume élevé',
      link: item.link
    }));

    // Autoriser votre site à lire ces données
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate');

    return res.status(200).json(trends);
  } catch (error) {
    console.error("Erreur détaillée:", error.message);
    return res.status(500).json({ 
      error: "Google bloque temporairement la requête", 
      message: error.message 
    });
  }
}
