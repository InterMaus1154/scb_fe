import {FC} from 'react';
import CustomerUser from "../../classes/CustomerUser.ts";
import {NavLink} from "react-router-dom";
import MiniBox from "@components/profile/MiniBox.tsx";

interface ProfileBookingSection {
    customerUser: CustomerUser;
}


const ProfileBookingSection: FC<ProfileBookingSection> = ({customerUser}:ProfileBookingSection) => {
    return (
        <div className="profile-booking-section">
            <h2 className="section-subheading">Bookings</h2>
            <NavLink className={"add-link"} to={'/booking/add'}>+ Add booking</NavLink>
            <div className="bookings-container mini-box-wrapper">
                {
                    customerUser.bookings?.length > 0 ?
                    customerUser.bookings?.map((booking, index) => (
                        <MiniBox header={`${booking.dogName} from ${booking.bookingStartDate} to ${booking.bookingEndDate}`}
                                 details={[
                                     booking.kennelTypeName, booking.foodTypeName, booking.foodTypeSpecial, booking.status
                                 ] as string[]} redirectTo={`/booking/${booking.id}`}
                        ></MiniBox>
                    ))
                        :
                        <h2>You have no bookings</h2>
                }
            </div>
        </div>
    );
};

export default ProfileBookingSection;