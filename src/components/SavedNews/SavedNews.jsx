import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import "./SavedNews.css";

function SavedNews({ savedArticles, onDeleteClick }) {
  return (
    <main className="saved-news">
      <SavedNewsHeader savedArticles={savedArticles} />
      <section className="saved-news__cards">
        <div className="saved-news__container">
          {savedArticles.length > 0 ? (
            <NewsCardList
              articles={savedArticles}
              onDeleteClick={onDeleteClick}
              isSavedPage
            />
          ) : (
            <p className="saved-news__empty">
              You haven&apos;t saved any articles yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
