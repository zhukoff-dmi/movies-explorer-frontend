import './App.css';
//react
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
//context
import { CurrentUserContext } from '../../context/CurrentUserContext';
//components
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import InfoTooltip from '../infoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotAuthorizedRoute from '../NotAuthorizedRoute/NotAuthorizedRoute'
//api
import { MainApi } from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as Auth from '../../utils/Auth';
//images
import succesImage from '../../images/success-image.svg';
import errorImage from '../../images/error-image.svg';
import Preloader from '../Preloader/Preloader';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(1);
  const [isSucessPopup, setSuccesPopup] = useState(false);
  const [isErrorPopup, setErrorPopup] = useState(false);
  const [shortsActive, setShortsActive] = useState(
    JSON.parse(localStorage.getItem('shortsActive') || 'false'));
  const [isLoadingMovies, setLoadingMovies] = useState(false);
  const [isLoadingSavedMovies, setLoadingSavedMovies] = useState(false);
  const [savedShortsActive, setSavedShortsActive] = useState(false);

  const [currentUser, setCurrentUser] = useState();

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [successText, setSuccessText] = useState('Успешно!');
  const [errorText, setErrorText] = useState('Ошибка!');

  const navigate = useNavigate();
  const location = useLocation();

  function closeAllPopups() {
    setSuccesPopup(false);
    setErrorPopup(false);
  }

  //проверка токена
  async function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        const res = await Auth.checkToken(jwt);

        if (res) {
          const mainApi = MainApi.getInstance();
          const userData = await mainApi.getUserInfo();
          setCurrentUser(userData);
          setLoggedIn(true);
          return;
        }
      } catch (err) {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        console.error(err);
      }
    }
    setLoggedIn(false);

  }

  //регистрация
  async function handleRegisterSubmit(userData) {
    try {
      await Auth.signUp(userData);
      await handleLoginSubmit(userData);
    } catch (err) {
      setErrorPopup(true);
      setErrorText(`${err}`);
      console.log(err);
    }
  }

  //авторизация
  async function handleLoginSubmit(userData) {
    try {
      const res = await Auth.signIn(userData);
      localStorage.setItem('jwt', res.token);
      const mainApi = MainApi.getInstance();
      const user = await mainApi.getUserInfo();
      setCurrentUser(user);
      setLoggedIn(true);
      navigate('/movies', { replace: true });
    } catch (err) {
      setErrorPopup(true);
      setErrorText(`${err}`);
      console.log(err);
    }
  }

  //выйти из аккаунта
  function handleSignOutSubmit() {
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('inputMovies');
    localStorage.removeItem('shortsActive');
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('allMovies');
    setCurrentUser({});
    setLoggedIn(false);
    setSavedMovies([]);
    setMovies([]);
    setShortsActive(false)
    navigate('/', { replace: true });
  }

  //обновляем данные профиля
  async function handleUpdateUser(userData) {
    console.log(userData);
    try {
      const mainApi = MainApi.getInstance();
      const updateUserData = await mainApi.updateUserData(userData);
      setCurrentUser(updateUserData);
      setSuccesPopup(true);
      setSuccessText('Вы успешно обновили данные');
    } catch (err) {
      setErrorPopup(true);
      setErrorText(`Ошибка ${err}`);
      console.log(err);
    }

  }

  //добовляем понравившийся фильм
  async function handleSaveMovie(movie) {
    try {
      const mainApi = MainApi.getInstance();
      const addMovie = await mainApi.addNewMovie(movie);
      const updateMovies = [addMovie, ...savedMovies];
      localStorage.setItem('savedMovies', JSON.stringify(updateMovies));
      setSavedMovies([addMovie, ...savedMovies]);
    } catch (err) {
      setErrorPopup(true);
      setErrorText(`${err}`);
      console.log(err);
    }
  }

  //удаляем фильм из избранного
  async function handleDeleteMovie(movie) {
    try {
      const mainApi = MainApi.getInstance();

      if (location.pathname === '/movies') {
        const selectMovie = savedMovies.find(m => m.movieId === movie.id);

        await mainApi.deleteMovie(selectMovie._id);
        const updateMovies = savedMovies.slice()
          .filter(m => m._id !== selectMovie._id);

        localStorage.setItem('savedMovies', JSON.stringify(updateMovies));
        setSavedMovies(updateMovies);
      } else if (location.pathname === '/saved-movies') {
        await mainApi.deleteMovie(movie._id);
        const updateMovies = savedMovies.slice().filter(m => m !== movie);

        localStorage.setItem('savedMovies', JSON.stringify(updateMovies));
        setSavedMovies(updateMovies);
      }
    } catch (err) {
      setErrorPopup(true);
      setErrorText(`${err}`);
      console.log(err);
    }
  }

  //кнопка коротметражки
  const handleToggleClick = () => {
    if (location.pathname === '/movies') {
      const state = !shortsActive;
      setShortsActive(state);
      localStorage.setItem('shortsActive', JSON.stringify(state));
    } else if (location.pathname === '/saved-movies') {
      setSavedShortsActive(!savedShortsActive);
    }

  };

  //фильтрация фильмов по времени "короткометражки"
  function filterShorts(movies, state) {
    return state ? movies?.filter((movie) => movie.duration <= 40) : movies;
  }

  //сортировка понравившехся фильмов
  function sortMovies(movies, savedMovies) {
    const saveUserMovies = JSON.parse(localStorage.getItem('savedMovies') || "[]") ;
    return movies?.map((movie) => {
      movie.isAdded = saveUserMovies.some(
        (savedMovies) => savedMovies.movieId === movie.id
      );
      return movie;
    });
  }

  useEffect(() => {
    const assortMovies = sortMovies(movies, savedMovies);
    setMovies(assortMovies);
  }, [savedMovies]);

  useEffect(() => {
    tokenCheck();
  }, []);

  function searchBy(movies, keyword) {
    const key = new RegExp(keyword, 'gi');
    return movies.filter(
      (item) => key.test(item.nameRU) || key.test(item.nameEN)
    );
  }

