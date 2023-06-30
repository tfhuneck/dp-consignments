import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navigation from "./components/Navbar";
import logo from './images/logo.png'
import Home from './components/Home';
import Info from './components/Info';
import Login from './components/Login';
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

function App() {

  const [showNav, setShowNav] = useState('home');

  return (
    <>
      <BrowserRouter>
        {/* <img className='logo' src={logo}/> */}
        { showNav === 'home' &&
          <Navigation/>  
        }
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-2 fixed-top one'>
              { showNav === 'usr' &&
                <UserNav/>     
              }
            </div>
          </div>
          <div className="fixed-top">
          { showNav === 'usr' &&
                <UserPanel/>
              }
            </div>
          <Routes>
            <Route path='/' index element={<Home/>} />
            <Route path='/info'  element={<Info/>} />
            <Route path='/login'  element={<Login/>} />
            <Route path='/contact'  element={<Contact/>} />
            <Route path='/about'  element={<About/>} />
            <Route path='/register'  element={<Register/>} />
            <Route path='/usr' element={<UserDashboard funcNav={setShowNav}/>} />
            <Route path='/usr/credit' element={<Credit funcNav={setShowNav}/>}  /> 
            <Route path='/usr/cashout' element={<Cashout funcNav={setShowNav}/>}  /> 
            <Route path='/usr/message' element={<Messenger funcNav={setShowNav}/>}  /> 
            <Route path='/usr/notifications' element={<Notifications funcNav={setShowNav}/>}  /> 
            <Route path='/usr/profile' element={<Profile funcNav={setShowNav}/>}  /> 
            <Route path='/usr/settings' element={<Settings funcNav={setShowNav}/>}  /> 
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
