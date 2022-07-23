import React from 'react';
import './Register.css';
import Form from '../Form/Form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Register( { onRegister, loggedIn }) {
    const history = useHistory();

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn]);

    return (
        <div className='register'>
            <Form 
                name='register'
                onRegister={onRegister}
                heading="Добро пожаловать!"
                buttonMessage="Зарегистрироваться"
                formMessage="Уже зарегистрированы? "
                link={(<Link to="/sign-in" className='form__message form__link-message'>Войти</Link>)}
            />
        </div>
    );
}

export default Register;