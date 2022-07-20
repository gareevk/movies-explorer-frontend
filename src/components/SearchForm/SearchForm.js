import React from 'react';
import loopImage from '../../images/loop-icon.svg'
import './SearchForm.css';

function SearchForm({ onSubmit, onShortFilmCheckbox, searchValue, isChecked, isInSavedMovies, onFilter }) {
    const [inputValue, setInputValue] = React.useState('');
    const [isValid, setValidity] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const storage = localStorage.getItem('searchRequest');
        if (!isInSavedMovies) {
            if (storage !== 'null') {
                setInputValue(storage);
            }
        }
    }, []);

    const handleSearchFormSubmit = (e) => {
        e.preventDefault();
        const {movie} = e.target;
        onSubmit(movie.value);
    }

    const handleInputChange = (e) => {
        const input = e.target;
        setInputValue(input.value);
        setValidity(input.validity.valid);
        if (!isValid & input.value.length < 1) {
        setError('Введите запрос');
        }
        else if (!isValid) {
        setError(input.validationMessage);
        }
        else {
        setError('');
        }
    }

    const handleFilter = (e) => {
        e.preventDefault();
        const {movie} = e.target;
        localStorage.setItem('filterRequest', movie.value);
        onFilter(movie.value);
    }

    React.useEffect(() => {
        if (isInSavedMovies) {
            onFilter(localStorage.getItem('filterRequest') || '');
        }
    }, [isChecked]);

    const handleCheck = () => {
        onShortFilmCheckbox();
    }

    return (
        <section className='search-form'>
            <form className='search-form__container' onSubmit={isInSavedMovies ? handleFilter : handleSearchFormSubmit}>
                <div className='search-form__loop-container'>
                    <img className='search-form__loop-icon' src={loopImage} alt='поле поиска'/>
                </div>
                <div className='search-form__input-container'>
                    <input className='search-form__input' id='movie' type='search' placeholder={'Фильм'} value={inputValue} onReset={handleFilter} onChange={handleInputChange}></input>
                    <div className='search-form__button-container'>
                        <button className='search-form__button' type='submit'></button>
                    </div>
                </div>
                <div className='search-form__checkbox-container'>
                    <input className='search-form__radio' type='checkbox' onChange={handleCheck} defaultChecked={isChecked}></input>
                    <span className='search-form__radio-text'>Короткометражки</span>
                </div>
            </form>
            <div className='search-form__bottom-border'></div>
        </section>
    );
}

export default SearchForm;