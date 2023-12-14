import axios from 'axios';
import { useState, useEffect } from 'react';
import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import payout from './hooks/payout';
import listed from './hooks/listed';
import placeholder from '../images/placeholder.png'

const PendingTable = ({currentRecords}) => {

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
        const listingimg        = await document.getElementById(`listing-img-${id}`)

        if(expandBox.getAttribute('colspan')){
            box1.classList.remove('listing-show');
            box2.classList.remove('listing-show');
            box3.classList.remove('listing-show');
            box4.classList.remove('listing-show');
            box5.classList.remove('listing-show');
            box6.classList.remove('listing-show');
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
            expandBox.setAttribute('colspan', '5');
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
                box1.classList.add('listing-show');
                box2.classList.add('listing-show');
                box3.classList.add('listing-show');
                box4.classList.add('listing-show');
                box5.classList.add('listing-show');
                box6.classList.add('listing-show');
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
                                                    <div className='col-sm-6'>
                                                        <Element     
                                                            id={`listing-img-${key}`}
                                                            class='listing-img' 
                                                            body={(
                                                                <>
                                                                    <img src={data.imageurl ? data.imageurl : placeholder} className='product-img' />
                                                                </>
                                                            )}
                                                        />    
                                                    </div>
                                                    <div className='col'>
                                                        <div className='row'>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box1-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        View on
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                    <a href={data.itemurl} target="_blank"><img src={ebayLogo} style={{height:"1.5rem", width:"auto"}} /> </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box2-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Listed on
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {listed(data.starttime)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box3-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Sold on:
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {listed(data.endtime)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box4-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Status:
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {data.paymentstatus}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box5-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Total Price:
                                                                    </div>
                                                                    <div className="card-body listing-body num">
                                                                        $ {data.price.toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box" id={`box6-${key}`}>
                                                                    <div className="card-header listing-header">
                                                                        Total Payout:
                                                                    </div>
                                                                    <div className="card-body listing-body total">
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
}

export default PendingTable;