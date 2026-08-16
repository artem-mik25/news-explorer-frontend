import { useState } from "react";
import { EMPTY_KEYWORD_MESSAGE } from "../../utils/constants";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      setErrorMessage(EMPTY_KEYWORD_MESSAGE);
      return;
    }
    setErrorMessage("");
    onSearch(trimmedKeyword);
  }

  function handleChange(evt) {
    setKeyword(evt.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="search-form__field">
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={keyword}
          onChange={handleChange}
          aria-label="Search topic"
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </div>
      <span className="search-form__error">{errorMessage}</span>
    </form>
  );
}

export default SearchForm;
