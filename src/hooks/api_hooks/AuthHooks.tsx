import {useState, useContext} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import axios from "axios";
import {STATUS_MESSAGES} from "@assets/json/StatusMessages.ts";
import {isAnyEmpty} from "../input/InputHelper.ts";
import {LoadingBoxContext} from "@contexts/LoadingBoxContext.tsx";
import CustomerUser from "../../classes/CustomerUser.ts";
import Dog from "../../classes/Dog.ts";
import Booking from "../../classes/Booking.ts";
import {useNavigate} from "react-router-dom";


/**
 *
 * Custom hooks used for authentication
 * such as login, register and logout
 *
 * */


/**
 *
 * Customer login hook
 * Used to login a customer user
 * returns a function that is to be called to start the login process
 * and returns an object 'error', if there is any error, like connection error or validation
 * */
export const useCustomerLogin = () => {

    //loading box context
    const {setIsLoading} = useContext(LoadingBoxContext);

    //call auth context
    const {setToken, setIsUserLoggedIn, setCustomerUser} = useContext(AuthContext);

    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    interface ErrorObject {
        isError: boolean;
        errorMessage: string;
    }

    const [error, setError] = useState<ErrorObject>({
        isError: false,
        errorMessage: ""
    });

    interface CustomerLogin {
        email: string;
        password: string;
        isRemember?: boolean;
    }

    //login the user
    const login = ({email, password, isRemember}: CustomerLogin) => {

        setIsLoading(true);

        //check if input fields are not empty
        if (isAnyEmpty([password, email])) {
            setIsSuccessful(false);
            setError({
                isError: true,
                errorMessage: STATUS_MESSAGES.empty_inputs
            });
            setIsLoading(false);

            //stop proceeding with login
            return;
        }

        //attempt login
        axios.post("/auth/login/customer", {
            email: email,
            password: password
        })
            .then(response => {
                //if 202, login was successful
                if (response.status === 202) {
                    setIsSuccessful(true);
                    //empty error object
                    setError({
                        isError: false,
                        errorMessage: ""
                    });
                    //check if user wants to be remembered
                    if (isRemember) {
                        window.localStorage.setItem("smile-canine-boarding-customer-credentials", JSON.stringify({
                            email: email,
                            password: password
                        }));
                    }

                    //set auth token
                    setToken(response.data.token);

                    //set user object
                    const userResponse = response.data.user;
                    const dogResponse = response.data.user.dogs;
                    const bookingResponse = response.data.user.bookings;
                    const mappedDogs = dogResponse.map((dog: any) => {
                        return new Dog(
                            dog.dogId, dog.customerId, dog.callerName, dog.officialName, dog.breed, dog.dateOfBirth, dog.chipNumber, dog.vetName, dog.lastFleaTreatmentDate, dog.nextFleaTreatmentDate, dog.lastVaccinationDate, dog.nextVaccinationDate, dog.passportNumber, dog.favouriteFood, dog.emergencyPhoneNumber, dog.other, dog.createdAt
                        );
                    });
                    const mappedBookings = bookingResponse.map((booking: any) => {
                        return new Booking(booking.bookingId, booking.customerId, booking.dogId, booking.dogName, booking.foodTypeId, booking.foodTypeName, booking.foodTypeSpecial, booking.kennelTypeId, booking.kennelTypeName, booking.bookingStartDate, booking.bookingEndDate, booking.message, booking.status, booking.feedingFreq, booking.specialFeeding, booking.createdAt);
                    })
                    const customerUser = new CustomerUser(userResponse.customerId, userResponse.email, userResponse.phoneNumber, userResponse.firstname, userResponse.lastname, userResponse.dateOfBirth, userResponse.gender, userResponse.addressLineFirst, userResponse.addressLineSecond, userResponse.city, userResponse.postcode, userResponse.county, userResponse.createdAt,
                        mappedDogs, mappedBookings);

                    setCustomerUser(customerUser);

                    //change default authorization header for all request sent onwards
                    axios.defaults.headers.post['Authorization'] = `Bearer ${response.data.token}`;
                    axios.defaults.headers.put['Authorization'] = `Bearer ${response.data.token}`;
                    axios.defaults.headers.delete['Authorization'] = `Bearer ${response.data.token}`;
                    axios.defaults.headers.get['Authorization'] = `Bearer ${response.data.token}`;

                    //set user logged in to trigger page reload
                    setIsUserLoggedIn(true);
                }
            })
            .catch(error => {
                //if no res object, no connection to the server
                if (!error.response) {
                    setError({
                        isError: true,
                        errorMessage: STATUS_MESSAGES.no_connection
                    });
                    return;
                }

                //if there is error, check for some status codes
                switch (error.response.status) {
                    //if required fields are missing
                    //this code shouldnt happen, as frontend ensures no empty fields are sent to the server
                    case 422:
                        setIsSuccessful(false);
                        setError({
                            isError: true,
                            errorMessage: STATUS_MESSAGES.empty_inputs
                        })
                        break;
                    //sent credentials are invalid
                    case 401:
                        setIsSuccessful(false);
                        setError({
                            isError: true,
                            errorMessage: STATUS_MESSAGES.invalid_inputs
                        })
                        break;
                }
            })
            .finally(() => {
                setIsLoading(false);
            });

        return isSuccessful;
    };

    return {login, error};
};


