import { FunctionComponent, useContext, useRef } from "react";
import './Header.css';
import Theme from "./Theme/Theme";
import SearchBar from "./SearchBar/SearchBar";
import { DeviceContext } from "../../../contexts/Device";
import { Link } from "react-router-dom";

const Header: FunctionComponent = () => {
    const { isDark, setIsDark } = useContext(DeviceContext);
    const headerRef = useRef<HTMLDivElement>(null);

    // hide header when scrolling down
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        if (!headerRef.current) return;
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > 0 && currentScroll > lastScrollTop) {
            headerRef.current.classList.remove('top');
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
        <div id="header" ref={ headerRef }>
            <div>
                <h5>
                    <Link to={ "/" } className="logo">
                        WHO'S <br /> LEEJUNG <br /> HYEOK?
                    </Link>
                </h5>
            </div>
            <SearchBar />
            <Theme isChecked={ isDark } handleChange={ () => {
                setIsDark(!isDark)
                localStorage.setItem('theme', isDark ? 'light' : 'dark');
            } } />
        </div>
    );
}

export default Header;
