import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
    const location = useLocation();

    return (
        <div className="movies">
            <div className="movies__card-list">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard /> 
                <MoviesCard />
                <MoviesCard />
            </div>
            <div className="more">
                {location.pathname === "/movies" &&
                    <button className="more__button">Еще</button>
                } 
                {location.pathname === "/saved-movies" && 
                    <div className="more__saved-movies"></div>
                }
            </div>
        </div>
    );
}

export default MoviesCardList;