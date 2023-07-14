import Element from "./DashElement";
import Listings from './Activelistings';
import { useState, useEffect } from "react";

function UserDashboard(props) {

    const [ displayList, setDisplayList ]   = useState('activeListings');
    const activeListButton                  = document.getElementById('dash-list-active')
    const soldListButton                    = document.getElementById('dash-list-sold')
    
    props.funcNav('usr');

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    const today = month + " - " + day + " - " + year;

    const weekDay = () => {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = weekday[date.getDay()];
        // console.log(day);
        // console.log(hours);
        return day;
    };

    const greeting = () => {
        if(ampm === 'am') return 'Good Monring'
        if(ampm === 'pm' && hours < 17) return 'Good Afternoon'
        if(ampm === 'pm' && hours >= 17) return 'Good Evening'
    }

    const displayActive = () => {
        setDisplayList('activeListings');
    }
    const displaySold = () => {
        setDisplayList('soldListings')
    }

    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title={greeting()}
                            subtitle='Timothy'
                            text={(
                                <>
                                <div>
                                    <b>
                                        {weekDay()}
                                    </b>   
                                </div>
                                <div className='date'>
                                    {today}
                                </div>
                                </>
                                )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Consignments'
                            subtitle='Total Items Listed'
                            text={(
                                <>
                                <div className="dash-header-num">
                                    53
                                </div>
                                </>
                            )}
                            link={(
                                <>
                                    view more
                                </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Sold'
                            subtitle='Total Items Sold'
                            text={(
                                <>
                                <div className="dash-header-num">
                                    35
                                </div>
                                </>
                            )}
                            link={(
                                <>
                                    view more
                                </>
                            )}
                            to=''
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Credit'
                            subtitle='Balance'
                            text={(
                                <>
                                <div className="dash-header-num">
                                    $ 1,235.50
                                </div>
                                </>
                            )}
                            link={(
                                <>
                                    view more
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-main' 
                            title={(
                                <>
                                <button id="dash-list-active" className="dash-list btn-active" onClick={displayActive}>Active Listings</button>
                                <button id="dash-list-sold" className="dash-list" onClick={displaySold}>Sold Items</button>
                                </>
                            )}
                            text=''
                            body={
                                <Listings/>
                            }
                        /> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDashboard;