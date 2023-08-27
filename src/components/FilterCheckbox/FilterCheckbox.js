import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
        <label className="checkbox">
            <input className="checkbox__input" type="checkbox" id="checkbox" />
            <span className="checkbox__description">Короткометражки</span>
        </label>
    );
}

export default FilterCheckbox;