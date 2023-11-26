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
                                <p className="heading">Consignment Rates
                                </p>
                                <table className='rates'>
                                    <tr>
                                        <th>
                                            Sale Price 
                                        </th>
                                        <th>
                                            Payout Rate
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            $5,000 +
                                        </td>
                                        <td>
                                            97 % of Sale &nbsp; – $300
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            $1,000 - $4,999
                                        </td>
                                        <td>
                                            88 % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; – &nbsp;&nbsp; 50¢
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            $25  - $999.99
                                        </td>
                                        <td>
                                            85 % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; – &nbsp;&nbsp; 50¢
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            $10 - $24.99
                                        </td>
                                        <td>
                                            80 % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; – &nbsp; 50¢
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            under $10 
                                        </td>
                                        <td>
                                            80 % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; – &nbsp; 75¢
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
                    <div className='col d-flex justify-content-center home-text'>
                        <h5 className='home-header'>
                            We are a brick and mortar hobby shop located in the heart of Sacramento. 
                            We are very experienced in listing and auctioning sports and trading cards 
                            effectively, to achieve high sale prices. If you are looking to move a large quantity of 
                            cards, we can not only save you the time and hassel of listing each card, but through our 
                            experience and reach, achieve better sale results. Our track record of over 40k cards sold and outstanding reviews speak for themself.
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
                        <div className="card info-cards">
                            <div className="card-header ">
                                Sign up 
                            </div>
                            <div className="card-body">
                                Make a profile in less than 1 minute.
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="card info-cards">
                            <div className="card-header ">
                                List you Products
                            </div>
                            <div className="card-body y">
                                Ship or brings us your products.
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="card info-cards">
                            <div className="card-header ">
                                Cashout
                            </div>
                            <div className="card-body ">
                                Watch your listings, and get paid.
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className='row'> 
                    <h3>
                        Ship To
                    </h3>
                </div>
                <br />
                <div className='row'> 
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
                    We allow absolutetly no bidding on your own listings, by you or any friends or associates. Any violations of this 
                    policy will result in a ban of all consignment services. 
                </div>
                <br />
                <div className='row'> 
                    <h4>
                        No Bid Listings
                    </h4>
                </div>
                <div className='row'> 
                    Any listings that ends with 0 bids, will be returned at your cost or is otherwise forfeited to the shop.....
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
                <div className='row'>
                    <div className='col d-flex justify-content-center '>
                        <a href="/register">
                            <Button className='info-btn' variant="danger">Register Now</Button>
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