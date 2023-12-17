import Element from "./DashElement";
import Listings from './Activelistings';
import Sold from "./Soldlistings";
import Pending from './Pendinglistings'
import Unsold from "./Unsoldlistings";
import totalBalance from "./hooks/totalBalance";
import { useFetchData } from "./hooks/useFetchData";
import { useActiveTotal } from './hooks/useActiveTotal'
import { usePendingTotal } from "./hooks/usePendingTotal";

import { useDisplayList } from "./hooks/useDisplayList";
import { useRules } from './hooks/useRules';

function UserDashboard() {

    // Check for Rules agreement
    useRules();

    // Fetch User Data Hook
    const { userData } = useFetchData('/user');

    // Fetch Active totals Payouts
    const { activeTotal } = useActiveTotal();

    // Fetch Pending totals Payouts
    const { pendingTotal } = usePendingTotal();

    // Set Button active and display correct List hook
    const { displayList, setDisplayList } = useDisplayList();

    const totalSold = () => {
        if(userData && userData.balance.length > 0){
            return userData.balance.map(i => i.payout).reduce((prev, next)=> (prev + next)).toFixed(2);
        } else {
            return 0
        }
    }

    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Active'
                            subtitle='Consignments'
                            text={(
                                <>
                                    <div className="dash-header-content container">
                                        <div className="row">
                                            <div className="col dash-header-txt">
                                                Listings:
                                            </div> 
                                            <div className=" col dash-header-num num ">
                                                &nbsp;
                                                {userData ? userData.activeitems.length : 0} 
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col dash-header-txt">
                                               Payout:
                                            </div> 
                                            <div className="col dash-header-num total">
                                                {activeTotal ? `$${activeTotal}` : `$ 0.00`}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Pending'
                            subtitle='Sold Consignments'
                            text={(
                                <>
                                <div className="dash-header-content container">
                                    <div className="row">
                                        <div className="col dash-header-txt">
                                            Listings:
                                        </div> 
                                        <div className=" col dash-header-num num ">
                                            &nbsp;
                                            {userData ? userData.pendingitems.length : 0} 
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col dash-header-txt">
                                            Payout:
                                        </div> 
                                        <div className="col dash-header-num total">
                                            {pendingTotal ? `$${pendingTotal}` : `$ 0.00`}
                                        </div>
                                    </div>
                                </div>
                            </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Completed'
                            subtitle='Sold Consignments'
                            text={(
                                <>
                                    <div className="dash-header-content container">
                                        <div className="row">
                                            <div className="col dash-header-txt">
                                                Listings:
                                            </div> 
                                            <div className=" col dash-header-num num ">
                                                &nbsp;
                                                {userData ? userData.solditems.length : 0}
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col dash-header-txt">
                                               Payout:
                                            </div> 
                                            <div className="col dash-header-num total">
                                                {totalSold ? `$${totalSold()}` : `$ 0.00`}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-header' 
                            title='Wallet'
                            subtitle='Account Balance'
                            text={(
                                <>
                                 <div className="dash-header-content">
                                        <div className="total-balance">
                                        $ {userData ? userData.currentbalance.toFixed(2) : 0}
                                        </div>
                                    </div>
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
                                    <div className="list-buttons">
                                        <button id="dashListActive" className="dash-list" onClick={()=> setDisplayList('activeListings')}>Active</button>
                                        <button id="dashListPending" className="dash-list" onClick={()=> setDisplayList('pendingListings')}>Pending</button>
                                        <button id="dashListSold" className="dash-list" onClick={()=> setDisplayList('soldListings')}>Completed</button>
                                        <button id="dashListUnsold" className="dash-list" onClick={()=> setDisplayList('unsoldListings')}>Unsold</button>
                                    </div>
                                </>
                            )}
                            text=''
                            body={
                                <>
                                    { displayList === 'activeListings' && <Listings/> }
                                    { displayList === 'pendingListings' && <Pending/>  }
                                    { displayList === 'soldListings' && <Sold/>  }
                                    { displayList === 'unsoldListings' && <Unsold/>  }
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