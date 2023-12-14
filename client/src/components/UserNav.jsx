import logo from '../images/logo.png'
import { Link, useNavigate  } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import authApp from '../config/firebase';
import { getAuth, signOut } from "firebase/auth";

function UserNav() {

    const navigate                      = useNavigate();
    const auth                          = getAuth(authApp);
    const [ expand, setExpand ]         = useState(false);
    const [ userAuth, setUserAuth ]     = useContext(AuthContext);

    useEffect(() => {
        const container = document.getElementById('mobile-nav-container');
        const mNavbar = document.getElementById('mobile-navbar');
        
        if(expand){ 
            container.classList.remove('mobile-nav-default');
            container.classList.add('mobile-nav-active');
            mNavbar.classList.add('mobile-navbar-expand');
            mNavbar.classList.remove('mobile-navbar-fold');
        }; 
        if(!expand){
            container.classList.add('mobile-nav-default');
            container.classList.remove('mobile-nav-active');
            mNavbar.classList.remove('mobile-navbar-expand');
            mNavbar.classList.add('mobile-navbar-fold');
        };

    }, [expand, setExpand])

    var burger = document.getElementById('mobile-nav')
    var lastScroll = 0;
    
    window.onscroll = function() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
        if (!expand && currentScroll - lastScroll >= 200){
            lastScroll = currentScroll;
            setTimeout(() => {
                // burger.style.position = 'absolute';
                burger.classList.add('mobile-nav-slide');
            },500)
        }if(currentScroll - lastScroll < 0) {
            lastScroll = currentScroll;
            setTimeout(() => {
                burger.classList.remove('mobile-nav-slide');
            },100)
        }
    };

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
            <div className='card usr-nav container-fluid'>
                <div className='row d-flex '>
                    <div className='col d-flex justify-content-center'>
                        <img className='logo-nav' src={logo} />
                    </div>
                </div>
                <div className='card-body d-flex flex-column justify-content-evenly'>
                    <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/usr'>
                            <div className='col'>
                                <svg 
                                    className='user-nav-icn'
                                    stroke="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 96 120" 
                                    fill="none" 
                                    x="0px" 
                                    y="0px"
                                >
                                    <path 
                                        d="M52.6891 14.3069C50.0251 11.8977 45.9749 11.8977 43.3109 14.3069L20.9974 34.4643L20.9911 34.47L14.8145 40.0776L14.8109 40.0808C13.3403 41.4108 12.5 43.3036 12.5 45.2904V76.4835C12.5 80.3627 15.6381 83.5 19.5 83.5H76.5C80.3619 83.5 83.5 80.3627 83.5 76.4835V45.2904C83.5 43.3036 82.6597 41.4108 81.1891 40.0808L52.6891 14.3069ZM39.9572 10.5985C44.5254 6.46717 51.4746 6.46717 56.0428 10.5985L84.5428 36.3724C87.0628 38.6513 88.5 41.8919 88.5 45.2904V76.4835C88.5 83.1159 83.1315 88.5 76.5 88.5H19.5C12.8685 88.5 7.5 83.1159 7.5 76.4835V45.2904C7.5 41.8928 8.93646 38.653 11.4551 36.3742C11.4558 36.3736 11.4565 36.373 11.4572 36.3724L17.6429 30.7566L39.9572 10.5985Z" 
                                        fill="currentColor"  
                                    />
                                    <path 
                                        d="M68.5 74C68.5 75.3807 67.3807 76.5 66 76.5H30C28.6193 76.5 27.5 75.3807 27.5 74C27.5 72.6193 28.6193 71.5 30 71.5H66C67.3807 71.5 68.5 72.6193 68.5 74Z" 
                                        fill="currentColor"  
                                    />
                                </svg>
                            </div>
                            <div className='col nav-txt'>
                               HOME
                            </div>
                        </Link>
                    </div>
                    <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/usr/credit'>
                            <div className='col'>
                                <svg 
                                    className='user-nav-icn'
                                    stroke="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    version="1.1" 
                                    viewBox="328 722 64 80" 
                                    x="0px" 
                                    y="0px"
                                >
                                    <path 
                                        fill="currentColor"  
                                        d="M342.71793,735.4408L342.71793,735.4418L342.71793,735.44275L333.60422,740.7019C333.49142,740.36584,333.42194,740.0108,333.4024,739.6425L333.3978,739.3427C333.44434,737.17615,335.2096,735.43835,337.382,735.43835 Z M358.90488,735.909L358.90488,735.91C359.52994,736.99066,360.66425,737.5958,361.83047,737.5958C362.40298,737.5958,362.98315,737.45,363.51456,737.1432L364.29294,736.6945L368.1743,743.4172L344.11307,743.41724L344.11307,743.4182L358.45663,735.1316 Z M363.63553,726.42456C363.63553,726.42456,363.63647,726.42456,363.63647,726.42456C364.08167,726.42456,364.51437,726.6561,364.75317,727.0697C364.75345,727.0702,374.1922,743.4172,374.1922,743.4172L371.0329,743.41815L365.80966,734.36926C365.57846,733.97986,365.16705,733.763,364.74417,733.763C364.55975,733.763,364.37314,733.8042,364.19833,733.8904L362.26468,735.0055C362.12668,735.0821,361.9769,735.1186,361.82904,735.1186C361.51846,735.1186,361.21637,734.95764,361.05002,734.6695C361.04565,734.6619,359.98203,732.8196,359.98203,732.8196C359.7526,732.42224,359.3363,732.20013,358.90826,732.20013L358.89035,732.2004C358.68567,732.1994,358.48,732.25665,358.29013,732.3663C358.28253,732.37067,339.14944,743.41724,339.14944,743.41724L337.38605,743.4182C336.53635,743.41724,335.74902,743.1518,335.10196,742.699L362.99664,726.5927C363.19794,726.4781,363.41742,726.42456,363.63385,726.42456 Z M332.1596,746.3619L332.1596,746.36285L332.1596,746.36383L332.1596,746.3648L332.1596,746.3658L332.156,746.36676L332.1542,746.36774L332.1506,746.3687C331.4707,746.36676,330.92108,746.91943,330.92108,747.6004L330.92108,747.6014C330.92108,748.2854,331.4756,748.8399,332.1596,748.8399C332.84363,748.8399,333.39813,748.2854,333.39813,747.6014L333.39813,747.6004C333.39813,746.9164,332.84363,746.3619,332.1596,746.3619L332.1596,746.36285 Z M378.9343,761.04553C378.9343,761.04553,378.93365,761.04553,378.93365,761.04553C377.43573,761.04553,376.22098,762.2604,376.22098,763.7584C376.22098,765.2567,377.43567,766.4712,378.93384,766.4712C380.43173,766.4712,381.64673,765.2572,381.64673,763.7584C381.64673,762.26135,380.43326,761.04553,378.93512,761.04553 Z M385.6236,759.1659C385.6236,759.1659,385.63754,759.1659,385.63754,759.1659C386.17004,759.1649,386.5996,759.5988,386.5996,760.13275L386.5998,767.32886C386.5998,767.86444,386.16757,768.29956,385.63278,768.3037L375.45004,768.3047C374.91525,768.29956,374.48303,767.86444,374.48303,767.32886L374.48328,760.13275C374.48328,759.59717,374.91403,759.16223,375.44882,759.1581 Z M341.94205,775.249C341.94205,775.249,341.937,775.249,341.937,775.249C341.25314,775.249,340.69962,775.8034,340.6996,776.48724C340.69955,777.1711,341.25394,777.7256,341.9378,777.7256L373.16565,777.72656C373.84952,777.72656,374.4039,777.1722,374.40393,776.48834C374.40396,775.8045,373.84958,775.25,373.1657,775.25 Z M363.61765,723.94855C363.61765,723.94855,363.61386,723.94855,363.61386,723.94855C362.97977,723.94855,362.33768,724.1117,361.74915,724.4515C361.7473,724.4525,346.8775,732.9648,346.8775,732.9648L337.37338,732.97064C333.84103,732.96967,330.97345,735.80963,330.9219,739.3314L330.92523,739.66077C331.04694,743.1223,333.89288,745.89264,337.38596,745.89276L380.68472,745.8943C382.5974,745.9072,384.14587,747.45416,384.158,749.36633L384.158,756.6819L375.4478,756.6859C373.55353,756.68494,372.0201,758.20355,372.00613,760.0953C372.00604,760.10565,372.0058,767.35443,372.0059,767.36633C372.0199,769.2607,373.5572,770.7807,375.4549,770.7807L384.15796,770.7835L384.15796,778.09796C384.14584,780.0101,382.59747,781.557,380.68478,781.56995L336.8713,781.5709C334.95862,781.557,333.41028,780.0101,333.39816,778.09796L333.39777,751.59424C333.39777,750.91034,332.84335,750.3559,332.15942,750.3559L332.15942,750.3569L332.15762,750.35785L332.15582,750.3588L332.15402,750.3598C331.47256,750.3588,330.92108,750.9122,330.92108,751.59424L330.92108,778.1161C330.9438,781.39624,333.61008,784.04706,336.89542,784.04706L380.66068,784.04803C383.94598,784.04706,386.61234,781.39624,386.63504,778.1161L386.63562,770.6334C388.04572,770.2088,389.0655,768.9135,389.07693,767.36633C389.07703,767.35443,389.07684,760.10565,389.07675,760.0953C389.06537,758.5521,388.04288,757.2572,386.63815,756.8303L386.635,749.34814C386.61234,746.068,383.94595,743.4172,380.6606,743.4162L377.05164,743.41815L372.44684,735.442L379.1157,735.43945C379.79956,735.4394,380.35388,734.8849,380.35382,734.20105C380.35376,733.5173,379.79938,732.9629,379.11557,732.9629L371.02267,732.9617L366.8943,725.82416C366.19504,724.61884,364.93115,723.9484,363.6313,723.9484 Z"
                                    />
                                </svg>
                            </div>
                            <div className='col nav-txt'>
                                Balance
                            </div>
                        </Link>
                    </div>
                    <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/usr/cashout'>
                            <div className='col'>
                                <svg
                                    className='user-nav-icn'
                                    stroke="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"  
                                    version="1.1" 
                                    x="0px" 
                                    y="0px" 
                                    viewBox="0 0 64 80" 
                                >
                                    <path
                                        fill="currentColor"  
                                        d="M59.75,2H4.25c-0.5522461,0-1,0.4477539-1,1v9.7021484c0,0.5522461,0.4477539,1,1,1h55.5c0.5522461,0,1-0.4477539,1-1V3    C60.75,2.4477539,60.3022461,2,59.75,2z M58.75,11.7021484H5.25V4h53.5V11.7021484z"
                                    />
                                    <path
                                        fill="currentColor"  
                                        d="M14.3408203,9.2241211h35.3183594c1.3021507-0.0187187,1.3242683-1.9766874-0.0000534-1.9999967    c0.0000534-0.0000033-35.318306-0.0000033-35.318306-0.0000033C13.0386696,7.2428398,13.016551,9.2008085,14.3408203,9.2241211z"
                                    />
                                    <path
                                        fill="currentColor"  
                                        d="M39,43.4082031c0-0.5522461-0.4477539-1-1-1H20.3852539V16c-0.0170364-1.3028641-1.9780407-1.3231306-1.9999943,0.0000515    C18.3852539,16,18.3852539,43.4082031,18.3852539,43.4082031c0,0.5522461,0.4477539,1,1,1H38    C38.5522461,44.4082031,39,43.9604492,39,43.4082031z"
                                    />
                                    <path
                                        fill="currentColor"  
                                        d="M45.6147461,34.0258789V16c0-0.5522461-0.4477539-1-1-1s-1,0.4477539-1,1v18.0258789    C43.6353378,35.334568,45.5919991,35.3448143,45.6147461,34.0258789z"
                                    />
                                    <path
                                        fill="currentColor"  
                                        d="M32,23.7163086c-3.3574219,0-6.0888672-2.4785156-6.0888672-5.5249023c0-0.5522461-0.4477539-1-1-1s-1,0.4477539-1,1    c0,4.1494141,3.628418,7.5249023,8.0888672,7.5249023s8.0888672-3.3754883,8.0888672-7.5249023    c0.0717049-0.6182632-0.40765-1.2480412-1.0336914-1.190918c-0.625721,0.0150719-1.0437241,0.5885696-0.9662857,1.1909275    C38.0888672,21.237793,35.3574219,23.7163086,32,23.7163086z"
                                    />
                                    <path
                                        fill="currentColor"  
                                        d="M23.4316406,30v4.4521484c-0.0152016,0.6725273,0.7212334,1.186409,1.3476696,0.9374809    c0.3124866-0.1132622,3.1108265-1.0131645,5.1142445,2.1557808c0.1831055,0.2900391,0.5024414,0.4658203,0.8452148,0.4658203    h2.5224609c0.3427734,0,0.6621094-0.1757813,0.8452148-0.4658203c2.003418-3.1699219,4.8017578-2.2685547,5.1079102-2.1582031    c0.6262741,0.2579842,1.3736534-0.2566986,1.3539886-0.9350777C40.5683594,34.4521484,40.5683594,30,40.5683594,30    c-0.0243225-1.3129635-1.9759712-1.3162022-2,0.0000439c0-0.0000439,0,3.2196827,0,3.2196827    c-1.6972656-0.1572266-4.0585938,0.3374023-5.8374023,2.7915039H31.269043    c-1.7792969-2.4541016-4.1411133-2.949707-5.8374023-2.7915039V30C25.4094429,28.6857166,23.4537449,28.6857128,23.4316406,30z"
                                    />
                                    <path
                                        fill="currentColor"  
                                        d="M54.6113281,27.9140625c-5.0310287-1.6599407-7.3390961,3.7522697-8.5141602,10.3256836l-5.559082,5.6391602    c-0.9114799,0.9300728,0.4997177,2.3355331,1.4238739,1.4042435c-0.0000458,0.0000534,5.7812042-5.8642044,5.7812042-5.8642044    c0.1455078-0.1474609,0.2412109-0.3359375,0.2749023-0.5400391c1.0224609-6.222168,2.6513672-8.328125,3.8383789-8.9990234    c0.6269531-0.3540039,1.3046875-0.3896484,2.0151367-0.1074219c0.0830078,0.0327148,0.1328125,0.1459961,0.112793,0.2573242    l-2.1132813,11.7900391L43.925293,52.1821289c-0.0771484,0.1005859-0.1347656,0.215332-0.1689453,0.3374023L41.6489258,60    H24.90625v-4.8637695c0-0.1791992-0.0483398-0.3549805-0.1391602-0.5092773L21.4375,48.9985352v-2.0722656    c-0.022089-1.3135109-1.9777184-1.3149719-1.9999981,0.000042C19.4375,46.9262695,19.4375,49.2719727,19.4375,49.2719727    c0,0.1791992,0.0483398,0.3549805,0.1391602,0.5092773l3.3295898,5.628418V61c0,0.5522461,0.4477539,1,1,1h18.5    c0.4477539,0,0.8413086-0.2978516,0.9624023-0.7290039l2.2607422-8.0244141L53.605957,42.84375    c0.097168-0.1264648,0.1625977-0.2749023,0.190918-0.4321289l2.15625-12.0288086    C56.140625,29.3364258,55.5766602,28.2983398,54.6113281,27.9140625z"
                                    />
                                </svg>
                            </div>
                            <div className='col nav-txt'>
                                Cashout
                            </div>
                        </Link>
                    </div>
                    <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/usr/userinfo'>
                            <div className='col'>
                                <svg xmlns="http://www.w3.org/2000/svg"  
                                    id='info-icn' 
                                    fill="currentColor" 
                                    class="bi bi-info-circle"  
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                </svg>
                            </div>
                            <div className='col nav-txt'>
                                Info
                            </div>
                        </Link>
                    </div>
                    {/* <div className='row justify-content-center'>
                        <Link className='user-nav-link' to='/usr/message'>
                            <div className='col'>
                                <svg
                                    className='user-nav-icn'
                                    stroke="currentColor" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    version="1.1" 
                                    x="0px" 
                                    y="0px" 
                                    viewBox="0 0 100 125" 
                                >
                                    <path
                                        fill="currentColor"  
                                        d="M65,8.151H35c-16.543,0-30,13.469-30,30.028v7.927c0,13.069,8.358,24.4,20.422,28.451c-1.523,2.63-3.598,6.73-6.58,13.135    c-0.518,1.111-0.288,2.424,0.575,3.295c0.561,0.563,1.312,0.862,2.076,0.862c0.41,0,0.825-0.086,1.215-0.266l33.777-15.451H65    c16.543,0,30-13.469,30-30.028v-7.927C95,21.62,81.542,8.151,65,8.151z M89.152,46.105c0,13.332-10.835,24.18-24.153,24.18h-9.152    c-0.42,0-0.835,0.091-1.216,0.266L27.666,82.886c1.795-3.566,3.429-6.582,4.197-7.584c0.737-0.445,1.269-1.214,1.386-2.13    c0.198-1.55-0.857-2.981-2.394-3.252c-11.593-2.03-20.008-12.047-20.008-23.814v-7.927c0-13.332,10.835-24.18,24.153-24.18H65    c13.318,0,24.153,10.848,24.153,24.18V46.105z"
                                    />
                                    <circle
                                        fill="currentColor" 
                                        cx="27.332" 
                                        cy="42.81" 
                                        r="6.466"
                                    />
                                    <circle 
                                        fill="currentColor" 
                                        cx="72.668" 
                                        cy="42.81" 
                                        r="6.466"
                                    />
                                    <circle 
                                        fill="currentColor" 
                                        cx="50" 
                                        cy="42.81" 
                                        r="6.466"
                                    />
                                </svg>
                            </div>
                            <div className='col nav-txt'>
                                Messages
                            </div>
                        </Link>
                    </div> */}
                </div>
            </div>
            <div className='mobile-nav mobile-nav-usr' id='mobile-nav'>
                <div className="mobile-nav-center">
                    <div id='mobile-nav-container' onClick={() => setExpand(!expand)} className='mobile-nav-default'>
                        <div className='line-1'></div>
                        <div className='line-2'></div>
                        <div className='line-3'></div>
                    </div>
                </div>
            </div>
            <div className='mobile-navbar mobile-navbar-usr container' id='mobile-navbar'>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link link-usr-nav' id='mobile-navbar-link-1' to='/usr' onClick={() => setExpand(!expand)}>
                            Home
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link link-usr-nav' id='mobile-navbar-link-2' to='/usr/credit' onClick={() => setExpand(!expand)}>
                            Balance
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link link-usr-nav' id='mobile-navbar-link-3' to='/usr/cashout' onClick={() => setExpand(!expand)}>
                            Cashout
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link link-usr-nav' id='mobile-navbar-link-4' to='/usr/profile' onClick={() => setExpand(!expand)} >
                            Profile
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link link-usr-nav' id='mobile-navbar-link-5' to='/usr/settings' onClick={() => setExpand(!expand)}>
                            Settings
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link link-usr-nav' id='mobile-navbar-link-6' to='/usr/userinfo' onClick={() => setExpand(!expand)}>
                            Info
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        <Link className='mobile-navbar-link link-usr-nav' id='mobile-navbar-link-7' onClick={handleLogout}>
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserNav;