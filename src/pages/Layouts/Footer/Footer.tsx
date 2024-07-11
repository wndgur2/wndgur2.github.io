import { FunctionComponent, useContext } from "react";
import './Footer.css';
import links from "../../../consts/footerLinks";
import _Link from "../../../types/_Link";
import { Link } from "react-router-dom";

const Footer: FunctionComponent = () => {
    return (
        <footer>
            <div className="links">
                {links.map((link: _Link, i) => (
                    <div className="footer-link" key={i}>
                        <Link to={link.url}>{link.title}</Link>
                        {
                            link.children.map(([element, innerValue]: string[], index) => {
                                switch (element) {
                                    case 'span':
                                        return <span key={index}>{innerValue}</span>
                                    case 'small':
                                        return <small key={index}>{innerValue}</small>
                                    default:
                                        return <></>;
                                }
                            })
                        }
                    </div>
                ))}
            </div>
        </footer>
    );
}

export default Footer;