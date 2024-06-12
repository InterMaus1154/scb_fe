import {FC, useContext} from 'react';
import "@styles/loading/Loading.css";
import {createPortal} from "react-dom";
import {LoadingBoxContext} from "@contexts/LoadingBoxContext.tsx";
const LoadingBox: FC = () => {

    const {isLoading} = useContext(LoadingBoxContext);

    return createPortal(
        <div className={isLoading ? `loading-box-wrapper loading-box-visible` : "loading-box-wrapper"}>
            <div className="loading-box">
                <span>Loading...</span>
            </div>
        </div>,
        document.body as HTMLElement
    )
};

export default LoadingBox;