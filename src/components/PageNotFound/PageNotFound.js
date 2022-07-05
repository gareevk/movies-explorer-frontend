import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <main className='page-not-found'>
            <h2 className='page-not-found__heading'>404</h2>
            <p className='page-not-found__error-message'>Страница не найдена</p>
            <Link className='page-not-found__back' to='/'>Назад</Link>
        </main>
    )
}

export default PageNotFound;