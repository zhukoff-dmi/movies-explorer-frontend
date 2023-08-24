import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="register" id="signup">
            <img className="register__logo" src={logo} alt="Логотип" />
            <h1 className="register__title">Добро пожаловать!</h1>
            <form className="register__form">
                <p className="register__input-name">Имя</p>
                <input className="register__input"
                    type="text"
                    minLength="2"
                    maxLength="30" />
                <span className="register__error"></span>
                <p className="register__input-name">E-mail</p>
                <input
                    className="register__input"
                    type="email"
                    defaultValue={"pochta@yandex.ru"} />
                <span className="register__error"></span>
                <p className="register__input-name">Пароль</p>
                <input
                    className="register__input"
                    type="password"
                    required
                    defaultValue="••••••••••••••"
                    minLength={8} />
                <span className="register__error">ыаываываыва</span>
                <button className="register__submit-button" type="submit">Зарегистрироваться</button>
            </form>
            <div className="register__bottom">
                <h3 className="register__subtitle">Уже зарегистрированы?</h3>
                <Link className="register__link" to="/signin">Войти</Link>
            </div>
        </div>
    );
}

export default Register;