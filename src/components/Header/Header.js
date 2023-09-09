import React from "react";
import './Header.css';
import { Link } from "react-router-dom";
import NavHeader from "../NavHeader/NavHeader";

function Header({ onMenuBurgerClick, loggedIn }) {

    return (
        <header className="header">
            <div className="header__container-content">
                <Link to="/">
                    <div className="header__logo"></div>
                </Link>
                <NavHeader
                    onMenuBurgerClick={onMenuBurgerClick}
                    loggedIn={loggedIn === true}
                />
            </div>
        </header >
    );
};

export default Header;