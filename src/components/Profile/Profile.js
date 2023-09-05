import React from "react";
import "./Profile.css";
import { useState, useEffect } from "react";
import Header from '../Header/Header'

function Profile({ currentUser, onSubmit, onSignOut, loggedIn, setErrorText, setErrorPopupOpen }) {
    const [email, setEmail] = useState(currentUser.name);
    const [name, setName] = useState(currentUser.email);

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');

    const [isSubmitActive, setSubmitActive] = useState();
    const [isEditUser, setIsEditUser] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const isEmailValid = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const isNameValid = (name) => {
        const nameRegex = /^.{2,30}$/;
        return nameRegex.test(name);
    };

    const handleSubmitChanges = (e) => {
        e.preventDefault();
        if (name !== currentUser.name || email !== currentUser.email) {
            if (isEmailValid(name) && isEmailValid(email)) {
                onSubmit({
                    name: name,
                    email: email
                })
                setSubmitActive(false)
            }
        } else {
            setErrorText('Веденные данные не должны совпадать с текущими')
            setErrorPopupOpen(true);
        }
    }

    const handleIsEditUser = (e) => {
        setIsEditUser(true);
    }

    useEffect(() => {
        if (name !== currentUser.name || email !== currentUser.email) {
            if (isEmailValid(email) && isNameValid(name)) {
                setSubmitActive(true)
            } else {
                setSubmitActive(false)
            }
        } else {
            setSubmitActive(false)
        }
    }, [name, email]);

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
        setNameError('');
        setEmailError('');
    }, []);

    return (
        <main>
            <Header />
            <div className="profile">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form className="profile__form">
                    <div className="profile__input-container">
                        <p className="profile__input-name">Имя</p>
                        <input
                            className="profile__input"
                            type="text"
                            name="profile-input-name"
                            id="profile-input-name"
                            minLength={2}
                            maxLength={30}
                            required={true}
                            onChange={handleNameChange}
                            value={name}
                            noValidate
                        />
                        <span className={`profile__error ${isNameValid(name) ? '' : 'profile__error_active'}`}>{nameError}</span>
                    </div>
                    <div className="profile__input-container">
                        <p className="profile__input-name">E-mail</p>
                        <input
                            className="profile__input"
                            type="email"
                            name="profile-input-email"
                            id="profile-input-email"
                            required={true}
                            onChange={handleEmailChange}
                            value={email}
                            minLength={4}
                            noValidate
                        />
                        <span className={`profile__error ${isEmailValid(email) ? '' : 'profile__error_active'}`}>{emailError}</span>
                    </div>
                    {isEditUser ?
                        <div>
                            <span className="profile__error-message">При обновлении профиля произошла ошибка.</span>
                            <button
                                type="submit"
                                className={`${isSubmitActive ? 'profile__submit-button' : 'profile__submit-button_invalid'}`}
                                disabled={false}
                                onClick={handleSubmitChanges}
                            >
                                Сохранить
                            </button>
                        </div>
                        :
                        <div className="porfile__btn-container">
                            <button
                                className="profile__btn-edit"
                                type="submit"
                                form="profile__form"
                                onClick={handleIsEditUser}>
                                Редактировать</button>
                            <button
                                className="profile__btn-text"
                                onClick={onSignOut}
                            >
                                Выйти из аккаунта
                            </button>
                        </div>
                    }
                </form>
            </div >
        </main>
    );
}

export default Profile;
