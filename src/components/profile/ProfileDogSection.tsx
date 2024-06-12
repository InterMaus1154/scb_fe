import {FC} from 'react';
import CustomerUser from "../../classes/CustomerUser.ts";
import MiniBox from "@components/profile/MiniBox.tsx";
import {NavLink} from "react-router-dom";

interface ProfileDogSection {
    customerUser: CustomerUser;
}

const ProfileDogSection: FC<ProfileDogSection> = ({customerUser}: ProfileDogSection) => {

    return (
        <div className="profile-dog-section">
            <h2 className="section-subheading">Dogs</h2>
            <NavLink className={"add-link"} to={'/dog/add'}>+ Add dog</NavLink>
            <div className="dogs-container mini-box-wrapper">
                {
                    customerUser.dogs?.length > 0 ?
                    customerUser.dogs?.map((dog, index) => (
                        <MiniBox header={dog.callerName}
                                 details={[
                                     dog.dateOfBirth, dog.officialName, dog.breed
                                 ] as string[]} redirectTo={`/dog/${dog.id}`}
                        ></MiniBox>
                    ))
                        :
                        <h2>You have no dogs</h2>
                }
            </div>
        </div>
    );
};

export default ProfileDogSection;

