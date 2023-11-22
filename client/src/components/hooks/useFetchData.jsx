import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../App';
import axios from 'axios'

export const useFetchData = (url) => {

    const serverUrl                         = 'http://localhost:8080' || `${process.env.REACT_APP_production_url}`;
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ userData, setUserData ]         = useState();

    useEffect(() => {
        async function fetchData(){
            await axios.get(
                // serverUrl +
                url,
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