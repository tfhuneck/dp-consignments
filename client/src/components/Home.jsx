import Container from 'react-bootstrap/Container';
import logo from '../images/logo.png'
import ebay from '../images/ebay-logo.png'
import x from '../images/x.png'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react';
import { AuthContext } from '../App';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Instagram } from '../images/instagram.svg';
import { ReactComponent as Facebook } from '../images/facebook.svg'
import { ReactComponent as Youtube } from '../images/youtube.svg'


function Home() {
    const [ userAuth, setUserAuth ] = useContext(AuthContext);
    const navigate  = useNavigate();
    
    if(userAuth){
        navigate('/usr')
    }else{
        return (
            <>
                <Container className='home'>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                             <h1 className='home-header'>D&P Sports Cards Consignments</h1>
                        </div>
                    </div>
                    <br /><br />
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                             <h4 className='home-header'>Tired of getting low offers at Shows?</h4> 
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                             <h5 className='home-header'>We make Selling Cards easy!</h5> 
                        </div>
                    </div>
                    <br /><br />
                    <div className='row'>
                        <div className='col d-flex justify-content-center'>
                            <img src={logo} className='logohome' />
                            <img src={x} className='x' />
                            <img src={ebay} className='ebay' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center '>
                            <a href="/info">
                                <Button className='info-btn' variant="danger">Find out how it works</Button>
                            </a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                            D&P Sports Cards
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                            5968 South Land Park Drive
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                            Sacramento, CA 95822
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                            <a className='link' href="https://dandpsportscards.com/" target="_blank">dandpsportscards.com</a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                            <a className='link' href="https://www.ebay.com/str/dphobbyshop" target="_blank">ebay.com/str/dphobbyshop</a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                            <a className='link' href="tel:916-391-8750">916-391-8750</a>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex justify-content-center home-text'>
                            <a className='link' href="https://www.instagram.com/dandpsportscards/" target="_blank">
                               <Instagram className='socials' />
                            </a>
                            <a className='link' href="https://www.facebook.com/dandpcards/" target="_blank">
                               <Facebook className='socials'/>
                            </a>
                            <a className='link' href="https://www.youtube.com/channel/UCncAlcBPo_DijZvtnPu0tiA" target="_blank">
                                <Youtube className='socials' />
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

}

export default Home;