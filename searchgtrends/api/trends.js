import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
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

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=1800');
    return res.status(200).json(trends);
  } catch (error) {
    console.error("Erreur Google Trends:", error);
    return res.status(500).json({ 
      error: "Erreur de récupération", 
      details: error.message,
      url_tente: url 
    });
  }
}
