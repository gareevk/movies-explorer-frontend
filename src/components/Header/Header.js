import React from 'react';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import accountIcon from '../../images/account-icon.svg';
import './Header.css';

function Header() {
    return (
        <header className='header'>
            <img className='header__logo' alt='логотип проекта' src={logo}/>
            <div class="header__container">
                <div className='header__nav-menu'>
                    <NavLink exact to='/movies' activeClassName='header__menu-item_active' className='header__menu-item' href='https://films'>Фильмы</NavLink>
                    <NavLink to='/saved-movies' activeClassName='header__menu-item_active' className='header__menu-item' href='https://films'>Сохраненные фильмы</NavLink>
                </div>
                <div className='header__nav-menu'>
                    <NavLink to='/account' activeClassName='header__menu-item_active' className='header__menu-item' href='https://films'>Аккаунт</NavLink>
                    <img className='header__account-icon' src={accountIcon} alt="иконка раздела аккаунт"/>
                </div>
            </div>
        </header>
    );
}

export default Header;