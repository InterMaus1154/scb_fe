import axios from "axios";
import {useContext} from "react";
import {LoadingBoxContext} from "@contexts/LoadingBoxContext.tsx";
/*
*
* hooks to interact with customer API endpoints
* */


/*
* get the dogs of a customer
* */
export const useGetCustomerdogs = () => {

    //loading box context
    const {setIsLoading} = useContext(LoadingBoxContext);

    interface GetCustomerDogs {
        customerId: string;
    }

    const getCustomerDogs = ({customerId}: GetCustomerDogs) => {

        setIsLoading(true);

        axios.get(`/customer/${customerId}/dogs`)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }

    return {getCustomerDogs};

};

