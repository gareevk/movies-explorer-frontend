import { moviesApiConfig } from './constants';

class MoviesApi {
    constructor() {
        this._baseUrl=moviesApiConfig.baseUrl;
    }

    getMovies() {
        return fetch(
            this._baseUrl,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        .then( res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}

const moviesApi = new MoviesApi();

export default moviesApi;