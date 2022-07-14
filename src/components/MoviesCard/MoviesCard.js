import React from 'react';
import './MoviesCard.css';

function MoviesCard( {
    movieImageLink,
    movieName,
    movieDuration,
    isSaved,
    isInSavedMovies,
} ) {
    return (
        <li className='movies-card'>
            <img className='movies-card__image' alt='обложка фильма' src={movieImageLink}/>
            <div className='movies-card__container'>
                <div className='movies-card__info'>
                    <h3 className='movies-card__name'>{movieName}</h3>
                    <p className='movies-card__duration'>{movieDuration}</p>
                </div>
                {
                    isInSavedMovies ?
                    (<button className='movies-card__remove-button'></button>)
                    : <button 
                    type="button" className={`${isSaved
                        ? 'movies-card__like-button movies-card__like-button_active'
                        : 'movies-card__like-button'}`}>
                    </button>
                }
                
            </div>
        </li>
    )
}

export default MoviesCard;