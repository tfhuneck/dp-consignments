import Element from "./DashElement";
import Listings from './Activelistings';
import Sold from "./Soldlistings";
import Pending from './Pendinglistings'
import { today, greeting, weekDay} from './hooks/date';
import totalBalance from "./hooks/totalBalance";
import { useFetchData } from "./hooks/useFetchData";
import { useDisplayList } from "./hooks/useDisplayList";

function UserDashboard() {

    // Fetch User Data Hook
    const { userData } = useFetchData('/user');

    // Set Button active and display correct List hook
    const { displayList, setDisplayList } = useDisplayList();

    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title={greeting()}
                            subtitle={(
                                <>
                                    {userData ? userData.name : null}
                                </>
                            )}
                            text={(
                                <>
                                    <div>
                                        <b>
                                            {weekDay()}
                                        </b>   
                                    </div>
                                    <div className='date'>
                                        {today()}
                                    </div>
                                </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Consignments'
                            subtitle='Current Active Listings'
                            text={(
                                <>
                                    <div className="dash-header-num">
                                        {userData ? userData.activeitems.length : 0}
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
                                        {userData ? userData.solditems.length : 0}
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
                                        $ {userData ? userData.currentbalance : 0}
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
                                    <button id="dashListActive" className="dash-list" onClick={()=> setDisplayList('activeListings')}>Active Listings</button>
                                    <button id="dashListPending" className="dash-list" onClick={()=> setDisplayList('pendingListings')}>Pending</button>
                                    <button id="dashListSold" className="dash-list" onClick={()=> setDisplayList('soldListings')}>Sold Items</button>
                                </>
                            )}
                            text=''
                            body={
                                <>
                                    { displayList === 'activeListings' && <Listings/> }
                                    { displayList === 'pendingListings' && <Pending/>  }
                                    { displayList === 'soldListings' && <Sold/>  }
                                </>
                            }
                        /> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDashboard;