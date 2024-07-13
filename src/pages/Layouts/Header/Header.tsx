import { FunctionComponent, useContext, useEffect, useRef } from "react";
import './Header.css';
import Theme from "./Theme/Theme";
import SearchBar from "./SearchBar/SearchBar";
import { DeviceContext } from "../../../contexts/Device";
import HomeButton from "./HomeButton/HomeButton";

const Header: FunctionComponent = () => {
    const { isDark, setIsDark } = useContext(DeviceContext);
    const headerRef = useRef<HTMLDivElement>(null);

    // hide header when scrolling down
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        if (!headerRef.current) return;
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        console.log(currentScroll, lastScrollTop);
        if (currentScroll > 0 && currentScroll > lastScrollTop) {
            headerRef.current.classList.add('hide');
        } else if (currentScroll === 0) {
            headerRef.current.classList.remove('hide');
            headerRef.current.classList.add('top');
        }
        else {
            headerRef.current.classList.remove('hide');
            headerRef.current.classList.remove('top');
        }
        lastScrollTop = currentScroll;
    });

    return (
        <div id="header" ref={headerRef}>
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