import React from "react";
import './Promo.css';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <nav className="promo__navigation">
                <ul className="promo__more">
                    <li className="promo__more-list">
                        <a className="promo__nav-button" href="#aboutProject">О проекте</a>
                    </li>
                    <li className="promo__more-list">
                        <a className="promo__nav-button" href="#tech">Технологии</a>
                    </li>
                    <li className="promo__more-list">
                        <a className="promo__nav-button" href="#abouteMe">Студент</a>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default Promo;

