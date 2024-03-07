import Pagination from "./Pagination";
import Sort from "./Sort";
import Search from "./Search";
import Table from './SummaryListingsTable';
import Loading from "./Loading";
import Include from "./Include";
import { useState, useEffect, useContext } from 'react';
import { useSort } from "./hooks/useSortSummary";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useFetchData } from "./hooks/useFetchData";
import { useParams } from "react-router-dom";
import { useInclude } from "./hooks/useInclude";
import { ListingContext } from "../App";
import TableMobile from './SummaryMobile';

function Listings(props) {

   // User ID from Route Params
   const params = useParams();

   // fetch User Data hook
    // const {listingData} = useFetchData('/summary',  params.userid);
    const [ listingData, setListingData ]   = useContext(ListingContext);  

   // Include categories hook
   const {stateInclude, handleAll, handleActive, handlePending, handleSold, handleUnsold, handleCanceled} = useInclude(listingData)
    
   // Custom Search hook 
   const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(stateInclude.dataIncluded);

   // Sorting Table hook
   const {state, handleSortName, handleSortPrice } = useSort(filteredData);

   // Pagination Hook that also handles rerenders on search and Sorting table
   const { currentRecords, currentPage, setCurrentPage, nPages } = usePagination(state, listingData, filteredData, stateInclude,);

   // Condition to load table with products
   const [ loaded, setLoaded ] = useState(false);

   useEffect(() => {
       if(listingData) setLoaded(true)
   }, [listingData])

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
                <div className="row">
                    <div className="col">
                        <Search clearSearch={clearSearch} handleSearch={handleSearch} searchValue={searchValue} searchClass={'listings-search'} clearClass={'clear-search'} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                    <Include  
                        data={listingData}
                        state={stateInclude} 
                        handleAll={handleAll}
                        handleActive={handleActive}
                        handlePending={handlePending}
                        handleSold={handleSold}
                        handleUnsold={handleUnsold}
                        handleCanceled={handleCanceled}
                    />
                    </div>
                </div>
                 <div className='table-responsive-lg table-include'>
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
                                    Status
                                </th>
                                <th className="list-header" scope='col'>
                                    Price
                                    <span onClick={handleSortPrice} >
                                        <Sort sort={state.sortPrice} />
                                    </span>
                                </th>
                                <th className="list-header" scope='col'>
                                    Payout
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <Table currentRecords={currentRecords} />
                        </tbody>
                    </table>
                 </div>
                 <div className='table-mobile container'>
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