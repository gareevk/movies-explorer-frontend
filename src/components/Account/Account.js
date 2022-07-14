import React from 'react';
import Header from '../Header/Header';
import './Account.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Account( { name, email, onSignOut, onUserUpdate }) {
    const [ isEditable, setIsEditable ] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    console.log(currentUser);
    
    React.useEffect( () => {
        setUserName(currentUser.name);
        setUserEmail(currentUser.email);
        console.log(userName, userEmail);
    }, [currentUser])

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
        console.log(e.target.name.value);
        console.log(name.value);
        console.log(email.value);
        onUserUpdate(name.value, email.value);
        console.log(isEditable);
        setIsEditable(false);
    }

    function handleNameInputChange(e) {
        const input = e.target.value;
        setUserName(input);
    }

    function handleEmailInputChange(e) {
        const input = e.target.value;
        setUserEmail(input);
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
                    <button className='account__button' type="submit">Сохранить</button>
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