import {FC, FormEvent, useContext} from 'react';
import {useSubmitButton, useTextInput, useDateInput} from "../../hooks/input/InputHooks.tsx";
import {useCreateDog} from "../../hooks/api_hooks/DogHooks.tsx";
import {AuthContext} from "@contexts/AuthContext.tsx";

const DogRegisterForm: FC = () => {

    /*
    * input hooks mess starts here
    * */

    //submit button
    const RegisterDogButton = useSubmitButton({
        label: "Register dog"
    });

    //caller name
    const {TextInput: CallerNameInput, input: callerNameInput} = useTextInput({
        label: "Caller name",
        required: true,
        minLength: 1,
        maxLength: 50
    });

    //official name
    const {TextInput: OfficialNameInput, input: officialNameInput} = useTextInput({
        label: "Official name",
        required: false,
        maxLength: 100
    });

    //breed
    const {TextInput: BreedInput, input: breedInput} = useTextInput({
        label: "Breed",
        required: true,
        minLength: 1,
        maxLength: 50
    });

    //d_o_b
    const {DateInput: DateOfBirthInput, dateInput: dateOfBirthInput} = useDateInput({
        label: "Date of birth",
        required: true
    });

    //chip number
    const {TextInput: ChipNumberInput, input: chipNumberInput} = useTextInput({
        label: "Chip Number",
        required: true,
        minLength: 1,
        maxLength: 20
    });

    //vet name
    const {TextInput: VetNameInput, input: vetNameInput} = useTextInput({
        label: "Vet name(where the dog is registered at)",
        required: true,
        minLength: 1,
        maxLength: 75
    });

    //last vacc date
    const {DateInput: LastVaccinationInput, dateInput: lastVaccinationInput} = useDateInput({
        label: "Date of the last vaccination",
        required: true
    });

    //next vacc date
    const {DateInput: NextVaccinationInput, dateInput: nextVaccinationInput} = useDateInput({
        label: "Date of the next vaccination",
        required: false
    });

    //last flea date
    const {DateInput: LastFleaTreatmentInput, dateInput: lastFleaTreatmentInput} = useDateInput({
        label: "Date of the last flea treatment",
        required: true
    });

    //next flea date
    const {DateInput: NextFleaTreatmentInput, dateInput: nextFleaTreatmentInput} = useDateInput({
        label: "Date of the next flea treatment",
        required: false
    });

    //passport number
    const {TextInput: PassportNumberInput, input: passportNumberInput} = useTextInput({
        label: "Passport number",
        required: false,
        maxLength: 30
    });

    //favourite food
    const {TextInput: FavouriteFoodInput, input: favouriteFoodrInput} = useTextInput({
        label: "Favourite food",
        required: false,
        maxLength: 120
    });

    //emerg phone
    const {TextInput: EmergencyPhoneNumberInput, input: emergencyPhoneNumberInput} = useTextInput({
        label: "Emergency phone number",
        required: true,
        maxLength: 20
    });

    //other details
    const {TextInput: OtherInput, input: otherInput} = useTextInput({
        label: "Other detail",
        placeholder: "Optional additional information you think might be useful",
        required: false,
        maxLength: 500
    });

    //create dog hook
    const {createDog} = useCreateDog();

    //current cust object
    const {customerUser} = useContext(AuthContext);

    const submitForm = (e: FormEvent) => {
        e.preventDefault();

        createDog({
            customerId: customerUser.id,
            callerName: callerNameInput.current.value,
            officialName: officialNameInput.current.value,
            breed: breedInput.current.value,
            dateOfBirth: dateOfBirthInput.current.value,
            chipNumber: chipNumberInput.current.value,
            vetName: vetNameInput.current.value,
            lastFleaTreatmentDate: lastFleaTreatmentInput.current.value,
            nextFleaTreatmentDate: nextFleaTreatmentInput.current.value,
            lastVaccinationDate: lastVaccinationInput.current.value,
            nextVaccinationDate: nextVaccinationInput.current.value,
            passportNumber: passportNumberInput.current.value,
            favouriteFood: favouriteFoodrInput.current.value,
            emergencyPhoneNumber: emergencyPhoneNumberInput.current.value,
            other: otherInput.current.value
        });

    };

    return (
        <div className={"form-inner-wrapper"}>
            <h2>Register new dog</h2>
            <form onSubmit={submitForm}>
                <div className="form-input-fields">
                    <CallerNameInput/>
                    <OfficialNameInput/>
                    <BreedInput/>
                    <DateOfBirthInput/>
                    <ChipNumberInput/>
                    <VetNameInput/>
                    <LastVaccinationInput/>
                    <NextVaccinationInput/>
                    <LastFleaTreatmentInput/>
                    <NextFleaTreatmentInput/>
                    <PassportNumberInput/>
                    <FavouriteFoodInput/>
                    <EmergencyPhoneNumberInput/>
                    <OtherInput/>
                </div>
                <RegisterDogButton/>
            </form>
        </div>
    );
};

export default DogRegisterForm;