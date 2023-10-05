import { useState, useEffect } from "react";

export const usePagination = (state, userData, filteredData) => {

     // Pagination 
     const [ currentRecords, setCurrentRecords]  = useState();
     const [ currentPage, setCurrentPage ]       = useState(1); 
     const [ nPages, setNPages ]                 = useState();  
     const [ recordsPerPage ]                    = useState(10);
     const indexOfLastRecord                     = currentPage * recordsPerPage;
     const indexOfFirstRecord                    = indexOfLastRecord - recordsPerPage; 


    useEffect(() => {
        if(state.sorted){
            let sortedData = state.sorted
            const currentRecord = sortedData.slice(indexOfFirstRecord, indexOfLastRecord); 
            setCurrentRecords(currentRecord) 
            const Page = Math.ceil(sortedData.length / recordsPerPage);
            setNPages(Page)
        }
    }, [state, state.sorted])

     useEffect(()=>{
        if(filteredData){
            console.log(userData);
            const currentRecord = filteredData.slice(indexOfFirstRecord, indexOfLastRecord); 
            setCurrentRecords(currentRecord) 
            const Page = Math.ceil(filteredData.length / recordsPerPage);
            setNPages(Page)
            console.log(currentRecords);
        }
    },[userData, filteredData, currentPage])

    return { currentRecords, currentPage, setCurrentPage, nPages };
}