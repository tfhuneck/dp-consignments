import Element from "./DashElement";
import axios from 'axios';
import { useState, useEffect } from 'react';
import ebayLogo from '../images/ebay-logo.png'
import Loading from './Loading';
import Pagination from "./Pagination";

const serverUrl = 'http://localhost:8080'

function Sold() {
    
    const [ userData, setUserData ]             = useState();
    const [ searchValue, setSearchValue ]       = useState('');
    const [ filteredData, setFilteredData ]     = useState(userData);
    const [ currentRecords, setCurrentRecords]  = useState();
    const [ currentPage, setCurrentPage ]       = useState(1); 
    const [ nPages, setNPages ]                 = useState();  
    const [ recordsPerPage ]                    = useState(10);
    const [ load, setLoad ]                     = useState(null);
    const [ image, setImage ]                   = useState();
    const indexOfLastRecord                     = currentPage * recordsPerPage;
    const indexOfFirstRecord                    = indexOfLastRecord - recordsPerPage;  

    useEffect(() => {
        async function fetchData(){
            await axios.get(serverUrl + '/sold')
                .then(async res => {
                    let data = (res.data)
                    console.log(res.data);
                    setUserData(data);
                })
            .catch(err => console.log(err));
        }
        fetchData();
    },[]);

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

    function listed(data) {
        let fixed = data.substring(0, 10);
        return fixed
    }

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
                            <th scope='col'>Item</th>
                            <th scope='col'>Price Sold</th>
                            <th scope='col'>Payout</th>
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
                                                                                        {data.price}
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
                                                                                        {data.price}
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
                                            $ {data.price}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='price'>
                                            $ {data.price}
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

export default Sold;