import './FilterCheckbox.css';

function FilterCheckbox({ onToggleClick }) {
    return (
        <label className="checkbox">
            <input
                onClick={onToggleClick}
                className="checkbox__input"
                type="checkbox"
                id="checkbox" />
            <span className="checkbox__description">Короткометражки</span>
        </label>
    );
}

export default FilterCheckbox;