import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <section className='footer'>
            <h4 className='footer__heading'>
            Учебный проект Яндекс.Практикум х BeatFilm.
            </h4>
            <div className='footer__container'>
                <p className='footer__date'>2020</p>
                <ul className='footer__links-list'>
                    <li><a className='footer__link' href='https://yandex.ru'>Яндекс.Практикум</a></li>
                    <li><a className='footer__link' href='https://github.com'>Github</a></li>
                    <li><a className='footer__link' href='https://facebook.com'>Facebook</a></li>
                </ul>
            </div>
        </section>
    );
}

export default Footer;
