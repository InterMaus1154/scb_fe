import {FC} from 'react';
import ProtectedPage from "@pages/protected/ProtectedPage.tsx";
import BookingRegisterForm from "@components/forms/BookingRegisterForm.tsx";

const CreateBooking: FC = () => {
    return (
        <ProtectedPage>
            <div className="form-section">
                <div className="form-outer-wrapper full-width">
                    <BookingRegisterForm></BookingRegisterForm>
                </div>
            </div>
        </ProtectedPage>
    );
};

export default CreateBooking;