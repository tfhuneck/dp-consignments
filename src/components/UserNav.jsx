import logo from '../images/logo.png'
import { NavLink, Link } from 'react-router-dom';

function UserNav() {

    return (
        <>
        <NavLink>
            <div className='card usr-nav container-fluid'>
                <div className='row d-flex '>
                    <div className='col d-flex justify-content-center'>
                        <img className='logo-nav' src={logo} />
                    </div>
                </div>
                <div className='card-body d-flex flex-column justify-content-evenly'>
                    <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/usr'>
                            <div className='col '>
                               HOME
                            </div>
                        </Link>
                    </div>
                    <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/credit'>
                            <div className='col '>
                                Redeem Credit
                            </div>
                        </Link>
                    </div>
                    <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/cashout'>
                            <div className='col '>
                                Cashout
                            </div>
                        </Link>
                    </div>
                    <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/message'>
                            <div className='col '>
                                Messages
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </NavLink>
        </>
    )
}

export default UserNav;