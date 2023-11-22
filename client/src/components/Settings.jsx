import Element from "./DashElement";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../App';
import avatar from '../images/avatar.png'
import Popup from './Popup';
import axios from 'axios';
import { useFetchData } from "./hooks/useFetchData";

function Settings(props) {
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);

    // Fetch User Data Hook
    const { userData }                      = useFetchData('/user');

    const serverUrl                         = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;

    const [modalIsOpen, setIsOpen]          = useState(false);
    
    function openModal() {
        setIsOpen(true);
        console.log('modal set to true')
      }

    const handleUpdate = async () => {
        const name      = document.getElementById('name');
        const email     = document.getElementById('email');
        const address   = document.getElementById('address');
        const phone     = document.getElementById('phone');

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
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="user-dash">
                <Element
                    class='dash-element' 
                    title='Settings'
                    subtitle='Change your Profile Settings'
                    body={(
                        <>
                            <form >
                                <div className="container settings">
                                        <img className='profile-settings-img' src={avatar} />
                                        <Popup 
                                            openModal={openModal}
                                            id={userAuth.userid}
                                        />
                                        {/* <div className="edit-avatar" onClick={openModal} >
                                                    edit
                                        </div> */}
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
                                    <div className="row">
                                        <button type="button" className="dash-list settings-submit" onClick={handleUpdate} >Update</button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                />
            </div>
        </>
    )
}

export default Settings;