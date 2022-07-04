import React from 'react';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import { useMediaPredicate } from "react-media-hook";
import './Header.css';
import Hamburger from '../Hamburger/Hamburger';

function Header() {
    const isLowRes = useMediaPredicate("(max-width: 768px)");

    

    return (
        <header className='header'>
            <img className='header__logo' alt='логотип проекта' src={logo}/>
            {
                isLowRes ? 
                    <Hamburger />
                : (
                    <div class="header__container">
                        <nav className='header__nav-menu'>
                            <NavLink exact to='/movies' activeClassName='header__menu-item_active' className='header__menu-item'>Фильмы</NavLink>
                            <NavLink to='/saved-movies' activeClassName='header__menu-item_active' className='header__menu-item'>Сохраненные фильмы</NavLink>
                        </nav>
                        <nav className='header__nav-menu'>
                            <NavLink activeClassName='header__menu-item_active' className='header__menu-item' to='/account'>Аккаунт</NavLink>
                            <div className='header__account-icon'></div> 
                        </nav>
                    </div>
                )
            }
            
            
        </header>
    );
}

export default Header;