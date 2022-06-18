import React from 'react';
import './NavTab.css';
import logo from '../../images/logo.svg';

function NavTab() {
    return (
        <header className='nav-tab'>
            <div className='nav-tab__container'>
                <img className='nav-tab__logo' alt='логотип проекта' src={logo}/>
                <div className='nav-tab__buttons-container'>
                    <button className='nav-tab__signup'>Регистрация</button>
                    <button className='nav-tab__signin'>Войти</button>
                </div>
            </div>
        </header>
    );
}

export default NavTab;