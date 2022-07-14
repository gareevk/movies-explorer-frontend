import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
                <div class="navigation ">
                    <nav className='navigation__nav-menu'>
                        <NavLink exact to='/movies' activeClassName='navigation__menu-item_active' className='navigation__menu-item'>Фильмы</NavLink>
                        <NavLink to='/saved-movies' activeClassName='navigation__menu-item_active' className='navigation__menu-item'>Сохраненные фильмы</NavLink>
                    </nav>
                    <nav className='navigation__nav-menu'>
                        <NavLink activeClassName='navigation__menu-item_active' className='navigation__menu-item' to='/profile'>Аккаунт</NavLink>
                        <div className='navigation__account-icon'></div> 
                    </nav>
                </div>
    );
}

export default Navigation;