import { FunctionComponent } from "react";
import './Footer.css';
import { IoLogoGithub } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import IconLink from "../../../components/IconLink/IconLink";

const Footer: FunctionComponent = () => {
    return (
        <footer>
            <div className="links">
                <div className="col">
                    <IconLink icon={<IoLogoGithub size={44} />} url={"https://github.com/wndgur2"} />
                    <div className="seperator" />
                    <small>Github</small>
                    <small>wndgur2</small>
                </div>
                <div className="col">
                    <IconLink icon={<HiOutlineMail size={42} />} url={"https://mail.google.com/mail/?view=cm&to=dkandjsl@gmail.com"} />
                    <div className="seperator" />
                    <small>Email</small>
                    <small>dkandjsl@gmail.com</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;