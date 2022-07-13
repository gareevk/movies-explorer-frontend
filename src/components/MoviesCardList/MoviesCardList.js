import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ isInSavedMovies, movies, loadMoreClick, moreMoviesToLoad, onCardLike }) {

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
                                card={movie}
                                onCardLike={onCardLike}
                            />
                        )
                    })
                }
            </ul>
            { moreMoviesToLoad ? (
                <div className='movies-card-list__more-container'>
                <button className='movies-card-list__more' type='button' onClick={loadMoreClick}>Ещё</button>
            </div>
            ) : (<></>)}
            
        </section>
    );
}

export default MoviesCardList;