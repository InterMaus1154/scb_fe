import {FC} from 'react';
import CustomerLoginForm from "@components/forms/CustomerLoginForm.tsx";
import FreePage from "@pages/free/FreePage.tsx";
import CustomerRegisterForm from "@components/forms/CustomerRegisterForm.tsx";

const Register: FC = () => {
    return (
        <FreePage>
            <section className="form-section">
                <div className="form-outer-wrapper full-width">
                    <CustomerRegisterForm />
                </div>
            </section>
        </FreePage>
    );
};

export default Register;