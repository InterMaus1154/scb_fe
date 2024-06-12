import {FC, useContext, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import ProtectedPage from "@pages/protected/ProtectedPage.tsx";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useDeleteDog} from "../../../hooks/api_hooks/DogHooks.tsx";

const DogPage: FC = () => {

    const {customerUser} = useContext(AuthContext);

    //dog id from url
    const {id} = useParams();

    //finding the dog based on id
    const [dog] = useState(customerUser.dogs?.find(dog => dog.id == id));

    //delete dog hook
    const {deleteDog} = useDeleteDog();

    //remove dog event handler
    const handleRemoveDog = () =>{
        deleteDog({
            dogId: dog?.id as string
        });
    };

    return (
        <ProtectedPage>
            <div className={"resource-page"}>
                <NavLink className={"back-link"} to={'/profile'}>&larr; back to profile</NavLink>
                <h1>{dog?.callerName}</h1>
                <button className={"add-link"} onClick={handleRemoveDog}>- remove dog</button>
                <div className="info-wrapper-container">
                    <div className="info-wrapper">
                        <span className="info-label">Official name: </span>
                        <span className="info-data">{dog?.officialName}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Breed: </span>
                        <span className="info-data">{dog?.breed}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Date of birth: </span>
                        <span className="info-data">{dog?.dateOfBirth}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Vet name: </span>
                        <span className="info-data">{dog?.vetName}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Passport number: </span>
                        <span className="info-data">{dog?.passportNumber}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Chip number: </span>
                        <span className="info-data">{dog?.chipNumber}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Emergency phone number: </span>
                        <span className="info-data">{dog?.emergencyPhoneNumber}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Favourite food: </span>
                        <span className="info-data">{dog?.favouriteFood}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Date of latest vaccination: </span>
                        <span className="info-data">{dog?.lastVaccinationDate}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Date of upcoming vaccination: </span>
                        <span className="info-data">{dog?.nextVaccinationDate}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Date of latest flea treatment: </span>
                        <span className="info-data">{dog?.lastFleaTreatmentDate}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Date of upcoming flea treatment: </span>
                        <span className="info-data">{dog?.nextFleaTreatmentDate}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Other details: </span>
                        <span className="info-data">{dog?.other}</span>
                    </div>
                    <div className="info-wrapper">
                        <span className="info-label">Date of registration: </span>
                        <span className="info-data">{dog?.createdAt}</span>
                    </div>
                </div>
            </div>
        </ProtectedPage>
    );
};

export default DogPage;