class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    const response = await res.json();
    if (response?.validation?.body) {

      return Promise.reject(
        `Ошибка ${response?.message || response?.validation?.body?.message ||
        res.status}`);
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._getJson);
  }

  async getInitialMovies() {
    const cache = localStorage.getItem('allMovies');
    let movies = cache ? JSON.parse(cache) : await this._request('/', {
      method: 'GET',
      headers: this._headers,
    });
    if (!cache) {
      localStorage.setItem('allMovies', JSON.stringify(movies));
    }

    return movies;
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
