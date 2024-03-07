import Loading from './Loading';
import Pagination from "./Pagination";
import Sort from "./Sort";
import Search from "./Search";
import Table from './ActivelistingsTable';
import TableMobile from './ActiveListingsMobile';
import { useSort } from "./hooks/useSort";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useState, useEffect } from 'react';
import { useListingData } from './hooks/useListingData';

function Listings(props) {
    
    // User Listing Data
    const { userData } = useListingData('active')
   
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
                <div className='table-responsive-lg table-main'>
                    <table className='table table-dark table-striped table-hover '>
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
                <div className='table-mobile container'>
                    <div className='row d-flex justify-content-center'>
                        <button className='btn-settings' onClick={handleSortName}>
                            Sort Listing Name
                            <span  >
                                <Sort sort={state.sortName} />
                            </span>
                        </button>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <button className='btn-settings' onClick={handleSortTime}>
                            Sort Time Left
                            <span  >
                                <Sort sort={state.sortTime} />
                            </span>
                        </button>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <button className='btn-settings' onClick={handleSortBids}>
                            Sort Bids
                            <span  >
                                <Sort sort={state.sortBids} />
                            </span>
                        </button>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <button className='btn-settings' onClick={handleSortPrice} >
                            Sort Price
                            <span >
                                <Sort sort={state.sortPrice} />
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

export default Listings;