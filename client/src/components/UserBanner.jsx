import avatar from '../images/avatar.png'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import authApp from '../config/firebase';
import { getAuth, signOut } from "firebase/auth";
import { useFetchData } from './hooks/useFetchData';
import logo from '../images/logo.png'


const UserBanner = () => {

    // Fetch User Data Hook
    const { userData }                      = useFetchData('/getuser');

    const navigate                          = useNavigate();
    const auth                              = getAuth(authApp);
    const [ userAuth, setUserAuth ]         = useContext(AuthContext);
    const [ profile, setProfile ]           = useState(avatar);
    const [ expand, setExpand ]             = useState(false);

    useEffect(() => {
        if(userData && userData.avatar != null){
            setProfile(userData.avatar)
        }
    }, [userData]);

    useEffect(() => {
        const btn = document.getElementById('userbanner-btn');
        const nav = document.getElementById('userbanner-nav');
        const navbehind = document.getElementById('userbanner-nav-behind');
        const links = document.getElementById('userbanner-links')

        if(expand){
            btn.classList.add('user-banner-btn-expand');
            nav.classList.add('userbanner-nav-expand');
            nav.classList.remove('userbanner-nav-collapse');
            navbehind.classList.add('userbanner-nav-expand');
            navbehind.classList.remove('userbanner-nav-collapse');
            links.classList.add('userbanner-links-show');
           
        }else{
            nav.classList.add('userbanner-nav-collapse');
            navbehind.classList.add('userbanner-nav-collapse');
            btn.classList.remove('user-banner-btn-expand');
            links.classList.remove('userbanner-links-show');
            setTimeout(() => {
                nav.classList.remove('userbanner-nav-expand');
                navbehind.classList.remove('userbanner-nav-expand');
            }, 500)
        }
    }, [expand, setExpand])

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUserAuth(null);
            navigate('/');
        }).catch((error) => {
        // An error happened.
        });
    }

    return (
        <>
            <div className='mobile-banner'>
                <img src={logo} className='mobile-banner-logo'/>
            </div>
            <div className='userbanner'>
                <div className='userbanner-nav-behind' id='userbanner-nav-behind'/>
                <div className='userbanner-nav' id='userbanner-nav'  onClick={() => setExpand(!expand)}>
                    <div className='row userbanner-links' id='userbanner-links'>
                        <div className='col-2'>
                            <Link className='user-nav-link' to='/usr/profile'>
                                <svg 
                                    className='user-nav-icn'
                                    stroke="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    version="1.1" 
                                    x="0px" 
                                    y="0px" 
                                    viewBox="0 0 54.691 68.36375000000001" 
                                >
                                    <path
                                        fill="currentColor" 
                                        d="M-4318.56-68.404c-43.25,0-78.438,35.186-78.438,78.435c0,43.252,35.188,78.439,78.438,78.439s78.436-35.188,78.436-78.439   C-4240.124-33.218-4275.31-68.404-4318.56-68.404z M-4318.867-35.187c13.682,0,24.771,11.092,24.771,24.771   c0,13.681-11.092,24.771-24.771,24.771c-13.683,0-24.771-11.092-24.771-24.771C-4343.639-24.095-4332.55-35.187-4318.867-35.187z    M-4274.686,65.074c-12.042,9.627-27.292,15.396-43.874,15.396c-16.562,0-31.797-5.75-43.834-15.354   c1.116-19.851,14.187-39.903,30.178-39.903h27.332c16.024,0,29.128,19.324,30.197,39.206c0.001,0.002,0.001,0.004,0.001,0.006   C-4274.686,64.427-4274.686,64.786-4274.686,65.074z"
                                    />
                                    <circle 
                                        fill="currentColor" 
                                        cx="27.443" 
                                        cy="21.101" 
                                        r="7.807"
                                    />
                                    <path 
                                        fill="currentColor"
                                        d="M27.345,2.659c-13.612,0-24.687,11.074-24.687,24.686c0,13.613,11.074,24.688,24.687,24.688   s24.687-11.074,24.687-24.688C52.032,13.733,40.958,2.659,27.345,2.659z M40.915,44.937c-0.269-6.156-4.318-12.13-9.278-12.13   h-8.387c-5,0-9.074,6.071-9.283,12.279c-5.373-4.062-8.853-10.502-8.853-17.742c0-12.258,9.974-22.23,22.231-22.23   c12.259,0,22.231,9.973,22.231,22.23C49.577,34.498,46.178,40.867,40.915,44.937z"
                                    />
                                </svg>  
                            </Link>
                        
                        </div>
                        <div className='col-2'>
                            <Link className='user-nav-link' to='/usr/settings'>
                                <svg 
                                    className='user-nav-icn'
                                    stroke="none"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 30" 
                                    x="0px" 
                                    y="0px"
                                >  
                                    <path 
                                        fill='currentColor'
                                        d="M21.39063,8.85889l-.47217-.12207c-.09131-.25049-.1919-.49561-.31836-.76563l.26025-.39014a2.00413,2.00413,0,0,0-.24853-2.52539L18.94434,3.38818a2.003,2.003,0,0,0-2.52491-.249l-.41894.24609c-.24072-.11181-.48731-.21337-.76709-.3125l-.09277-.46337A2.005,2.005,0,0,0,13.1792,1H10.8208A2.00587,2.00587,0,0,0,8.85889,2.60938l-.12207.47216c-.25049.09131-.49561.1919-.76563.31836l-.39014-.26025a2.00343,2.00343,0,0,0-2.5249.24805l-1.668,1.668a2.00421,2.00421,0,0,0-.249,2.52491l.24463.42041c-.11035.23925-.21045.48437-.30908.76318L2.605,8.85791A2.00694,2.00694,0,0,0,1,10.81885v2.3623a2.00678,2.00678,0,0,0,1.60645,1.96094l.47607.12305c.08984.24853.19043.4917.31641.76025l-.26319.396a2.00426,2.00426,0,0,0,.251,2.52148l1.67041,1.67041a2.00561,2.00561,0,0,0,2.521.25147l.4248-.248c.23877.11035.48291.21045.76123.30859l.09375.46973A2.00694,2.00694,0,0,0,10.81885,23h2.3623a2.00678,2.00678,0,0,0,1.96094-1.60645l.12305-.47607c.24853-.08984.49316-.19043.76123-.31543l.395.26221a2.00371,2.00371,0,0,0,2.52148-.251l1.67041-1.67041a2.0057,2.0057,0,0,0,.251-2.522l-.24707-.42432c.11035-.23926.21045-.48437.31006-.76318l.46338-.09277A2.005,2.005,0,0,0,23,13.1792V10.8208A2.00587,2.00587,0,0,0,21.39063,8.85889ZM21,13.1792l-.46338.09228a2.01176,2.01176,0,0,0-1.498,1.3086c-.07128.19678-.15087.39013-.23779.57861a2.01773,2.01773,0,0,0,.13526,1.9751l.26318.395-1.6709,1.66992-.394-.26172a2.008,2.008,0,0,0-1.9751-.13623q-.282.12965-.57666.23682a2.01375,2.01375,0,0,0-1.30762,1.49511L13.18115,21l-2.3623.001-.09424-.47022A2.012,2.012,0,0,0,9.4165,19.0376q-.293-.1062-.57519-.23682a2.0953,2.0953,0,0,0-.87793-.19531,1.97014,1.97014,0,0,0-1.09619.33057l-.396.26318L4.80078,17.5293l.26318-.396a2.01632,2.01632,0,0,0,.13575-1.97363q-.13038-.282-.23731-.57715A2.01375,2.01375,0,0,0,3.46729,13.2749L3,13.18115l-.001-2.3623.46973-.09424A2.01322,2.01322,0,0,0,4.9624,9.41748c.07129-.19678.15088-.39014.23682-.57715A2.01133,2.01133,0,0,0,5.063,6.86084l-.26074-.39111,1.668-1.66748.38965.26025a2.01329,2.01329,0,0,0,1.979.1377c.18945-.0879.38379-.167.581-.23877a2.01176,2.01176,0,0,0,1.3086-1.49805L10.8208,3h2.3584l.09228.46338a2.01261,2.01261,0,0,0,1.30957,1.49853q.29517.10694.57959.23829A2.01081,2.01081,0,0,0,17.13916,5.063l.39111-.26074,1.66748,1.668-.26025.38965a2.01225,2.01225,0,0,0-.1377,1.979c.0879.18945.167.38379.23877.581a2.01176,2.01176,0,0,0,1.498,1.3086L21,10.8208Z"
                                    />
                                    <path  
                                        fill='currentColor'
                                        d="M12,6a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,12,6Zm0,10a4,4,0,1,1,4-4A4.00458,4.00458,0,0,1,12,16Z"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div className='col-2'>
                            <Link className='user-nav-link' onClick={handleLogout}>
                                <svg 
                                    className='user-nav-icn'
                                    xmlns="http://www.w3.org/2000/svg" 
                                    version="1.1" 
                                    x="0px" 
                                    y="0px" 
                                    viewBox="0 0 100 125" 
                                >
                                    <path 
                                        fill='currentColor'
                                        d="M25,86h29c2.8,0,5-2.2,5-5s-2.2-5-5-5H25c-2.2,0-4-1.8-4-4V28c0-2.2,1.8-4,4-4h29c2.8,0,5-2.2,5-5s-2.2-5-5-5H25   c-7.7,0-14,6.3-14,14v44C11,79.7,17.3,86,25,86z"
                                    />
                                    <path 
                                        fill='currentColor'
                                        d="M75,31c-2-2-5.1-2-7.1,0c-2,2-2,5.1,0,7.1l7,7H38c-2.8,0-5,2.2-5,5s2.2,5,5,5h35.9l-6,6c-2,2-2,5.1,0,7.1   c1,1,2.3,1.5,3.5,1.5S74.1,69,75,68l15-15c2-2,2-5.1,0-7.1L75,31z"
                                    />
                                </svg>
                            </Link> 
                        </div>
                    </div>
                </div>
                <span className='userbanner-name' onClick={() => setExpand(!expand)}>
                    {userData && userData.name ? userData.name : 'User' } &nbsp;
                    <span id='userbanner-btn' className='user-banner-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </span>
                </span>
                <img className='profile' src={profile} />
            </div>   
        </>
    )
}

export default UserBanner
