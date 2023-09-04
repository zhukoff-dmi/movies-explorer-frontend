import React from "react";
import './Header.css';
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {

    const [isMenuOpen, seIsMenuOpen] = useState(false);
    const openMenu = () => {
        seIsMenuOpen(true);
    };

    const closeMenu = () => {
        seIsMenuOpen(false)
    };

    return (
        <header className={({ loggedIn }) => `header" ${loggedIn ? "header header_type_logged-in" : ""}`}>
            <Link to="/">
                <div className="header__logo"></div>
            </Link>
            <nav className="header__container-auth">
                <NavLink to="/signup"
                    className="header__register-link">
                    Регистрация
                </NavLink>
                <NavLink to="/signin"
                    className="header__login-link">
                    Войти
                </NavLink>
            </nav>
            {loggedIn ?
                <nav className="header__container-nav">
                    <NavLink to="/movies"
                        className={({ isActive }) => `header__films-link ${isActive ? 'header__films-link_active' : ''}`}>
                        Фильмы
                    </NavLink>
                    <NavLink to="/saved-movies"
                        className={({ isActive }) => `header__films-link ${isActive ? 'header__films-link_active' : ''}`}>
                        Сохранённые фильмы
                    </NavLink>
                    <div className="header__container-profile">
                        <NavLink to="/profile"
                            className="header__profile-link">
                            <div className="header__profile-link-logo"></div>
                            <p className="header__profile-link-text">Аккаунт</p>
                        </NavLink>
                    </div>
                    <div className="header__menu-item">
                        <button className="header__menu" onClick={openMenu}></button>
                    </div>
                </nav>
                :
                <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
            }
        </header>
    );
};

export default Header;