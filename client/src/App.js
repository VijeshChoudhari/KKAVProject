
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';

import { Navbar } from './components/NavBarFooter/Navbar';
import WelcomePage from './components/Welcome/WelcomePage';
import Login from './components/login/Login';
import Register from './components/register/Register'
import { Contact } from './components/ContactPage/Contact';
import { AddProfile } from './components/register/AddProfile';
function App() {
  return (
  <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<WelcomePage/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/register' element={<Register/>}/>
      <Route path='/addProfile' element={<AddProfile/>}/>
  
      <Route path="*" element={<p>Nothing is there!</p>}/>
  </Routes>
  </BrowserRouter>
    
  </>
  );
}

export default App;
