import Element from "./DashElement";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../App';
import avatar from '../images/avatar.png'
import Popup from './UploadAvatar';
import axios from 'axios';
import { useFetchData } from "./hooks/useFetchData";
import { getAuth } from "firebase/auth";
import authApp from '../config/firebase';
import PasswordChange from "./PasswordChange";
import UpdateLogin from "./UpdateLogin";
import DeleteUser from "./DeleteUser";
import { useRules } from './hooks/useRules';

function Settings(props) {
    
    // Check for Rules agreement
    useRules();

    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ profile, setProfile ]           = useState(avatar);

    const auth                              = getAuth(authApp);
    const user                              = auth.currentUser;
    const serverUrl                         = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;

    // Fetch User Data Hook
    const { userData }                      = useFetchData('/user');

    useEffect(() => {
            if(userData && userData.avatar != null){
                setProfile(userData.avatar)
            }
    }, [userData])

    const handleUpdate = async () => {
        const name      = document.getElementById('name');
        const email     = document.getElementById('email');
        const address   = document.getElementById('address');
        const phone     = document.getElementById('phone');
        const error     = document.getElementById('error');

        name.value = name.value === '' ? name.placeholder : name.value;
        email.value = email.value === '' ? email.placeholder : email.value;
        address.value = address.value === '' ? address.placeholder : address.value;
        phone.value = phone.value === '' ? phone.placeholder : phone.value;

        await axios.post(
            serverUrl + 
            '/update/user', 
            {
                'userid': userAuth.userid,
                'name': name.value,
                'email': email.value,
                'address': address.value,
                'phone': phone.value,
            })
            .then(async res => {
                console.log('User updated');
                error.innerHTML = 'success, contact info updated';
                window.location.reload(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="user-dash">
                <Element
                    class='dash-element settings-element' 
                    title='Settings'
                    subtitle='Change your Profile Settings'
                    body={(
                        <>
                            <div className="container settings">
                                <div className="row">
                                    <div className="col">
                                        <img className='profile-settings-img' src={profile} />
                                    </div>
                                    <div className="col update-buttons">
                                        <div>
                                            <Popup id={userAuth.userid}/>
                                        </div>
                                        <div>
                                            <UpdateLogin/>
                                            {/* <button type="button" className="btn-settings"> Update Login email </button> */}
                                        </div>
                                        <div>
                                            <PasswordChange/>
                                            {/* <button type="button" className="btn-settings"> Update Password </button> */}
                                        </div>
                                        <div>
                                            <DeleteUser/>
                                            {/* <button type="button" className="btn-delete"> Delet Account</button> */}
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <h6>Contact Information</h6>
                                </div>
                                <div className="settings-input">
                                    <div className="row">
                                        <div className="col settings-input">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder={userData ? userData.name : null} />
                                        </div>  
                                        <div className="col settings-input">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="email" placeholder={userData ? userData.email : null} />
                                        </div>  
                                    </div>
                                    <div className="row">
                                        <div className="col settings-input">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="address" placeholder={userData ? userData.address : null} />
                                        </div>  
                                        <div className="col settings-input">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <input type="phone" className="form-control" id="phone" placeholder={userData ? userData.phone : null} />
                                        </div>  
                                    </div>
                                    <div className='row d-flex justify-content-center' id='error'></div>
                                    <br />
                                    <div className="row">
                                        <div className="col">
                                            <button type="button" className="btn-settings" onClick={handleUpdate} >Update Contact Info</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                />
            </div>
        </>
    )
}

export default Settings;