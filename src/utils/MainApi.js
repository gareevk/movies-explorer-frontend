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
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        //return fetch('http://localhost:3000/movies',
        return fetch('https://moviester.nomoreparties.sbs/movies', 
        {
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
            console.log({country,
                director,
                duration,
                year,
                description,
                image,
                nameRU,
                nameEN,
                trailerLink,
                thumbnail,
                movieId,}
            )
            this._updateToken();
            //return fetch('http://localhost:3000/movies',
            return fetch('https://moviester.nomoreparties.sbs/movies', 
            {
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
        console.log(movieId);
        //return fetch(`http://localhost:3000/movies/${movieId}`,
        return fetch(`https://moviester.nomoreparties.sbs/movies/${movieId}`,
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
        //return fetch('http://localhost:3000/users/me/',
        return fetch('https://moviester.nomoreparties.sbs/users/me/',
            {
                headers: {
                    authorization: this._userToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        )
        .then( this._checkResponse)
    }

    updateUserInfo(name, email) {
        //return fetch('http://localhost:3000/users/me/',
        return fetch('https://moviester.nomoreparties.sbs/users/me/',
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