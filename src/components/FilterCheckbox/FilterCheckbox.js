import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ onToggleClick, shortsActive }) {
    return (
        <label className="checkbox">
            <input
                onChange={onToggleClick}
                className="checkbox__input"
                type="checkbox"
                checked={shortsActive}
                id="checkbox" />
            <span className="checkbox__description">Короткометражки</span>
        </label>
    );
}

export default FilterCheckbox;
