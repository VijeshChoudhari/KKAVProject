import React, { useContext } from 'react'

import {NavLink} from 'react-router-dom'
import { UserContext } from '../../App'
export const Navbar = () => {
  const {state,dispatch}=useContext(UserContext);
  const RenderMenu=()=>{
    if(state){
      return(
        <>
        <NavLink to="/">Home</NavLink> | {" "}
        <NavLink to="/contact">Contact</NavLink> |  {" "}
        <NavLink to="/logout">Logout</NavLink>
        </>
      )
    }else{
      return(
        <>
        <NavLink to="/home">Home</NavLink> | {" "}
        <NavLink to="/contact">Contact</NavLink> |  {" "}
        <NavLink to="/login">Login</NavLink> | {" "}
        <NavLink to="/register">Register</NavLink>
    
        </>
      )
    }

  }
  return (
    <>
    <nav>
    
   <NavLink to="/">Logo</NavLink> {" "}
   
  <RenderMenu/>
   </nav>
    </>
  )
}
