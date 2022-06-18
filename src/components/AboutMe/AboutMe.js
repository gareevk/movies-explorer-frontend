import React from 'react';
import './AboutMe.css';

function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='about-me__section-heading'>Студент</h2>
            <div className='about-me__content'>
                <div className='about-me__container'>
                    <h3 className='about-me__name'>Константин</h3>
                    <h4 className='about-me__profession'>Frontend разработчик</h4>
                    <p className='about-me__bio'></p>
                    <ul className='about-me__links'>
                        <li><a className='about-me__link' href='https://facebook.com'>Facebook</a></li>
                        <li><a className='about-me__link' href='https://github.com'>Github</a></li>
                    </ul>
                </div>
                <div className='about-me__foto' alt='фото студента'></div>
            </div>
        </section>
    );
}

export default AboutMe;
