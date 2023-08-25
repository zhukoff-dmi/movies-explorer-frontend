import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
    const location = useLocation();

    return (
        <div className="movies">
            <div className="movies__card-list">
                <MoviesCard />
                <MoviesCard />
                <Preloader />
            </div>
            <div className="more">
                {location.pathname === "/movies" &&
                    <button className="more__button">Еще</button>
                }
            </div>
        </div>
    );
}

export default MoviesCardList;