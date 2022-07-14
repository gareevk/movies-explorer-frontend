import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import tempMovie from '../../images/temp-movie.svg';
import './MoviesCardList.css';

function MoviesCardList( {isInSavedMovies} ) {
    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list__list'>
                <MoviesCard 
                    movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={true}
                    isInSavedMovies={isInSavedMovies} 
                />
                <MoviesCard movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={false}
                    isInSavedMovies={isInSavedMovies} 
                />
                <MoviesCard movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={true}
                    isInSavedMovies={isInSavedMovies} 
                />
                <MoviesCard movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={false}
                    isInSavedMovies={isInSavedMovies} 
                />
                <MoviesCard movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={true}
                    isInSavedMovies={isInSavedMovies} 
                />
                <MoviesCard movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={false}
                    isInSavedMovies={isInSavedMovies} 
                />
                <MoviesCard movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={true}
                    isInSavedMovies={isInSavedMovies} 
                />
                <MoviesCard movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={true}
                    isInSavedMovies={isInSavedMovies} 
                />
                <MoviesCard movieImageLink={tempMovie} 
                    movieName={"33 слова о дизайне"} 
                    movieDuration={"1ч 47м"} 
                    isSaved={false}
                    isInSavedMovies={isInSavedMovies} 
                />
            </ul>
            <div className='movies-card-list__more-container'>
                <button className='movies-card-list__more'>Ещё</button>
            </div>
        </section>
    );
}

export default MoviesCardList;