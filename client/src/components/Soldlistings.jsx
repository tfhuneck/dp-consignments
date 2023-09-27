import Element from "./DashElement";
import axios from 'axios';
import { useState, useEffect, useContext, useReducer } from 'react';
import ebayLogo from '../images/ebay-logo.png'
import Loading from './Loading';
import Pagination from "./Pagination";
import { AuthContext } from '../App';
import Sort from "./Sort";

const serverUrl = 'http://localhost:8080'

// Variables for Sorting
const ACTION = {
    SORTNAME: 'sortName',
    SORTPRICE: 'sortPrice',
    SORTPAY: 'sortPay',
}

// Sorting Reducer function setting Sorting States
function reducer(state, action) {
    switch (action.type) {
        case ACTION.SORTNAME:
            return {
                sortPrice: 'default', 
                sortPay: 'default',
                sortName: action.value,
                sorted: action.filter
            }
        case ACTION.SORTPRICE:
            return {
                sortName: 'default', 
                sortPay: 'default',
                sortPrice: action.value,
                sorted: action.filter
            }
        case ACTION.SORTPAY:
            return {
                sortName: 'default', 
                sortPrice: 'default',
                sortPay: action.value,
                sorted: action.filter
            }
        default:
            return state
    }
  }

// Sold Elements Component
function Sold() {
    
    // States to store user auth Data and fetched user Data
    const [ userAuth, setUserAuth ]             = useContext(AuthContext);
    const [ userData, setUserData ]             = useState();
    
    // Search table 
    const [ searchValue, setSearchValue ]       = useState('');
    const [ filteredData, setFilteredData ]     = useState(userData);

    // Pagination 
    const [ currentRecords, setCurrentRecords]  = useState();
    const [ currentPage, setCurrentPage ]       = useState(1); 
    const [ nPages, setNPages ]                 = useState();  
    const [ recordsPerPage ]                    = useState(10);
    const indexOfLastRecord                     = currentPage * recordsPerPage;
    const indexOfFirstRecord                    = indexOfLastRecord - recordsPerPage;  

    // Product Images 
    const [ load, setLoad ]                     = useState(null);
    const [ image, setImage ]                   = useState();

    // sort Table 
    const [ state, dispatch ]                   = useReducer(reducer, { sorted: [], sortName: 'default', sortPrice: 'default', sortPay: 'default'});

    // Fetch data - triggers Redis Caching function
    useEffect(() => {
    async function fetchData(){
        await axios.get(serverUrl + '/user/sold',
            {params:{
                    userAuth
            }})
            .then(async res => {
                console.log(res.data);
                let data = (res.data)
                setUserData(data);
            })
            .catch(err => console.log(err));
        }
        fetchData();
    },[]);

    // Sorting Functions
    const handleSortName = () =>{
        if(state.sortName === 'default'){
            let sorted = filteredData.sort((a,b) => (a.title > b.title ? 1: -1));
            dispatch({ type: ACTION.SORTNAME, value:'ascend', filter: sorted });
        }
        if(state.sortName === 'ascend'){
            let sorted = filteredData.sort((a,b) => (a.title < b.title ? 1: -1));
            dispatch({ type: ACTION.SORTNAME, value:'descend', filter: sorted  });
        }
        if(state.sortName === 'descend'){
            let sorted = filteredData.sort((a,b) => (a.title > b.title ? 1: -1));
            dispatch({ type: ACTION.SORTNAME, value:'ascend', filter: sorted  });
        }
    }
    const handleSortPrice = () =>{
        if(state.sortPrice === 'default'){
            let sorted = filteredData.sort((a,b) => (a.price > b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPRICE, value:'ascend', filter: sorted });
        }
        if(state.sortPrice === 'ascend'){
            let sorted = filteredData.sort((a,b) => (a.price < b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPRICE, value:'descend', filter: sorted  });
        }
        if(state.sortPrice === 'descend'){
            let sorted = filteredData.sort((a,b) => (a.price > b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPRICE, value:'ascend', filter: sorted  });
        }
    }
    const handleSortPay = () =>{
        if(state.sortPay === 'default'){
            let sorted = filteredData.sort((a,b) => (a.price > b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPAY, value:'ascend', filter: sorted });
        }
        if(state.sortPay === 'ascend'){
            let sorted = filteredData.sort((a,b) => (a.price < b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPAY, value:'descend', filter: sorted  });
        }
        if(state.sortPay === 'descend'){
            let sorted = filteredData.sort((a,b) => (a.price > b.price ? 1: -1));
            dispatch({ type: ACTION.SORTPAY, value:'ascend', filter: sorted  });
        }
    }
    
    // Sorting Rerender with pagination logic
    useEffect(() => {
        if(state.sorted){
            let sortedData = state.sorted
            const currentRecord = sortedData.slice(indexOfFirstRecord, indexOfLastRecord); 
            setCurrentRecords(currentRecord) 
            const Page = Math.ceil(sortedData.length / recordsPerPage);
            setNPages(Page)
        }
    }, [state, state.sorted])

    // Searching Table Search value change
    useEffect(() => {
        if (searchValue) {
            let filtered = userData.filter((data) => {
                    return data.title.toString().toLowerCase().includes(searchValue.toLowerCase()) 
                 })
            console.log(searchValue)
            console.log(filtered)
            console.log(filteredData)
            setFilteredData(filtered);
        }else {
        setFilteredData(userData)
        };
    },[searchValue, userData])

    // Searching table rerender with pagination logic
    useEffect(()=>{
        if(filteredData){
            // console.log(userData);
            const currentRecord = filteredData.slice(indexOfFirstRecord, indexOfLastRecord); 
            setCurrentRecords(currentRecord) 
            const Page = Math.ceil(filteredData.length / recordsPerPage);
            setNPages(Page)
            // console.log(currentRecords);
        }
    },[userData, filteredData, currentPage])

    const clearSearch = () => {
        setSearchValue('');
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    // Fetching Product Image from ebay function
    useEffect(() => {
        async function getImages(url) {
            await axios.post( serverUrl + '/soldimage', {
              imageUrl: url
            })
            .then(function(res) {
                console.log(res.data)
                setImage(res.data)
                console.log(image);
            })
            .catch(function (error) {
                console.log(error);
              });
        }
        if(load) {
            getImages(load);
        }
    }, [load, setLoad, image, setImage])

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    const today = month + " - " + day + " - " + year;

    function listed(data) {
        let fixed = data.substring(0, 10);
        return fixed
    }

    // Calculate Payout function 
    const payout = (price) => {

        let result = ''

        if(price >= 5000){
            let deduction = price - 3000
            result = (deduction * 0.97).toFixed(2);
        }
        if(price >= 1000 && price <= 4999.99 ){
            let deduction = price - 0.5
            result = (deduction * 0.88).toFixed(2);
        }
        if(price >= 25 && price <= 999.999 ){
            let deduction = price - 0.5
            result = (deduction * 0.85).toFixed(2);
        }
        if(price >= 10 && price <= 24.999 ){
            let deduction = price - 0.5
            result = (deduction * 0.8).toFixed(2);
        } 
        if(price < 10 ){
            result = price.toFixed(2);
        }
        return result;
    }

    // Condition to load table with products
    if (currentRecords) {
        
        return (
            <>
                <input placeholder="Search" className="search" name="text" type="text" value={searchValue} onChange={handleSearch}/>
                <svg className="clear-search" onClick={clearSearch} fill="#CFE6FC" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                    <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"/>
                </svg>
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
                        {currentRecords.map((data, key) => {
                            return(
                                <tr key={key}>
                                    <td>
                                        <div className="accordion">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button 
                                                        className="accordion-button collapsed bg-dark" 
                                                        type="button" 
                                                        data-bs-toggle="collapse" 
                                                        data-bs-target={`#flush-collapse${key}`} 
                                                        aria-expanded="false" 
                                                        aria-controls="flush-collapseOne"
                                                        onClick={() => setLoad(data.itemurl)}
                                                    >
                                                        {data.title}
                                                    </button>
                                                </h2>
                                                <div id={`flush-collapse${key}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body">
                                                        <div className='container'>
                                                            <div className='row'>
                                                                <div className='col-sm-6'>
                                                                    <Element
                                                                        class='listing-img' 
                                                                        body={(
                                                                            <>
                                                                                <img src={image} className='product-img' />
                                                                            </>
                                                                        )}
                                                                    />    
                                                                </div>
                                                                <div className='col'>
                                                                    <div className='row'>
                                                                        <div className='col d-flex justify-content-center'>
                                                                            <Element
                                                                                class='listing-details' 
                                                                            title= {<a href={data.itemurl} target="_blank">View in  <img src={ebayLogo} style={{height:"1.2rem", width:"auto"}} /> </a>}
                                                                        />    
                                                                        </div>
                                                                        <div className='col d-flex justify-content-center'>
                                                                            <Element
                                                                                class='listing-details' 
                                                                                title='Listed on:'
                                                                                subtitle={(
                                                                                    <>
                                                                                        {listed(data.starttime)}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <div className='col d-flex justify-content-center'>
                                                                            <Element
                                                                                class='listing-details' 
                                                                                title='Sold on:'
                                                                                subtitle={(
                                                                                    <>
                                                                                        {listed(data.endtime)}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <div className='col d-flex justify-content-center'>
                                                                            <Element
                                                                                class='listing-details' 
                                                                                title='Status:'
                                                                                subtitle={(
                                                                                    <>
                                                                                        {data.paymentstatus}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <div className='col d-flex justify-content-center'>
                                                                            <Element
                                                                                class='listing-details' 
                                                                                title='Total Price:'
                                                                                subtitle={(
                                                                                    <>
                                                                                        {data.price.toFixed(2)}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <div className='col d-flex justify-content-center'>
                                                                            <Element
                                                                                class='listing-details'
                                                                                title='Total Payout:' 
                                                                                subtitle={(
                                                                                    <>
                                                                                        {payout(data.price)}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='time-left'>
                                            $ {data.price.toFixed(2)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='price'>
                                            $ {payout(data.price)}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })} 
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