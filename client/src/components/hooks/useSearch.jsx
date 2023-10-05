import { useState, useEffect } from "react";

export const useSearch = (data) => {

    const [ searchValue, setSearchValue ]       = useState('');
    const [ filteredData, setFilteredData ]     = useState(data);
    
    useEffect(() => {
        if (searchValue) {
            let filtered = data.filter((data) => {
                    return data.title.toString().toLowerCase().includes(searchValue.toLowerCase()) 
                 })
            console.log(searchValue)
            console.log(filtered)
            console.log(filteredData)
            setFilteredData(filtered);
        }else {
        setFilteredData(data)
        };
    },[searchValue, data])

       // clear search input
       const clearSearch = () => {
        setSearchValue('');
    }

    // update search state 
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    return { searchValue, filteredData, clearSearch, handleSearch }
}


