import {
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  PAGE_SIZE,
  SEARCH_DAYS_RANGE,
} from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error: ${res.status}`));
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export function getNews(keyword) {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - SEARCH_DAYS_RANGE);

  const params = new URLSearchParams({
    q: keyword,
    apiKey: NEWS_API_KEY,
    from: formatDate(weekAgo),
    to: formatDate(today),
    pageSize: PAGE_SIZE,
  });

  return fetch(`${NEWS_API_BASE_URL}?${params}`).then(checkResponse);
}
