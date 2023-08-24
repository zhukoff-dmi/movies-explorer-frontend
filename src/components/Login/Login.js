import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="login" id="signin">
            <img className="login__logo" src={logo} alt='Логотип' />
            <h1 className="login__title">Рады видеть!</h1>
            <form className="login__form">
                <p className="login__input-name">E-mail</p>
                <input
                    className="login__input"
                    defaultValue={"pochta@yandex.ru"}
                    type="email" />
                <span className="login__error"></span>
                <p className="login__input-name">Пароль</p>
                <input
                    className="login__input"
                    defaultValue="••••••••••••••"
                    type="password" />
                <span className="login__error"></span>
                <button className="login__submit-button" type="submit">Войти</button>
            </form>
            <div className="login__bottom">
                <h3 className="login__subtitle">Ещё не зарегистрированы?</h3>
                <Link className="login__link" to="/signup">Регистрация</Link>
            </div>
        </div>
    );
}

export default Login;