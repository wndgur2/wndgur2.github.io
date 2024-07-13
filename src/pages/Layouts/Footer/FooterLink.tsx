import { FunctionComponent, ReactElement } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import "./FooterLink.css";

interface FooterLinkProps {
    icon: ReactElement<IconType>;
    url: string;
    children: ReactElement | ReactElement[];
}

const FooterLink: FunctionComponent<FooterLinkProps> = ({ icon, url, children }) => {
    console.log(icon.props);
    return (
        <div>
            <Link className="footer-link" to={url} rel="noreferrer" target="_blank">
                {icon}
            </Link>
            <div className="footer-link-children">
                {children}
            </div>
        </div>
    );
}

export default FooterLink;