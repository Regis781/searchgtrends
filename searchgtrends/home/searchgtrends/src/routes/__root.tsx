import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'SearchGTrends — Tendances mondiales de recherche' },
      { name: 'description', content: 'Découvrez les mots les plus recherchés sur le web par pays en temps réel. Tendances Google par pays, historique et catégories.' },
      { name: 'theme-color', content: '#f8f9fc' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap' },
    ],
  }),
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  ),
})
