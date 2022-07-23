import React from 'react';
import './MoviesCard.css';

function MoviesCard( {
    movieImageLink,
    movieName,
    movieDuration,
    savedMovies,
    isInSavedMovies,
    card,
    onCardLike,
    onDelete
} ) {
    const [isLiked, setIsLiked] = React.useState(false);

    function convertDuration(movieDuration) {
        const hours = Math.floor( movieDuration / 60);
        const minutes = movieDuration % 60;
        return (`${hours}ч ${minutes}м`);
    }

    function handleLikeClick() {
        setIsLiked(!isLiked);
        onCardLike({
            country: card.country || 'no information',
            director: card.director || 'no information',
            duration: movieDuration,
            year: card.year || 'no information',
            description: card.description || 'no information',
            image: movieImageLink,
            nameRU: movieName,
            nameEN: card.nameEN || 'no information',
            trailerLink: card.trailerLink || 'https://yandex.ru/',
            thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
            movieId: card.id,
        });
    }

    function deleteCard() {
        onDelete(card._id);
    }

    function renderLikes() {
        if (savedMovies) {
            const movies = savedMovies.map(movie => {
                return movie.movieId;
            });
            if (movies.includes(card.id)) {
                setIsLiked(true);
            };
        }
    }
    
    React.useEffect(() => {
        setTimeout(() => {
            renderLikes();
        }, 100);
        
    }, [savedMovies]);
    

    return (
        <li className='movies-card'>
            <img className='movies-card__image' alt='обложка фильма' src={movieImageLink}/>
            <div className='movies-card__container'>
                <div className='movies-card__info'>
                    <h3 className='movies-card__name'>{movieName}</h3>
                    <p className='movies-card__duration'>{convertDuration(movieDuration)}</p>
                </div>
                {
                    isInSavedMovies ?
                    (<button className='movies-card__remove-button' onClick={deleteCard}></button>)
                    : <button 
                    type="button" className={`${isLiked
                        ? 'movies-card__like-button movies-card__like-button_active'
                        : 'movies-card__like-button'}`} onClick={handleLikeClick}>
                    </button>
                }
                
            </div>
        </li>
    )
}

export default MoviesCard;