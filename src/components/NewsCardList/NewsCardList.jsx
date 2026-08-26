import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  onSaveClick,
  onDeleteClick,
  findSavedArticle,
  isSavedPage,
}) {
  return (
    <ul className="cards">
      {articles.map((article) => (
        <li className="cards__item" key={article._id || article.url}>
          <NewsCard
            article={article}
            isLoggedIn={isLoggedIn}
            onSaveClick={onSaveClick}
            onDeleteClick={onDeleteClick}
            isSaved={findSavedArticle ? Boolean(findSavedArticle(article)) : false}
            isSavedPage={isSavedPage}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
