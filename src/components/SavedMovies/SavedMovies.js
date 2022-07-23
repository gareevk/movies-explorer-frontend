import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ savedMovies, movies, onDelete, getMovies, onFilter, onCheckbox, isShortFilm }) {
    const [isEmpty, setIsEmpty] = React.useState(false);
    
    React.useEffect(() => {
        getMovies();
    }, []);

    React.useEffect(() => {
        onFilter();
        localStorage.setItem('isShortFilmSavedMovie', isShortFilm);
    }, [savedMovies]);

    React.useEffect(() => {
        if (movies.length === 0) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [movies]);

    return (
        <div className='saved-movies'>
            <Header />
            <SearchForm 
                isInSavedMovies={true}
                onFilter={onFilter}
                onShortFilmCheckbox={onCheckbox}
                isChecked={isShortFilm}
            />
            { isEmpty ? <p className='saved-movies__movie-not-found'>Ничего не найдено</p> : <></> }
            <MoviesCardList 
                isInSavedMovies={true}
                onDelete={onDelete}
                movies={movies}
                getMovies={getMovies}
                onFilter={onFilter}
            />
            <Footer />
        </div>
    )
}

export default SavedMovies;