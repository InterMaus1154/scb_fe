import BaseUser from "./BaseUser.ts";
import Dog from "./Dog.ts";
import {SelectTemplate} from "../hooks/input/InputHooks.tsx";
import Booking from "./Booking.ts";

class CustomerUser extends BaseUser {

    _dogs: Dog[];
    _bookings: Booking[];

    constructor(id: string, email: string, phoneNumber: string, firstname: string, lastname: string, dateOfBirth: string, gender: string, addressLineFirst: string, addressLineSecond: string | null, city: string, postcode: string, county: string | null, createdAt: string, dogs: Dog[], bookings: Booking[]) {
        super(id, email, phoneNumber, firstname, lastname, dateOfBirth, gender, addressLineFirst, addressLineSecond, city, postcode, county, createdAt);
        this._dogs = dogs;
        this._bookings = bookings;
    }

    public static GENDER_OPTIONS: SelectTemplate[] = [
        {
            label: "Male",
            value: "MALE"
        },
        {
            label: "Female",
            value: "FEMALE"
        },
        {
            label: "Other",
            value: "OTHER"
        },
        {
            label: "Not applicable",
            value: "NA"
        }
    ];

    set setDogs(dogs: Dog[]) {
        this._dogs = dogs;
    }

    set setBookings(bookings: Booking[]) {
        this._bookings = bookings;
    }

    get bookings(): Booking[] {
        return this._bookings;
    }

    get dogs(): Dog[] {
        return this._dogs;
    }

}

export default CustomerUser;