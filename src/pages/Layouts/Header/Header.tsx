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
            {
                // location.pathname === "/" ?
                // <IconLink url={"https://github.com/wndgur2"} icon={<IoLogoGithub size={42} />} />
                // :
                // <IconLink url={"/"} icon={<img src="/images/profile/0.jpeg" alt="my face" width={"40px"} />} />
                <Link to={"/"} className="logo">hlog</Link>
            }
            <SearchBar />
            <Theme isChecked={isDark} handleChange={() => {
                setIsDark(!isDark)
                localStorage.setItem('theme', isDark ? 'light' : 'dark');
            }} />
        </div>
    );
}

export default Header;