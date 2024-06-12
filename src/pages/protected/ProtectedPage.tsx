import {FC, useEffect, useContext, ReactNode} from 'react';
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

interface ProtectedPage {
    children: ReactNode;
}

const ProtectedPage: FC<ProtectedPage> = ({children}) => {

    const {isUserLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();

    /*
    *
    * If a route/page is protected and the user is not logged in
    * will be redirected to the login page
    * */

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate('/login');
        }
    }, [isUserLoggedIn, navigate]);


    return (
        <div className={"page"}>
            {children}
        </div>
    );
};

export default ProtectedPage;