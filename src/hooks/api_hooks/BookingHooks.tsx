import axios from "axios";
import {useContext, useRef, useState} from "react";
import {LoadingBoxContext} from "@contexts/LoadingBoxContext.tsx";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@contexts/AuthContext.tsx";
import customerUser from "../../classes/CustomerUser.ts";
import Booking from "../../classes/Booking.ts";

/*
* hooks to interact with booking API endpoints
* except for "kennel types"
* */


/*
* create a booking
* */

export const useCreateBooking = () =>{

    const {setIsLoading} = useContext(LoadingBoxContext);
    const navigate = useNavigate();

    const { setCustomerUser} = useContext(AuthContext);

    interface CreateBooking{
        dogId: string;
        customerId: string;
        kennelTypeId: string;
        bookingStartDate: string;
        bookingEndDate: string;
        feedingFreq: string;
        specialFeeding: string;
        foodTypeId: string;
        foodTypeSpecial: string;
        message: string;
    }

    interface StatusObject {
        isMessageReceived: boolean;
        message: string;
    }

    const [statusMessage, setStatusMessage] = useState<StatusObject>({
        isMessageReceived: false,
        message: ""
    });

    const createBooking = ({dogId, customerId, kennelTypeId, bookingStartDate, bookingEndDate, feedingFreq, specialFeeding, foodTypeId, foodTypeSpecial, message}:CreateBooking) =>{

        setIsLoading(true);

        axios.post("/booking/upload",{
            dogId: dogId,
            customerId: customerId,
            kennelTypeId: kennelTypeId,
            bookingStartDate: bookingStartDate,
            bookingEndDate: bookingEndDate,
            feedingFreq: feedingFreq,
            specialFeeding: specialFeeding,
            foodTypeId: foodTypeId,
            foodTypeSpecial: foodTypeSpecial,
            message: message
        })
            .then(response =>{
                //add new booking to the object
                const booking = response.data.booking;
                setCustomerUser(prevState => {
                    prevState.setBookings = [...prevState.bookings, new Booking(booking.bookingId, booking.customerId, booking.dogId, booking.dogName, booking.foodTypeId, booking.foodTypeName, booking.foodTypeSpecial, booking.kennelTypeId, booking.kennelTypeName, booking.bookingStartDate, booking.bookingEndDate, booking.message, booking.status, booking.feedingFreq, booking.specialFeeding, booking.createdAt)];
                    return prevState;
                });

                //redirect to profile
                navigate("/profile");
            })
            .catch(error =>{
                //send back error message
                setStatusMessage({
                    isMessageReceived: true,
                    message: error.response.data.message
                });
            })
            .finally(() => {
                setIsLoading(false);
            });

    };

    return {createBooking, statusMessage};

};


/*
* delete a booking
* */
export const useDeleteBooking = () => {

    const {setIsLoading} = useContext(LoadingBoxContext);
    const navigate = useNavigate();

    const {customerUser, setCustomerUser} = useContext(AuthContext);

    interface DeleteBooking {
        bookingId: string;
    }

    const deleteBooking = ({bookingId}: DeleteBooking) => {

        setIsLoading(true);

        axios.delete(`/booking/delete/${bookingId}`)
            .then(response => {

                //filtered bookings
                const newBookings = customerUser.bookings.filter(booking => booking.id != bookingId);

                //update bookings on object
                setCustomerUser(prevState => {
                    prevState.setBookings = newBookings;
                    return prevState;
                });
            })
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false);
                navigate("/profile");
            });
    };

    return {deleteBooking};
};


/*
* get available kennel types for a booking start date
* */

export interface KennelType {
    kennel_type_id: string;
    kennel_type_name: string;
}

export const useAvailableKennelTypes = () => {

    //NO LOADING HERE, WOULD BE TERRIBLE UX

    interface AvailableKennelTypes {
        bookingStartDate: string;
    }

    //helper variable
    //returned from availableKennelTypes function
    let availableTypes: never[] = [];

    //return an array of available types
    const availableKennelTypes = async ({bookingStartDate}: AvailableKennelTypes) => {

        try{
            const response = await axios.post("/kennel/available-types", {
                bookingStartDate: bookingStartDate
            });
            availableTypes = response.data;
        }catch(error){
            console.log(error);
        }
        return availableTypes;
    }

    return {availableKennelTypes};
}
