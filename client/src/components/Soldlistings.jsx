import Element from "./DashElement";
import axios from 'axios';
import { useState, useEffect, useContext, useReducer } from 'react';
import ebayLogo from '../images/ebay-logo.png'
import Loading from './Loading';
import Pagination from "./Pagination";
import { AuthContext } from '../App';
import Search from "./Search";
import Sort from "./Sort";
import SoldTable from './SoldTable';
import { useSortPay } from "./hooks/useSortPay";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useFetchUserDataSold } from './hooks/useFetchUserDataSold';

const serverUrl = 'http://localhost:8080'

// Sold Elements Component
function Sold() {

    // fetch User Data hook
    const {userData} = useFetchUserDataSold();

    // Custom Search hook 
    const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(userData);

    // Sorting Table hook
    const {state, handleSortName, handleSortPrice, handleSortPay}  = useSortPay(filteredData);

    // Pagination Hook that also handles rerenders on search and Sorting table
    const { currentRecords, currentPage, setCurrentPage, nPages } = usePagination(state, userData, filteredData);

    // Condition to load table with products
    if (currentRecords) {
        
        return (
            <>
                <Search clearSearch={clearSearch} handleSearch={handleSearch} searchValue={searchValue} />
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
                                Price Sold
                                <span onClick={handleSortPrice} >
                                    <Sort sort={state.sortPrice}/>
                                </span>
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
                        <SoldTable currentRecords={currentRecords} />
                    </tbody>
                </table>
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <> 
                <Loading/>
            </>
        )
    }
}

export default Sold;