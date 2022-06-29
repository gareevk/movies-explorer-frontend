import React from 'react';

function MoviesCard( {
    movieImageLink,
    movieName,
    movieDuration,
    isSaved,
} ) {
    return (
        <li className='movies-card'>
            <img className='movies-card__image' alt='обложка фильма' src={movieImageLink}/>
            <div className='movies-card__conatainer'>
                <div className='movies-card__info'>
                    <h3 className='movies-card__name'>{movieName}</h3>
                    <span className='movies-card__duration'>{movieDuration}</span>
                </div>
                <button 
                    type="button" className={`${isSaved} : 'movies-card__like-button movies-card__like-button_active' ? 'movies-card__like-button'`}>
                </button>
            </div>
        </li>
    )
}

export default MoviesCard;