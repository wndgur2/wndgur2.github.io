import { FunctionComponent, useContext } from "react";
import './Footer.css';
import FooterLink from "./FooterLink";
import links from "../../consts/footerLinks";
import _Link from "../../types/_Link";
import { Link } from "react-router-dom";
import { DeviceContext } from "../../contexts/Device";

const Footer: FunctionComponent = () => {
    const innerWidth = useContext(DeviceContext).innerWidth;
    return (
        <footer>
            <div className="links">
                {
                    (innerWidth > 768) ? <>
                        {links.map((link: _Link, i) => (
                            <FooterLink key={i} url={link.url} title={link.title}>
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
                            </FooterLink>
                        ))
                        }
                    </> :
                        <>
                            {links.slice(0, 3).map((link: _Link, i) => (
                                <Link key={i} to={link.url} className="footer-normal-link link">
                                    <h4>{link.title}</h4>
                                    {
                                        link.children.map((value: string[], index) => {
                                            return <small key={index}>{value[1]}</small>;
                                        })
                                    }
                                </Link>
                            ))
                            }
                        </>
                }
            </div>
        </footer>
    );
}

export default Footer;