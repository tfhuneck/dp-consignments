import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import listed from './hooks/listed';
import time from './hooks/time'
import placeholder from '../images/placeholder.png'
import payout from './hooks/payout';
import ViewImage from './ImageView';

const Table = ({currentRecords}) => {

    const handleCollapse = async (id) => {
       
        const expandBox         = await document.getElementById(`main-td-${id}`);
        const expandAccordion   = await document.getElementById(`accordion-${id}`);
        const sideTds           = await document.getElementsByClassName(`side-td-${id}`);
        const details           = await document.getElementById(`listing-detail${id}`);

        if(expandBox.getAttribute('colspan')){
            expandBox.classList.add('mobile-main-td');
            expandAccordion.classList.add('listing-collapse');
            details.classList.remove('listing-show');   
            
            setTimeout(() => {
                expandBox.removeAttribute('colspan');  
                expandAccordion.classList.remove('listing-expand');
            try {
                for (var i in sideTds) {
                    sideTds[i].classList.remove('td-hidden');
                }
            } catch(err){
                console.log(err)
            }
            }, 500)
            
        } else{
            expandBox.setAttribute('colspan', '4');
            expandBox.classList.remove('mobile-main-td');
            expandAccordion.classList.add('listing-expand');
            expandAccordion.classList.remove('listing-collapse');
            try {
                for (var i in sideTds) {
                    sideTds[i].classList.add('td-hidden');
                }
            } catch(err){
                console.log(err)
            }
            setTimeout(() => {
                details.classList.add('listing-show');
            },500);
        }
    }

    return (
        <>
            {currentRecords.map((data, key) => {
                return(
                    <tr key={key}>
                        <td id={`main-td-${key}`} className="mobile-main-td">
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
                                            onClick={() => handleCollapse(key)} 
                                        >
                                            {data.title}
                                        </button>
                                    </h2>
                                    <div id={`flush-collapse${key}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className='container listing-container'>
                                                <div className='row'>
                                                    <div className='col-3'>
                                                        <Element
                                                            class='listing-img' 
                                                            body={(
                                                                <>
                                                                    <ViewImage url={data.imageurl ? data.imageurl : placeholder}/>
                                                                    <img src={data.imageurl ? data.imageurl : placeholder} className='product-img' />
                                                                    {/* <img src={getImages(data.ListingDetails.ViewItemURL._text)} className='product-img' /> */}
                                                                </>
                                                            )}
                                                        />    
                                                    </div>
                                                    <div className='col col-details'>
                                                        <div className='row'>
                                                            <div className="card listing-details" id={`listing-detail${key}`}>
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
                                                                            Time Left
                                                                        </div>
                                                                        <div className="col listing-body">
                                                                            {time(data.timeleft)}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row details-row'>
                                                                        <div className="col listing-header">
                                                                            Watching
                                                                        </div>
                                                                        <div className="col listing-body">
                                                                            {data.watchcount}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row details-row'>
                                                                        <div className="col listing-header">
                                                                            Bids
                                                                        </div>
                                                                        <div className="col listing-body">
                                                                            {data.bidcount}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row details-row'>
                                                                        <div className="col listing-header">
                                                                        Current Price
                                                                        </div>
                                                                        <div className="col listing-body total">
                                                                            $ {data.currentprice.toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row details-row'>
                                                                        <div className="col listing-header">
                                                                            Total Fees
                                                                        </div>
                                                                        <div className="col listing-body">
                                                                        $ {(data.currentprice - payout(data.currentprice)).toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row details-row'>
                                                                        <div className="col listing-header">
                                                                        Payout
                                                                        </div>
                                                                        <div className="col listing-body num">
                                                                            $ {payout(data.currentprice.toFixed(2))}
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                        <td className={`side-td-${key}`}>
                            <span className='time-left'>
                                {time(data.timeleft)}
                            </span>
                        </td>
                        <td className={`side-td-${key}`}>
                            <span >
                                {data.bidcount}
                            </span>
                        </td>
                        <td className={`side-td-${key}`}>
                            <span className='price'>
                                $ {data.currentprice.toFixed(2)}
                            </span>
                        </td>
                    </tr>
                )
            })} 
        </>
    ) 
}

export default Table;