import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
    return (
        <main>
            <section class="not-found">
                <h1 class="not-found__title">404</h1>
                <p class="not-found__subtitle">Страница не найдена</p>
                <Link class="not-found__link" to="/">Назад</Link>
            </section>
        </main >
    )
}

export default NotFoundPage;