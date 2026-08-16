# NewsExplorer — Frontend

NewsExplorer is a React application that lets users search for news articles by keyword and save them to a personal account.

This is the frontend for Stage 1 of the TripleTen final project. It implements the full page layout from the design spec, search powered by the [News API](https://newsapi.org/), and simulated authentication and article saving (the real backend arrives in Stages 2 and 3).

## Features

- Keyword search against the News API (articles from the last 7 days)
- Results rendered three cards at a time with a "Show more" button
- Loading preloader, "Nothing found" state, and request error handling
- Sign in / Sign up modals with client-side validation (close via button, overlay click, or Escape)
- Saved articles page (`/saved-news`) showing saved count and keywords
- Save/delete articles with bookmark states (simulated storage for Stage 1)
- Search results persist after page refresh
- Fully responsive layout from 320px up

## Tech stack

- React (functional components and hooks) + Vite
- React Router
- BEM methodology for CSS
- Fetch API (no third-party request libraries)

## Running locally

```bash
npm install
npm run dev
```

Add your News API key in `src/utils/constants.js` before searching.

## Build

```bash
npm run build
```

## Live site

Deployed at: https://artem-mik25.github.io/news-explorer-frontend/
