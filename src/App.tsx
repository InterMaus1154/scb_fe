import {FC, useEffect} from 'react';
import "@styles/static/Theme.css";
import "./App.css";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";
import Landing from "@pages/free/Landing.tsx";
import Login from "@pages/free/Login.tsx";
import Profile from "@pages/protected/Profile.tsx";
import NotFound from "@pages/free/NotFound.tsx";
import {useCustomerLogin} from "./hooks/api_hooks/AuthHooks.tsx";
import Register from '@pages/free/Register.tsx';
import LoadingBox from "@components/loading/LoadingBox.tsx";
import DogPage from "@pages/protected/dog/DogPage.tsx";
import CreateDog from "@pages/protected/dog/CreateDog.tsx";
import CreateBooking from "@pages/protected/booking/CreateBooking.tsx";
import BookingPage from "@pages/protected/booking/BookingPage.tsx";

const App: FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const {login: customerLogin, error} = useCustomerLogin();

    useEffect(() => {
        //if the user requests "/", it should be redirected to "/landing", as the main page
        if (location.pathname === "/") {
            navigate('/landing');
        }
    }, [navigate, location]);

    //check on load if credentials are remembered
    useEffect(() => {

        const customerCredentials = window.localStorage.getItem("smile-canine-boarding-customer-credentials");

        //login automatically if remembered
        if(customerCredentials){
            const json = JSON.parse(customerCredentials);
            customerLogin({
               email: json.email,
               password: json.password,
               isRemember: true
            });
        }
    }, []);

    return (
        <div className={"app-component"}>
            <Header/>
            <main>
                {/*Defining routes*/}
                <Routes>
                    {/*index page is landing*/}
                    <Route index path={"/landing"} element={<Landing />} />
                    <Route path={"/login"} element={<Login />}></Route>
                    <Route path={"/login-staff"} element={<Login/>}></Route>
                    <Route path={"/register"} element={<Register />}></Route>
                    <Route path={"/profile"} element={<Profile />}></Route>
                    <Route path={"/dog/:id"} element={<DogPage />}></Route>
                    <Route path={"/dog/add"} element={<CreateDog />}></Route>
                    <Route path={"/booking/:id"} element={<BookingPage />}></Route>
                    <Route path={"/booking/add"} element={<CreateBooking />}></Route>
                    <Route path={"*"} element={<NotFound />}></Route>
                </Routes>
            </main>
            <Footer/>
            {/*Loading box, only shown is something is loading, aka API call is happening*/}
            <LoadingBox />
        </div>
    );
};

export default App;