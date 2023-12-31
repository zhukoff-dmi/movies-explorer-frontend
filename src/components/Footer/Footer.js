import React from "react";
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__years">&copy;&nbsp;2023г</p>
                <div className="footer__links">
                    <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel='noreferrer'>Яндекс.Практикум</a>
                    <a className="footer__link" href="https://github.com/zhukoff-dmi" target="_blank" rel='noreferrer'>Github</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;