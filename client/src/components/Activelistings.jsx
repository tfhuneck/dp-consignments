import Element from "./DashElement";
import axios from 'axios';
import { useState, useEffect } from 'react';
import ebayLogo from '../images/ebay-logo.png'
import Loading from './Loading';
import Pagination from "./Pagination";

const serverUrl = 'http://localhost:8080'

function Listings() {
    
    const [ userData, setUserData ]             = useState();
    const [ searchValue, setSearchValue ]       = useState('');
    const [ filteredData, setFilteredData ]     = useState(userData);
    const [ currentRecords, setCurrentRecords]  = useState();
    const [ currentPage, setCurrentPage ]       = useState(1); 
    const [ nPages, setNPages ]                 = useState();  
    const [ recordsPerPage ]                    = useState(10);
    const indexOfLastRecord                     = currentPage * recordsPerPage;
    const indexOfFirstRecord                    = indexOfLastRecord - recordsPerPage;  


    useEffect(() => {
        async function fetchData(){
            await axios.get(serverUrl + '/getlistings')
                .then(async res => {
                    console.log(res.data);
                    let dataArray = res.data.GetMyeBaySellingResponse.ActiveList.ItemArray.Item;
                    setUserData(dataArray);
                })
            .catch(err => console.log(err));
        }
        fetchData();
    },[]);

    useEffect(() => {
        if (searchValue) {
            let filtered = userData.filter((data) => {
                    return data.Title._text.toString().toLowerCase().includes(searchValue.toLowerCase()) 
                 })
            console.log(searchValue)
            console.log(filtered)
            console.log(filteredData)
            setFilteredData(filtered);
        }else {
        setFilteredData(userData)
        };
    },[searchValue, userData])

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

    const clearSearch = () => {
        setSearchValue('');
    }

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    async function getImages(url) {
        await axios.post(serverUrl + '/getimage', {
          imageUrl: url
        })
        .then(function(res) {
            console.log(res)
        })
        .catch(function (error) {
            console.log(error);
          });
    }
    

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    const today = month + " - " + day + " - " + year;

    function bidcount(bids) {
       if (bids.hasOwnProperty('BidCount')) {
        return bids.BidCount._text
       } else {
        return '0'
       }
    }
    function watchcount(data) {
        if(data.hasOwnProperty('WatchCount')){
            return data.WatchCount._text
        } else {
            return '0'
        }
    }
    function listed(data) {
        let fixed = data.substring(0, 10);
        return fixed
    }

    function time(data){
        let fixed = data.replace('D', 'd ').replace('H', 'h ').replace('M', 'min ').replace('S', 'sec').slice(1).split('T')
        return fixed
    }

    if (currentRecords) {
        
        return (
            <>
                <input placeholder="Search" class="search" name="text" type="text" value={searchValue} onChange={handleSearch}/>
                <div className="clear-search" onClick={clearSearch}>
                    <svg fill="#CFE6FC" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                        <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z"/>
                    </svg>
                </div>
                <table className='table table-dark table-striped table-hover'>
                <thead>
                    <tr>
                        <th scope='col'>Listing</th>
                        <th scope='col'>Time Left</th>
                        <th scope='col'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((data, key) => {
                        return(
                            <tr>
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
                                                >
                                                    {data.Title._text}
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
                                                                            <img src={getImages(data.ListingDetails.ViewItemURL._text)} className='product-img' />
                                                                        </>
                                                                    )}
                                                                />    
                                                            </div>
                                                            <div className='col'>
                                                                <div className='row'>
                                                                    <div className='col d-flex justify-content-center'>
                                                                        <Element
                                                                            class='listing-details' 
                                                                        title= {<a href={data.ListingDetails.ViewItemURL._text} target="_blank">View in  <img src={ebayLogo} style={{height:"1.2rem", width:"auto"}} /> </a>}
                                                                    />    
                                                                    </div>
                                                                    <div className='col d-flex justify-content-center'>
                                                                        <Element
                                                                            class='listing-details' 
                                                                            title='Listed on:'
                                                                            subtitle={( 
                                                                                <>
                                                                                    {listed(data.ListingDetails.StartTime._text)}
                                                                                </> 
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className='col d-flex justify-content-center'>
                                                                        <Element
                                                                            class='listing-details' 
                                                                            title='Bids:'
                                                                            subtitle={( 
                                                                                    <>
                                                                                        {bidcount(data.SellingStatus)}
                                                                                    </>
                                                                                )}
                                                                        />
                                                                    </div>
                                                                    <div className='col d-flex justify-content-center'>
                                                                        <Element
                                                                            class='listing-details' 
                                                                            title='Watching:'
                                                                            subtitle={(  
                                                                                <>
                                                                                    {watchcount(data)}
                                                                                </> 
                                                                                )}
                                                                        />
                                                                    </div>
                                                                    <div className='col d-flex justify-content-center'>
                                                                        <Element
                                                                            class='listing-details' 
                                                                            title='Time Left:'
                                                                            subtitle={( 
                                                                                    <>
                                                                                        <span className='time-left'>
                                                                                            {time(data.TimeLeft._text)}
                                                                                        </span>
                                                                                    </>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className='col d-flex justify-content-center'>
                                                                        <Element
                                                                            class='listing-details'
                                                                            title='Current Price:' 
                                                                            subtitle={( 
                                                                                <>
                                                                                    <span className='price'>
                                                                                        ${data.SellingStatus.CurrentPrice._text}
                                                                                    </span>
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
                                        {time(data.TimeLeft._text)}
                                    </span>
                                </td>
                                <td>
                                    <span className='price'>
                                        ${data.SellingStatus.CurrentPrice._text}
                                    </span>
                                </td>
                            </tr>
                        )
                    })} 
                </tbody>
            </table>
            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
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