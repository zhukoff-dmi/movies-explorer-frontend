import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
    const location = useLocation();
    return (
        <div className="movies">
            <div className="movies__card-list">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <Preloader />
            </div>
            <div className="more">
                {location.pathname !== "/saved-movies" && (
                    <button className="button__more">Еще</button>
                )}
            </div>
        </div>
    );
}

export default MoviesCardList;