import React from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SearchForm({ onSubmit, onToggleClick, /*shortsActive*/ }) {
    const location = useLocation();
    const [movie, setMovie] = useState('');

    const handleMovieChange = (e) => {
        setMovie(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (location.pathname === "/movies") {
            localStorage.setItem('inputMovies', JSON.stringify(movie));
        }
        onSubmit(movie);
    }

    useEffect(() => {
        if (location.pathname === "/movies") {
            const inputValue = JSON.parse(localStorage.getItem('inputMoviesValue')) || '';
            setMovie(inputValue);
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
                        minLength={2}
                        maxLength={40}
                        required={true}
                        value={movie} />
                    <button
                        className="search-form__button"
                        type="submit">
                        Поиск</button>
                </div>
            </form>
            <FilterCheckbox
                // shortsActive={shortsActive}
                onToggleClick={onToggleClick}
            />
        </section>
    )
}

export default SearchForm;