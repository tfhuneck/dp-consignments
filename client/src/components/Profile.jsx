import Element from "./DashElement";
import profile from '../images/New_Headshot.png'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../App';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Profile(props) {
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ userData, setUserData ]         = useState();
    const navigate                          = useNavigate();
    const serverUrl                         = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;

    useEffect(() => {
        async function fetchData(){
            await axios.get(serverUrl + '/user',
                {params:{
                        userAuth
                }})
                .then(async res => {
                    console.log(res.data);
                    let data = (res.data)
                    setUserData(data);
                })
                .catch(err => console.log(err));
        }
    fetchData();
    },[]);

    function listed(data) {
        let fixed = data.substring(0, 10);
        return fixed
    }

    const nav = (route) => navigate(route);

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
                                                <img className='profile-page-img' src={profile} />
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