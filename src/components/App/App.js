import './App.css';
//react
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
//api
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as Auth from '../../utils/Auth';
//images
import succesImage from '../../images/success-image.svg';
import errorImage from '../../images/error-image.svg';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSucessPopup, setSuccesPopup] = useState(false);
  const [isErrorPopup, setErrorPopup] = useState(false);
  const [shortsActive, setShortsActive] = useState(false);
  const [isLoadingMovies, setLoadingMovies] = useState(false);
  const [isLoadingSavedMovies, setLoadingSavedMovies] = useState(false);
  const [savedShortsActive, setSavedShortsActive] = useState(false);

  const [currentUser, setCurrentUser] = useState();

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);

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
          setLoggedIn(true);
          const userData = await mainApi.getUserInfo();
          setCurrentUser(userData);
        }
      } catch (err) {
        setErrorPopup(true);
        setErrorText(`Ошибка ${err}`);
        console.log(err);
      }
    }
  };

  //авторизация
  // async function handleLoginSubmit(userData) {
  //   try {
  //     const res = await Auth.signIn(userData);
  //     localStorage.setItem("jwt", res.token);
  //     const user = await mainApi.getUserInfo();
  //     setCurrentUser(user);
  //     setLoggedIn(true);
  //     navigate('/movies', { replace: true });
  //   } catch (err) {
  //     setErrorPopup(true);
  //     setErrorText(`${err}`);
  //     console.log(err);
  //   };
  // };

  function handleLoginSubmit(email, password) {
    Auth.signIn(email, password)
      .then((res) => {
        if (res.data.email) {
          setSuccesPopup(true)
          setLoggedIn(true)
          navigate('/movies', { replace: true })
        }
      })
      .catch(err => {
        setErrorPopup(true);
        setErrorText(`${err}`);
        console.log(err);
      })
  }

  //регистрация
  // async function handleRegisterSubmit(userData) {
  //   try {
  //     await Auth.signUp(userData);
  //     await handleLoginSubmit(userData);
  //   } catch (err) {
  //     setErrorPopup(true);
  //     setErrorText(`${err}`);
  //     console.log(err);
  //   };
  // };

  function handleRegisterSubmit(name, email, password) {
    Auth.signUp(name, email, password)
      .then(() => {
        handleLoginSubmit({ email, password })
      })
      .catch(err => {
        setErrorPopup(true);
        setErrorText(`${err}`);
        console.log(err);
      })
  }
  //выйти из аккаунта
  function handleSignOutSubmit() {
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('inputMoviesValue');
    localStorage.removeItem('shortsActive');
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/", { replace: true });
    setSavedMovies([]);
    setMovies([]);
  };

  //обновляем данные профиля
  async function handleUpdateUser(userData) {
    try {
      const updateUserData = await mainApi.updateUserData(userData);
      setCurrentUser(updateUserData);
      setSuccesPopup(true);
      setSuccessText('Вы успешно обновили данные');
    } catch (err) {
      setErrorPopup(true);
      setErrorText(`Ошибка ${err.message}`)
      console.log(err);
    };
  };

  //добовляем понравившийся фильм
  async function handleSaveMovie(movie) {
    try {
      const addMovie = await mainApi.addNewMovie(movie);
      const updateMovies = [addMovie, ...savedMovies];
      localStorage.setItem('savedMovies', JSON.stringify(updateMovies));
      setSavedMovies([addMovie, ...savedMovies]);
    } catch (err) {
      setErrorPopup(true);
      setErrorText(`${err.message}`);
      console.log(err);
    }
  }

  //удаляем фильм из избранного 
  async function handleDeleteMovie(movie) {
    try {
      if (location.pathname === '/movies') {
        const selectMovie = savedMovies.find(m => m.movieId === movie.id);

        await mainApi.deleteMovie(selectMovie._id);
        const updateMovies = savedMovies.slice().filter(m => m !== selectMovie);

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
      setLoadingMovies(true);
      const state = !shortsActive;
      setShortsActive(state);

      localStorage.setItem('shortsActive', JSON.stringify(state));
      const searcheMovies = JSON.parse(localStorage.getItem('searchMovies'));
      const filtrateMovies = filterShorts(searcheMovies, state);
      const assortMovies = sortMovies(filtrateMovies, savedMovies);
      setMovies(assortMovies);
      setLoadingMovies(false);
    } else if (location.pathname === '/saved-movies') {
      const state = !savedShortsActive;
      setSavedShortsActive(state);

      const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const filtrateMovies = filterShorts(userMovies, state);
      setSavedMovies(filtrateMovies);
    };
  };

  //фильтрация фильмов по времени "короткометражки"
  function filterShorts(movies, state) {
    return state ? movies.filter((movie) => movie.duration <= 40) : movies;
  }

  //сортировка понравившехся фильмов
  function sortMovies(movies, savedMovies) {
    const assortMovies = movies.map((movie) => {
      movie.isAdded = savedMovies.some(
        (savedMovies) => savedMovies.movieId === movie.id
      );
      return movie;
    })
    return assortMovies;
  }

  useEffect(() => {
    const assortMovies = sortMovies(movies, savedMovies);
    setMovies(assortMovies);
  }, [savedMovies]);


  useEffect(() => {
    tokenCheck();
  }, []);

  //поиск фильмов
  function handleSearchMovies() {
    return moviesApi.getInitialMovies()
      .then((initialMovies) => {
        setInitialMovies(initialMovies);
        return initialMovies;
      });
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      setLoadingMovies(true);
      mainApi
        .getMyMovies()
        .then((savedMovies) => {
          const userMovies = savedMovies.filter((savedMovies) => savedMovies.owner === currentUser._id);
          localStorage.setItem('savedMovies', JSON.stringify(userMovies));
          setSavedMovies(userMovies);

          if (localStorage.getItem('searchMovies')) {
            const state = JSON.parse(localStorage.getItem('shortsActive'));
            setShortsActive((state) || false);

            const searchMovies = JSON.parse(localStorage.getItem('searchMovies'));
            const assortMovies = sortMovies(searchMovies, userMovies);
            const filtrateMovies = filterShorts(assortMovies, state);
            setMovies(filtrateMovies);
            setLoadingMovies(false)
          } else {
            moviesApi
              .getInitialMovies()
              .then((movies) => {
                const assortMovies = sortMovies(movies, userMovies);
                localStorage.setItem('searchedMovies', JSON.stringify(assortMovies));
                const filtrateMovies = filterShorts(assortMovies, shortsActive);
                setMovies(filtrateMovies);
                setLoadingMovies(false);
              })
              .catch((err) => {
                setErrorPopup(true);
                setErrorText(`${err}`)
                console.log(err);
              })
          }
        })
        .catch((err) => {
          setErrorPopup(true);
          setErrorText(`${err}`)
          console.log(err);
        })
    }
  }, [currentUser]);

  return (
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
            <Register
              onSubmit={handleRegisterSubmit}
              loggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/signin"
          element={
            <Login
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
              initialMovies={initialMovies}
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
            <NotFoundPage />
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
};

export default App;