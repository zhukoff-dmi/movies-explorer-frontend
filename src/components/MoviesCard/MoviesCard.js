import './MoviesCard.css';
import film from '../../images/picture-film.png';

function MoviesCard() {
    return (
        <div className="movie-card">
            <div className="movie-card__information">
                <h2 className="movie-card__title">В погоне за Бенкси</h2>
                <p className="movie-card__duration">27 минут</p>
            </div>
            <img className="movie-card__picture" src={film} alt="Постер к фильму" />
            <div className="movie-card__footer">
                <button className="movie-card__button" type="button">Сохранить</button>
            </div>
        </div>
    );
}

export default MoviesCard;

