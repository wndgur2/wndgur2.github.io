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
        <div className="toggle-box">
            <input
                type="checkbox"
                className="toggle"
                id="check"
                onChange={handleChange}
                checked={isChecked}
            />
            <label htmlFor="check">
            </label>
            <PiSunDimFill className="sun icon" size="26" />
            <IoMdMoon className="moon icon" size="26" />
        </div>
    );
}

export default Theme;