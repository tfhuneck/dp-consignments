import Element from "./DashElement";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../App';
import axios from 'axios';
import listed from "./hooks/listed";
import payout from './hooks/payout'
import totalCashouts from "./hooks/totalCashouts";
import { useRules } from './hooks/useRules';

function Credit(props) {
    
    // Check for Rules agreement
    useRules();
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ userData, setUserData ]         = useState();
    const serverUrl                         = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
   

    useEffect(() => {
        async function fetchData(){
            await axios.get(
                // serverUrl +
                '/user',
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
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element credit-element' 
                            title='Total Balance'
                            subtitle='Available Balance'
                            body={(
                                <>
                                <div className="container">
                                    <div className="row">
                                        <div className='col justify-content-center'>
                                        <div className="card credit-box">
                                                <div className="card-header credit-header">
                                                    Sales Total Before Fees
                                                </div>
                                                <div className="card-body credit-body">
                                                    $ {totalBalance()}
                                                </div>
                                            </div>
                                            <div className="card credit-box">
                                                <div className="card-header credit-header">
                                                    Sales Total After Fees
                                                </div>
                                                <div className="card-body credit-body">
                                                    $ {totalPayout().toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="card credit-box">
                                                <div className="card-header credit-header">
                                                    Total Cashouts Withdrawn
                                                </div>
                                                <div className="card-body credit-body">
                                                    $ {totalCashouts(userData).toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="card credit-box">
                                                <div className="card-header credit-header">
                                                    Current Balance
                                                </div>
                                                <div className="card-body credit-body">
                                                    $ {userData && userData.currentbalance}
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
                            class='dash-element credit-element' 
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
                            class='dash-element credit-element' 
                            title='Cashouts'
                            subtitle='Cashout transactions'
                            text={(
                                <>  
                                    <div className="card payout-box">
                                        <div className="card-body">
                                            { userData && userData.cashouts.map((i) => {
                                                return(
                                                    <>
                                                        <div className="payout-elements">
                                                        <div className="row">
                                                            <div className="col">
                                                                Type:
                                                            </div>
                                                            <div className="col">
                                                                {i.type}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                Date: 
                                                            </div>
                                                            <div className="col">
                                                                {i.date}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                Amount
                                                            </div>
                                                            <div className="col payout-final">
                                                                $ {i.amount}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col payout-title">
                                                                {i.comment &&  'Comment:'}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col comment">
                                                               {i.comment}
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
                </div>
            </div>
        </>
    )
}

export default Credit;