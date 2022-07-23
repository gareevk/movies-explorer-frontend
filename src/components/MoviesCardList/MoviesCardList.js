import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ isInSavedMovies, movies, loadMoreClick, moreMoviesToLoad, onCardLike, onDelete, savedMovies }) {
    
    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list__list'>
                {   
                    movies.map( movie => {
                        return (
                            <MoviesCard 
                                movieImageLink={isInSavedMovies ? movie.image :'https://api.nomoreparties.co'+movie.image.url}
                                movieName={movie.nameRU}
                                movieDuration={movie.duration}
                                isInSavedMovies={isInSavedMovies}
                                key={isInSavedMovies ? movie._id : movie.id}
                                card={movie}
                                onCardLike={onCardLike}
                                onDelete={onDelete}
                                savedMovies={savedMovies}
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