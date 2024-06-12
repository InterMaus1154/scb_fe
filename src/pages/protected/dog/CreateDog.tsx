import {FC} from 'react';
import ProtectedPage from "@pages/protected/ProtectedPage.tsx";
import DogRegisterForm from "@components/forms/DogRegisterForm.tsx";

const CreateDog: FC = () => {
    return (
        <ProtectedPage>
            <div className="form-section">
                <div className={"form-outer-wrapper full-width"}>
                    <DogRegisterForm></DogRegisterForm>
                </div>
            </div>
        </ProtectedPage>
    );
};

export default CreateDog;