import React from 'react';
import successfulImage from '../../images/successful.svg';
import failedImage from '../../images/failed.svg';
import './InfoTooltip.css';

function InfoTooltip( {isOpen, onClose,  submitStatus, tooltipMessage} ) {
    
    return (
        <div className={`infoTooltip ${isOpen && 'infoTooltip_opened'}`}>
            <div className='infoTooltip__container'>
                <img className='infoTooltip__status-icon' src={ submitStatus ? successfulImage : failedImage} alt='Статус регистрации или авторизации'></img>
                <p className='infoTooltip__status-message'>{tooltipMessage}</p>
                <button className="infoTooltip__close-button" type="reset" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;