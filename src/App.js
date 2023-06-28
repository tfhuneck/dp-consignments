import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from "./components/Navbar";
import UserNav from './components/UserNav'
import logo from './images/logo.png'
import Home from './components/Home';
import Info from './components/Info';
import Login from './components/Login';
import Contact from './components/Contact';
import About from './components/About';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import { useState } from 'react';

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
          <Routes>
            <Route path='/' index element={<Home/>} />
            <Route path='/info'  element={<Info/>} />
            <Route path='/login'  element={<Login/>} />
            <Route path='/contact'  element={<Contact/>} />
            <Route path='/about'  element={<About/>} />
            <Route path='/register'  element={<Register/>} />
            <Route path='/usr' element={<UserDashboard funcNav={setShowNav}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
