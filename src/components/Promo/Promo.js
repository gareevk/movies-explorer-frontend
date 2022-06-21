import React from 'react';
import promoImage from '../../images/promo__image.svg';
import './Promo.css';

function Promo() {
    return (
        <section className='promo'>
            <div className='promo__content'>
                <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
                <img className='promo__image' src={promoImage} alt='логотип страницы'/>
            </div>
        </section>
    );
}

export default Promo;