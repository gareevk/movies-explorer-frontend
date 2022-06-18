import React from 'react';
import './Portfolio.css';
import arrowIcon from '../../images/aboutme__arrow.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__heading'>Портфолио</h2>
                <ul className='portfolio__list'>
                    <li className='portfolio__item'>
                        <a className='portfolio__link' href='https://yandex.ru/'>
                            <h4 className='potfolio__name'>Статичный сайт</h4>
                            <img className='potfolio__icon' src={arrowIcon} alt='иконка ссылки'/>
                        </a>
                    </li>
                    <li className='portfolio__item'>
                        <a className='portfolio__link' href='https://yandex.ru/'>
                            <h4 className='potfolio__name'>Адаптивный сайт</h4>
                            <img className='potfolio__icon' src={arrowIcon} alt='иконка ссылки'/>
                        </a>
                    </li>
                    <li className='portfolio__item'>
                        <a className='portfolio__link' href='https://yandex.ru/'>
                            <h4 className='potfolio__name'>Одностраничное приложение</h4>
                            <img className='potfolio__icon' src={arrowIcon} alt='иконка ссылки'/>
                        </a>
                    </li>
                </ul>
        </section>
    );
}

export default Portfolio;
