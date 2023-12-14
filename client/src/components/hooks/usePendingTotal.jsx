import { useFetchData } from './useFetchData';
import { useState, useEffect } from "react";
import payout from './payout';

export const usePendingTotal = () => {
    // fetch User Data hook
    const {userData} = useFetchData('/user/pending');

    const [ pendingTotal, setPendingTotal ] = useState(0)

    useEffect(() => {
        if (userData && userData.length > 0) {
            let result = userData.map(i => Number(payout(i.price))).reduce((prev, next)=> prev + next).toFixed(2);
            setPendingTotal(result)
        }else{
            setPendingTotal()
        }
    }, [userData]) 

    return {pendingTotal}
}
