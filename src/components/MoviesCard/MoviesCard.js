import './MoviesCard.css';
import { useState } from 'react';


function MoviesCard({ movie, onSaveClick, onDeleteClick, setErrorPopupOpen, setErrorText }) {
    const [isAdded, setAdded] = useState(movie.isAdded);

    async function buttonClick() {
        try {
            if (!isAdded) {
                await onSaveClick(movie);
                setAdded(true);
            } else {
                await onDeleteClick(movie);
                setAdded(false)
            }
        } catch (err) {
        }
    }

    function formatDuration(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        if (hours > 0) {
            return `${hours} ч ${minutes} мин`;
        }
        return `${minutes} мин`;
    }

    const formatDurationTime = formatDuration(movie.duration);

    return (
        <div className="movie-card">
            <div className="movie-card__information">
                <h2 className="movie-card__title">{movie.nameRu}</h2>
                <p className="movie-card__duration">{formatDurationTime}</p>
            </div>
            <a target="_blank" href={movie.trailerLink} rel="noreferrer">
                <img className="movie-card__picture" src={`https://api.nomoreparties.co${movie.image.url}`}
                    alt={movie.nameRu} />
            </a>
            <div className="movie-card__footer">
                <button
                    className={`${isAdded ? "movie-card__like_active" : "movie-card__like"}`}
                    onClick={buttonClick}
                    type="button">
                    {isAdded ? '' : 'Сохранить'}
                </button>
            </div>
        </div>
    );
}

export default MoviesCard;