import {FC} from 'react';
import {NavLink} from "react-router-dom";

/*
* A mini box is used for both dogs and bookings to show basic info, and redirect to resource page
* it takes a header and some other details as an array
*
* */

interface MiniBox {
    header: string;
    details: string[];
    redirectTo: string;
}
const MiniBox: FC<MiniBox> = ({header, details, redirectTo}: MiniBox) => {
    return (
        <div className={"mini-box"}>
            <span className="mini-box-header">{header}</span>
            <ul>
            {
                details.map((detail, idx) => {
                    return(
                        detail === null ? "" : <li><span className={"mini-box-detail"} key={idx}>{detail}</span></li>
                    );

                })
            }
            </ul>
            <NavLink className={"redirect-button"} to={redirectTo} aria-label={"View this resource in full details"} title={"View this resource in full details"}>&rarr;</NavLink>
        </div>
    );
};

export default MiniBox;