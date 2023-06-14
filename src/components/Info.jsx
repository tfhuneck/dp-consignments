import Container from 'react-bootstrap/Container';

function Info() {

    return (
        <>
            <Container>
                <div className='row'>
                    <div className='col d-flex justify-content-center'> 
                        <div className="card">
                            <div className="content">
                                <p className="heading">Consignment Rates
                                </p><p className="para">
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
                                    </table>
                                </p>
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
                            We are a brick and mortar hobby shop located in the heart of Sacramento, 
                            and are very experienced in listing and auctioning sports and trading cards 
                            effectively, to achieve high sale prices. If you are looking to move a large quantity of 
                            cards, we can not only save you the time and hassel of listing each card, but through our 
                            experience and reach, achieve better sale results. Our track record of over 40k cards sold speaks for itself.
                        </h5>
                    </div>
                </div>
                <br /><br />
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
                <div className='row'> 
                    D&P Sports Cards
                </div>
                <div className='row'> 
                    5968 South Land Park Drive
                </div>
                <div className='row'> 
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
                    If your card sells between $10 and $24.99 we charge a 20% consignment fee plus 50¢ listing fee.
                </div>
                <br />
                <div className='row'> 
                    If your card sells between $25 and $999.99 we charge a 15% consignment fee plus 50¢ listing fee.
                </div>
                <br />
                <div className='row'> 
                    If your card sells between $1,000 and $4,999 we charge a 12% consignment fee plus 50¢ listing fee.
                </div>
                <br />
                <div className='row'> 
                    If your card sells for more than $5,000 we only charge you 3% plus $300 consignment fee. 
                </div>
                <br /><br />
                <div className='row'> 
                    <h3>
                        Consignment Rules
                    </h3>
                </div>
                <br />
                <div className='row'> 
                    tba
                </div>
                <div className='row'> 
                    tba
                </div>
                <div className='row'> 
                    tba
                </div>
                
            </Container>
        </>
    )
}

export default Info;