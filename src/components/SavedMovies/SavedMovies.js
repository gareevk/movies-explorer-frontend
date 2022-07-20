import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ savedMovies, movies, onDelete, getMovies, onFilter, onCheckbox, isShortFilm }) {

    React.useEffect(() => {
        getMovies();
    }, []);

    React.useEffect(() => {
        onFilter();
    }, [savedMovies]);

    return (
        <div className='saved-movies'>
            <Header />
            <SearchForm 
                isInSavedMovies={true}
                onFilter={onFilter}
                onShortFilmCheckbox={onCheckbox}
                isChecked={isShortFilm}
            />
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