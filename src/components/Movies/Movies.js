import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';
import moviesApi from '../../utils/MoviesApi';

function Movies() {
    const [moviesList, setMoviesList] = React.useState([]);
    const [isShortFilm, setIsShortFilm] = React.useState(false);
    const [searchMovieResult, setSearchMovieResult] = React.useState([]);

    function handleShortFilmCheckbox() {
        if (isShortFilm) {
            setIsShortFilm(false);
        } else {
            setIsShortFilm(true);
        }
    }

    function getMoviesList() {
        moviesApi.getMovies()
        .then( (movies) => {
            setMoviesList(movies);
        })
        .catch( (err) => {
            console.log(err);
            return err;
        } );
    }

    function handleMoviesSearch(movie) {
        getMoviesList();
        //console.log(movie);
        console.log(moviesList);
        
        const searchResult = moviesList.filter( movieListItem => movieListItem.nameRU.toLowerCase().includes(movie.toLowerCase()));
        console.log(searchResult);
        console.log(isShortFilm);
        if (isShortFilm) {
            const shortMovies = searchResult.filter( movieItem => movieItem.duration < 53 );
            console.log(shortMovies);
            setSearchMovieResult(shortMovies);
            console.log(searchMovieResult);
        }
        setSearchMovieResult(searchResult);
        console.log(searchMovieResult);
    }

    function renderMovies(searchMovieResult) {

    }

    return (
        <div className='movies'>
            <Header />
            <SearchForm 
                onSubmit={handleMoviesSearch}
                onShortFilmCheckbox={handleShortFilmCheckbox}
            />
            <MoviesCardList 
                movies={searchMovieResult}
            />
            <Footer />
        </div>
    )
}

export default Movies;