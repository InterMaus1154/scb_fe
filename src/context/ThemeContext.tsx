import {createContext, useState, SetStateAction, Dispatch, ReactNode, useEffect} from "react";

type ThemeTypes = "vintage";

interface ThemeContext {
    theme: ThemeTypes;
    setTheme: Dispatch<SetStateAction<ThemeTypes>>;
}
export const ThemeContext = createContext<ThemeContext>({} as never);

import {FC} from 'react';

interface ThemeContextProvider {
    children: ReactNode
}

const ThemeContextProvider: FC<ThemeContextProvider> = ({children}) => {

    const [theme, setTheme] = useState<ThemeTypes>("vintage");

    useEffect(() => {
        document.body.id = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;