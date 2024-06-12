import {
    FC,
    useRef,
    MouseEvent as ReactMouseEvent,
    useEffect,
    Dispatch,
    SetStateAction,
    ChangeEvent as ReactChangeEvent,
    useState
} from "react";
import "@styles/hooks/Input.css";

/*
* Reusable input fields
* With wrapper and label component
* */
export const useEmailInput = () => {

    const emailRef = useRef(document.createElement("input"));

    const EmailInput: FC = () => {

        return (
            <div className="form-input-wrapper required-input">
                <label htmlFor="email">
                    <span>Email address:</span>
                    <input type="email" placeholder={"Email address"} id={"email"}
                           ref={emailRef} maxLength={120} required={true}/>
                </label>
            </div>
        );
    }

    return {EmailInput, email: emailRef};
}

export const usePasswordInput = () => {

    const passwordRef = useRef(document.createElement("input"));

    const PasswordInput: FC = () => {
        return (
            <div className="form-input-wrapper required-input">
                <label htmlFor="password">
                    <span>Password:</span>
                    <input type="password" placeholder={"Password"} id={"password"} minLength={8}
                           ref={passwordRef} required={true}/>
                </label>
            </div>
        );
    }
    return {PasswordInput, password: passwordRef};
}

interface CheckboxInput {
    label: string
}

export const useCheckboxInout = ({label}: CheckboxInput) => {

    const checkboxRef = useRef(document.createElement("input"));

    const CheckboxInput: FC = () => {
        return (
            <div className="form-input-wrapper checkbox-wrapper">
                <label>
                    <span>{label}</span>
                    <input type="checkbox" ref={checkboxRef}/>
                </label>
            </div>
        );
    };

    return {CheckboxInput, checkbox: checkboxRef};
};

interface TextInput {
    label: string;
    required?: boolean;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    canStatusBeChanged?: boolean;
    disabled?: boolean;
    value?: string;
    omitLabel?: boolean;
    type?: string;
}

export const useTextInput = ({
                                 label,
                                 maxLength = 255,
                                 minLength = 0,
                                 required = false,
                                 placeholder = label,
                                 canStatusBeChanged = false,
                                 disabled = false,
                                 omitLabel = false,
                                 type = "text",
                                 value = ""
                             }: TextInput) => {

    const inputRef = useRef(document.createElement("input"));
    const veilRef = useRef(document.createElement("div"));

    const onInputClick = (e: ReactMouseEvent<HTMLLabelElement>) => {
        if (disabled && canStatusBeChanged) {
            inputRef.current.disabled = false;
            disabled = false;
        }
    };

    const [stateValue, setStateValue] = useState("");

    useEffect(() => {

        if (canStatusBeChanged) {
            const handleClick = (e: MouseEvent) => {
                if (!disabled && inputRef.current && !(inputRef.current.contains(e.target as Node)) && !(veilRef.current.contains(e.target as Node))) {
                    inputRef.current.disabled = true;
                    disabled = true;
                }
            }

            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("click", handleClick);
            }
        }
    }, [disabled]);


    const TextInput: FC = () => {
        return (
            <div className={required ? "form-input-wrapper required-input" : "form-input-wrapper non-required-input"}>
                <label onClick={onInputClick} tabIndex={1}>
                    {
                        !omitLabel && <span>{label}</span>
                    }
                    <input type={type} placeholder={placeholder} minLength={minLength}
                           maxLength={maxLength} required={required} disabled={disabled}
                           ref={inputRef}/>
                    <div className="veil" ref={veilRef}></div>
                </label>
            </div>
        );
    };

    return {TextInput, input: inputRef};
}

interface DateInput {
    label: string;
    required?: boolean;
    onChange?: (e: ReactChangeEvent<HTMLInputElement>) => void;
}

export const useDateInput = ({label, required, onChange}: DateInput) => {

    const dateInputRef = useRef(document.createElement("input"));

    const DateInput: FC = () => {
        return (
            <div className={required ? "form-input-wrapper required-input" : "form-input-wrapper non-required-input"}>
                <label>
                    <span>{label}</span>
                    <input type="date"
                           required={required}
                           onChange={onChange}
                           ref={dateInputRef}/>
                </label>
            </div>
        );
    };

    return {DateInput, dateInput: dateInputRef};
};

export type SelectTemplate = {
    value: string;
    label: string;
};

interface SelectInput {
    label: string;
    options: SelectTemplate[];
    required?: boolean;
}

export const useSelectInput = ({label, options, required}: SelectInput) => {

    const selectInputRef = useRef(document.createElement("select"));

    const [stateValue, setStateValue] = useState("");

    const SelectInput: FC = () => {
        return (
            <div className={required ? "form-input-wrapper required-input" : "form-input-wrapper non-required-input"}>
                <label>
                    <span>{label}</span>
                    <select ref={selectInputRef} value={stateValue} onChange={e => setStateValue(e.target.value)}>
                        {
                            options?.map(option => {
                                return (
                                    <option value={option.value}>{option.label}</option>
                                );
                            })
                        }
                    </select>
                </label>
            </div>
        );
    };

    return {SelectInput, selectInput: selectInputRef, stateValue};
}

export const useStatelessSelectInput = ({label, options, required}: SelectInput) => {

    const selectInputRef = useRef(document.createElement("select"));


    const SelectInput: FC = () => {
        return (
            <div className={required ? "form-input-wrapper required-input" : "form-input-wrapper non-required-input"}>
                <label>
                    <span>{label}</span>
                    <select ref={selectInputRef}>
                        {
                            options?.map(option => {
                                return (
                                    <option value={option.value}>{option.label}</option>
                                );
                            })
                        }
                    </select>
                </label>
            </div>
        );
    };

    return {SelectInput, selectInput: selectInputRef};
}

interface SubmitButton {
    label: string;
}

export const useSubmitButton = ({label}: SubmitButton) => {

    const SubmitButton: FC = () => {
        return <button type={"submit"}>{label}</button>
    };

    return SubmitButton;
}


/*
* NON-HOOK INPUT COMPONENTS
* */

/*
* text input component
* */
interface TextInputComponent {
    label: string;
    required?: boolean;
    state: string;
    setState: Dispatch<SetStateAction<string>>;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
}

export const TextInputComponent: FC<TextInputComponent> = ({
                                                        label,
                                                        required,
                                                        state,
                                                        setState,
                                                        placeholder = label,
                                                        maxLength,
                                                        minLength
                                                    }: TextInputComponent) => {
    return (
        <div className={required ? "form-input-wrapper required-input" : "form-input-wrapper non-required-input"}>
            <label tabIndex={1}>
                <span>{label}</span>
                <input type={"text"} placeholder={placeholder} minLength={minLength}
                       maxLength={maxLength} required={required} value={state} onChange={e => setState(e.target.value)}
                />
            </label>
        </div>
    );
}
/*
* end of text input component
* */


/*
* date input component
* */

interface DateInputComponent {
    label: string;
    required?: boolean;
    state: string;
    setState: Dispatch<SetStateAction<string>>;
}

export const DateInputComponent: FC<DateInputComponent> = ({label, required, state, setState}: DateInputComponent) => {
    return (
        <div className={required ? "form-input-wrapper required-input" : "form-input-wrapper non-required-input"}>
            <label>
                <span>{label}</span>
                <input type="date"
                       required={required}
                       onChange={e => setState(e.target.value)}
                       value={state}
                        />
            </label>
        </div>
    );
};


/*
* end of date input component
* */
