import axios from 'axios';
import { useState, useEffect } from 'react';
import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import payout from './hooks/payout';
import listed from './hooks/listed';
import placeholder from '../images/placeholder.png';
import ViewImage from './ImageView';

const SoldTable = ({currentRecords}) => {

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
            expandBox.setAttribute('colspan', '5');
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
                                                <div className='row d-flex justify-content'>
                                                    <div className='col  d-flex justify-content-center'>
                                                        <Element
                                                            id={`listing-img-${key}`}
                                                            class={`listing-img`}
                                                            body={(
                                                                <>
                                                                    <ViewImage url={data.imageurl ? data.imageurl : placeholder}/>
                                                                    <img src={data.imageurl ? data.imageurl : placeholder} className='product-img' />
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
                                                                            $ {data.price.toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row details-row'>
                                                                        <div className="col listing-header">
                                                                            Total Fees
                                                                        </div>
                                                                        <div className="col listing-body">
                                                                        $ {(data.price - payout(data.price)).toFixed(2)}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row details-row'>
                                                                        <div className="col listing-header">
                                                                                Total Payout
                                                                        </div>
                                                                        <div className="col listing-body total">
                                                                            $ {payout(data.price)}
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
                            <span>
                                {listed(data.endtime)}
                            </span>
                        </td>
                        <td className={`side-td-${key}`}>
                            <span className='time-left'>
                                $ {data.price.toFixed(2)}
                            </span>
                        </td>
                        <td className={`side-td-${key}`}>
                            <span>
                                $ {(data.price - payout(data.price)).toFixed(2)}
                            </span>
                        </td>
                        <td className={`side-td-${key}`}>
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