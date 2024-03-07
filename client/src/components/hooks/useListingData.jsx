import { useEffect, useState, useContext } from "react";
import { ListingContext } from "../../App";

export const useListingData = (sort, sort2) => {

    const [ listingData, setListingData ]   = useContext(ListingContext);
    const [ userData, setUserData ]         = useState();
    
    useEffect(() => {
        let filtered = listingData ? listingData.filter((i) => i.status === `${sort}` ) : null
        setUserData(filtered)
        if (sort2){
            let filtered = listingData ? listingData.filter((i) => i.status === `${sort}` ||  i.status === `${sort2}`) : null
            setUserData(filtered)
        }
    }, [sort, listingData])

    return {userData}

}