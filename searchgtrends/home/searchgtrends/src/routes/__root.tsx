import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'SearchGTrends — Les mots les plus recherchés dans le monde' },
      { name: 'description', content: 'Découvrez en temps réel les mots les plus recherchés sur Google dans 10 pays. Tendances mondiales par pays, catégorie et historique 7 jours. Mis à jour chaque jour automatiquement.' },
      { name: 'keywords', content: 'google trends, tendances recherche google, mots plus recherchés, trending searches monde, analyse seo tendances, recherches populaires par pays' },
      { name: 'author', content: 'SearchGTrends' },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#07080d' },
      { property: 'og:site_name', content: 'SearchGTrends' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://www.searchgtrends.com/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@searchgtrends' },
      { name: 'twitter:image', content: 'https://www.searchgtrends.com/og-image.png' },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'canonical', href: 'https://www.searchgtrends.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800&family=Syne:wght@700;800&display=swap' },
    ],
  }),
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  ),
})
