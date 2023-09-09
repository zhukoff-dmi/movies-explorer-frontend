import React, {useState} from "react";
import './Header.css';
import { Link } from "react-router-dom";
import NavHeader from "../NavHeader/NavHeader";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
    const [isMenuBurgerOpen, setMenuBurgerOpen] = useState(false);

    function onMenuBurgerClick() {
        setMenuBurgerOpen(true);
    };
    return (
        <header className="header">
            <div className="header__container-content">
                <Link to="/">
                    <div className="header__logo"></div>
                </Link>
                <NavHeader
                onMenuBurgerClick={onMenuBurgerClick}
                    loggedIn={loggedIn}
                />
                <Navigation isOpen={isMenuBurgerOpen} onClose={() => {
                    console.log('setMenuBurgerOpen', false)
                    setMenuBurgerOpen(false) }}/>
            </div>
        </header >
    );
};

export default Header;