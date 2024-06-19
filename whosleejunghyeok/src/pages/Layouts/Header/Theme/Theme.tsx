import { ChangeEvent, FunctionComponent } from "react";
import { IoMdMoon } from "react-icons/io";
import { PiSunDimFill } from "react-icons/pi";

import './Theme.css';

interface ThemeProps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
}

const Theme: FunctionComponent<ThemeProps> = ({ handleChange, isChecked }) => {
    return (
        <div className="theme">
            <input
                type="checkbox"
                className="toggle"
                id="check"
                onChange={handleChange}
                checked={isChecked}
            />
            <label htmlFor="check">
            </label>
            <PiSunDimFill className="sun theme-icon" />
            <IoMdMoon className="moon theme-icon" />
        </div>
    );
}

export default Theme;