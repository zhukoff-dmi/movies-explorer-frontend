import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <section className="search">
            <form className="search-form">
                <div className="search__input">
                    <input className="search-form__input" type="text" placeholder="Фильм" />
                    <button className="search-form__button">Поиск</button>
                </div>
            </form>
            <FilterCheckbox />
        </section>
    )
}

export default SearchForm;