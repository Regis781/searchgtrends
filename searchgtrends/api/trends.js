import Parser from 'rss-parser';
const parser = new Parser();

export default async function handler(req, res) {
 const country = req.query.country || 'FR';
  try {
    const url = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${country.toUpperCase()}`;
    const feed = await parser.parseURL(url);
    
    const trends = feed.items.map(item => ({
      title: item.title,
      traffic: item.contentSnippet || 'Volume élevé',
      link: item.link
    }));

    res.setHeader('Cache-Control', 's-maxage=1800'); // Cache de 30 min
    res.status(200).json(trends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur de récupération des données" });
  }
}
