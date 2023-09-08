import Element from "./DashElement";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../App';
import avatar from '../images/avatar.png'
import Popup from './Popup';
import axios from 'axios'

function Settings(props) {
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ userData, setUserData ]         = useState();
    const serverUrl                         = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
    const [modalIsOpen, setIsOpen]          = useState(false);
    
    function openModal() {
        setIsOpen(true);
        console.log('modal set to true')
      }

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

    const handleUpdate = async () => {
        const name      = document.getElementById('name').value;
        const email     = document.getElementById('email').value;
        const address   = document.getElementById('address').value;
        const phone     = document.getElementById('phone').value;

        await axios.post(serverUrl + 'update/user', 
            {
                'name': name,
                'email': email,
                'address': address,
                'phone': phone,
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
                                        <Popup openModal={openModal}/>
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
                                        <button type="button" className="dash-list settings-submit" >Update</button>
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