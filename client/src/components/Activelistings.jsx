import Loading from './Loading';
import Pagination from "./Pagination";
import Sort from "./Sort";
import Search from "./Search";
import Table from './ActivelistingsTable'
import { useSort } from "./hooks/useSort";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useFetchData } from './hooks/useFetchData';
import { useState, useEffect } from 'react';


function Listings(props) {
    
    // fetch User Data hook
    const {userData} = useFetchData('/user/listings');

    // Custom Search hook 
    const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(userData);

    // Sorting Table hook
    const {state, handleSortName, handleSortPrice, handleSortTime, handleSortBids} = useSort(filteredData);

    // Pagination Hook that also handles rerenders on search and Sorting table
    const { currentRecords, currentPage, setCurrentPage, nPages } = usePagination(state, userData, filteredData);

    // Condition to load table with products
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        if(userData) setLoaded(true)
    }, [userData])

    if(!loaded) {
        return (
            <> 
                <Loading/>
            </>
        )
    }
    else {
        
        return (
            <>
                <Search clearSearch={clearSearch} handleSearch={handleSearch} searchValue={searchValue} />
                <div className='table-responsive-lg table-mobile'>
                    <table className='table table-dark table-striped table-hover'>
                        <thead>
                            <tr>
                                <th className="list-header" scope='col'>
                                    Listing
                                    <span onClick={handleSortName} >
                                        <Sort sort={state.sortName} />
                                    </span>
                                </th>
                                <th className="list-header" scope='col'>
                                    Time Left
                                    <span onClick={handleSortTime} >
                                        <Sort sort={state.sortTime} />
                                    </span>
                                </th>
                                <th className="list-header" scope='col'>
                                    Bids
                                    <span onClick={handleSortBids} >
                                        <Sort sort={state.sortBids} />
                                    </span>
                                </th>
                                <th className="list-header" scope='col'>
                                    Price
                                    <span onClick={handleSortPrice} >
                                        <Sort sort={state.sortPrice} />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <Table currentRecords={currentRecords} />
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                        </div>
                    </div>
                </div>
            </>
        )
    } 
}

export default Listings;