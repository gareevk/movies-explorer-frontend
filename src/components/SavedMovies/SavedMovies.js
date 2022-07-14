import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ savedMovies, onDelete, getMovies }) {

    console.log(savedMovies);

    React.useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className='saved-movies'>
            <Header />
            <SearchForm />
            <MoviesCardList 
                isInSavedMovies={true}
                onDelete={onDelete}
                movies={savedMovies}
                getMovies={getMovies}
            />
            <Footer />
        </div>
    )
}

export default SavedMovies;