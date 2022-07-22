import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login({ onLogin, loggedIn }) {
    const history = useHistory();

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn]);
    

    return (
        <div className='register'>
            <Form 
                name='login'
                onLogin={onLogin}
                heading="Рады видеть!"
                buttonMessage="Войти"
                formMessage="Еще не зарегистрированы? "
                link={(<Link to="/signup" className='form__message form__link-message'>Регистрация</Link>)}
            />
        </div>
    );
}

export default Login;

