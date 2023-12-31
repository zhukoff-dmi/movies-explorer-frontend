export class MainApi {
    static _instance;
    static getInstance() {
        const jwt = localStorage.getItem('jwt')
        if(!jwt) {
            throw new Error("user not loged in")
        }
        return this._instance ||     (new MainApi({
            baseUrl: 'https://api.zhukoffdmi.nomoreparties.co',
            // baseUrl: 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }}))
    }
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    
    //отчет сервера
    async _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        const response = await res.json()
        if(response?.validation?.body) {
            
            return Promise.reject(`Ошибка ${response?.message || response?.validation?.body?.message || res.status}`);
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    _request(url, options) {
        return fetch(`${this._baseUrl}${url}`, options).then(this._getJson)
    }

    //Запросы пользователя

    getUserInfo() {
        return this._request('/users/me', {
            headers: this._headers,
        })
    }

    updateUserData(userData) {
        return this._request('/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                email: userData.email
            }),
        })
    }

    //Запросы связанные с фильмами

    getMyMovies() {
        return this._request('/movies', {
            method: 'GET',
            headers: this._headers,
        })
    }

    addNewMovie(movie) {
        return this._request('/movies', {
            method: 'POST',
            headers: this._headers,
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
        })
    }

    deleteMovie(movieId) {
        return this._request(`/movies/${movieId}`, {
            method: 'DELETE',
            headers: this._headers,
            body: JSON.stringify({
                id: movieId
            })
        })
    }
}
