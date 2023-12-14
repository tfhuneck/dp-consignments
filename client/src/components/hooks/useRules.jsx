import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "./useFetchData";

export const useRules = () => {

    // Fetch User Data Hook
    const { userData } = useFetchData('/user');
    const navigate = useNavigate();

    useEffect(() => {
        if(userData && !userData.rules) navigate('/usr/rules');
    }, [userData])
}