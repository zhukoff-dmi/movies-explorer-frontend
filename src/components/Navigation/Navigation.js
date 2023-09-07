import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (props) => {
    
    return (
        <nav className={`navigation ${props.isOpen ? "navigation_opened" : ""}`}>
            <div className="navigation__overlay"></div>
            <button className="navigation__close" onClick={props.onClose}></button>
            <NavLink to="/" className={({ isActive }) => isActive ? 'navigation__link_active' : "navigation__link"}
                onClick={props.onClose}
            >Главная</NavLink>
            <NavLink to="/movies" className={({ isActive }) => isActive ? 'navigation__link_active' : "navigation__link"}
                onClick={props.onClose}
            >Фильмы</NavLink>
            <NavLink to="/saved-movies" className={({ isActive }) => isActive ? 'navigation__link_active' : "navigation__link"}
                onClick={props.onClose}
            >Сохранённые фильмы</NavLink>
            <NavLink to="/profile" className="navigation__link"
                onClick={props.onClose}>
                <div className="navigation__profile-link-logo"></div>
                <p className="navigation__profile-link-text">Аккаунт</p>
            </NavLink>
        </nav>
    );
};

export default Navigation;