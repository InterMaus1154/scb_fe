import {NavLink} from "react-router-dom";
import {FC, ReactNode} from 'react';

interface CustomNavLink {
    to: string;
    children: ReactNode;
}

const CustomNavLink: FC<CustomNavLink> = ({to, children}) => {
    return (
        <NavLink to={to}
                 className={
                     ({isActive}) => isActive ? "is-link-active" : ""
                 }
        >
            {children}
        </NavLink>
    );
};

export default CustomNavLink;