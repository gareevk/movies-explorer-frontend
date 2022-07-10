import React from 'react';
import { useMediaPredicate } from "react-media-hook";
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
    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const [cardsAmountToRender, setCardsAmountToRender] = React.useState(0);
    const [isMore, setIsMore] = React.useState(true)

    const desktopView = useMediaPredicate("(min-width: 768px)");
    const tabletView = useMediaPredicate("(min-width: 480px)");
    const mobileView = useMediaPredicate("(max-width: 479px)");

    React.useEffect( () => {
        initialStates();
        console.log('drop');
    }, [])

    function initialStates() {
        setMoviesList([]);
        setIsShortFilm(false);
        setSearchMovieResult([]);
        setMoviesToRender([]);
        setCardsAmountToRender(0);
        setIsMore(true);
    }
    
    function calculateCardsAmountToRender() {
        if (desktopView) {
            setCardsAmountToRender(12);
        } else if (tabletView) {
            setCardsAmountToRender(8);
        } else if (mobileView) {
            setCardsAmountToRender(5);
        }
    }

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
        initialStates();
        getMoviesList();
        calculateCardsAmountToRender();
        console.log(cardsAmountToRender);
        console.log(movie);
        console.log(moviesList);
        let movies;
        const searchResult = moviesList.filter( movieListItem => movieListItem.nameRU.toLowerCase().includes(movie.toLowerCase()));
        //console.log(searchResult);
        //console.log(isShortFilm);
        if (isShortFilm) {
            const shortMovies = searchResult.filter( movieItem => movieItem.duration < 53 );
            //console.log(shortMovies);
            setSearchMovieResult(shortMovies);
            movies = shortMovies.slice(0, cardsAmountToRender);
            //console.log(movies);
        } else {
            setSearchMovieResult(searchResult);
            movies = searchResult.slice(0, cardsAmountToRender);
            console.log(movies);
        }
        setMoviesToRender(movies);
        if (searchMovieResult.length === movies.length) {
            setIsMore(false);
        }
        //console.log(searchMovieResult);
    }

    function loadMoreMovies() {
        calculateCardsAmountToRender();
        console.log(searchMovieResult);
        if (desktopView) {
            setCardsAmountToRender( cardsAmountToRender + 3 );
        } else if (tabletView) {
            setCardsAmountToRender( cardsAmountToRender + 2 );
        } else if (mobileView) {
            setCardsAmountToRender( cardsAmountToRender + 2 );
        }
        let moviesArray = moviesToRender;
        console.log(cardsAmountToRender);
        for ( let i = moviesToRender.length + 1; i <= cardsAmountToRender; i++ ) {
            if ( i <= searchMovieResult.length) {
                console.log(searchMovieResult[i]);
            moviesArray.push(searchMovieResult[i]);
            } else {
                setIsMore(false);
            }
        }
        setMoviesToRender(moviesArray);
    }

    return (
        <div className='movies'>
            <Header />
            <SearchForm 
                onSubmit={handleMoviesSearch}
                onShortFilmCheckbox={handleShortFilmCheckbox}
            />
            <MoviesCardList 
                movies={moviesToRender}
                loadMoreClick={loadMoreMovies}
                moreMoviesToLoad={isMore}
            />
            <Footer />
        </div>
    )
}

export default Movies;