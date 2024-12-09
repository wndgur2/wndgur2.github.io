import { ChangeEvent, FunctionComponent } from "react";
import { IoMdMoon } from "react-icons/io";
import { PiSunDimFill } from "react-icons/pi";

import './ThemeToggler.css';

interface ThemeProps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
}

const ThemeToggler: FunctionComponent<ThemeProps> = ({ handleChange, isChecked }) => {
    return (
        <div className="theme clickable">
            <input
                type="checkbox"
                className="toggle"
                id="check"
                onChange={ handleChange }
                checked={ isChecked }
            />
            <label htmlFor="check">
            </label>
            <div className="icons">
                <PiSunDimFill className="sun theme-icon" />
                <IoMdMoon className="moon theme-icon" />
            </div>
        </div>
    );
}

export default ThemeToggler;