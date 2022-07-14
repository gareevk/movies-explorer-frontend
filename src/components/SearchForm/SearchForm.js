import React from 'react';
import loopImage from '../../images/loop-icon.svg'
import './SearchForm.css';

function SearchForm() {
    return (
        <section className='search-form'>
            <form className='search-form__container'>
                <div className='search-form__loop-container'>
                    <img className='search-form__loop-icon' src={loopImage} alt='поле поиска'/>
                </div>
                <div className='search-form__input-container'>
                    <input className='search-form__input' type='search' placeholder='Фильм' required></input>
                    <div className='search-form__button-container'>
                        <button className='search-form__button'></button>
                    </div>
                </div>
                <div className='search-form__checkbox-container'>
                    <input className='search-form__radio' type='checkbox'></input>
                    <span className='search-form__radio-text'>Короткометражки</span>
                </div>
            </form>
            <div className='search-form__bottom-border'></div>
        </section>
    );
}

export default SearchForm;