import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';
import logo from '../../images/logo.svg';

function NavTab() {
    return (
        <header className='nav-tab'>
            <div className='nav-tab__container'>
                <img className='nav-tab__logo' alt='логотип проекта' src={logo}/>
                <nav className='nav-tab__buttons-container'>
                    <Link className='nav-tab__signup' exact to="/signup">Регистрация</Link>
                    <Link className='nav-tab__signin' to="/signin">Войти</Link>
                </nav>
            </div>
        </header>
    );
}

export default NavTab;