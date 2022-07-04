import React from 'react';
import { NavLink } from 'react-router-dom';
import './Hamburger.css';

function Hamburger() {
    const [isOpen, setIsOpen] = React.useState(false);

    function openHamburger() {
        setIsOpen(true);
    }

    function closeHamburger() {
        setIsOpen(false);
    }

    return (
        <>
        {isOpen ?
            (
                <nav className={`hamburger hamburger_opened'}`}>
                    <div className='hamburger__glass-pane'></div>
                    <div className='hamburger__container'>
                        <button className='hamburger__close-button' onClick={closeHamburger}></button>
                        <ul className='hamburger__navigation-list'>
                            <li className='hamburger__navigation-block'>
                                <li className='hamburger__navigation-list-item'><NavLink className='hamburger__navigation-item' activeClassName='hamburger__navigation-item_active' exact to="/" >Главная</NavLink></li>
                                <li className='hamburger__navigation-list-item'><NavLink  className='hamburger__navigation-item' activeClassName='hamburger__navigation-item_active' to='/movies'>Фильмы</NavLink></li>
                                <li className='hamburger__navigation-list-item'><NavLink className='hamburger__navigation-item' activeClassName='hamburger__navigation-item_active' to='/saved-movies'>Сохраненные фильмы</NavLink></li>
                            </li>
                            <li className='hamburger__navigation-list-item hamburger__navigation-list-item_bottom'>
                                <NavLink activeClassName='hamburger__navigation-item_active' className='hamburger__navigation-item' to='/account' >Аккаунт</NavLink>
                                <div className='hamburger__account-icon'>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            ) 
            : (
                <div className='header__hamburger-menu'>
                        <button className='hamburger__open-button' onClick={openHamburger}></button>    
                </div>
            )
        }
        </>
    );
}
  
  
export default Hamburger;