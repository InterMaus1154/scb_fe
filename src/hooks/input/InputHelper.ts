//function that receives an array of values(string)
//and returns true if one of them is empty
export const isAnyEmpty = (values: string[]) => {

    for (const value of values) {
        if (value.trim().length === 0) {
            return true;
        }
    }

    return false;
};