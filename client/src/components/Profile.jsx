import Element from "./DashElement";
import profile from '../images/New_Headshot.png'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../App';
import axios from 'axios'


function Profile(props) {
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ userData, setUserData ]         = useState();
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
                                    <div className='col d-flex'>
                                         <img className='profile-page-img' src={profile} />
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