import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies({
    savedMovies,
    onDeleteClick,
    onSubmit,
    isLoading,
    setErrorText,
    setErrorPopupOpen,
    onToggleClick,
    setLoadingSaveMovies,
    setSavedMovies
}) {

    useEffect(() => {
        setLoadingSaveMovies(true);
        const userMovies = JSON.parse(localStorage.getItem('savedMovies'))
        setSavedMovies(userMovies);
        setLoadingSaveMovies(false);
    }, []);

    return (
        <main>
            <Header />

            <SearchForm
                onToggleClick={onToggleClick}
                onSubmit={onSubmit}
            />
            <MoviesCardList
                isLoading={isLoading}
                movies={savedMovies}
                setErrorPopupOpen={setErrorPopupOpen}
                setErrorText={setErrorText}
                onDeleteClick={onDeleteClick}
            />

            <Footer />

        </main>
    );
}

export default SavedMovies;