import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies({
    loggedIn,
    savedMovies,
    onDeleteClick,
    onSubmit,
    isLoading,
    setErrorText,
    setErrorPopup,
    onToggleClick,
    setLoadingSavedMovies,
                       setSavedMovies,
                       shortsActive
}) {

    useEffect(() => {
        setLoadingSavedMovies(true);
    const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
        setSavedMovies(userMovies);
        setLoadingSavedMovies(false);
  }, [shortsActive]);

    return (
        <main>
            <Header
                loggedIn={loggedIn}
            />

            <SearchForm
                onToggleClick={onToggleClick}
                onSubmit={onSubmit}
            />
            <MoviesCardList
                isLoading={isLoading}
                movies={savedMovies}
                setErrorPopup={setErrorPopup}
                setErrorText={setErrorText}
                onDeleteClick={onDeleteClick}
            />

            <Footer />

        </main>
    );
}

export default SavedMovies;
