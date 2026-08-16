import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getNews } from "../../utils/NewsApi";
import * as auth from "../../utils/auth";
import {
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from "../../utils/savedArticles";
import { CARDS_PER_PAGE } from "../../utils/constants";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchStatus, setSearchStatus] = useState("idle");
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthChecked(true);
      return;
    }
    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  }, []);

  useEffect(() => {
    getSavedArticles()
      .then(setSavedArticles)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
    if (lastSearch) {
      setKeyword(lastSearch.keyword);
      setArticles(lastSearch.articles);
      setSearchStatus("success");
    }
  }, []);

  const closeModal = useCallback(() => setActiveModal(""), []);

  function handleSearch(searchKeyword) {
    setSearchStatus("loading");
    setKeyword(searchKeyword);
    setVisibleCount(CARDS_PER_PAGE);
    getNews(searchKeyword)
      .then((data) => {
        setArticles(data.articles);
        setSearchStatus("success");
        localStorage.setItem(
          "lastSearch",
          JSON.stringify({ keyword: searchKeyword, articles: data.articles })
        );
      })
      .catch(() => {
        setSearchStatus("error");
      });
  }

  function handleShowMore() {
    setVisibleCount((count) => count + CARDS_PER_PAGE);
  }

  function handleRegister({ email, password, name }) {
    auth
      .register(email, password, name)
      .then(() => {
        setActiveModal("success");
      })
      .catch((err) => console.error(err));
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then(({ token, user }) => {
        localStorage.setItem("jwt", token);
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((err) => console.error(err));
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  }

  function findSavedArticle(article) {
    return savedArticles.find((saved) => saved.url === article.url);
  }

  function handleSaveClick(article) {
    if (!isLoggedIn) {
      setActiveModal("register");
      return;
    }
    const savedArticle = findSavedArticle(article);
    if (savedArticle) {
      handleDeleteArticle(savedArticle);
      return;
    }
    saveArticle(article, keyword)
      .then((newArticle) => {
        setSavedArticles([newArticle, ...savedArticles]);
      })
      .catch((err) => console.error(err));
  }

  function handleDeleteArticle(article) {
    deleteArticle(article._id)
      .then(() => {
        setSavedArticles(
          savedArticles.filter((saved) => saved._id !== article._id)
        );
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`page ${isMainPage ? "page_type_main" : ""}`}>
        <div className={isMainPage ? "page__hero" : ""}>
          <Header
            isLoggedIn={isLoggedIn}
            isMainPage={isMainPage}
            onSignInClick={() => setActiveModal("login")}
            onLogout={handleLogout}
          />
          {isMainPage && (
            <section className="hero">
              <h1 className="hero__title">What&apos;s going on in the world?</h1>
              <p className="hero__subtitle">
                Find the latest news on any topic and save them in your
                personal account.
              </p>
              <SearchForm onSearch={handleSearch} />
            </section>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                searchStatus={searchStatus}
                articles={articles}
                visibleCount={visibleCount}
                onShowMore={handleShowMore}
                onSaveClick={handleSaveClick}
                isLoggedIn={isLoggedIn}
                findSavedArticle={findSavedArticle}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthChecked={isAuthChecked}
                onUnauthorized={() => setActiveModal("login")}
              >
                <SavedNews
                  savedArticles={savedArticles}
                  onDeleteClick={handleDeleteArticle}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeModal}
          onLogin={handleLogin}
          onSwitchToRegister={() => setActiveModal("register")}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeModal}
          onRegister={handleRegister}
          onSwitchToLogin={() => setActiveModal("login")}
        />
        <SuccessModal
          isOpen={activeModal === "success"}
          onClose={closeModal}
          onSignInClick={() => setActiveModal("login")}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
