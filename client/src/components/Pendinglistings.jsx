import Loading from './Loading';
import Pagination from "./Pagination";
import Search from "./Search";
import Sort from "./Sort";
import PendingTable from "./PendingTable";
import { useSortPay } from "./hooks/useSortPay";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useFetchData } from './hooks/useFetchData';
import { useState, useEffect } from 'react';
import TableMobile from './PendingMobile';
import { useListingData } from './hooks/useListingData';

function Pending() {

    // User Listing Data
    const { userData } = useListingData('pending');
   
    // Custom Search hook 
    const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(userData);

    // Sorting Table hook
    const {state, handleSortName, handleSortPrice, handleSortPay, handleSortDate}  = useSortPay(filteredData);

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
                <div className='table-responsive-lg table-main'>
                    <div className='pending-disclaimer'>
                        Pending Items awaiting Payments!
                    </div>
                    <table className='table table-dark table-striped table-hover'>
                        <thead>
                            <tr>
                                <th className="list-header" scope='col'>
                                    Item
                                    <span onClick={handleSortName} >
                                        <Sort sort={state.sortName}/>
                                    </span>
                                </th>
                                <th className="list-header" scope='col'>
                                    Date
                                    <span onClick={handleSortDate} >
                                        <Sort sort={state.sortDate}/>
                                    </span>
                                </th>
                                <th className="list-header" scope='col'>
                                    Price Sold
                                    <span onClick={handleSortPrice} >
                                        <Sort sort={state.sortPrice}/>
                                    </span>
                                </th>
                                <th className="list-header" scope='col'>
                                    Fees
                                </th>
                                <th className="list-header" scope='col'>
                                    Payout
                                    <span onClick={handleSortPay} >
                                        <Sort sort={state.sortPay} />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <PendingTable currentRecords={currentRecords} />
                        </tbody>
                    </table>
                </div>
                <div className='table-mobile container'>
                    <div className='row d-flex justify-content-center'>
                        <button className='btn-settings' onClick={handleSortName}>
                            Sort Listing Name
                            <span  >
                                <Sort sort={state.sortName}/>
                            </span>
                        </button>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <button className='btn-settings' onClick={handleSortDate}>
                            Sort Sale Date
                            <span  >
                                <Sort sort={state.sortDate}/>
                            </span>
                        </button>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <button className='btn-settings' onClick={handleSortPrice} >
                            Sort Price
                            <span >
                                <Sort sort={state.sortPrice}/>
                            </span>
                        </button>
                    </div>
                    <br />
                    <div className='row'>
                        <table className='table table-dark table-striped table-hover '>
                            <thead>
                                <tr>
                                    <th className="list-header">
                                        Listing
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableMobile currentRecords={currentRecords} />
                            </tbody>
                        </table>
                    </div>
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

export default Pending;