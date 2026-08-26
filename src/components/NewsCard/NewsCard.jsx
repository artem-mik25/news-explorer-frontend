import "./NewsCard.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function NewsCard({
  article,
  isLoggedIn,
  onSaveClick,
  onDeleteClick,
  isSaved,
  isSavedPage,
}) {
  const sourceName = article.source?.name || article.source || "";

  return (
    <article className="card">
      <div className="card__image-wrapper">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="card__image"
        />
        {isSavedPage ? (
          <>
            {article.keyword && (
              <span className="card__keyword">{article.keyword}</span>
            )}
            <div className="card__control card__control_type_delete">
              <span className="card__tooltip">Remove from saved</span>
              <button
                type="button"
                className="card__button card__button_type_delete"
                onClick={() => onDeleteClick(article)}
                aria-label="Remove from saved"
              ></button>
            </div>
          </>
        ) : (
          <div className="card__control">
            {!isLoggedIn && (
              <span className="card__tooltip">Sign in to save articles</span>
            )}
            <button
              type="button"
              className={`card__button card__button_type_save ${
                isSaved ? "card__button_active" : ""
              }`}
              onClick={() => onSaveClick(article)}
              aria-label={isSaved ? "Remove from saved" : "Save article"}
            ></button>
          </div>
        )}
      </div>
      <a
        href={article.url}
        className="card__content"
        target="_blank"
        rel="noreferrer"
      >
        <p className="card__date">{formatDate(article.publishedAt)}</p>
        <h3 className="card__title">{article.title}</h3>
        <p className="card__text">{article.description}</p>
        <p className="card__source">{sourceName}</p>
      </a>
    </article>
  );
}

export default NewsCard;
