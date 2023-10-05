import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../App';
import axios from 'axios';

export const useFetchUserDataSold = () => {

    const [ userAuth, setUserAuth ]             = useContext(AuthContext);
    const serverUrl                             = 'http://localhost:8080'
    const [ userData, setUserData ]             = useState();
    
    useEffect(() => {
        async function fetchData(){
            await axios.get(serverUrl + '/user/sold',
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

    return {userData}
}