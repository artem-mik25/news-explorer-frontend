export const NEWS_API_BASE_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export const NEWS_API_KEY = "74e2e6f71faf49c292186d74305cb6ad";

export const PAGE_SIZE = 100;

export const SEARCH_DAYS_RANGE = 7;

export const CARDS_PER_PAGE = 3;

export const SEARCH_ERROR_MESSAGE =
  "Sorry, something went wrong during the request. Please try again later.";

export const EMPTY_KEYWORD_MESSAGE = "Please enter a keyword";
