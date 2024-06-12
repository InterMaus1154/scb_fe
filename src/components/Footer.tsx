import {FC} from 'react';
import "@styles/static/Footer.css";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTiktok} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

const Footer: FC = () => {
    return (
        <footer className={"full-width"}>
            <div className="inner-wrapper">
                <div className="footer-block">
                    <span className="footer-block-heading">Useful links</span>
                    <ul>
                        <li>
                            <NavLink to={'/contact'}>Contact Us</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/privacy-policy'}>Privacy Policy</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/register'}>Register</NavLink>
                        </li>
                        <li>
                            <a href={"https://www.gov.uk/get-your-dog-cat-microchipped"} target={"_blank"} >Microchip your Pet</a>
                        </li>
                        <li>
                            <a href="https://www.rspca.org.uk/adviceandwelfare/pets/findavet" target={"_blank"}>Find a Vet</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-block">
                    <span className="copyright">Smile Canine Boarding &copy; {new Date().getFullYear()}</span>
                    <span className="web-author-wrapper">
                        Website developed and maintained by:
                        <NavLink to={''} className="author">Verina Dev Studio</NavLink>
                    </span>
                </div>
                <div className="footer-block social">
                    <span className={"footer-block-heading"}>Social</span>
                    <ul>
                        <li>
                            <a href="#" aria-label={"Facebook page"} target={"_blank"}>
                                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-label={"Instagram page"} target={"_blank"}>
                                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-label={"TikTok page"} target={"_blank"}>
                                <FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon>
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-label={"Send an email"} target={"_blank"}>
                                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;