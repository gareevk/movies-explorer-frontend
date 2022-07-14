import React from 'react';
import logo from '../../images/logo.svg';
import { useMediaPredicate } from "react-media-hook";
import { Link } from 'react-router-dom';
import './Header.css';
import Hamburger from '../Hamburger/Hamburger';
import Navigation from '../Navigation/Navigation';

function Header() {
    const isLowRes = useMediaPredicate("(max-width: 768px)");

    return (
        <header className='header'>
            <Link to="/"><img className='header__logo' alt='логотип проекта' src={logo}/></Link>
            {
                isLowRes ? 
                    <Hamburger />
                : <Navigation />
            } 
        </header>
    );
}

export default Header;