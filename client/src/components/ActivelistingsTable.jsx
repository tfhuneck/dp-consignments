import Element from "./DashElement";
import ebayLogo from '../images/ebay-logo.png';
import listed from './hooks/listed';
import time from './hooks/time'

const Table = ({currentRecords}) => {

    // async function getImages(url) {
    //     await axios.post(serverUrl + '/getimage', {
    //       imageUrl: url
    //     })
    //     .then(function(res) {
    //         console.log(res)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //       });
    // }

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
                                                                    <img src='https://i.ebayimg.com/images/g/6-IAAOSwOolkrJ8b/s-l1600.jpg' className='product-img' />
                                                                    {/* <img src={getImages(data.ListingDetails.ViewItemURL._text)} className='product-img' /> */}
                                                                </>
                                                            )}
                                                        />    
                                                    </div>
                                                    <div className='col'>
                                                        <div className='row'>
                                                            <div className='col d-flex justify-content-center'>
                                                                {/* <Element
                                                                    class='listing-details' 
                                                                title= {<a href={data.itemurl} target="_blank">View in  <img src={ebayLogo} style={{height:"1.2rem", width:"auto"}} /> </a>}
                                                                />     */}
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
                                                                {/* <Element
                                                                    class='listing-details' 
                                                                    title='Listed on:'
                                                                    subtitle={( 
                                                                        <>
                                                                            {listed(data.starttime)}
                                                                        </> 
                                                                    )}
                                                                /> */}
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
                                                                {/* <Element
                                                                    class='listing-details' 
                                                                    title='Bids:'
                                                                    subtitle={( 
                                                                            <>
                                                                                {data.bidcount}
                                                                            </>
                                                                        )}
                                                                /> */}
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Bids
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {data.bidcount}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                {/* <Element
                                                                    class='listing-details' 
                                                                    title='Watching:'
                                                                    subtitle={(  
                                                                        <>
                                                                            {data.watchcount}
                                                                        </> 
                                                                        )}
                                                                /> */}
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Watching:
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {data.watchcount}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                {/* <Element
                                                                    class='listing-details' 
                                                                    title='Time Left:'
                                                                    subtitle={( 
                                                                            <>
                                                                                <span className='time-left'>
                                                                                    {time(data.timeleft)}
                                                                                </span>
                                                                            </>
                                                                    )}
                                                                /> */}
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Time Left
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        {time(data.timeleft)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col d-flex justify-content-center'>
                                                                {/* <Element
                                                                    class='listing-details'
                                                                    title='Current Price:' 
                                                                    subtitle={( 
                                                                        <>
                                                                            <span className='price'>
                                                                                ${data.currentprice}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                /> */}
                                                                <div className="card listing-box">
                                                                    <div className="card-header listing-header">
                                                                        Current Price:
                                                                    </div>
                                                                    <div className="card-body listing-body">
                                                                        $ {data.currentprice}
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
                        <td>
                            <span className='time-left'>
                                {time(data.timeleft)}
                            </span>
                        </td>
                        <td>
                            <span className='price'>
                                $ {data.currentprice}
                            </span>
                        </td>
                    </tr>
                )
            })} 
        </>
    )
}

export default Table;