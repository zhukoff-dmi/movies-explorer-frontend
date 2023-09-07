import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies({
    onMenuBurgerClick,
    loggedIn,
    savedMovies,
    onDeleteClick,
    onSubmit,
    isLoading,
    setErrorText,
    setErrorPopup,
    onToggleClick,
    setLoadingSavedMovies,
    setSavedMovies
}) {

    useEffect(() => {
        setLoadingSavedMovies(true);
        const userMovies = JSON.parse(localStorage.getItem('savedMovies'))
        setSavedMovies(userMovies);
        setLoadingSavedMovies(false);
    }, []);

    return (
        <main>
            <Header
                onMenuBurgerClick={onMenuBurgerClick}
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