import { FunctionComponent, useContext } from "react";
import './Header.css';
import Theme from "./Theme/Theme";
import SearchBar from "./SearchBar/SearchBar";
import { DeviceContext } from "../../../contexts/Device";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const Header: FunctionComponent = () => {
    const { isDark, setIsDark } = useContext(DeviceContext);
    const router = useNavigate();

    return (
        <div id="header">
            <Marquee className="marquee" autoFill>
                <button
                    onClick={() => { router(`/`) }}>
                    whosleejunghyeok
                </button>
            </Marquee>
            <div className="headModules">
                <SearchBar />
                <Theme isChecked={isDark} handleChange={() => {
                    setIsDark(!isDark)
                    localStorage.setItem('theme', isDark ? 'light' : 'dark');
                }} />
            </div>
        </div>
    );
}

export default Header;