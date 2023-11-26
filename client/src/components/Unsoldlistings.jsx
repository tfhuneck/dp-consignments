import Loading from './Loading';
import Pagination from "./Pagination";
import Search from "./Search";
import Sort from "./Sort";
import UnsoldTable from './UnsoldTable';
import { useSortPay } from "./hooks/useSortPay";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useFetchData } from './hooks/useFetchData';

const serverUrl = 'http://localhost:8080'

// Sold Elements Component
function Unsold() {

    // fetch User Data hook
    const {userData} = useFetchData('/user/unsold');

    // Custom Search hook 
    const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(userData);

    // Sorting Table hook
    const {state, handleSortName, handleSortPrice, handleSortPay, handleSortDate}  = useSortPay(filteredData);

    // Pagination Hook that also handles rerenders on search and Sorting table
    const { currentRecords, currentPage, setCurrentPage, nPages } = usePagination(state, userData, filteredData);

    // Condition to load table with products
    if (currentRecords && currentRecords.length >= 1) {
        
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
                                Date
                                <span onClick={handleSortDate} >
                                    <Sort sort={state.sortDate}/>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <UnsoldTable currentRecords={currentRecords} />
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

export default Unsold;