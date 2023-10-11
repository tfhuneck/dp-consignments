import Element from "./DashElement";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../App';
import axios from 'axios';
import listed from "./hooks/listed";

function Credit(props) {

    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ userData, setUserData ]         = useState();
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

    console.log(userData)

    const totalBalance = () =>{
        if (userData && userData.balance.length > 0) {
            return userData.balance.map(i => i.price).reduce((prev, next)=> (prev + next)).toFixed(2);
        }else{
            return 0
        }
       }

    const payout = (price) => {
        let result = ''

        if(price >= 5000){
            let deduction = price - 3000
            result = (deduction * 0.97).toFixed(2);
        }
        if(price >= 1000 && price <= 4999.99 ){
            let deduction = price - 0.5
            result = (deduction * 0.88).toFixed(2);
        }
        if(price >= 25 && price <= 999.999 ){
            let deduction = price - 0.5
            result = (deduction * 0.85).toFixed(2);
        }
        if(price >= 10 && price <= 24.999 ){
            let deduction = price - 0.5
            result = (deduction * 0.8).toFixed(2);
        } 
        if(price < 10 ){
            result = price.toFixed(2);
        }
        return result;
    }

    const totalPayout = () => {
        if(userData && userData.balance.length > 0){
            return userData.balance.map(i => Number(payout(i.price))).reduce((prev, next)=> (prev + next));
        } else {
            return 0
        }
    }

    return (
        <>
            <div className="user-dash">
                {/* <div className="row">
                    <div className="col">
                        <Element
                                class='dash-header' 
                                title='Consignments'
                                subtitle='Current Active Listings'
                                text={(
                                    <>
                                    <div className="dash-header-num">
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
                                        </div>
                                        </>
                                    )}
                                />
                    </div>
                </div> */}
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Total Balance'
                            subtitle='Available Balance'
                            body={(
                                <>
                                <div className="container">
                                    <div className="row">
                                        <div className='col justify-content-center'>
                                            <div className="card credit-box">
                                                <div className="card-header credit-header">
                                                    Current Balance
                                                </div>
                                                <div className="card-body credit-body">
                                                    $ {totalPayout()}
                                                </div>
                                            </div>
                                            <div className="card credit-box">
                                                <div className="card-header credit-header">
                                                    Total Payouts
                                                </div>
                                                <div className="card-body credit-body">
                                                    $ {totalPayout()}
                                                </div>
                                            </div>
                                            <div className="card credit-box">
                                                <div className="card-header credit-header">
                                                    Total Cashouts
                                                </div>
                                                <div className="card-body credit-body">
                                                    $ {totalBalance()}
                                                </div>
                                            </div>
                                            <div className="card credit-box">
                                                <div className="card-header credit-header">
                                                    Total Sold
                                                </div>
                                                <div className="card-body credit-body">
                                                    $ {totalBalance()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                                )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Consignments Payouts'
                            subtitle='Sale Price & Payout Breakdown'
                            body={(
                                <>
                                    <div className="card payout-box">
                                        <div className="card-body">
                                            { userData && userData.balance.map((i) => {
                                                return(
                                                    <>
                                                    <div className="container payout-elements">
                                                        <div className="row">
                                                            <div className="col payout-title">
                                                                {i.title}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col payout-title">
                                                                Date: 
                                                            </div>
                                                            <div className="col payout-title">
                                                                {listed(i.date)}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                Sales Price
                                                            </div>
                                                            <div className="col">
                                                                Payout 
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col payout-sale">
                                                                $ {i.price.toFixed(2)}
                                                            </div>
                                                            <div className="col payout-final">
                                                                $ {payout(i.price)}
                                                            </div>
                                                        </div>
                                                    </div>     
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Transaction History'
                            subtitle='Payout and Cashout transactions'
                            text={(
                                <>
                                    <div className="card payout-box">
                                        <div className="card-body">
                                            { userData && userData.balance.map((i) => {
                                                return(
                                                    <>
                                                        <div className="payout-elements">
                                                            $ {payout(i.price)}
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Credit;