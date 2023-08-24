import React from "react";
import './Header.css';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";

function Header(props) {

    const location = useLocation();
    const [isMenuOpen, seIsMenuOpen] = useState(false);
    const openMenu = () => {
        seIsMenuOpen(true);
    };

    const closeMenu = () => {
        seIsMenuOpen(false)
    };

    return (
        <header className={location.pathname === "/" ? "header" : "header header_type_logged-in"}>
            <Link to="/">
                <div className="header__logo"></div>
            </Link>

            {location.pathname === "/" && (
                <div className="header__container-auth">
                    <Link to="/signup"
                        className="header__register-link">
                        Регистрация
                    </Link>
                    <Link to="/signin"
                        className="header__login-link">
                        Войти
                    </Link>
                </div>
            )}

            {location.pathname !== "/" && (
            <div className="header__container-nav">
                <Link to="/movies"
                    className="header__films-link">Фильмы
                </Link>
                <Link to="/saved-movies"
                    className="header__saved-films-link">Сохранённые фильмы
                </Link>
                <div className="header__container-profile">
                    <Link to="/profile"
                        className="header__profile-link">
                        <div className="header__profile-link-logo"></div>
                        <p className="header__profile-link-text">Аккаунт</p>
                    </Link>
                </div><div className="header__menu-item">
                    <button className="header__menu" onClick={openMenu}></button>
                </div>
            </div>
            )}
            {<Navigation isOpen={isMenuOpen} onClose={closeMenu} />}
        </header>
    );
};

export default Header;