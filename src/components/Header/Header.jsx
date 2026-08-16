import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import "./Header.css";

function Header({ isLoggedIn, isMainPage, onSignInClick, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = isMainPage ? "dark" : "light";

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header
      className={`header header_theme_${theme} ${
        isMenuOpen ? "header_menu-opened" : ""
      }`}
    >
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          NewsExplorer
        </Link>
        <button
          type="button"
          className={`header__menu-button header__menu-button_theme_${theme} ${
            isMenuOpen ? "header__menu-button_type_close" : ""
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        ></button>
        <Navigation
          isLoggedIn={isLoggedIn}
          theme={theme}
          isMenuOpen={isMenuOpen}
          onSignInClick={() => {
            closeMenu();
            onSignInClick();
          }}
          onLogout={() => {
            closeMenu();
            onLogout();
          }}
          onLinkClick={closeMenu}
        />
      </div>
    </header>
  );
}

export default Header;
