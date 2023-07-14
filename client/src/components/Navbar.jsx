import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import home from '../images/home.png';
import info from '../images/check.png';
import user from '../images/user.png';
import mail from '../images/email.png';
import about from '../images/info.png';

function Navigation() {
    const [active, setActive] = useState('home')

    const Navbutton = ({to, id, image, name}) => {
        
        const clss = () => {
            const activeclss = (to === active) ? ' navactive' : '';
            return 'navbtn' + activeclss;
        }
        
        useEffect(() => {
            let url = window.location.pathname;
            console.log(url)
            if (url !== active) {
                setActive(url)
            }
        },[])

        const handleClick = (e) => {
            let select = e.target.id;
            setActive(select);
        }

        return (
            <Link to={to} >
                <Button variant="danger" className={clss()} id={id} onClick={handleClick}>
                    <img className='navimg' src={image}/>
                    &nbsp;
                    &nbsp;
                    {name}
                </Button>
            </Link>
        )
    }
    
    return (
        <>

                <Container className='navcontainer' >
                    <Navbar expand="md">
                        <Container>
                            <Navbutton 
                                to='/'
                                id='home'
                                image={home}
                                name='Home'
                            />
                            <Navbutton 
                                to='/info'
                                id='info'
                                image={info}
                                name='Info'
                            />
                            <Navbutton
                                to='/login'
                                id='login'
                                image={user}
                                name='Login'
                            />
                            <Navbutton 
                                to='/contact'
                                id='contact'
                                image={mail}
                                name='Contact'
                            />
                            <Navbutton 
                                to="/about"
                                id='about'
                                image={about}
                                name='About'
                            />
                        </Container>
                    </Navbar>
                </Container>    

        </> 
    )
}

export default Navigation;