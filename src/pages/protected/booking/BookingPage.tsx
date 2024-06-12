import {FC, useContext, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useDeleteBooking} from "../../../hooks/api_hooks/BookingHooks.tsx";
const BookingPage: FC = () => {

    //booking id from url
    const {id} = useParams();

    //customeruser object
    const {customerUser} = useContext(AuthContext);

    //specific booking element
    const [booking] = useState(
      customerUser.bookings?.find(booking => booking.id == id)
    );

    //delete booking hook
    const {deleteBooking} = useDeleteBooking();

    //remove booking handler
    const handleRemoveBooking = () =>{
        deleteBooking({
           bookingId: id as string
        });
    };

    return (
        <div className={"resource-page"}>
            <NavLink className={"back-link"} to={'/profile'}>&larr; back to profile</NavLink>
            <h1>Booking for {booking?.dogName}</h1>
            <button className={"add-link"} onClick={handleRemoveBooking}>- remove booking</button>
            <div className="info-wrapper-container">
                <div className="info-wrapper">
                    <span className="info-label">Dog name: </span>
                    <span className="info-data">{booking?.dogName}</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Booking status: </span>
                    <span className="info-data">{booking?.status}</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Booking start date: </span>
                    <span className="info-data">{booking?.bookingStartDate}</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Booking end date: </span>
                    <span className="info-data">{booking?.bookingEndDate}</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Kennel type name: </span>
                    <span className="info-data">{booking?.kennelTypeName}</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Food type name: </span>
                    <span className="info-data">{booking?.foodTypeName}</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Food type special: </span>
                    <span className="info-data">{booking?.foodTypeSpecial}</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Feeding frequency: </span>
                    <span className="info-data">{booking?.feedingFreq} / day</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Special feeding frequency: </span>
                    <span className="info-data">{booking?.specialFeeding}</span>
                </div>
                <div className="info-wrapper">
                    <span className="info-label">Message: </span>
                    <span className="info-data">{booking?.message}</span>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;