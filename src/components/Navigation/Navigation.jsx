import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  theme,
  isMenuOpen,
  onSignInClick,
  onLogout,
  onLinkClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <nav
      className={`navigation navigation_theme_${theme} ${
        isMenuOpen ? "navigation_opened" : ""
      }`}
    >
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
            onClick={onLinkClick}
          >
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
              onClick={onLinkClick}
            >
              Saved articles
            </NavLink>
          </li>
        )}
        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              type="button"
              className="navigation__button"
              onClick={onLogout}
            >
              <span className="navigation__button-text">
                {currentUser ? currentUser.name : ""}
              </span>
              <span
                className={`navigation__logout-icon navigation__logout-icon_theme_${theme}`}
              ></span>
            </button>
          ) : (
            <button
              type="button"
              className="navigation__button navigation__button_type_signin"
              onClick={onSignInClick}
            >
              <span className="navigation__button-text">Sign in</span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
