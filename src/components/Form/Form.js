import React from 'react';
import './Form.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Form( {name, heading, buttonMessage, formMessage, emailValue, passwordValue, link, onRegister, onLogin}  ) {
    /*
    const [formValues, setFormValues] = React.useState( {
        name: '',
        email: '',
        password: '',
    });

    function handleChange(e) {
        setFormValues( { ...formValues, [e.target.name]: e.target.value});
    }
    */

    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    
    const [isValidName, setIsValidName] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [isValidPassword, setIsValidPassword] = React.useState(false);
    const [errorMessageName, setErrorMessageName] = React.useState('');
    const [errorMessageEmail, setErrorMessageEmail] = React.useState('');
    const [errorMessagePassword, setErrorMessagePassword] = React.useState('');

    function handleInputNameChange(e) {
        const input = e.target;
        setUserName(input.value);
        setIsValidName(input.validity.valid);
        if (!isValidName) {
            setErrorMessageName(input.validationMessage);
        } else {
            setErrorMessageName('');
        }
    }

    function handleInputEmailChange(e) {
        const input = e.target;
        setUserEmail(input.value);
        setIsValidEmail(input.validity.valid);
        if (!isValidEmail) {
            setErrorMessageEmail(input.validationMessage);
        }
        else {
            setErrorMessageEmail('');
        }
    }

    function handleInputPasswordChange(e) {
        const input = e.target;
        setUserPassword(input.value);
        setIsValidPassword(input.validity.valid);
        if (!isValidPassword) {
            setErrorMessagePassword(input.validationMessage);
        } else {
            setErrorMessagePassword('');
        }
    }

    function handleSubmit(e) { 
        e.preventDefault();
        if (name === 'register') {
            const { name, email, password } = e.target;
            onRegister({name: name.value, email: email.value, password: password.value});
        } else if (name === 'login') {
            const { email, password } = e.target;
            onLogin({ email: email.value, password: password.value });
        }
    }
    
    return (
        <div>
            <div className='form__logo-container'>
                <Link to='/'><img className='form__logo' alt='логотип проекта' src={logo}/></Link>
            </div>
            <form className='form' name={`${name}-form`} onSubmit={handleSubmit}>
                <h2 className='form__heading'>{heading}</h2>
                {
                    name === 'register' ? (
                        <>
                            <span className='form__input-name'>Имя</span>
                            <input className='form__input' id="name" value={userName} name="name" onChange={handleInputNameChange} required></input>
                            <span className='form__error-message'>{errorMessageName}</span>
                        </>
                    )
                    : (<></>)
                }
                <span className='form__input-name'>E-mail</span>
                <input className='form__input' id="email" value={userEmail} onChange={handleInputEmailChange} type='email' required pattern='^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$'></input>
                <span className='form__error-message'>{errorMessageEmail}</span>
                <span className='form__input-name'>Пароль</span>
                <input className='form__input' id="password" onChange={handleInputPasswordChange} type='password' value={userPassword} required></input>
                <span className='form__error-message'>{errorMessagePassword}</span>
                <button className={name === 'register' ? 'form__submit-button' : 'form__submit-button form__submit-button_login'} type="submit">{buttonMessage}</button>
                <p className='form__message'>{formMessage}{link}</p>                
            </form> 
        </div>
    )
}

export default Form;