import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css'
import { useState } from 'react';
import Login from './Components/Login'
import Register from './Components/Register';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AdminLogin from './Components/AdminLogin';
import Admin from './Components/Admin';
import AdminEdit from './Components/AdminEdit';
import AdminRegister from './Components/AdminRegister';

function App() {
  
  const [isAuth,setIsAuth] = useState(false);
  return (
   <div className='App'>
    <BrowserRouter>
    <Navbar setAuth={setIsAuth}/>
    <Routes>
      <Route path='/' element={<Login setIsAuth={setIsAuth}/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/adminLogin' element={<AdminLogin/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/adminEdit' element={<AdminEdit/>}/>
      <Route path='/adminRegister' element={<AdminRegister/>}/>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
