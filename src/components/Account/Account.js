import React from 'react';
import Header from '../Header/Header';
import './Account.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Account( { name, email, onSignOut, onUserUpdate }) {
    const [ isEditable, setIsEditable ] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = React.useState('');
    const [isValidName, setIsValidName] = React.useState(false);
    const [errorMessageName, setErrorMessageName] = React.useState('');
    //const [isActiveSubmitName, setIsActiveSubmitName] = React.useState(false);
    //const [isActiveSubmitEmail, setIsActiveSubmitEmail] = React.useState(false)
    const [isChanged, setIsChanged] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    
    React.useEffect( () => {
        setUserName(currentUser.name);
        setUserEmail(currentUser.email);
    }, [currentUser]);

    React.useEffect(() => {
        if (isValidEmail && isValidName) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

        if (currentUser.name !== userName) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }

        if (currentUser.email !== userEmail) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }

    }, [isValidEmail, isValidName]);

    function allowEdit(e) {
        e.preventDefault();
        const edit = isEditable;
        if (edit === true) {
            setIsEditable(false);
        } else {
            setIsEditable(true);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { name, email } = e.target;
        onUserUpdate(name.value, email.value);
        setIsEditable(false);
    }

    function handleNameInputChange(e) {
        const input = e.target;
        setUserName(input.value);
        setIsValidName(input.validity.valid);
        console.log(input.validity.valid);
        if (!isValidName) {
            setErrorMessageName(input.validationMessage);
        } else {
            setErrorMessageName('');
        }
    }

    function handleEmailInputChange(e) {
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

    return (
        <section className='account'>
            <Header />
            <h2 className='account__heading'>Привет, {userName}!</h2>
            <form className='account__form' onSubmit={handleSubmit}>
                <div className='account__form-container account__form-container_bordered'>
                    <h4 className='account__form-field'>Имя</h4>
                    <input className='account__input' type="text" autoComplete="off" placeholder={userName} name='name' disabled={isEditable ? '' : 'disabled'} value={userName} onChange={handleNameInputChange} required></input>
                </div>
                <div className='account__form-container'>
                    <h4 className='account__form-field'>E-mail</h4>
                    <input className='account__input' type="email" autoComplete="off" placeholder={userEmail} name='email'disabled={isEditable ? '' : 'disabled'} value={userEmail} onChange={handleEmailInputChange}></input>
                </div>
                <div className='account__buttons-block'>
                    {isEditable ? 
                    <button className='account__button' type="submit" disabled={!isChanged && !isValid}>Сохранить</button>
                    : 
                    <button className='account__button' type="button" onClick={allowEdit}>Редактировать</button>
                    }
                    <button className='account__button account__button_logout' onClick={onSignOut}>Выйти из аккаунта</button>
                </div>
            </form>
        </section>
    )
}

export default Account;