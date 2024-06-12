import {FC, useContext} from 'react';
import ProtectedPage from "@pages/protected/ProtectedPage.tsx";
import "@styles/Profile.css";
import {AuthContext} from "@contexts/AuthContext.tsx";
import ProfileDetails from "@components/profile/ProfileDetails.tsx";
import ProfileDogSection from "@components/profile/ProfileDogSection.tsx";
import ProfileBookingSection from "@components/profile/ProfileBookingSection.tsx";

const Profile: FC = () => {

    //current customer object
    const {customerUser} = useContext(AuthContext);

    return (
        <ProtectedPage>
            <section className="profile-section">
                <h1 className={"section-heading"}>Welcome back {`${customerUser.firstname} ${customerUser.lastname}`}</h1>
                <div className="profile-wrapper">
                    <ProfileDetails />
                    <ProfileDogSection customerUser={customerUser}/>
                    <ProfileBookingSection customerUser={customerUser} />
                </div>
            </section>
        </ProtectedPage>
    );
};

export default Profile;