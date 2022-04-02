
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';
import { createContext,useReducer } from 'react';
import { Navbar } from './components/NavBarFooter/Navbar';
import WelcomePage from './components/Welcome/WelcomePage';
import Login from './components/login/Login';
import Register from './components/register/Register'
import { Contact } from './components/ContactPage/Contact';
import { AddProfile } from './components/register/AddProfile';
import Homepage from './components/homepage/Homepage';
import Profiles from './components/Profile/Profiles'
import { initialState,reducer } from './reducer/UseReducer';
import Logout from './components/login/Logout';
import Project from './components/ProjectPage/Project';
import UserProject from './components/Profile/UserProject';
import AddUserProject from './components/Profile/AddUserProject';
import ExternalUserProjDetail from'./components/ProjectPage/ExternalUserProjDetail';
import ExternalUserProfile from './components/ProjectPage/ExternalUserProfile';
import Profile from './components/ProjectPage/Profile';
  //1: ContextAPI
  export const UserContext=createContext();
function App() {
  const [state, dispatch] = useReducer(reducer,initialState)

  return (
  <>
  <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/>
      <Routes>
     
        <Route path='/home' element={<WelcomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/addProfile' element={<AddProfile/>}/>
        <Route path="*" element={<p>Nothing is there!</p>}/>
        <Route path="/" element={<Homepage/>}> </Route>
        <Route path="/projects" element={<Project/>}/>
        <Route path="/externalProfile" element={<Profile/>}/>
        <Route path="/Profile" element={<Profiles/>}/>
       <Route path="/UserProject" element={<UserProject/>}/>
       <Route path="/AddProject" element={<AddUserProject/>}/>
       <Route path="/externalProject" element={<ExternalUserProjDetail/>}/>
       <Route path="/externalUser" element={<ExternalUserProfile/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </BrowserRouter>
  </UserContext.Provider>
    
  </>
  );
}

export default App;
