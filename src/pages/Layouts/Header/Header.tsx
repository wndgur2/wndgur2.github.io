import { FunctionComponent, useContext } from "react";
import './Header.css';
import Theme from "./Theme/Theme";
import SearchBar from "./SearchBar/SearchBar";
import { DeviceContext } from "../../../contexts/Device";
import HomeButton from "./HomeButton/HomeButton";

const Header: FunctionComponent = () => {
    const { isDark, setIsDark } = useContext(DeviceContext);

    return (
        <div id="header">
            <SearchBar />
            <HomeButton />
            <Theme isChecked={isDark} handleChange={() => {
                setIsDark(!isDark)
                localStorage.setItem('theme', isDark ? 'light' : 'dark');
            }} />
        </div>
    );
}

export default Header;