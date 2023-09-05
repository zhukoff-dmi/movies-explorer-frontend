class MainApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    //отчет сервера
    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
    }

    _request(url, options) {
        return fetch(`${this._baseUrl}${url}`, options).then(this._getJson)
    }

    //Запросы пользователя

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        }).then(this._getJson)
    }

    updateUserData(userData) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email
            }),
        }).then(this._getJson)
    }

    //Запросы связанные с фильмами

    getMyMovies() {
        return fetch(this._baseUrl + '/movies', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        }).then(this._getJson)
    }

    addNewMovie(movie) {
        return fetch(this._baseUrl + '/movies', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: (`https://api.nomoreparties.co${movie.image.url}`),
                trailerLink: movie.trailerLink,
                thumbnail: (`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`),
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            })
        }).then(this._getJson)
    }

    deleteMovie(movieId) {
        return fetch(this._baseUrl + `/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: movieId
            }),
        }).then(this._getJson)
    };
}

const mainApi = new MainApi('https://api.zhukoffdmi.nomoreparties.co');

export default mainApi;