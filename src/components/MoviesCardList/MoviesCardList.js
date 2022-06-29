import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import tempMovie from '../../images/temp-movie.svg';

function MoviesCardList() {
    return (
        <section className='movies-card-list'>
            <ul className='movies-card-list__list'>
                <MoviesCard movieImageLink={tempMovie} movieName={"33 слова о дизайне"} movieDuration={"1ч 47м"} isSaved={false} />
                <MoviesCard movieImageLink={tempMovie} movieName={"33 слова о дизайне"} movieDuration={"1ч 47м"} isSaved={false} />
                <MoviesCard movieImageLink={tempMovie} movieName={"33 слова о дизайне"} movieDuration={"1ч 47м"} isSaved={false} />
            </ul>
            <button className='movies-card-list__more'>Ещё</button>
        </section>
    );
}

export default MoviesCardList;