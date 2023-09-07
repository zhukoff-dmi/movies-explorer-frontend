import React from "react";
import { NavLink } from "react-router-dom";
import './NavHeader.css';

function NavHeader(props) {
    if (props.loggedIn) {
        return (
            <>
                <nav className="nav-header__container-nav">
                    <NavLink to="/movies"
                        className={({ isActive }) => `nav-header__films-link ${isActive ? 'nav-header__films-link_active' : ''}`}>
                        Фильмы
                    </NavLink>
                    <NavLink to="/saved-movies"
                        className={({ isActive }) => `nav-header__films-link ${isActive ? 'nav-header__films-link_active' : ''}`}>
                        Сохранённые фильмы
                    </NavLink>
                    <div className="nav-header__container-profile">
                        <NavLink to="/profile"
                            className="nav-header__profile-link">
                            <div className="nav-header__profile-link-logo"></div>
                            <p className="nav-header__profile-link-text">Аккаунт</p>
                        </NavLink>
                    </div>
                    <div className="nav-header__menu" onClick={props?.onMenuBurgerClick}></div>
                </nav>
            </>
        )
    } else {
        return (
            <>
                <nav className="nav-header__container-auth">
                    <NavLink to="/signup"
                        className="nav-header__register-link">
                        Регистрация
                    </NavLink>
                    <NavLink to="/signin"
                        className="nav-header__login-link">
                        Войти
                    </NavLink>
                </nav>
            </>
        );
    };
};

export default NavHeader;