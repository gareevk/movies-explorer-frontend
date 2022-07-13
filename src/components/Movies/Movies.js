import React from 'react';
import { useMediaPredicate } from "react-media-hook";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

function Movies({ handleLikeCard }) {
    const [moviesList, setMoviesList] = React.useState([]);
    const [searchMovieResult, setSearchMovieResult] = React.useState([]);
    const [moviesToRender, setMoviesToRender] = React.useState([]);
    const [cardsAmountToRender, setCardsAmountToRender] = React.useState(0);
    const [isMore, setIsMore] = React.useState(false);
    const [isShortFilm, setIsShortFilm] = React.useState(JSON.parse(localStorage.getItem('isShortFilm')) || false);
    const [searchRequest, setSearchRequest] = React.useState('');
    const [initialSearchResults, setInitialSearchResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchResultIsEmpty, setSearchResultIsEmpty] = React.useState(false);
    //const [isChecked, setIsChecked] = React.useState(false);

    const desktopView = useMediaPredicate("(min-width: 768px)");
    const tabletView = useMediaPredicate("(min-width: 480px)");
    const mobileView = useMediaPredicate("(max-width: 479px)");

    React.useEffect( () => {
        console.log(moviesToRender);
        console.log(JSON.parse(localStorage.getItem('moviesSearch')));
        setTimeout(() => {
            initialStates();
            if (moviesList.length === 0) {
                getMoviesList();
                console.log('movies list: ' + moviesList);
                console.log(searchResultIsEmpty);
            }
        }, 100);
    }, []);

    React.useEffect( () => {
        setTimeout ( () => {
            const movies = localStorage.getItem('moviesSearch');
            if (movies.length > 0) {
                const request = localStorage.getItem('request');
                updateSearchRequest(request);
            }
        }, 100);
    }, [moviesList]);

    const updateSearchRequest = (request) => {
        setIsLoading(true);
        setCardsAmountToRender(calculateCardsAmountToRender());
        setTimeout( () => {
            handleMoviesSearch(request);
        }, 100);
        localStorage.setItem('request', request);
    }

    React.useEffect( () => {
        setSearchMovieResult(handleSearchByMovieType());
        console.log('initital: ' + initialSearchResults);
    }, [initialSearchResults]);
    
    React.useEffect( () => {
        console.log(searchMovieResult);
        setMoviesToRender(searchMovieResult.slice(0, cardsAmountToRender));
    }, [searchMovieResult, cardsAmountToRender]);

    React.useEffect( () => {
        setIsLoading(false);
        setIsMore(handleMoreButtonAvailability());
        console.log(isShortFilm);
        localStorage.setItem('isShortFilm', JSON.stringify(isShortFilm));
    }, [moviesToRender]);

    const getMoviesList = () => {
        return moviesApi.getMovies()
        .then( (movies) => {
            setMoviesList(movies);
        })
        .catch( (err) => {
            console.log(err);
            return err;
        } );
    }

    const calculateCardsAmountToRender = () => {
        let counter;
        if (tabletView) {
            counter = 8;
        } else if (mobileView) {
            counter = 5;
        } else {
            counter = 12;
        }
        console.log(counter);
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
        console.log(moviesList);
        setInitialSearchResults(moviesList.filter( movieListItem => movieListItem.nameRU.toLowerCase().includes(searchRequest.toLowerCase())));
    }

    const initialStates = () => {
        setIsMore(false);
        setIsLoading(false);
        setSearchResultIsEmpty(false);
    }

    const handleShortFilmCheckbox = () => {
        //setIsChecked(!isChecked);
        if (isShortFilm) {
            setIsShortFilm(false);
        } else {
            setIsShortFilm(true);
        }
        
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
            movies = initialSearchResults.filter( movieItem => movieItem.duration < 53 );
        } else {
            movies = initialSearchResults;
        }
        if (movies.length === 0) {
            setSearchResultIsEmpty(true);
        } else {
            setSearchResultIsEmpty(false);
        };
        localStorage.setItem('moviesSearch', JSON.stringify(movies));
        console.log(JSON.parse(localStorage.getItem('moviesSearch')));
        return movies;
    }

    const loadMoreMovies = () => {
        setCardsAmountToRender(calculateMoreCardsToRender());
    }

    return (
        <div className='movies'>
            <Header />
            <SearchForm 
                onSubmit={updateSearchRequest}
                onShortFilmCheckbox={handleShortFilmCheckbox}
                searchValue={searchRequest}
                isChecked={isShortFilm}
            />
            { searchResultIsEmpty ? <p className='movies__movie-not-found'>Ничего не найдено</p> : <></> }
            { isLoading ? <Preloader /> : <></> }
            <MoviesCardList 
                movies={moviesToRender}
                loadMoreClick={loadMoreMovies}
                moreMoviesToLoad={isMore}
                onCardLike={handleLikeCard}
            />
            <Footer />
        </div>
    )
}

export default Movies;