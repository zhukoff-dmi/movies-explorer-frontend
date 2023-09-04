import './Register.css';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Register(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isSubmitActive, setSubmitActive] = useState();

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const isEmailValid = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const isNameValid = (name) => {
        const nameRegex = /^.{2,30}$/;
        return nameRegex.test(name);
    };

    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNameValid(name) && isEmailValid(email) && isPasswordValid(password)) {
            props.onSubmit({
                name,
                email,
                password,
            })
        } else {
            setNameError(isNameValid(name) ? '' : 'Минимальная длина 2 символа');
            setEmailError(isEmailValid(email) ? '' : 'Некорректный email');
            setPasswordError(isPasswordValid(password) ? '' : 'Минимальная длина пароля 8 символов');
        }
    }

    useEffect(() => {
        if (isNameValid(name)) {
            setNameError('Минимальная длина 2 символа');
        }
    }, [name]);

    useEffect(() => {
        if (!isEmailValid(email)) {
            setEmailError('Некорректный email');
        }
    }, [email]);

    useEffect(() => {
        if (!isPasswordValid(password)) {
            setPasswordError('Минимальная длина пароля 8 символов');
        }
    }, [password]);

    useEffect(() => {
        if (isNameValid(name) && isEmailValid(email) && isPasswordValid(password)) {
            setSubmitActive(true);
        } else {
            setSubmitActive(false);
        }
    }, [name, email, password]);

    useEffect(() => {
        setNameError('');
        setEmailError('');
        setPasswordError('');
    }, []);

    useEffect(() => {
        if (props.isLoggedIn) {
            navigate("/movies", { replace: true })
        }
    }, [props.isLoggedIn]);

    return (
        <main className="register" id="signup">
            <Link to="/">
                <img className="register__logo" src={logo} alt="Логотип" />
            </Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form
                // formName='register-form'
                className="register__form"
                onSubmit={handleSubmit}
            >
                <p className="register__input-name">Имя</p>
                <input
                    className="register__input"
                    type="text"
                    minLength={2}
                    maxLength={30}
                    onChange={handleNameChange}
                    value={name}
                    required
                />
                <span className={`register__error ${isNameValid(name) ? '' : 'register__error_active'}`}>{nameError}</span>
                <p className="register__input-name">E-mail</p>
                <input
                    className="register__input"
                    type="email"
                    onChange={handleEmailChange}
                    value={email}
                    minLength={4}
                    maxLength={30}
                    required
                />
                <span className={`register__error ${isEmailValid(email) ? '' : 'register__error_active'}`}>{emailError}</span>
                <p className="register__input-name">Пароль</p>
                <input
                    className="register__input"
                    type="password"
                    required
                    minLength={8}
                    onChange={handlePasswordChange}
                    value={password}
                />
                <span className={`register__error ${isPasswordValid(password) ? '' : 'register__error_active'}`}>{passwordError}</span>
                <button className={`${isSubmitActive ? 'register__submit-button' : 'register__submit-button_inactive'}`} type="submit">Зарегистрироваться</button>
            </form>
            <div className="register__bottom">
                <h3 className="register__subtitle">Уже зарегистрированы?</h3>
                <Link className="register__link" to="/signin">Войти</Link>
            </div>
        </main>
    );
}

export default Register;