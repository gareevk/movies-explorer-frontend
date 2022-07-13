import { mainApiConfig } from "./constants";

class MainApi {
    constructor() {
        this._url = mainApiConfig.baseUrl;
        this._userToken = `Bearer ${localStorage.getItem('jwt')}`;
    }

    _updateToken() {
        this._userToken = `Bearer ${localStorage.getItem('jwt')}`;
    }

    _checkResponse = (res) => {
        console.log(res);
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(this._baseUrl + `/movies`, {
            method: "GET",
            headers: {
              authorization: this._userToken,
              'Content-Type': 'application/json',
            }
        })
        .then(this._checkResponse)
    }
    

    saveMovie(
        country,
        director,
        duration,
        year,
        description,
        image,
        nameRU,
        nameEN,
        trailerLink,
        thumbnail,
        movieId,
        ) {
            return fetch(this._baseUrl + `/movies`, {
                method: 'POST',
                headers: {
                    authorization: this._userToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    country,
                    director,
                    duration,
                    year,
                    description,
                    image,
                    nameRU,
                    nameEN,
                    trailerLink,
                    thumbnail,
                    movieId
                })        
            })
            .then( this._checkResponse)
    }

    deleteMovie(movieId) {
        return fetch(
            this._baseUrl + `/movies/${movieId}`,
            {
                method:  'DELETE',
                headers: {
                    authorization: this._userToken,
                    'Content-Type': 'application/json'
                }
            } 
        )
        .then(this._checkResponse)
    }
    
    getUserInfo() {
        this._updateToken();
        return fetch(
            this._baseUrl + '/users/me',
            {
                headers: {
                    authorization: this._userToken,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then( this._checkResponse)
    }

    updateUserInfo(name, email) {
        return fetch( this._baseUrl + 'users/me/avatar',
        {
            method: 'PATCH',
            headers: { 
                authorization: this._userToken, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then( this._checkResponse)
    }
}

const mainApi = new MainApi();

export default mainApi;