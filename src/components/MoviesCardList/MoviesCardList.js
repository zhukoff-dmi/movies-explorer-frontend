import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader'
import { useState, useEffect } from 'react';

function MoviesCardList({ isLoading, onSaveClick, movies, onDeleteClick, setErrorPopup, setErrorText }) {
    const location = useLocation();
    const [visibleCards, setVisibleCards] = useState(12);

    function moreCrads() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280) {
            setVisibleCards((prevVisibleCards) => prevVisibleCards + 3)
        } else if (screenWidth >= 768 && screenWidth < 1280) {
            setVisibleCards((prevVisibleCards) => prevVisibleCards + 2)
        } else if (screenWidth >= 320 && screenWidth < 768) {
            setVisibleCards((prevVisibleCards) => prevVisibleCards + 2)
        }
    }
    
    useEffect(() => {
        setVisibleCards(12);
    }, [isLoading]);

    useEffect(() => {
        function handleResize() {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 768 && screenWidth < 1280) {
                setVisibleCards(8);
            } else if (screenWidth > 320 && screenWidth < 768) {
                setVisibleCards(5);
            }
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);



    return (
        <div className="movies">
            {isLoading ? (
                <Preloader />
            ) : (
                movies.length > 0 ? 
                    <div className="movies__card-list">
                        {movies.slice(0, visibleCards).map((movie) => (
                            <MoviesCard
                                key={movie.id}
                                movie={movie}
                                onSaveClick={onSaveClick}
                                onDeleteClick={onDeleteClick}
                                setErrorPopup={setErrorPopup}
                                setErrorText={setErrorText}
                            />
                        ))}
                    </div>
                    :
                    <h2 className="movies__no-movies-title">Ничего не найдено</h2>
            )}
            {movies.length > visibleCards && !isLoading && (
                <div className="more">
                    {location.pathname === "/movies" &&
                        <button onClick={moreCrads} className="more__button">Еще</button>
                    }
                    {location.pathname === "/saved-movies" &&
                        <div className="more__saved-movies"></div>
                    }
                </div>
            )}
        </div>
    );
}

export default MoviesCardList;
