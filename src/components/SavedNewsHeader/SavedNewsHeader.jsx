import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SavedNewsHeader.css";

function formatKeywords(articles) {
  const keywords = [
    ...new Set(
      articles
        .map((article) => article.keyword)
        .filter(Boolean)
        .map(
          (keyword) => keyword.charAt(0).toUpperCase() + keyword.slice(1)
        )
    ),
  ];
  if (keywords.length === 0) {
    return "";
  }
  if (keywords.length <= 2) {
    return keywords.join(", ");
  }
  return `${keywords.slice(0, 2).join(", ")}, and ${keywords.length - 2} other${
    keywords.length - 2 > 1 ? "s" : ""
  }`;
}

function SavedNewsHeader({ savedArticles }) {
  const currentUser = useContext(CurrentUserContext);
  const keywordsText = formatKeywords(savedArticles);

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__caption">Saved articles</p>
        <h1 className="saved-news-header__title">
          {currentUser ? `${currentUser.name}, you` : "You"} have{" "}
          {savedArticles.length} saved{" "}
          {savedArticles.length === 1 ? "article" : "articles"}
        </h1>
        {keywordsText && (
          <p className="saved-news-header__keywords">
            By keywords:{" "}
            <span className="saved-news-header__keywords-list">
              {keywordsText}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
