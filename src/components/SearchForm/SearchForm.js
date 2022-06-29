import React from 'react';
import loopImage from '../../images/loop-icon.svg'
import './SearchForm.css';

function SearchForm() {
    return (
        <section className='search-form'>
            <div className='search-form__container'>
                <div className='search-form__loop-container'>
                    <img className='search-form__loop-icon' src={loopImage} alt='поле поиска'/>
                </div>
                <form className='search-form__form'>
                    <input className='search-form__input' type='search' placeholder='Фильм' required></input>
                    <div className='search-form__button-container'>
                        <button className='search-form__button'></button>
                    </div>
                    <div className='search-form__checkbox-container'>
                        <input className='search-form__radio' type='checkbox'></input>
                        <label className='search-form__checkbox-label'></label>
                    </div>
                    <span className='search-form__radio-text'>Короткометражки</span>
                </form> 
            </div>
        </section>
    );
}

export default SearchForm;