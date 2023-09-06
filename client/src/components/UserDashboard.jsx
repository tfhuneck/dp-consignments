import Element from "./DashElement";
import Listings from './Activelistings';
import Sold from "./Soldlistings";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../App';
import axios from 'axios'


function UserDashboard() {

    const [ displayList, setDisplayList ]   = useState('');
    const activeListButton                  = document.getElementById('dashListActive');
    const soldListButton                    = document.getElementById('dashListSold');
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ userData, setUserData ]         = useState();
    var date                                = new Date();
    var year                                = date.getFullYear();
    var month                               = date.getMonth()+1;
    var day                                 = date.getDate();
    var hours                               = date.getHours();
    var ampm                                = hours >= 12 ? 'pm' : 'am';
    const today                             = month + " - " + day + " - " + year;
    const serverUrl                         = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;

    useEffect(() => {
        async function fetchData(){
            await axios.get(serverUrl + '/user',
                {params:{
                        userAuth
                }})
                .then(async res => {
                    console.log(res.data);
                    let data = (res.data)
                    setUserData(data);
                })
                .catch(err => console.log(err));
        }
    fetchData();
    },[]);

    const weekDay = () => {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = weekday[date.getDay()];
        // console.log(day);
        // console.log(hours);
        return day;
    };

    const greeting = () => {
        if(ampm === 'am') return 'Good Morning'
        if(ampm === 'pm' && hours < 17) return 'Good Afternoon'
        if(ampm === 'pm' && hours >= 17) return 'Good Evening'
    }

    useEffect(()=> {
        setDisplayList('activeListings')
    }, [])

    useEffect(()=> {
        if(activeListButton && soldListButton){
            if(displayList === 'activeListings'){
                activeListButton.className = 'dash-list btn-active';
                soldListButton.className = 'dash-list';
            }
            if(displayList === 'soldListings'){
                activeListButton.className = 'dash-list';
                soldListButton.className = 'dash-list btn-active';
            } 
        };
        console.log('buttons updated and active button is:', displayList)
    },[displayList, activeListButton, soldListButton]);

   const totalBalance = () =>{
    if (userData) {
        return userData.balance.map(i => i.price).reduce((prev, next)=> Math.round((prev + next)* 1e12)/ 1e12);
    }else{
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
                                    $ {totalBalance()}
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
                                <button id="dashListPending" className="dash-list" onClick={()=> setDisplayList('soldListings')}>Pending</button>
                                <button id="dashListSold" className="dash-list" onClick={()=> setDisplayList('soldListings')}>Sold Items</button>
                                </>
                            )}
                            text=''
                            body={
                                <>
                                    { displayList === 'activeListings' && <Listings/> }
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