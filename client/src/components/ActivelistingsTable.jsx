import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import listed from './hooks/listed';
import time from './hooks/time'
import placeholder from '../images/placeholder.png'
import payout from './hooks/payout';


const Table = ({currentRecords}) => {

    const handleCollapse = async (id) => {
       
        const expandBox         = await document.getElementById(`main-td-${id}`);
        const expandAccordion   = await document.getElementById(`accordion-${id}`);
        const sideTds           = await document.getElementsByClassName(`side-td-${id}`);
        const box1              = await document.getElementById(`box1-${id}`);
        const box2              = await document.getElementById(`box2-${id}`);
        const box3              = await document.getElementById(`box3-${id}`);
        const box4              = await document.getElementById(`box4-${id}`);
        const box5              = await document.getElementById(`box5-${id}`);
        const box6              = await document.getElementById(`box6-${id}`);
        const box7              = await document.getElementById(`box7-${id}`);
        const box8              = await document.getElementById(`box8-${id}`);
        const listingimg        = await document.getElementById(`listing-img-${id}`)

        if(expandBox.getAttribute('colspan')){
            box1.classList.remove('listing-show');
            box2.classList.remove('listing-show');
            box3.classList.remove('listing-show');
            box4.classList.remove('listing-show');
            box5.classList.remove('listing-show');
            box6.classList.remove('listing-show');
            box7.classList.remove('listing-show');
            box8.classList.remove('listing-show');
            // listingimg.classList.remove('listing-show');
            expandAccordion.classList.add('listing-collapse');
            
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
            expandAccordion.classList.add('listing-expand');
            expandAccordion.classList.remove('listing-collapse');
            try {
                for (var i in sideTds) {
                    sideTds[i].classList.add('td-hidden');
                }
            } catch(err){
                console.log(err)
            }
            // setTimeout(() => {
            //     listingimg.classList.add('listing-show');
            // }, 500);
            setTimeout(() => {
                box1.classList.add('listing-show');
                box2.classList.add('listing-show');
                box3.classList.add('listing-show');
                box4.classList.add('listing-show');
                box5.classList.add('listing-show');
                box6.classList.add('listing-show');
                box7.classList.add('listing-show');
                box8.classList.add('listing-show');
            }, 500);
        }
    }

    return (
        <>
            {currentRecords.map((data, key) => {
                return(
                    <tr key={key}>
                        <td id={`main-td-${key}`}>
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
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-sm-3'>
                                                        <Element
                                                            class='listing-img' 
                                                            body={(
                                                                <>
                                                                    <img src={data.imageurl ? data.imageurl : placeholder} className='product-img' />
                                                                    {/* <img src={getImages(data.ListingDetails.ViewItemURL._text)} className='product-img' /> */}
                                                                </>
                                                            )}
                                                        />    
                                                    </div>
                                                    <div className='col'>
                                                        <div className='row'>
                                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box1-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        View on
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                    <a href={data.itemurl} target="_blank"><img src={ebayLogo} style={{height:"1.5rem", width:"auto"}} /> </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box2-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Listed on
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {listed(data.starttime)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box5-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Time Left
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {time(data.timeleft)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box8-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Updated at:
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {time(data.updatedAt)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box4-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Watching:
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {data.watchcount}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box3-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Bids
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {data.bidcount}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box6-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Current Price:
                                                                    </div>
                                                                    <div className="card-body listing-body num">
                                                                        $ {data.currentprice.toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-3 d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box7-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Payout:
                                                                    </div>
                                                                    <div className="card-body listing-body total">
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