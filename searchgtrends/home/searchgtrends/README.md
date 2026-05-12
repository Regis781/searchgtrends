# SearchGTrends

> Les mots les plus recherchés sur le web, par pays.

## Stack
- **React 19** + **TanStack Router** (file-based routing)
- **Vite 8** + **TypeScript**
- **Tailwind CSS v4**
- **Recharts** (graphiques historiques)
- Déploiement : **Vercel**

## Démarrage rapide

```bash
npm install
cp .env.example .env.local   # Configure tes variables
npm run dev
```

## Déploiement Vercel

1. Push sur GitHub
2. Importer le repo sur [vercel.com](https://vercel.com)
3. **Root Directory** : laisser vide (le projet est à la racine)
4. **Build Command** : `npm run build`
5. **Output Directory** : `dist`
6. Ajouter les variables d'environnement dans Vercel Dashboard → Settings → Environment Variables

## Sécurité — Règles importantes

### ⚠️ Ne jamais committer
- `.env.local` — Variables d'environnement locales
- `.env.production` — Variables de prod
- Clés API, tokens, mots de passe

### ✅ Toujours utiliser
- `.env.example` — Template sans valeurs réelles (safe à committer)
- Variables `VITE_*` pour les variables côté client
- Vercel Environment Variables pour les secrets de prod

### Variables d'environnement sur Vercel
1. Dashboard → ton projet → Settings → Environment Variables
2. Ajoute chaque variable avec son scope (Production / Preview / Development)
3. Les variables `VITE_*` sont exposées côté client — ne pas y mettre de secrets sensibles

## Intégration Google Trends API

Le projet est prêt pour l'intégration. Quand tu auras une clé API :

1. Ajoute `VITE_GOOGLE_TRENDS_API_KEY` dans Vercel Environment Variables
2. Remplace les données dans `src/data/trends.ts` par des appels API
3. Crée un service dans `src/lib/trendsApi.ts`

## Structure du projet

```
src/
├── data/trends.ts          # Données (simulées → API)
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── TrendCard.tsx
└── routes/
    ├── __root.tsx
    ├── index.tsx            # Page d'accueil
    ├── pays/
    │   ├── index.tsx        # Liste des pays
    │   └── $code.tsx        # Pays détail
    ├── tendances/
    │   └── index.tsx        # Classement mondial
    └── a-propos.tsx
```
