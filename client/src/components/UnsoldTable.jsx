import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import payout from './hooks/payout';
import listed from './hooks/listed';
import placeholder from '../images/placeholder.png'

const UnsoldTable = ({currentRecords}) => {

    const handleCollapse = async (id) => {
       
        const expandBox = await document.getElementById(`main-td-${id}`);
        const sideTds = await document.getElementsByClassName(`side-td-${id}`);

            if(expandBox.getAttribute('colspan')){
                setTimeout(() => {
                    expandBox.removeAttribute('colspan')   
                    try {
                        for (var i in sideTds) {
                              sideTds[i].classList.remove('td-hidden');
                          }
                    } catch(err){
                        console.log(err)
                    }
                }, 300)
                
            } else{
                // setTimeout(() =>, 300)
                expandBox.setAttribute('colspan', '5')
                try {
                    for (var i in sideTds) {
                          sideTds[i].classList.add('td-hidden');
                      }
                } catch(err){
                    console.log(err)
                }
            }
    }

    return (
        <>
            {currentRecords.map((data, key) => {
                return(
                    <tr key={key}>
                        <td id={`main-td-${key}`}>
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
                                                            class='listing-img' 
                                                            body={(
                                                                <>
                                                                    <img src={placeholder} className='product-img' />
                                                                </>
                                                            )}
                                                        />    
                                                    </div>
                                                    <div className='col'>
                                                        <div className='row'>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        View on
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                    <a href={data.itemurl} target="_blank"><img src={ebayLogo} style={{height:"1.5rem", width:"auto"}} /> </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Listed on
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {listed(data.starttime)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Ended on:
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {listed(data.endtime)}
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
                    </tr>
                )
            })} 
        </>
    )
};

export default UnsoldTable;