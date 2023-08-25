import './MoviesCard.css';
import film from '../../images/picture-film.png';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


function MoviesCard({buttonTitile}) {
    const location = useLocation();
    const [isLiked, setIsLiked] = useState(false);
    const [buttonText, setButtonText] = useState('Сохранить');

    const cardLikeButtonClassName = `movie-card__like ${isLiked && "movie-card__like_active"
        }`;

    function handleSveMovie() {
        setIsLiked(!isLiked);
        setButtonText(" ");
    }

    function handleDeleteMovie() {
        setIsLiked(!isLiked);
    }

    return (
        <div className="movie-card">
            <div className="movie-card__information">
                <h2 className="movie-card__title">В погоне за Бенкси</h2>
                <p className="movie-card__duration">27 минут</p>
            </div>
            <img className="movie-card__picture" src={film} alt="Постер к фильму" />
            {location.pathname === "/movies" ? (
                <div className="movie-card__footer">
                    <button
                        className={cardLikeButtonClassName}
                        onClick={handleSveMovie}
                        type="button">{isLiked ? buttonText : "Сохранить"}</button>
                </div>
            ) : (
                <div className="movie-card__footer">
                    <button
                        className="movie-card__like_inactive"
                        onClick={handleDeleteMovie}
                        type="button">
                    </button>
                </div>
            )}
        </div>
    );
}

export default MoviesCard;

