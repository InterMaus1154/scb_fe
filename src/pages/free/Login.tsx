import {FC, FormEvent, useContext, useEffect} from 'react';
import FreePage from "@pages/free/FreePage.tsx";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import "@styles/Login.css";
import axios from "axios";
import CustomerLoginForm from "@components/forms/CustomerLoginForm.tsx";



const Login: FC = () => {

    //if user logged in, redirect to profile page when hitting "/login" route
    const {isUserLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/profile");
        }
    }, [isUserLoggedIn, navigate]);

    return (
        <FreePage>
            <section className="form-section">
                <h1 className="section-heading"></h1>
                <div className="form-outer-wrapper full-width">
                    <CustomerLoginForm />
                </div>
            </section>
        </FreePage>
    );
};

export default Login;