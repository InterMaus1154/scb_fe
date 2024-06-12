import {FC, useState, createContext, Dispatch, SetStateAction, ReactNode} from "react";

/*
* context for showing or not showing the loading box
* */

interface LoadingBoxContext {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingBoxContext = createContext<LoadingBoxContext>({isLoading: false, setIsLoading: () => {}});


interface LoadingBoxContextProvider {
    children: ReactNode;
}

const LoadingBoxContextProvider : FC<LoadingBoxContextProvider> = ({children}: LoadingBoxContextProvider) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return(
      <LoadingBoxContext.Provider value={{isLoading, setIsLoading}}>
          {children}
      </LoadingBoxContext.Provider>
    );

};

export default LoadingBoxContextProvider;