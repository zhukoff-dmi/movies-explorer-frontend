import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SearchForm({ onSubmit, onToggleClick, shortsActive }) {
  const location = useLocation();
  const [searchString, setSearchString] = useState('');
  const [isSubmitActive, setSubmitActive] = useState(false);
  const handleMovieChange = (e) => {
    setSearchString(e.target.value);
    setSubmitActive(!!e.target?.value.length);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem('inputMovies') !== searchString) {
      if (location.pathname === '/movies') {
        localStorage.setItem('inputMovies', JSON.stringify(searchString));
      }
      onSubmit(searchString);
    }
  };

  useEffect(() => {
    if (location.pathname === '/movies') {
      const inputValue = JSON.parse(
        localStorage.getItem('inputMovies') || '""');
      setSearchString(inputValue);
      setSubmitActive(!!inputValue?.length);
    }
  }, [location.pathname]);

  return (
    <section className="search">
      <form
        onSubmit={handleSearchSubmit}
        className="search-form">
        <div className="search__input">
          <input
            onChange={handleMovieChange}
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            value={searchString}/>
          <button
            disabled={!isSubmitActive}
            className="search-form__button"
            type="submit">
            Поиск
          </button>
        </div>
      </form>
      <FilterCheckbox
        shortsActive={shortsActive}
        onToggleClick={onToggleClick}
      />
    </section>
  );
}

export default SearchForm;
