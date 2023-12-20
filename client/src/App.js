import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import Navigation from "./components/Navbar";
import UserBanner from './components/UserBanner';
import logo from './images/logo.png'
import Home from './components/Home';
import Info from './components/Info';
import Login from './components/Login';
import Reset from './components/ResetPassword'
import Contact from './components/Contact';
import About from './components/About';
import Register from './components/Register';
import UserNav from './components/UserNav'
import UserPanel from './components/UserPanel';
import UserDashboard from './components/UserDashboard';
import Credit from './components/Credit';
import Cashout from './components/Cashout';
import Messenger from './components/Messenger';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Settings from './components/Settings';
import UserInfo from './components/UserInfo';
import Rules from './components/Rules';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import authApp from './config/firebase';
import Modal from 'react-modal';
import Tos from './components/Tos';
import ScrollToTop from './components/ScrollTop';

export const AuthContext = createContext();

Modal.setAppElement(document.getElementById('root'));

function App() {
  const auth                      = getAuth(authApp);
  const [ userAuth, setUserAuth ] = useState(null);
  
  // var userData = {};

  useEffect (() => {
    onAuthStateChanged(auth, async (user) => {
      var token = ''
      if (user) {
        // console.log(user)
        await user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          token = idToken
        }).catch(function(error) {
          // Handle error
        });
        const userid = user.uid;
        const email = user.email;
        const verified = user.emailVerified;
        const userData = {
          idToken : token,
          userid : userid,
          email: email,
          verified: verified
        }
        setUserAuth(userData);
      } else {
        setUserAuth(null);
        // console.log(userAuth)
      }
    });
  }, [onAuthStateChanged, auth]);

  return (
    <>
      <AuthContext.Provider value={[ userAuth, setUserAuth ]}>
        <BrowserRouter>
          <ScrollToTop />
          {/* <img className='logo' src={logo}/> */}
          {!userAuth && <Navigation />}
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-2 fixed-top one'>
                {userAuth && <UserNav />}
              </div>
            </div>
            <div className="fixed-top">
              {userAuth && <UserPanel />}
            </div>
            {userAuth && <UserBanner />}
            <Routes>
              <Route exact path='/' index element={<Home />} />
              <Route path='/info' element={<Info />} />
              <Route path='/login' element={<Login />} />
              <Route path='/contact' element={<Contact />} />
              {/* <Route path='/about' element={<About />} /> */}
              <Route path='/tos' element={<Tos />} />
              <Route path='/register' element={<Register />} />
              <Route path='/reset' element={<Reset />} />
                {userAuth && <Route path='/usr' element={<UserDashboard />} />}
                {userAuth && <Route path='/usr/credit' element={<Credit />} />}
                {userAuth && <Route path='/usr/cashout' element={<Cashout />} />}
                {userAuth && <Route path='/usr/message' element={<Messenger />} />}
                {userAuth && <Route path='/usr/notifications' element={<Notifications />} />}
                {userAuth && <Route path='/usr/profile' element={<Profile />} />}
                {userAuth && <Route path='/usr/settings' element={<Settings />} />}
                {userAuth && <Route path='/usr/userinfo' element={<UserInfo />} />}
                {userAuth && <Route path='/usr/rules' element={<Rules />} />}
            </Routes>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
