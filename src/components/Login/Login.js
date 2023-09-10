import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isSubmitActive, setSubmitActive] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const isEmailValid = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmailValid(email) && isPasswordValid(password)) {
            props.onSubmit({
                email: email,
                password: password
            })
        } else {
            setEmailError(isEmailValid(email) ? '' : 'Некорректный email');
            setPasswordError(isPasswordValid(password) ? '' : 'Минимальная длина пароля 8 символов');
        }
    }

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
        if (isEmailValid(email) && isPasswordValid(password)) {
            setSubmitActive(true);
        } else {
            setSubmitActive(false);
        }
    }, [email, password]);

    useEffect(() => {
        setEmailError('');
        setPasswordError('');
    }, []);

    useEffect(() => {
        if (props.isLoggedIn) {
            navigate("/movies", { replace: true })
        }
    }, [props.isLoggedIn]);

    return (
        <main className="login" id="signin">
            <Link to="/">
                <img className="login__logo" src={logo} alt='Логотип' />
            </Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form
                // formName='login-form'
                className="login__form"
                onSubmit={handleSubmit}
            >
                <p className="login__input-name">E-mail</p>
                <input
                    onChange={handleEmailChange}
                    className="login__input"
                    value={email}
                    type="email"
                />
                <span className={`login__error ${isEmailValid(email) ? '' : 'login__error_active'}`}>{emailError}</span>
                <p className="login__input-name">Пароль</p>
                <input
                    onChange={handlePasswordChange}
                    className="login__input"
                    type="password"
                    value={password}
                />
                <span className={`login__error ${isPasswordValid(password) ? '' : 'login__error_active'}`}>{passwordError}</span>
                <button disabled={!isSubmitActive} className='login__submit-button' type="submit">Войти</button>
            </form>
            <div className="login__bottom">
                <h3 className="login__subtitle">Ещё не зарегистрированы?</h3>
                <Link className="login__link" to="/signup">Регистрация</Link>
            </div>
        </main>
    );
}

export default Login;
