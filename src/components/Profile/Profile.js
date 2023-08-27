import { Link } from "react-router-dom";
import "./Profile.css";
import { useState } from "react";

function Profile(props) {
    const [iseditUser, setIsEditUser] = useState(false);

    function handleIsEditUser() {
        setIsEditUser(true);
    }

    return (
        <main className="profile">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form className="profile__form">
                <label className="profile__input-container">
                    <span className="profile__input-label">Имя</span>
                    <input
                        className="profile__input"
                        type="text"
                        name="profile-input-name"
                        id="profile-input-name"
                        minLength={2}
                        maxLength={30}
                        required={true}
                    />
                </label>
                <label className="profile__input-container">
                    <span className="profile__input-label">E-mail</span>
                    <input
                        className="profile__input"
                        type="email"
                        name="profile-input-email"
                        id="profile-input-email"
                        required={true}
                    />
                </label>
                {iseditUser ?
                    <div>
                        <span className="profile__error-message">При обновлении профиля произошла ошибка.</span>
                        <button
                            type="submit"
                            className="profile__submit-button profile__submit-button_invalid"
                            disabled={false}
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
                        <Link to="/" className="profile__btn-text">
                            Выйти из аккаунта
                        </Link>
                    </div>
                }
            </form>
        </main >
    );
}

export default Profile;
