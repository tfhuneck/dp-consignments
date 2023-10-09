import Element from "./DashElement";
import { useNavigate } from 'react-router-dom';
import { useFetchData } from "./hooks/useFetchData";
import avatar from '../images/avatar.png'
import listed from "./hooks/listed";


function Profile(props) {

    // Fetch User Data Hook
    const { userData }  = useFetchData('/user');

    // Custom navigation hooks
    const navigate      = useNavigate();
    const nav           = (route) => navigate(route);

    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='dash-element' 
                            title='Profile'
                            subtitle=''
                            body={(
                                <>
                                    <br /><br />
                                    <div className="container profile-info-container">
                                        <div className="row">
                                            <div className="col">
                                                <img className='profile-page-img' src={avatar} />
                                                <div className="profile-name">
                                                    {userData ? userData.name : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-evenly">
                                            <button className="col profile-info" onClick={() => nav('/usr/settings')} >
                                                Email Address: &nbsp; &nbsp;
                                                {userData ? userData.email : null}
                                            </button>
                                            <button className="col profile-info" onClick={() => nav('/usr')} >
                                                Current Active Listings: &nbsp; &nbsp;
                                                {userData ? userData.activeitems.length : null}
                                            </button>
                                        </div>
                                        <div className="row d-flex justify-content-evenly">
                                            <button className="col profile-info" onClick={() => nav('/usr/settings')} >
                                                Phone Number: &nbsp; &nbsp;
                                                {userData ? userData.phone : null}
                                            </button>
                                            <button className="col profile-info" onClick={() => nav('/usr/')} >
                                                Number of Sold Items: &nbsp; &nbsp;
                                                {userData ? userData.solditems.length : null}
                                            </button>
                                        </div>
                                        <div className="row d-flex justify-content-evenly">
                                            <button className="col profile-info" onClick={() => nav('/usr/settings')} >
                                                Address: &nbsp; &nbsp;
                                                {userData ? userData.address : null}
                                            </button>
                                            <button className="col profile-info"  >
                                                Account created on: &nbsp; &nbsp;
                                                {userData ? listed(userData.createdAt) : null}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;