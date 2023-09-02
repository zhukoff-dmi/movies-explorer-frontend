import React from "react";
import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {

    const navigate = useNavigate();

    function handleClick() {
        navigate(-1, { replace: true });
    }

    return (
        <main>
            <section className="not-found">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Страница не найдена</p>
                <button
                    className="not-found__link"
                    type="button"
                    onClick={handleClick}
                >
                    Назад</button>
            </section>
        </main >
    )
}

export default NotFoundPage;