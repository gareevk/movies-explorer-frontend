import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import tempMovie from '../../images/temp-movie.svg';
import './MoviesCardList.css';

function MoviesCardList({ isInSavedMovies, movies }) {

     function convertDuration(movieDuration) {
         const hours = Math.floor( movieDuration / 60);
         const minutes = movieDuration % 60;
         return (`${hours}ч ${minutes}м`);
     }

    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list__list'>
                {
                    movies.map( movie => {
                        return (
                            <MoviesCard 
                                movieImageLink={'https://api.nomoreparties.co'+movie.image.url}
                                movieName={movie.nameRU}
                                movieDuration={convertDuration(movie.duration)}
                                isSaved={false}
                                isInSavedMovies={isInSavedMovies}
                                key={movie.id}
                            />
                        )
                    })
                }
            </ul>
            <div className='movies-card-list__more-container'>
                <button className='movies-card-list__more'>Ещё</button>
            </div>
        </section>
    );
}

export default MoviesCardList;