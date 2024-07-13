import { FunctionComponent } from "react";
import './Footer.css';
import FooterLink from "./FooterLink";
import { IoLogoGithub } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";

const Footer: FunctionComponent = () => {
    return (
        <footer>
            <div className="links">
                <FooterLink icon={<IoLogoGithub size={40} />} url={"https://github.com/wndgur2"}>
                    <small>Github</small>
                </FooterLink>
                <FooterLink icon={<HiOutlineMail size={38} />} url={"https://mail.google.com/mail/?view=cm&to=dkandjsl@gmail.com"}>
                    <small>Email</small>
                    <small>dkandjsl@gmail.com</small>
                </FooterLink>
            </div>
        </footer>
    );
}

export default Footer;