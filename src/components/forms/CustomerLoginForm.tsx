import {FC, FormEvent, useState, useContext} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {STATUS_MESSAGES} from "@assets/json/StatusMessages.ts";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useCustomerLogin} from "../../hooks/api_hooks/AuthHooks.tsx";
import {
    useEmailInput,
    usePasswordInput,
    useCheckboxInout,
    useSubmitButton,
    useTextInput
} from "../../hooks/input/InputHooks.tsx";


const CustomerLoginForm: FC = () => {


    //input hooks
    const {EmailInput, email} = useEmailInput();
    const {PasswordInput, password} = usePasswordInput();
    const {CheckboxInput, checkbox} = useCheckboxInout({
        label: "Remember me:"
    });
    const LoginButton = useSubmitButton({
        label: "Log In"
    });


    //login hook
    const {login, error} = useCustomerLogin();

    const handleLoginSubmit = (e: FormEvent) => {
        e.preventDefault();

        login({
            email: email.current.value,
            password: password.current.value,
            isRemember: checkbox.current.checked
        });
    };

    return (
        <div className="form-inner-wrapper">
            <h2>Customer Login</h2>
            {error.isError && <div className={"error-message"}>{error.errorMessage}</div>}
            <form onSubmit={handleLoginSubmit}>
                <EmailInput />
                <PasswordInput />
                <CheckboxInput />
                <LoginButton />
            </form>
            <div className="hyperlinks">
                <NavLink to={'/register'}>Register</NavLink>
                <NavLink to={'/login-staff'}>Staff login</NavLink>
            </div>
        </div>
    );
};

export default CustomerLoginForm;