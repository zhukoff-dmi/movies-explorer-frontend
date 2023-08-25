import { Link } from "react-router-dom";
import "./Profile.css";

function Profile(props) {
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
            </form>
            <button
                className="profile__btn-submit"
                type="submit"
                form="profile__form">Редактировать</button>
            <Link to="/" className="profile__btn-text">
                Выйти из аккаунта
            </Link>
        </main>
    );
}

export default Profile;