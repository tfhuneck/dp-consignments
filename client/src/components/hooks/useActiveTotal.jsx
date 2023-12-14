import { useFetchData } from './useFetchData';
import { useState, useEffect } from "react";
import payout from './payout';

export const useActiveTotal = () => {
    // fetch User Data hook
    const {userData} = useFetchData('/user/listings');

    const [ activeTotal, setActiveTotal ] = useState(0)

    useEffect(() => {
        if (userData && userData.length > 0) {
            let result = userData.map(i => Number(payout(i.currentprice))).reduce((prev, next)=> prev + next).toFixed(2);
            setActiveTotal(result)
        }else{
            setActiveTotal()
        }
    }, [userData]) 

    return {activeTotal}
}
