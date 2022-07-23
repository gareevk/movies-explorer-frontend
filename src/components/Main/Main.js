import React from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import NavTab from '../NavTab/NavTab';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Main({ loggedIn }) {

    return (
        <div className='main'>
            {loggedIn ? <Header /> : <NavTab />}
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </div>
    );
}

export default Main;