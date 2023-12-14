import Element from "./DashElement";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../App';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Rules = () => {

    const navigate                      = useNavigate();
    const [ userAuth, setUserAuth ]     = useContext(AuthContext);
    const [ valid, setValid ]           = useState(false);
    const [ rules, setRules ]           = useState(false);
    const [ tos, setTos ]               = useState(false);
    const serverUrl                     = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;

    useEffect(() => {
        if(rules && tos) setValid(true)
        else setValid(false)
    }, [rules, tos])

    const handleContinue = async () => {
        axios.post(
            // serverUrl +
            '/acceptrules',
            {
                userAuth,
            }
        )
        .then(async res => {
            console.log(res.data);
            navigate('/usr')
        })
        .catch(err => console.log(err));
    }

    return (
        <>
         <div className="user-dash">
            <div className="row">
                <div className="col">
                    <Element
                        class='userinfo' 
                        title='D&P Consignments Info'
                        body={
                            <>
                            <br /><br /><br />
                            <div className="container">
                                <div className='row'>
                                    <div className='col d-flex justify-content-center home-text'>
                                        <h2>
                                            Welcome to D&P Consignments
                                        </h2>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className='row'>
                                    <div className='col d-flex justify-content-center home-text'>
                                        <h4>
                                            Here are the next steps to get started: 
                                        </h4>
                                    </div>
                                </div>
                                <br />
                                <div className='row'>
                                    <div className='col d-flex justify-content-center home-text'>
                                        <h6>
                                            1. &nbsp; Verify your login email address <br /><br />
                                            2. &nbsp; Read and agree to the Terms, Rules and TOS below <br /><br />
                                            3. &nbsp; Contact D&P Sports Cards, so we can connect your account to your Consignments <br /> <br />
                                            4. &nbsp; Send us, or drop off your cards that you want to be consigned <br /><br />
                                            5. &nbsp; View and manage your Listings and payout on your Dashboard
                                        </h6>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className='row'> 
                                    <div className='col d-flex justify-content-center home-text'>
                                        <h4>
                                            Contact us at:
                                        </h4>
                                    </div>
                                </div>
                                <br />
                                <div className='row'> 
                                    <div className='col d-flex justify-content-center home-text'>
                                        <h6>
                                            <a href="mailto:dandpconsignments@gmail.com"> dandpconsignments@gmail.com </a> <br /> <br />
                                        </h6>
                                    </div>
                                </div>
                                <div className='row'> 
                                    <div className='col d-flex justify-content-center home-text'>
                                        <h6>
                                           <a href="tel:916-391-8750"> +1 (916) 391-8750</a> 
                                        </h6>
                                    </div>
                                </div>
                                <br /><br />
                                <div className='row'> 
                                    <div className='col d-flex justify-content-center home-text'>
                                        <h4>
                                            Ship your cards to us:
                                        </h4>
                                    </div>
                                </div>
                                <br />
                                <div className='row'>
                                    <div className='col d-flex justify-content-center home-text'> 
                                        <h6>
                                            D&P Sports Cards
                                        </h6> 
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col d-flex justify-content-center home-text'> 
                                        <h6>
                                            5968 South Land Park Drive
                                        </h6> 
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col d-flex justify-content-center home-text'> 
                                        <h6>
                                            Sacramento, CA 95822
                                        </h6> 
                                    </div>
                                </div>

                                <br /><br />
                                <div className='row'> 
                                    <h3>Payout Breakdown</h3>
                                </div>
                                <br />
                                <div className='row'> 
                                    We offer an incremental Payout system based on the sale price of your card.
                                </div>
                                <br />
                                <div className='row'> 
                                    If your card sells under $10, we charge a 20% consignment fee plus 75¢ listing fee.
                                </div>
                                <br />
                                <div className='row'> 
                                    If your card sells between $10 and $24.99, we charge a 20% consignment fee plus 50¢ listing fee.
                                </div>
                                <br />
                                <div className='row'> 
                                    If your card sells between $25 and $999.99, we charge a 15% consignment fee plus 50¢ listing fee.
                                </div>
                                <br />
                                <div className='row'> 
                                    If your card sells between $1,000 and $4,999, we charge a 12% consignment fee plus 50¢ listing fee.
                                </div>
                                <br />
                                <div className='row'> 
                                    If your card sells for more than $5,000, we only charge you 3% plus $300 consignment fee. 
                                </div>
                                <br /><br /><br />
                                <div className='row'> 
                                    <h3>
                                        Consignment Rules
                                    </h3>
                                </div>
                                <br />
                                <div className='row'> 
                                    <h4>
                                        Bidding
                                    </h4>
                                </div>
                                <div className='row'> 
                                We value the integrity of our customers and the card community, 
                                therefore we will not condone in shill bidding of your own or anyone’s items. 
                                Anyone found doing so, will result in a Ban from consigning with us.  
                                </div>
                                <br />
                                <div className='row'> 
                                    <h4>
                                        No Bid Listings
                                    </h4>
                                </div>
                                <div className='row'> 
                                    Any listings that ends with 0 bids, will be released to D&P Sports Cards.
                                </div>
                                <br />
                                <div className='row'> 
                                    <h4>
                                        Payments
                                    </h4>
                                </div>
                                <div className='row'> 
                                    Any Listing that has concluded in a sale, requires a 2 week period for the sale to finalize and the payment from the buyer to be processed.
                                    Once the payment has been recieved and the card has been sent to the buyer succesfully, the payout balance will be available to you.
                                </div>
                                <br />
                                <div className='row'> 
                                    <h4>
                                        Canceled Sales
                                    </h4>
                                </div>
                                <div className='row'> 
                                    In case a listing has concluded in a sale, but the buyer cancels the sale or fails to pay for the item within the required timeframe, 
                                    the sale will count as unsold. In this case the item will be relisted for a second consignment.
                                </div>
                                <br /> <br />
                                    <div className='row'>
                                        <h4> 
                                            <Link to={'/tos'}  target="_blank">Terms of Service</Link>
                                        </h4>
                                    </div> 
                                    <div className="row">
                                        Please also read our Terms of Service before using this application.  
                                    </div>
                                </div>
                                <br />
                                <br />
                                <input type="checkbox" name="rules" id="rules" onChange={() => setRules(!rules)} />
                                <span className="agree">
                                    <label htmlFor="rules">
                                        I have read and aggree to the Rules of D&P Sports Cards Consignment Services
                                    </label>
                                </span>
                                <br />
                                <input type="checkbox" name="tos" id="tos" onChange={() => setTos(!tos)}/>
                                <span className="agree">
                                    <label htmlFor="tos">
                                        I have read and aggree to the Terms of Services 
                                    </label>
                                </span>
                                <br /><br />
                                <button className="btn-settings settings-submit" disabled={!valid} onClick={handleContinue}>Continue</button>
                            </>
                        }
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default Rules;