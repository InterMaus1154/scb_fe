import {FC, useContext, useEffect} from 'react';
import FreePage from "@pages/free/FreePage.tsx";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate, useLocation} from "react-router-dom";
import "@styles/Login.css";
import CustomerLoginForm from "@components/forms/CustomerLoginForm.tsx";

const Login: FC = () => {

    //if user logged in, redirect to profile page when hitting "/login" route
    const {isUserLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();

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
                    {
                        location.pathname === "/login" ? <CustomerLoginForm /> : <h1>Not available</h1>
                    }
                </div>
            </section>
        </FreePage>
    );
};

export default Login;