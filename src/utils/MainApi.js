const BASE_URL = import.meta.env.PROD
  ? "https://artemmik25.mooo.com/api"
  : "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res
    .json()
    .catch(() => Promise.reject(new Error(`Error: ${res.status}`)))
    .then((data) =>
      Promise.reject(new Error(data.message || `Error: ${res.status}`))
    );
}

function normalizeArticle(article) {
  return {
    _id: article._id,
    keyword: article.keyword,
    title: article.title,
    description: article.text,
    publishedAt: article.date,
    source: article.source,
    url: article.link,
    urlToImage: article.image,
  };
}

export function register(email, password, name) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}

export function getSavedArticles(token) {
  return fetch(`${BASE_URL}/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(checkResponse)
    .then((articles) => articles.map(normalizeArticle));
}

export function saveArticle(article, keyword, token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      keyword,
      title: article.title,
      text: article.description || article.title,
      date: article.publishedAt,
      source: article.source?.name || article.source || "Unknown",
      link: article.url,
      image: article.urlToImage,
    }),
  })
    .then(checkResponse)
    .then(normalizeArticle);
}

export function deleteArticle(articleId, token) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}
