import {FC, ReactNode} from 'react';

interface FreePage {
    children: ReactNode;
}

/*
*
* Unprotected page - can be accessed without login
* */

const FreePage: FC<FreePage> = ({children}) => {
    return (
        <div className={"page"}>
            {children}
        </div>
    );
};

export default FreePage;