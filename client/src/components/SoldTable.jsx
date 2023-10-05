import axios from 'axios';
import { useState, useEffect } from 'react';
import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import payout from './hooks/payout';
import listed from './hooks/listed';

const SoldTable = ({currentRecords}) => {

    const serverUrl = 'http://localhost:8080';

    // ============NEEDS REVISION==============
    // Fetching Product Image from ebay function
    const [ load, setLoad ]                     = useState(null);
    const [ image, setImage ]                   = useState();
    useEffect(() => {
        // async function getImages(url) {
        //     await axios.post( serverUrl + '/soldimage', {
        //       imageUrl: url
        //     })
        //     .then(function(res) {
        //         console.log(res.data)
        //         setImage(res.data)
        //         console.log(image);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //       });
        // }
        // if(load) {
        //     getImages(load);
        // }
    }, [load, setLoad, image, setImage])
      // ========================================

    return (
        <>
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
                                            // onClick={() => setLoad(data.itemurl)}
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
        </>
    )
};

export default SoldTable;