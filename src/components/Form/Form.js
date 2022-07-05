import React from 'react';
import './Form.css';
import logo from '../../images/logo.svg';

function Form( {name, heading, buttonMessage, formMessage, emailValue, passwordValue, link, onSubmit} ) {
    const [formValues, setFormValues] = React.useState( {
        name: '',
        email: '',
        password: '',
    });

    function handleChange(e) {
        setFormValues( { ...formValues, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) { 
        e.preventDefault();
        const {name, email, password} = e.target;
        console.log(email.value);
        onSubmit(email, password);
    }
    
    return (
        <div>
            <div className='form__logo-container'>
                <img className='form__logo' alt='логотип проекта' src={logo}/>
            </div>
            <form className='form' name={`${name}-form`} onSubmit={handleSubmit}>
                <h2 className='form__heading'>{heading}</h2>
                {
                    name === 'register' ? (
                        <>
                            <span className='form__input-name'>Имя</span>
                            <input className='form__input' id="name" value={emailValue} name="name" onChange={handleChange}></input>
                            <span className='form__error-message'></span>
                        </>
                    )
                    : (<></>)
                }
                <span className='form__input-name'>E-mail</span>
                <input className='form__input' id="email" value={passwordValue} name="password" onChange={handleChange}></input>
                <span className='form__error-message'></span>
                <span className='form__input-name'>Пароль</span>
                <input className='form__input' id="password"></input>
                <span className='form__error-message'></span>
                <button className={name === 'register' ? 'form__submit-button' : 'form__submit-button form__submit-button_login'} type="submit">{buttonMessage}</button>
                <p className='form__message'>{formMessage}{link}</p>                
            </form> 
        </div>
    )
}

export default Form;