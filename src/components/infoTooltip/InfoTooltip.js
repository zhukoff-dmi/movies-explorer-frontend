import React from "react";
import './InfoTooltip.css';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_info-tooltip ${props.isOpen ? `popup_opened` : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <img className="popup__tooltip-image" src={props.imgLink} alt={props.alt}></img>
                <p className="popup__tooltip-messege">{props.titleText}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;