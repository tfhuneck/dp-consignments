import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../App';
import Element from "./DashElement";
import axios from 'axios';
import {today} from './hooks/date'

function Cashout(props) {

    const serverUrl                         = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
    const date                              = today();
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ userData, setUserData ]         = useState();
    const [ type, setType ]                 = useState('break credit');
    const [ amount, setAmount ]             = useState(0);
    const [ comment, setComment ]           = useState(null);
    const [ valid, setValid ]               = useState(true);
    const [ pendingReq, setPendingReq ]     = useState();

    async function fetchData(){
        await axios.get(
            serverUrl +
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
    
    const fetchrequests = async() => {    
        await axios.get(
            serverUrl +
            '/request',
            {params:{
              userAuth  
        }})
        .then(res => {
            console.log(res.data);
            setPendingReq(res.data);
        })
        .catch(err => console.log(err));
    }

    const cancelRequest = async (requestId) => {
        axios.put(
            serverUrl +
            '/request',
            {params:{
                requestId
        }})
        .then(res => {
            console.log(res.data);
            fetchrequests();
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        if(userData && comment > userData.currentbalance){
            setValid(false);
        }else {setValid(true)};
    },[amount, setAmount]);

    useEffect(() => {
        fetchData();
    },[]);
    
    useEffect(() => {
        fetchrequests();
    },[userData]);

    const clearInputs = () => {
        const typeInput = document.getElementById('type');
        const amountInput = document.getElementById('amount');
        const commentInput = document.getElementById('comment');

        typeInput.value = 'break credit';
        setType('break credit');
        amountInput.value = null;
        setAmount(null);
        commentInput.value = null;
        setComment(null);
    }

    const submitRequest = async () => {

        axios.post(
            serverUrl + 
            '/request',
            {
                userData,
                amount,
                type,
                date,
                comment
            }
        )
        .then(res => {
            console.log(res.data);
            fetchrequests();
            clearInputs();
        })
        .catch(err => console.log(err));
    };

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
                                <div className="card request-box">
                                    <label htmlFor="type">Cashout Type</label>
                                    <div>
                                        <select type="form-select drop-form" name="type" id="type" className="form-select" onChange={(e) => setType(e.target.value)}>
                                            <option value={'break credit'}>Break Credit</option>
                                            <option value={'paypal'}>Paypal</option>
                                            <option value={'zelle'}>Zelle</option>
                                            <option value={'venmo'}>Venmo</option>
                                            <option value={'check'}>Check</option>
                                        </select>
                                    </div>
                                    <label htmlFor="amount">Cashout Amount</label>
                                    <div>
                                        <input type="number" name="amount" id="amount" placeholder="Enter Cashout Amount" className="form-control" onChange={(e) => setAmount(Number(e.target.value))} />
                                    </div>
                                    <label htmlFor="comment">Comment</label>
                                    <div>
                                        <input type="text" name="comment" id="comment" placeholder="Comment" className="form-control" onChange={(e) => setComment(e.target.value)} />
                                    </div>
                                    <div>
                                        <b>
                                            Current Balance: &nbsp; 
                                        </b>
                                        <span className="payout-final">
                                            $ {userData && userData.currentbalance}
                                        </span>
                                    </div>
                                    { valid == false &&
                                        <div className="error">
                                            error: Cashout cannot exceed Current Balance
                                        </div>
                                    }
                                    <div className="request-confirm">
                                        <b>
                                            Cashout Request
                                        </b>
                                        <div>
                                            Cashout Amount:  &nbsp; 
                                            <span className="payout-final">
                                                $ {Number(amount).toFixed(2)}
                                            </span>
                                        </div>
                                        <div>
                                            Cashout Type: &nbsp; 
                                            <span>
                                                <b>
                                                    {type}
                                                </b>
                                            </span>
                                        </div>
                                        <br />
                                        <button 
                                            className="btn-user-action"
                                            disabled={!valid}
                                            onClick={submitRequest}
                                        >
                                            Submit Request
                                        </button>
                                    </div>
                                </div>
                                </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Cashout History'
                            subtitle='Past Cashouts'
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
                                                                {i.comment && i.comment}
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
                    {pendingReq && pendingReq.length >= 1 &&
                        <div className="col">
                        <Element
                            class='dash-element' 
                            title='Cashout Requests'
                            subtitle='Pending Requests'
                            text={(
                                <>
                                 <div className="card payout-box">
                                        <div className="card-body">
                                            {  pendingReq.map((i) => {
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
                                                                    Amount:
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
                                                                {i.comment && i.comment}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col"> 
                                                                    <button className="btn btn-outline-danger"
                                                                        onClick={() => cancelRequest(i._id)}
                                                                    >
                                                                        Cancel
                                                                    </button>
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
                    }
                </div>
            </div>
        </>
    )
}

export default Cashout;