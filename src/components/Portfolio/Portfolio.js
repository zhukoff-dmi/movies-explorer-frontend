import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__container">
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://github.com/zhukoff-dmi/how-to-learn.git" target="_blank" rel='noreferrer'>Статичный сайт
                        <button className="portfolio__button"></button>
                    </a>
                </li>
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://github.com/zhukoff-dmi/russian-travel.git" target="_blank" rel='noreferrer'>Адаптивный сайт
                        <button className="portfolio__button"></button>
                    </a>
                </li>
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://github.com/zhukoff-dmi/react-mesto-api-full-gha.git" target="_blank" rel='noreferrer'>Одностраничное приложение
                        <button className="portfolio__button"></button>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;