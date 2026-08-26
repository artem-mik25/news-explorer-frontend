function readSavedArticles() {
  return JSON.parse(localStorage.getItem("savedArticles")) || [];
}

function writeSavedArticles(articles) {
  localStorage.setItem("savedArticles", JSON.stringify(articles));
}

export function getSavedArticles() {
  return Promise.resolve(readSavedArticles());
}

export function saveArticle(article, keyword) {
  const savedArticles = readSavedArticles();
  const savedArticle = { ...article, keyword, _id: crypto.randomUUID() };
  const updatedArticles = [savedArticle, ...savedArticles];
  writeSavedArticles(updatedArticles);
  return Promise.resolve(savedArticle);
}

export function deleteArticle(articleId) {
  const updatedArticles = readSavedArticles().filter(
    (article) => article._id !== articleId
  );
  writeSavedArticles(updatedArticles);
  return Promise.resolve(articleId);
}
