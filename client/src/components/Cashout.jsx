import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../App';
import Element from "./DashElement";
import axios from 'axios';
import listed from "./hooks/listed";
import payout from "./hooks/payout";

function Cashout(props) {

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

    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Cashout'
                            subtitle='Request Payment'
                            text={(
                                <>
                                <div>
                                    <b>
                                        
                                    </b>   
                                </div>
                                <div>
                                    
                                </div>
                                </>
                                )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Cashout History'
                            subtitle=''
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

export default Cashout;