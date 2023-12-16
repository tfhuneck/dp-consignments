import Element from "./DashElement";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFetchData } from "./hooks/useFetchData";
import avatar from '../images/avatar.png'
import listed from "./hooks/listed";
import totalCashouts from "./hooks/totalCashouts";
import { useRules } from './hooks/useRules';

function Profile(props) {
    
    // Check for Rules agreement
    useRules();

    // Fetch User Data Hook
    const { userData }              = useFetchData('/user');
    const [ profile, setProfile ]   = useState(avatar);

    // Custom navigation hooks
    const navigate                  = useNavigate();
    const nav                       = (route) => navigate(route);

    useEffect(() => {
        if(userData && userData.avatar != null){
            setProfile(userData.avatar)
        }
}, [userData])

    return (
        <>
            <div className="user-dash">
                <div className="row">
                    <div className="col">
                        <Element
                            class='profile-element' 
                            title='Profile'
                            subtitle=''
                            body={(
                                <>
                                    <div className="container profile-info-container">
                                        <div className="row">
                                            <div className="col">
                                                <img className='profile-page-img' src={profile} />
                                                <div className="profile-name">
                                                    {userData ? userData.name : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-info-box">
                                            <div className="row">
                                                <div className="col">
                                                    <h6>
                                                        Contact Info
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Email Address: <br /> 
                                                    {userData ? userData.email : null}
                                                </div>
                                                <div className="col profile-info">
                                                    Phone Number: <br /> 
                                                    {userData ? userData.phone : null}
                                                </div>
                                                <div className="col profile-info">
                                                    Address: <br /> 
                                                    {userData ? userData.address : null}
                                                </div>
                                                <div className="col profile-info">
                                                    Accounted created on: <br />
                                                    {userData ? listed(userData.createdAt) : null}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col">
                                                    <h6>
                                                        Consignments
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                            <div className="col profile-info">
                                                    Active Listings: &nbsp; 
                                                    {userData ? userData.activeitems.length : null}
                                                </div> 
                                                <div className="col profile-info">
                                                    Pending Items: &nbsp; 
                                                    {userData ? userData.pendingitems.length : null}
                                                </div>
                                                <div className="col profile-info">
                                                    Sold Items: &nbsp; 
                                                    {userData ? userData.solditems.length : null}
                                                </div>
                                                <div className="col profile-info">
                                                    Unsold Items: &nbsp; 
                                                    {userData ? userData.unsolditems.length : null}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col">
                                                    <h6>
                                                        Balance
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Current Balance: &nbsp; 
                                                    {userData ? '$ '+ userData.currentbalance : null}
                                                </div>
                                                <div className="col profile-info">
                                                    Cashouts: &nbsp; 
                                                    {userData ? userData.cashouts.length : null}
                                                </div>
                                                <div className="col profile-info">
                                                    Cashouts Total:  &nbsp; 
                                                    {userData ? '$ '+ totalCashouts(userData).toFixed(2) : null}
                                                </div>
                                                <div className="col">

                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-info-box-mobile">
                                            <div className="row">
                                                <div className="col">
                                                    <h6>
                                                        Contact Info
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Email Address: <br /> 
                                                    {userData ? userData.email : null}
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Phone Number: <br /> 
                                                    {userData ? userData.phone : null}
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Address: <br /> 
                                                    {userData ? userData.address : null}
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Accounted created on: <br />
                                                    {userData ? listed(userData.createdAt) : null}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col">
                                                    <h6>
                                                        Consignments
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                            <div className="col profile-info">
                                                    Active Listings: &nbsp; 
                                                    {userData ? userData.activeitems.length : null}
                                                </div> 
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Pending Items: &nbsp; 
                                                    {userData ? userData.pendingitems.length : null}
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Sold Items: &nbsp; 
                                                    {userData ? userData.solditems.length : null}
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Unsold Items: &nbsp; 
                                                    {userData ? userData.unsolditems.length : null}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col">
                                                    <h6>
                                                        Balance
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Current Balance: &nbsp; 
                                                    {userData ? '$ '+ userData.currentbalance : null}
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Cashouts: &nbsp; 
                                                    {userData ? userData.cashouts.length : null}
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-evenly">
                                                <div className="col profile-info">
                                                    Cashouts Total:  &nbsp; 
                                                    {userData ? '$ '+ totalCashouts(userData).toFixed(2) : null}
                                                </div>
                                            </div>
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