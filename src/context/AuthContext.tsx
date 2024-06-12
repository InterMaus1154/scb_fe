import {FC, useState, useEffect, Dispatch, SetStateAction, ReactNode, createContext} from 'react';
import CustomerUser from "../classes/CustomerUser.ts";


/*
* Context handling login
* checking if user logged in
* setting token used for protected routes
* */
interface AuthContext {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;

    isUserLoggedIn: boolean;
    setIsUserLoggedIn: Dispatch<SetStateAction<boolean>>;

    customerUser: CustomerUser;
    setCustomerUser: Dispatch<SetStateAction<CustomerUser>>;
}

export const AuthContext = createContext<AuthContext>({} as never);

interface AuthContextProvider {
    children: ReactNode;
}

const AuthContextProvider: FC<AuthContextProvider> = ({children}) => {

    const [token, setToken] = useState<string>("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [customerUser, setCustomerUser] = useState<CustomerUser>({} as CustomerUser);

    // no logged in state without token!!
    useEffect(() => {
        if (token.trim().length === 0) {
            setIsUserLoggedIn(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{token, setToken, isUserLoggedIn,  setIsUserLoggedIn, customerUser, setCustomerUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;