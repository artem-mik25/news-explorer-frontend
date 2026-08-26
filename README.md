# NewsExplorer — Frontend

NewsExplorer is a full-stack React application that lets users search for news articles by keyword and save them to a personal account.

The frontend implements the full page layout from the design spec with search powered by the [News API](https://newsapi.org/). Authentication and saved articles are handled by the [news-explorer-api](https://github.com/artem-mik25/news-explorer-api) backend (Express + MongoDB), deployed at https://artemmik25.mooo.com/api.

## Features

- Keyword search against the News API (articles from the last 7 days)
- Results rendered three cards at a time with a "Show more" button
- Loading preloader, "Nothing found" state, and request error handling
- Sign in / Sign up modals with client-side validation and server error messages
- JWT authorization: register, log in, protected `/saved-news` route
- Saved articles page (`/saved-news`) showing saved count and keywords
- Save/delete articles stored in the user's account via the backend API
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
