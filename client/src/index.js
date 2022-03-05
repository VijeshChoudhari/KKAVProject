import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register'
import WelcomePage from './components/Welcome/WelcomePage'

ReactDOM.render(
 <BrowserRouter>
 <Routes>
   <Route path='/' element={ <App/>}>
    <Route path='/' element={<WelcomePage/>}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/signup" element={<Register/>}/>
    </Route>
  </Routes>
  
 </BrowserRouter>
    
 ,
  document.getElementById('root')
);


