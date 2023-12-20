import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Info() {

    return (
        <>
            <Container>
                <div className='row'>
                    <div className='col d-flex justify-content-center'> 
                        <div className="card-info">
                            <div className="content">
                                <p className="heading">Consignment Rates</p>
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
                                <a href='#details'>
                                    <button className="btn">Read more</button>
                                </a>
                            </div>
                        </div>
                    </div> 
                </div>
            </Container>
            <Container className='details' id='details'>
                <div className='row'>
                    <div className='col d-flex justify-content-center home-text'>
                        <h2 className='home-header'>
                            Consignment Breakdown 
                        </h2>
                    </div>
                </div>
                <br /><br />
                <div className='row'>
                    <h4>
                        About us
                    </h4>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-start home-text'>
                        <h5 className='home-header info-header'>
                        We are a hobby shop located in Sacramento. 
                        We have many years of experience with ebay and consignments, specializing in trading cards and memorabilia. 
                        If you are looking to move parts or all of your collection, we can help you save time and maximize your return. With over 55k items sold and being Top Rated Seller (TRS), we are a well respected member of ebay. 
                        </h5>
                    </div>
                </div>
                <br /><br />
                <div className='row'> 
                    <h3>
                        Gettings Started
                    </h3>
                </div>
                <br />
                <div className='row'> 
                    <div className='col'>
                        <a href="/register">
                            <div className="card info-cards">
                                <div className="card-header ">
                                    Sign up 
                                </div>
                                <div className="card-body">
                                    Make a profile in less than 1 minute.
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col'>
                        <a href="/register">
                            <div className="card info-cards">
                                <div className="card-header ">
                                    List your Products
                                </div>
                                <div className="card-body y">
                                    Ship or brings us your products.
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className='col'>
                        <a href="/register"> 
                            <div className="card info-cards">
                                <div className="card-header ">
                                    Cashout
                                </div>
                                <div className="card-body ">
                                    Track your listings, and get paid.
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <br />
                <br />
                <div className='row'> 
                    <h4>
                        Ship To
                    </h4>
                </div>
                <br />
                <div className='col d-flex justify-content-start home-text'> 
                    You can bring your cards or ship them to us at our Hobby Shop in Sacramento.
                </div>
                <br />
                <div className='row justify-content-center'>
                    D&P Sports Cards
                </div>
                <div className='row justify-content-center'> 
                    5968 South Land Park Drive
                </div>
                <div className='row justify-content-center'> 
                    Sacramento, CA 95822
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
                <div className='row'>
                    <div className='col d-flex justify-content-center '>
                        <a href="/register">
                            <Button className='info-btn mobile-btn-info' variant="danger">Register Now</Button>
                        </a>
                    </div>
                </div>
                <br />
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                            <p>
                                <Link className='link' to={'/tos'}>Terms of Service</Link>
                            </p>
                        </div>

                    </div>
            </Container>
        </>
    )
}

export default Info;