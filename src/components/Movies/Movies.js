import React from 'react';
import { useMediaPredicate } from "react-media-hook";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { shortMovieDuration, cardsToRender } from '../../utils/constants';

function Movies({ onLike, savedMovies, getSavedMovies, isShortFilm, onCheckbox, updateIsChecked }) {
    const [moviesList, setMoviesList] = React.useState([]);
    const [searchMovieResult, setSearchMovieResult] = React.useState([]);
    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const [cardsAmountToRender, setCardsAmountToRender] = React.useState(0);
    const [isMore, setIsMore] = React.useState(false);
    const [initialSearchResults, setInitialSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchResultIsEmpty, setSearchResultIsEmpty] = React.useState(false);

    const desktopView = useMediaPredicate("(min-width: 768px)");
    const tabletView = useMediaPredicate("(min-width: 480px)");
    const mobileView = useMediaPredicate("(max-width: 479px)");


    React.useEffect(() => {
        getSavedMovies();
        setTimeout(() => {
            initialStates();
            if (moviesList.length === 0) {
                if (JSON.parse(localStorage.getItem('movies'))) {
                    setMoviesList(JSON.parse(localStorage.getItem('movies')));
                } else {
                    getMoviesList();
                }
            }
        }, 100);
    }, []);

    React.useEffect( () => {
        setTimeout ( () => {
            const movies = localStorage.getItem('moviesSearch');
            if (movies.length > 0) {
                const request = localStorage.getItem('searchRequest');
                if (request) {
                    updateSearchRequest(request);
                }
            }
        }, 100);
    }, [moviesList]);

    const updateSearchRequest = (request) => {
        setIsLoading(true);
        setCardsAmountToRender(calculateCardsAmountToRender());
        setTimeout( () => {
            handleMoviesSearch(request);
        }, 100);
        localStorage.setItem('searchRequest', request);
    }

    React.useEffect( () => {
        setSearchMovieResult(handleSearchByMovieType());
        localStorage.setItem('isShortFilm', isShortFilm);
    }, [initialSearchResults, isShortFilm]);
    
    React.useEffect( () => {
        setMoviesToRender(searchMovieResult.slice(0, cardsAmountToRender));
        if (searchMovieResult.length === 0) {
            setSearchResultIsEmpty(true);
        } else {
            setSearchResultIsEmpty(false);
        };
    }, [searchMovieResult, cardsAmountToRender]);

    React.useEffect( () => {
        setIsLoading(false);
        setIsMore(handleMoreButtonAvailability());
    }, [moviesToRender]);

    const getMoviesList = () => {
        return moviesApi.getMovies()
        .then( (movies) => {
            setMoviesList(movies);
            localStorage.setItem('movies', JSON.stringify(movies));
        })
        .catch( (err) => {
            return err;
        } );
    }

    const calculateCardsAmountToRender = () => {
        let counter;
        if (desktopView) {
            counter = cardsToRender.desktop;
        } else if (tabletView) {
            counter = cardsToRender.tablet;
        } else if (mobileView) {
            counter = cardsToRender.mobile;
        }
        return counter;
    }

    const calculateMoreCardsToRender = () => {
        let counter;
        if (desktopView) {
            counter = cardsAmountToRender + 3;
        } else {
            counter = cardsAmountToRender + 2;
        }
        return counter;
    } 

    const handleMoviesSearch = (searchRequest) => {
        setInitialSearchResults(moviesList.filter( movieListItem => movieListItem.nameRU.toLowerCase().includes(searchRequest.toLowerCase())));
    }

    const initialStates = () => {
        setIsMore(false);
        setIsLoading(false);
        setSearchResultIsEmpty(false);
    }

    const handleMoreButtonAvailability = () => {
        if (searchMovieResult.length > moviesToRender.length) {
            return true;
        } else {
            return false;
        }
    }

    const handleSearchByMovieType = () => {
        let movies;        
        if (isShortFilm) {
            movies = initialSearchResults.filter( movieItem => movieItem.duration < shortMovieDuration );
        } else {
            movies = initialSearchResults;
        }
        localStorage.setItem('moviesSearch', JSON.stringify(movies));
        return movies;
    }

    const loadMoreMovies = () => {
        setCardsAmountToRender(calculateMoreCardsToRender());
    }

    console.log(searchResultIsEmpty);

    return (
        <div className='movies'>
            <Header />
            <SearchForm 
                onSubmit={updateSearchRequest}
                onShortFilmCheckbox={onCheckbox}
                isChecked={isShortFilm}
                isInSavedMovies={false}
            />
            { searchResultIsEmpty ? <p className='movies__movie-not-found'>Ничего не найдено</p> : <></> }
            { isLoading ? <Preloader /> : <></> }
            <MoviesCardList 
                movies={moviesToRender}
                loadMoreClick={loadMoreMovies}
                moreMoviesToLoad={isMore}
                onCardLike={onLike}
                isInSavedMovies={false}
                savedMovies={savedMovies}
            />
            <Footer />
        </div>
    )
}

export default Movies;