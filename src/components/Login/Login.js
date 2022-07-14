import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import { Link } from 'react-router-dom';

function Login( { onSubmit }) {

    return (
        <div className='register'>
            <Form 
                name='login'
                onSubmit={onSubmit}
                heading="Рады видеть!"
                buttonMessage="Войти"
                formMessage="Еще не зарегистрированы? "
                link={(<Link to="/sign-in" className='form__message form__link-message'>Регистрация</Link>)}
            />
        </div>
    );
}

export default Login;

