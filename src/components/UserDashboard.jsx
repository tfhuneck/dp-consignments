import { Link } from 'react-router-dom';
import Element from "./DashElement";
import UserPanel from "./UserPanel";

function UserDashboard(props) {
    
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
        console.log(day);
        return day;
    };

    const greeting = () => {
        if(ampm === 'am') return 'Good Monring'
        if(ampm === 'pm') return 'Good Evening'
    }

   


    return (
        <>
            <div className="fixed-top">
                <UserPanel/>
            </div>
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
                                <div>
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
                            title='CONSIGNMENTS'
                            text='See your current Listings'
                            body={
                                <table className='table table-dark table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Listing</th>
                                            <th scope='col'>Time</th>
                                            <th scope='col'>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                        <tr>
                                            <td>Example</td>
                                            <td>Example</td>
                                            <td>Example</td>
                                        </tr>
                                    </tbody>
                                </table>
                            }
                        /> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDashboard;