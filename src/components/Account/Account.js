import React from 'react';
import Header from '../Header/Header';
import './Account.css';

function Account( { name, email }) {
    const [ isEditable, setIsEditable ] = React.useState(false);

    function allowEdit() {
        setIsEditable(true);
    }

    return (
        <main className='account'>
            <Header />
            <h2 className='account__heading'>Привет, {name}!</h2>
            <form className='account__form'>
                <div className='account__form-container account__form-container_bordered'>
                    <h4 className='account__form-field'>Имя</h4>
                    <input className='account__input' placeholder={name} disabled={isEditable ? '' : 'disabled'}></input>
                </div>
                <div className='account__form-container'>
                    <h4 className='account__form-field'>E-mail</h4>
                    <input className='account__input' placeholder={email} disabled={isEditable ? '' : 'disabled'}></input>
                </div>
                <div className='account__buttons-block'>
                    <button className='account__button' type="button" onClick={allowEdit}>Редактировать</button>
                    <button className='account__button account__button_logout'>Выйти из аккаунта</button>
                </div>
            </form>
        </main>
    )
}

export default Account;