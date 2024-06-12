import {FC, FormEvent, useEffect, useRef, useState} from 'react';
import {NavLink} from "react-router-dom";
import {
    useDateInput,
    useEmailInput,
    useSubmitButton,
    useTextInput,
    useStatelessSelectInput,
    SelectTemplate, usePasswordInput
} from "../../hooks/input/InputHooks.tsx";
import {useCustomerRegister} from "../../hooks/api_hooks/AuthHooks.tsx";
import CustomerUser from "../../classes/CustomerUser.ts";

const CustomerRegisterForm: FC = () => {


    //input hooks
    const {TextInput: FirstNameInput, input: firstNameInput} = useTextInput({
        label: "Firstname:",
        placeholder: "Firstname...",
        required: true,
        maxLength: 50,
        minLength: 1
    });

    const {TextInput: LastNameInput, input: lastNameInput} = useTextInput({
        label: "Lastname:",
        placeholder: "Lastname...",
        required: true,
        maxLength: 50,
        minLength: 1
    });

    const {EmailInput, email} = useEmailInput();

    const {TextInput: PhoneNumberInput, input: phoneNumberInput} = useTextInput({
        label: "Phone number:",
        placeholder: "Phone number...",
        required: true,
        maxLength: 20,
        minLength: 1
    });

    const {DateInput: DateOfBirthInput, dateInput: dateOfBirthInput} = useDateInput({
        label: "Date of birth:",
        required: true
    });

    const {SelectInput: GenderSelectInput, selectInput: genderSelectInput} = useStatelessSelectInput({
        label: "Gender:",
        required: true,
        options: CustomerUser.GENDER_OPTIONS
    });

    const {TextInput: AddressLineFirstInput, input: addressLineFirstInput} = useTextInput({
        label: "Address line first:",
        required: true,
        minLength: 1,
        maxLength: 75
    });

    const {TextInput: AddressLineSecondInput, input: addressLineSecondInput} = useTextInput({
        label: "Address line second:",
        required: false,
        minLength: 1,
        maxLength: 75
    });

    const {TextInput: CityInput, input: cityInput} = useTextInput({
        label: "City:",
        required: true,
        minLength: 1,
        maxLength: 50
    });

    const {TextInput: PostcodeInput, input: postcodeInput} = useTextInput({
        label: "Postcode:",
        required: true,
        minLength: 1,
        maxLength: 15
    });

    const {TextInput: CountyInput, input: countyInput} = useTextInput({
        label: "County:",
        required: false,
        minLength: 1,
        maxLength: 50
    });


    const {PasswordInput, password: passwordInput} = usePasswordInput();

    const RegisterButton = useSubmitButton({
        label: "Register"
    });

    //register hook
    const {register, message} = useCustomerRegister();

    const handleRegisterSubmit = (e: FormEvent) => {
        e.preventDefault();

        register({
            email: email.current.value,
            password: passwordInput.current.value,
            firstname: firstNameInput.current.value,
            lastname: lastNameInput.current.value,
            phoneNumber: phoneNumberInput.current.value,
            dateOfBirth: dateOfBirthInput.current.value,
            gender: genderSelectInput.current.value,
            addressLineFirst: addressLineFirstInput.current.value,
            addressLineSecond: addressLineSecondInput.current.value,
            city: cityInput.current.value,
            postcode: postcodeInput.current.value,
            county: countyInput.current.value
        });

    };

    return (
        <div className="form-inner-wrapper">
            <h2>Customer Register</h2>
            <em>Fields with a red star are mandatory!</em>
            {message.isMessageReceived && <div className={"error-message"}>{message.message}</div>}
            <form onSubmit={handleRegisterSubmit}>
                <div className="form-input-fields">
                    <FirstNameInput/>
                    <LastNameInput/>
                    <EmailInput/>
                    <PasswordInput/>
                    <PhoneNumberInput/>
                    <DateOfBirthInput/>
                    <GenderSelectInput/>
                    <AddressLineFirstInput/>
                    <AddressLineSecondInput/>
                    <CityInput/>
                    <PostcodeInput/>
                    <CountyInput/>
                </div>
                <RegisterButton/>
            </form>
            <div className="hyperlinks">
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/login-staff'}>Staff login</NavLink>
            </div>
        </div>
    );
};

export default CustomerRegisterForm;