//поиск фильмов
  async function handleSearchMovies(keyword) {
    try {
      if (location.pathname === '/movies') {
        setLoadingMovies(true);
        const movies = await moviesApi.getInitialMovies();
        const findMovies = searchBy(movies, keyword);
        const sortedMovies = sortMovies(findMovies, savedMovies);
        const filteredMovies = filterShorts(sortedMovies, shortsActive);
        localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
        setMovies((filteredMovies) || []);
        setLoadingMovies(false);
      } else if (location.pathname === '/saved-movies') {
        setLoadingSavedMovies(true);
        const saveUserMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const findMovies = searchBy(saveUserMovies, keyword);
        setSavedMovies(filterShorts(findMovies, savedShortsActive) || []);
        setLoadingSavedMovies(false);
      }
    } catch (err) {
      setErrorPopup(true);
      setErrorText(`${err}`);
      console.log(err);
    }
  }

  useEffect(() => {
    //TODO try catch
    if (isLoggedIn === true) {
      const mainApi = MainApi.getInstance();
      setLoadingMovies(true);
      mainApi
        .getMyMovies()
        .then((savedMovies) => {
          const userMovies = savedMovies;
          localStorage.setItem('savedMovies', JSON.stringify(userMovies));
          const keyword = JSON.parse(
            localStorage.getItem('inputMovies') || '""')
          setSavedMovies(userMovies);

          if (localStorage.getItem('searchedMovies')) {

            const searchMovies = JSON.parse(
              localStorage.getItem('searchedMovies'));
            const assortMovies = sortMovies(searchMovies, userMovies);
            const filtrateMovies = filterShorts(assortMovies, shortsActive);
            const searchedMovies = searchBy(filtrateMovies,keyword)
            setMovies(searchedMovies);
          }
          setLoadingMovies(false);
        })
        .catch((err) => {
          setErrorPopup(true);
          setErrorText(`${err}`);
          console.log(err);
        });
    } else if (isLoggedIn === false) {
      handleSignOutSubmit();
    }
  }, [isLoggedIn, shortsActive, shortsActive, savedShortsActive]);

  return isLoggedIn === 1 ? <Preloader/> : (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              loggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <NotAuthorizedRoute
              element={Register}
              onSubmit={handleRegisterSubmit}
              loggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/signin"
          element={
            <NotAuthorizedRoute
              element={Login}
              onSubmit={handleLoginSubmit}
              loggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/movies"
          element={
            <ProtectedRoute
              element={Movies}
              loggedIn={isLoggedIn}
              isLoading={isLoadingMovies}
              movies={movies}
              onSaveClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              onToggleClick={handleToggleClick}
              shortsActive={shortsActive}
              onSubmit={handleSearchMovies}
              setErrorPopup={setErrorPopup}
              setErrorText={setErrorText}
            />
          }
        />

        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={isLoggedIn}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
              isLoading={isLoadingSavedMovies}
              setLoadingSavedMovies={setLoadingSavedMovies}
              onDeleteClick={handleDeleteMovie}
              onToggleClick={handleToggleClick}
              shortsActive={savedShortsActive}
              setErrorPopup={setErrorPopup}
              setErrorText={setErrorText}
              onSubmit={handleSearchMovies}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={Profile}
              currentUser={currentUser}
              loggedIn={isLoggedIn}
              onSignOut={handleSignOutSubmit}
              onSubmit={handleUpdateUser}
              setErrorPopup={setErrorPopup}
              setErrorText={setErrorText}
            />
          }
        />

        <Route
          path="*"
          element={
            <NotFoundPage/>
          }
        />
      </Routes>

      <InfoTooltip
        imgLink={errorImage}
        alt={errorText}
        titleText={errorText}
        isOpen={isErrorPopup}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        imgLink={succesImage}
        alt={successText}
        titleText={successText}
        isOpen={isSucessPopup}
        onClose={closeAllPopups}
      />


    </CurrentUserContext.Provider>
  );
}

export default App;
