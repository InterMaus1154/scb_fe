import {ChangeEvent, FC, FormEvent, useContext, useEffect, useState} from 'react';
import {
    TextInputComponent,
    DateInputComponent,
    useTextInput,
    useSelectInput,
    useDateInput,
    SelectTemplate,
    useSubmitButton
} from "../../hooks/input/InputHooks.tsx";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {KennelType, useAvailableKennelTypes, useCreateBooking} from "../../hooks/api_hooks/BookingHooks.tsx";


const BookingRegisterForm: FC = () => {

    //logged in customer
    const {customerUser} = useContext(AuthContext);

    //create booking hook
    const {createBooking, statusMessage} = useCreateBooking();

    //get available kennel types hook
    const {availableKennelTypes} = useAvailableKennelTypes();

    //available kennel types state
    const [availableKennelTypesState, setAvailableKennelTypesState] = useState<KennelType[]>([]);

    //map dogs to be usable in the select dog input
    const mappedDogs: SelectTemplate[] = customerUser.dogs?.map(dog => {
        return {
            label: dog.callerName,
            value: dog.id
        };
    });

    //map kennel types
    const mappedKennelTypes: SelectTemplate[] = availableKennelTypesState.map(type => {
        return {
            label: type.kennel_type_name,
            value: type.kennel_type_id
        }
    });

    //feeding frequency values
    const mappedFeedingFrequency: SelectTemplate[] = [
        {
            label: "1",
            value: "1"
        },
        {
            label: "2",
            value: "2"
        },
        {
            label: "3",
            value: "3"
        },
        {
            label: "4",
            value: "4"
        },
        {
            label: "SPECIAL",
            value: "SPECIAL"
        }
    ];

    //food type values
    const mappedFoodTypes: SelectTemplate[] = [
        {
            label: "Dry kibble",
            value: "1"
        },
        {
            label: "Wet canned",
            value: "2"
        },
        {
            label: "Grain-free",
            value: "3"
        },
        {
            label: "Raw food",
            value: "4"
        },
        {
            label: "SPECIAL",
            value: "5"
        }
    ];


    const {SelectInput: SelectDogInput, selectInput: selectDogInput} = useSelectInput({
        label: "Dog",
        options: mappedDogs,
        required: true
    });


    //available kennel types are requested from the serve upon input date changes
    const {SelectInput: SelectKennelTypeInput, selectInput: selectKennelTypeInput} = useSelectInput({
        label: "Available kennel types(select start date first)",
        options: mappedKennelTypes,
        required: true
    });

    const {
        SelectInput: SelectFeedingFreqInput,
        selectInput: selectFeedingFreqInput,
        stateValue: feedingFreqStateValue
    } = useSelectInput({
        label: "Feeding frequency / day",
        options: mappedFeedingFrequency,
        required: true
    });

    const {
        SelectInput: SelectFoodTypeInput,
        selectInput: selectFoodTypeInput,
        stateValue: foodTypeStateValue
    } = useSelectInput({
        label: "Food type",
        options: mappedFoodTypes,
        required: true
    });

    const SubmitButton = useSubmitButton({
        label: "Create booking"
    });


    /*
    * states for input components (non-hook input fields)
    * because my solution wasn't 100% working
    * of course
    * I hate react
    * */
    const [message, setMessage] = useState<string>("");
    const [specialFeeding, setSpecialFeeding] = useState<string>("");
    const [specialFoodType, setSpecialFoodType] = useState<string>("");
    const [bookingStartDate, setBookingStartDate] = useState<string>("");
    const [bookingEndDate, setBookingEndDate] = useState<string>("");


    useEffect(() => {
        //fires when booking date changes
        //essential for requesting available kennel types for a specific start date
        (async () => {
            //initially the string is empty
            //prevents to send a redundant request
            if (bookingStartDate.trim().length > 0) {
                try {
                    const data: never[] = await availableKennelTypes({
                        bookingStartDate: bookingStartDate
                    });
                    setAvailableKennelTypesState(data);
                } catch (error) {
                    console.log(error);
                }
            }
        })();

    }, [bookingStartDate]);

    //submit form to create the booking
    const submitBookingForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createBooking({
           dogId: selectDogInput.current.value,
           customerId: customerUser.id,
           kennelTypeId: selectKennelTypeInput.current.value,
           bookingStartDate: bookingStartDate,
           bookingEndDate: bookingEndDate,
           feedingFreq: selectFeedingFreqInput.current.value,
           specialFeeding: specialFeeding,
           foodTypeId: selectFoodTypeInput.current.value,
           foodTypeSpecial: specialFoodType,
           message: message
        });

    }

    return (
        <div className={"form-inner-wrapper"}>
            <h2>Create new booking</h2>
            {statusMessage.isMessageReceived && <div className={"error-message"}>{statusMessage.message}</div>}
            <form onSubmit={submitBookingForm}>
                <div className="form-input-fields">
                    <SelectDogInput/>
                    <SelectKennelTypeInput/>
                    <DateInputComponent label={"Booking start date"} state={bookingStartDate}
                                        setState={setBookingStartDate} required={true}/>
                    <DateInputComponent label={"Booking end date"} state={bookingEndDate} setState={setBookingEndDate}
                                        required={true}/>
                    <SelectFeedingFreqInput/>
                    {
                        feedingFreqStateValue === "SPECIAL" ?
                            <TextInputComponent label={"Special feeding"} state={specialFeeding} setState={setSpecialFeeding} required={true}/>
                            :
                            <div aria-hidden={true} data-placeholder={true}></div>
                    }
                    <SelectFoodTypeInput/>
                    {
                        foodTypeStateValue === "5" ? <TextInputComponent label={"Special food type"} state={specialFoodType} setState={setSpecialFoodType} required={true} /> :
                            <div aria-hidden={true} data-placeholder={true}></div>
                    }
                    <TextInputComponent label={"Message"} state={message} setState={setMessage}/>
                </div>
                <SubmitButton/>
            </form>
        </div>
    );
};

export default BookingRegisterForm;