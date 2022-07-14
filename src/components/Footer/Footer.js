import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <section className='footer'>
            <div className='footer__content'>
                <h4 className='footer__heading'>
                Учебный проект Яндекс.Практикум х BeatFilm.
                </h4>
                <div className='footer__container'>
                    <p className='footer__date'>© 2022</p>
                    <ul className='footer__links-list'>
                        <li className='footer__list-item'><a className='footer__link' href='https://yandex.ru'>Яндекс.Практикум</a></li>
                        <li className='footer__list-item'><a className='footer__link' href='https://github.com'>Github</a></li>
                        <li className='footer__list-item'><a className='footer__link' href='https://facebook.com'>Facebook</a></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Footer;
