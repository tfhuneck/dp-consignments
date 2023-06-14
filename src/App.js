import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from "./components/Navbar";
import logo from './images/logo.png'
import Home from './components/Home';
import Info from './components/Info';
import Login from './components/Login';
import Contact from './components/Contact';
import About from './components/About';
import Register from './components/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <img className='logo' src={logo}/> */}
        <Navigation/>  
        <Routes>
          <Route path='/' index element={<Home/>} />
          <Route path='/info' index element={<Info/>} />
          <Route path='/login' index element={<Login/>} />
          <Route path='/contact' index element={<Contact/>} />
          <Route path='/about' index element={<About/>} />
          <Route path='/register' index element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
