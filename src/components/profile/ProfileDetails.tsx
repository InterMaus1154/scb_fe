import {FC, useContext, useEffect} from 'react';
import {useTextInput} from "../../hooks/input/InputHooks.tsx";
import {AuthContext} from "@contexts/AuthContext.tsx";

const ProfileDetails: FC = () => {

    //current customer object
    const {customerUser} = useContext(AuthContext);


    useEffect(() => {


    }, []);

    return (
        <div className="profile-details-section">
            <h2 className="section-subheading">Profile details</h2>
        </div>
    );
};

export default ProfileDetails;