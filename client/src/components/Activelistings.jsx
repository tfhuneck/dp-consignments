import Loading from './Loading';
import Pagination from "./Pagination";
import Sort from "./Sort";
import Search from "./Search";
import Table from './ActivelistingsTable'
import { useSort } from "./hooks/useSort";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { useFetchData } from './hooks/useFetchData';

function Listings(props) {
    
    // fetch User Data hook
    const {userData} = useFetchData('/user/listings');

    // Custom Search hook 
    const { searchValue, filteredData, clearSearch, handleSearch } = useSearch(userData);

    // Sorting Table hook
    const {state, handleSortName, handleSortPrice, handleSortTime} = useSort(filteredData);

    // Pagination Hook that also handles rerenders on search and Sorting table
    const { currentRecords, currentPage, setCurrentPage, nPages } = usePagination(state, userData, filteredData);

    if (currentRecords) {
        
        return (
            <>
                <Search clearSearch={clearSearch} handleSearch={handleSearch} searchValue={searchValue} />
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

export default Listings;