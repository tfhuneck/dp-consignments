import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import listed from './hooks/listed';
import time from './hooks/time'
import placeholder from '../images/placeholder.png'
import payout from './hooks/payout';
import ViewImage from './ImageView';

const TableMobile = ({currentRecords}) => {

    return (
        <>
            {currentRecords.map((data, key) => {
                return(
                    <tr key={key}>
                        <td>
                            <div className="accordion" id={`accordion-${key}`}>
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
                                            {data.title}
                                        </button>
                                    </h2>
                                    <div id={`flush-collapse${key}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body container listing-container-mobile">
                                            <div className='row d-flex justify-content-center'>
                                                <Element
                                                    class='listing-img-mobile' 
                                                    body={(
                                                        <>
                                                            <ViewImage url={data.imageurl ? data.imageurl : placeholder}/>
                                                            <img src={data.imageurl ? data.imageurl : placeholder} className='product-img-mobile' />
                                                            {/* <img src={getImages(data.ListingDetails.ViewItemURL._text)} className='product-img' /> */}
                                                        </>
                                                    )}
                                                />    
                                            </div>
                                            <br />
                                            <div className='row d-flex justify-content-center'>
                                                <div className="card listing-details-mobile" id={`listing-detail${key}`}>
                                                    <div className='card-header'>
                                                        Details
                                                    </div>
                                                    <div className='card-body container'>
                                                        <div className='row details-row'>
                                                            <div className="col listing-header">
                                                                View on ebay
                                                            </div>
                                                            <div className="col listing-body">
                                                                <a href={data.itemurl} target="_blank"><img src={ebayLogo} style={{height:"1.5rem", width:"auto"}} /> </a>
                                                            </div>
                                                        </div>
                                                        <div className='row details-row'>
                                                            <div className="col listing-header">
                                                                Listed on
                                                            </div>
                                                            <div className="col listing-body">
                                                                {listed(data.starttime)}
                                                            </div>
                                                        </div>
                                                        <div className='row details-row'>
                                                            <div className="col listing-header">
                                                                Sold on
                                                            </div>
                                                            <div className="col listing-body">
                                                                {listed(data.endtime)}
                                                            </div>
                                                        </div>
                                                        <div className='row details-row'>
                                                            <div className="col listing-header">
                                                                Status
                                                            </div>
                                                            <div className="col listing-body">
                                                                {data.paymentstatus}
                                                            </div>
                                                        </div>
                                                        <div className='row details-row'>
                                                            <div className="col listing-header">
                                                                Total Price
                                                            </div>
                                                            <div className="col listing-body num">
                                                                $ {data.finalprice.toFixed(2)}
                                                            </div>
                                                        </div>
                                                        <div className='row details-row'>
                                                            <div className="col listing-header">
                                                                Total Fees
                                                            </div>
                                                            <div className="col listing-body">
                                                            $ {(data.finalprice - payout(data.finalprice)).toFixed(2)}
                                                            </div>
                                                        </div>
                                                        <div className='row details-row'>
                                                            <div className="col listing-header">
                                                                    Total Payout
                                                            </div>
                                                            <div className="col listing-body total">
                                                                $ {payout(data.finalprice)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        Sale Date                            
                                    </div>
                                    <div className="col">
                                        <span>
                                            {listed(data.endtime)}
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        Sale Price
                                    </div>             
                                    <div className="col">
                                        <span  className='time-left'>
                                        $ {data.finalprice.toFixed(2)}
                                        </span>
                                    </div>             
                                </div>
                                <div className="row">
                                    <div className="col">
                                        Fees
                                    </div>
                                    <div className="col">
                                        <span>
                                            $ {(data.finalprice - payout(data.finalprice)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        Payout
                                    </div>
                                    <div className="col">
                                        <span className='price'>
                                            $ {payout(data.finalprice)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            })} 
        </>
    ) 
}

export default TableMobile;