/**
 *
 * Register hook
 * Used to register a new customer user
 * returns a function that is to be called to start the register process
 * and returns an object 'message', if there is any message, aka success or fail
 * */
export const useCustomerRegister = () => {

    //loading box context
    const {setIsLoading} = useContext(LoadingBoxContext);

    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    interface StatusObject {
        isMessageReceived: boolean;
        message: string;
    }

    const [message, setMessage] = useState<StatusObject>({
        isMessageReceived: false,
        message: ""
    });

    interface CustomerRegister {
        email: string;
        password: string;
        firstname: string;
        lastname: string;
        phoneNumber: string;
        dateOfBirth: string;
        gender: string;
        addressLineFirst: string;
        addressLineSecond: string;
        city: string;
        postcode: string;
        county: string;
    }

    const register = ({
                          email,
                          password,
                          firstname,
                          lastname,
                          phoneNumber,
                          dateOfBirth,
                          gender,
                          addressLineFirst,
                          addressLineSecond,
                          city,
                          postcode,
                          county
                      }: CustomerRegister) => {

        //start loading bar/circle
        setIsLoading(true);

        //attempt register
        axios.post('auth/register/customer', {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth,
            gender: gender,
            addressLineFirst: addressLineFirst,
            addressLineSecond: addressLineSecond,
            city: city,
            postcode: postcode,
            county: county
        })
            .then(response => {
                if (response.status === 201) {
                    setMessage({
                        isMessageReceived: true,
                        message: STATUS_MESSAGES.register_ok
                    });
                    setIsSuccessful(true);
                }
                console.log(response);
            })
            .catch(error => {
                if (!error.response) {
                    setMessage({
                        isMessageReceived: true,
                        message: STATUS_MESSAGES.no_connection
                    });
                }
                setMessage({
                    isMessageReceived: true,
                    message: error.response.data.message
                })
                setIsSuccessful(false);
            })
            .finally(() => {
                setIsLoading(false);
            });

        return isSuccessful;

    };

    return {register, message};

};

/**
 * Logout hook
 * Used to logout the currently logged in customer
 * returns a single function, which logs out the user when called
 *
 * */
export const useLogout = () => {

    //loading box context
    const {setIsLoading} = useContext(LoadingBoxContext);

    //token context
    const {setToken, setIsUserLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();

    const logout = () => {

        setIsLoading(true);

        //attempt logout
        axios.post('/auth/logout')
            .then(response => {
                if (response.status === 200) {

                    //empty localstorage credentials
                    window.localStorage.clear();

                    //empty axios auth headers
                    axios.defaults.headers.post['Authorization'] = "";
                    axios.defaults.headers.put['Authorization'] = "";
                    axios.defaults.headers.delete['Authorization'] = "";
                    axios.defaults.headers.get['Authorization'] = "";

                    //logout on client side
                    setToken("");
                    setIsUserLoggedIn(false);
                    navigate("/landing");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return logout;

};