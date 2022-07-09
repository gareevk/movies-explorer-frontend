import React from 'react';
import loopImage from '../../images/loop-icon.svg'
import './SearchForm.css';

function SearchForm({ onSubmit, onShortFilmCheckbox }) {
    function handleSearchFormSubmit(e) {
        e.preventDefault();
        const {movie} = e.target;
        console.log(movie.value);
        onSubmit(movie.value);
    }

    return (
        <section className='search-form'>
            <form className='search-form__container' onSubmit={handleSearchFormSubmit}>
                <div className='search-form__loop-container'>
                    <img className='search-form__loop-icon' src={loopImage} alt='поле поиска'/>
                </div>
                <div className='search-form__input-container'>
                    <input className='search-form__input' id='movie' type='search' placeholder='Фильм' required></input>
                    <div className='search-form__button-container'>
                        <button className='search-form__button' type='submit'></button>
                    </div>
                </div>
                <div className='search-form__checkbox-container'>
                    <input className='search-form__radio' type='checkbox' onClick={onShortFilmCheckbox}></input>
                    <span className='search-form__radio-text'>Короткометражки</span>
                </div>
            </form>
            <div className='search-form__bottom-border'></div>
        </section>
    );
}

export default SearchForm;