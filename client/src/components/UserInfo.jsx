import Element from "./DashElement";
import { Link } from "react-router-dom";
import logo from '../images/logo.png' 

const UserInfo = () => {

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
                                <div className="row">
                                    <img src={logo} className='logoinfo' />
                                </div>
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
                                    <h3>
                                        Consignment Rules
                                    </h3>
                                </div>
                                <br />
                                <div className='row'> 
                                    <h4>
                                        Payout Rates
                                    </h4>
                                </div>
                                <div className="row d-flex justify-content-center">
                                    <div className="col user-info-table">
                                    <table className='rates'>
                                        <tr>
                                            <th>
                                                Final Sale Price 
                                            </th>
                                            <th>
                                                Payout Rate
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>
                                                $10,000 +
                                            </td>
                                            <td>
                                                95 % 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                $5,000 - $9,999.99 &nbsp;&nbsp;
                                            </td>
                                            <td>
                                                92 % 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                $2,500  - $4,999.99
                                            </td>
                                            <td>
                                                90 % 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                $1,000 - $2,499.99 &nbsp;&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td>
                                                88 % 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                $500 - $999.99 
                                            </td>
                                            <td>
                                                87 % 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                $100 - $499.99 
                                            </td>
                                            <td>
                                                86 % 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                $50 - $99.99 
                                            </td>
                                            <td>
                                                85 % 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                under $50
                                            </td>
                                            <td>
                                                83 % &nbsp;&nbsp; – &nbsp;&nbsp; $0.99 
                                            </td>
                                        </tr>
                                    </table>
                                    </div>
                                </div>
                                <br /><br />
                                <div className='row'> 
                                    <h4>
                                        Bidding
                                    </h4>
                                </div>
                                <div className='col d-flex justify-content-start home-text'> 
                                    We value the integrity of our customers and the card community, 
                                    therefore we will not condone in shill bidding of your own or anyone’s items. 
                                    Anyone found doing so will result in a ban from consigning with us.  
                                </div>
                                <br />
                                <div className='row'> 
                                    <h4>
                                        Listings with no bids
                                    </h4>
                                </div>
                                <div className='col d-flex justify-content-start home-text'> 
                                    Any listing that end with 0 bids will not be returned.
                                </div>
                                <br />
                                <div className='row'> 
                                    <h4>
                                        Payments
                                    </h4>
                                </div>
                                <div className='col d-flex justify-content-start home-text'> 
                                    Any listing that has concluded in a sale will require a 1 week period from the time of buyer payment.
                                    Once the payment has been recieved and the card has been sent to the buyer succesfully, the payout balance will be available to you.
                                </div>
                                <br />
                                <div className='row'> 
                                    <h4>
                                        Canceled Sales
                                    </h4>
                                </div>
                                <div className='col d-flex justify-content-start home-text'> 
                                    If an item sells and the buyer fails to pay or decides to cancel, 
                                    we will treat it as a non-sale. We will relist the item within one week.
                                </div>
                                <br /> <br />
                                    <div className='row'>
                                        <h4> 
                                            <Link to={'/tos'}  target="_blank">Terms of Service</Link>
                                        </h4>
                                    </div> 
                                </div>   
                            </>
                        }
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default UserInfo;