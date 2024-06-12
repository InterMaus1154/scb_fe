import {FC, useEffect, useRef, useState, useContext, useMemo} from 'react';
import IconSVG from "@assets/IconSVG.tsx";
import "@styles/static/Header.css";
import {NavLink} from "react-router-dom";
import {AuthContext} from "@contexts/AuthContext.tsx";
import CustomNavLink from "@components/CustomNavLink.tsx";
import {useLogout} from "../hooks/api_hooks/AuthHooks.tsx";

const Header: FC = () => {

    //for sticky navigation on scroll
    const scrollWatcherRef = useRef(document.createElement("div"));
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

    //for determining whether to show login or profile button
    const {isUserLoggedIn} = useContext(AuthContext);

    //for responsive navigation
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

    //for submenu of profile nav
    const [isSubmenuOpen, setSubmenuOpen] = useState<boolean>(false);

    //for logout functionality
    const logout = useLogout();

    //navigation ref for detecting outside click of nav
    const navRef = useRef(document.createElement("nav"));

    const headerRef = useRef(document.createElement("header"));
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            setIsIntersecting(entries[0].isIntersecting);
            setIsNavOpen(false);
        });

        observer.observe(scrollWatcherRef.current);

    }, []);

    useEffect(() => {

        const handleClick = (e: MouseEvent): void => {
            if (isNavOpen && navRef.current && !(headerRef.current.contains(e.target as Node))) {
                setIsNavOpen(false);
            }
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };

    }, [isNavOpen]);


    return (
        <>
            <header className={isIntersecting ? `header-wrapper` : `header-wrapper header-wrapper-sticky`}
                    ref={headerRef}>
                <div className="header-inner">
                    <NavLink to={'/landing'} className="logo-wrapper">
                        <h1>Smile Canine Boarding</h1>
                        <div className="logo-icon-wrapper">
                            <IconSVG/>
                        </div>
                    </NavLink>
                    <button className="hamburger-icon" onClick={() => {
                        setIsNavOpen(prevState => !prevState)
                    }} aria-label={"Navigation toggle button"}>
                        <span></span><span></span><span></span>
                    </button>
                    <nav className={isNavOpen ? "is-nav-active" : ""} ref={navRef}>
                        <ul>
                            <li>
                                <CustomNavLink to={'/landing'}>Home</CustomNavLink>
                            </li>
                            <li>
                                <CustomNavLink to={'/team'}>Meet our Team</CustomNavLink>
                            </li>
                            <li>
                                <CustomNavLink to={'/contact'}>Contact Us</CustomNavLink>
                            </li>

                            {
                                isUserLoggedIn ?
                                    <li className={"has-submenu"}>
                                        <CustomNavLink to={'/profile'}>Profile</CustomNavLink>
                                        {/*<span onClick={()=>setSubmenuOpen(true)}>Profile</span>*/}
                                        {/*<ul className={isSubmenuOpen ? "is-submenu-open submenu" : "submenu"}>*/}
                                        {/*    <CustomNavLink to={'/profile'}>Profile</CustomNavLink>*/}
                                        {/*    <CustomNavLink to={'/dogs'}>Dogs</CustomNavLink>*/}
                                        {/*    <CustomNavLink to={'/bookings'}>Bookings</CustomNavLink>*/}
                                        {/*</ul>*/}
                                    </li>
                                    :
                                    <li>
                                        <CustomNavLink to={'/login'}>Login</CustomNavLink>
                                    </li>
                            }
                            {
                                !isUserLoggedIn &&
                                <li>
                                    <CustomNavLink to={'/register'}>Register</CustomNavLink>
                                </li>
                            }
                            {
                                isUserLoggedIn &&
                                <li>
                                    <a href="#" onClick={() => logout()}>Log out</a>
                                </li>
                            }
                            <li className={"highlighted-link-wrapper"}>
                                <NavLink className={"highlighted-link"} to={'/booking/add'}>
                                    Book Now!
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div data-scroll-watcher={true} ref={scrollWatcherRef}></div>
        </>
    );
};

export default Header;