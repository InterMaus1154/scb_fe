import {LoadingBoxContext} from "@contexts/LoadingBoxContext.tsx";
import {useContext} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@contexts/AuthContext.tsx";
import CustomerUser from "../../classes/CustomerUser.ts";
import Dog from "../../classes/Dog.ts";
/*
*
* hooks used to interact with dog API endpoints, aka upload, delete
* */


/*
* delete a dog
* */

export const useDeleteDog = () => {

    //loading box context
    const {setIsLoading} = useContext(LoadingBoxContext);

    //customer object
    const {customerUser, setCustomerUser} = useContext(AuthContext);

    //for redirects
    const navigate = useNavigate();

    interface DeleteDog {
        dogId: string;
    }

    const deleteDog = ({dogId}: DeleteDog) => {

        setIsLoading(true);
        axios.delete(`/dog/delete/${dogId}`)
            .then(response => {

                //filter dogs to remove deleted dog
                const newDogs = customerUser.dogs.filter(dog => dog.id !== dogId);

                //filter bookings to remove deleted bookings (which had the dog)
                const newBookings = customerUser.bookings.filter(booking => booking.dogId !== dogId);
                //updating dogs of the customer object
                setCustomerUser((prevState: CustomerUser) => {
                    prevState.setDogs = newDogs;
                    prevState.setBookings = newBookings;
                    return prevState;
                });
            })
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false);
                navigate('/profile');
            });
    };

    return {deleteDog};
};

/*
* create a new dog
* */

export const useCreateDog = () => {


    //loading box context
    const {setIsLoading} = useContext(LoadingBoxContext);

    //customer object
    const {setCustomerUser} = useContext(AuthContext);

    //for redirects
    const navigate = useNavigate();


    interface CreateDog {
        customerId: string;
        callerName: string;
        officialName: string | null;
        breed: string;
        dateOfBirth: string;
        chipNumber: string;
        vetName: string;
        lastFleaTreatmentDate: string;
        nextFleaTreatmentDate: string | null;
        lastVaccinationDate: string;
        nextVaccinationDate: string | null;
        passportNumber: string | null;
        favouriteFood: string | null;
        emergencyPhoneNumber: string;
        other: string | null;
    }

    const createDog = ({
                           customerId,
                           callerName,
                           officialName,
                           breed,
                           dateOfBirth,
                           chipNumber,
                           vetName,
                           lastFleaTreatmentDate,
                           nextFleaTreatmentDate,
                           lastVaccinationDate,
                           nextVaccinationDate,
                           passportNumber,
                           favouriteFood,
                           emergencyPhoneNumber,
                           other
                       }: CreateDog) => {

        setIsLoading(true);

        axios.post('/dog/upload', {
            customerId: customerId,
            callerName: callerName,
            officialName: officialName,
            breed: breed,
            dateOfBirth: dateOfBirth,
            chipNumber: chipNumber,
            vetName: vetName,
            lastFleaTreatmentDate: lastFleaTreatmentDate,
            nextFleaTreatmentDate: nextFleaTreatmentDate,
            lastVaccinationDate: lastVaccinationDate,
            nextVaccinationDate: nextVaccinationDate,
            passportNumber: passportNumber,
            favouriteFood: favouriteFood,
            emergencyPhoneNumber: emergencyPhoneNumber,
            other: other
        })
            .then(response =>{
                //create dog returned
                const dog = response.data.dog;
                //update customer object
                setCustomerUser(prevState => {
                    prevState.setDogs = [...prevState.dogs, new Dog(
                        dog.dogId, dog.customerId, dog.callerName, dog.officialName, dog.breed, dog.dateOfBirth, dog.chipNumber, dog.vetName, dog.lastFleaTreatmentDate, dog.nextFleaTreatmentDate, dog.lastVaccinationDate, dog.nextVaccinationDate, dog.passportNumber, dog.favouriteFood, dog.emergencyPhoneNumber, dog.other, dog.createdAt
                    )];
                    return prevState;
                })
            })
            .catch(error => console.log(error))
            .finally(() =>{
                setIsLoading(false);
                navigate("/profile");
            });

    }

    return {createDog};
}