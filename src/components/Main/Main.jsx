import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import About from "../About/About.jsx";
import { SEARCH_ERROR_MESSAGE } from "../../utils/constants";
import notFoundIcon from "../../images/not-found.svg";
import "./Main.css";

function Main({
  searchStatus,
  articles,
  visibleCount,
  onShowMore,
  onSaveClick,
  isLoggedIn,
  findSavedArticle,
}) {
  const visibleArticles = articles.slice(0, visibleCount);
  const hasResults = searchStatus === "success" && articles.length > 0;
  const hasNothingFound = searchStatus === "success" && articles.length === 0;

  return (
    <main className="main">
      {searchStatus !== "idle" && (
        <section className="results" aria-live="polite">
          <div className="results__container">
            {searchStatus === "loading" && (
              <Preloader text="Searching for news..." />
            )}
            {searchStatus === "error" && (
              <p className="results__message">{SEARCH_ERROR_MESSAGE}</p>
            )}
            {hasNothingFound && (
              <div className="results__empty">
                <img
                  src={notFoundIcon}
                  alt="Magnifying glass with a sad face"
                  className="results__empty-icon"
                />
                <h2 className="results__empty-title">Nothing found</h2>
                <p className="results__empty-text">
                  Sorry, but nothing matched your search terms.
                </p>
              </div>
            )}
            {hasResults && (
              <>
                <h2 className="results__title">Search results</h2>
                <NewsCardList
                  articles={visibleArticles}
                  isLoggedIn={isLoggedIn}
                  onSaveClick={onSaveClick}
                  findSavedArticle={findSavedArticle}
                />
                {visibleCount < articles.length && (
                  <button
                    type="button"
                    className="results__show-more"
                    onClick={onShowMore}
                  >
                    Show more
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      )}
      <About />
    </main>
  );
}

export default Main;
