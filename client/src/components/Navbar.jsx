import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import home from '../images/home.png';
import info from '../images/check.png';
import user from '../images/user.png';
import mail from '../images/email.png';
import about from '../images/info.png';

function Navigation() {
    const [active, setActive]   = useState('home')
    const [ expand, setExpand ] = useState(false);
    const { pathname }          = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const container = document.getElementById('mobile-nav-container');
        const mNavbar = document.getElementById('mobile-navbar');
        
        if(expand){ 
            container.classList.remove('mobile-nav-default');
            container.classList.add('mobile-nav-active');
            mNavbar.classList.add('mobile-navbar-expand');
            mNavbar.classList.remove('mobile-navbar-fold');
        }; 
        if(!expand){
            container.classList.add('mobile-nav-default');
            container.classList.remove('mobile-nav-active');
            mNavbar.classList.remove('mobile-navbar-expand');
            mNavbar.classList.add('mobile-navbar-fold');
        };

    }, [expand, setExpand])


        var burger = document.getElementById('mobile-nav')
        var lastScroll = 0;
        window.onscroll = function() {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
            if (currentScroll - lastScroll >= 200 && !expand){
                lastScroll = currentScroll;
                setTimeout(() => {
                    // burger.style.position = 'absolute';
                    burger.classList.add('mobile-nav-slide');
                },500)
            }if(currentScroll - lastScroll < 0) {
                lastScroll = currentScroll;
                setTimeout(() => {
                    burger.classList.remove('mobile-nav-slide');
                },100)
            }
        };
        



    const Navbutton = ({to, id, image, name}) => {
       
        // ===== storing active state of navbar buttons =====

        const clss = () => {
            const activeclss = (to === active) ? ' navactive' : '';
            return 'navbtn' + activeclss;
        }
        
        useEffect(() => {
            let url = window.location.pathname;
            // console.log(url)
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
            <div className='mobile-nav' id='mobile-nav'>
                <div className="mobile-nav-center">
                    <div id='mobile-nav-container' onClick={() => setExpand(!expand)} className='mobile-nav-default'>
                        <div className='line-1'></div>
                        <div className='line-2'></div>
                        <div className='line-3'></div>
                    </div>
                </div>
            </div>
            <div className='mobile-navbar container' id='mobile-navbar'>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link' id='mobile-navbar-link-1' to='/' onClick={() => setExpand(!expand)}>
                            <img src={home} className='mobile-navbar-icn' />
                            Home
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link' id='mobile-navbar-link-2' to='/info' onClick={() => setExpand(!expand)}>
                            <img src={info} className='mobile-navbar-icn' />
                            Info
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link' id='mobile-navbar-link-3' to='/login' onClick={() => setExpand(!expand)}>
                            <img src={user} className='mobile-navbar-icn' />
                            Login
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link' id='mobile-navbar-link-4' to='/contact' onClick={() => setExpand(!expand)} >
                            <img src={mail} className='mobile-navbar-icn' />
                            Contact
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link' id='mobile-navbar-link-5' to='/about' onClick={() => setExpand(!expand)}>
                            <img src={about} className='mobile-navbar-icn' />
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Navigation;