import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0',
    'Accept-Language': 'fr-FR,fr;q=0.9'
  }
});

export default async function handler(req, res) {
  const country = (req.query.country || 'FR').toUpperCase();
  const url = `https://trends.google.fr/trends/trendingsearches/daily/rss?geo=${country}`;

  try {
    const feed = await parser.parseURL(url);
    const trends = feed.items.slice(0, 10).map(item => ({
      title: item.title,
      traffic: item.contentSnippet || "Volume élevé",
      link: item.link
    }));

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(trends);

  } catch (e) {
    return res.status(200).json([
      { title: "Impossible de charger Google Trends", traffic: "Réessayez", link: "#" }
    ]);
  }
}
