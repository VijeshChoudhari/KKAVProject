import React, { useContext,useEffect } from 'react'

import {NavLink} from 'react-router-dom'
import { UserContext } from '../../App'
export const Navbar = () => {
  const {state,dispatch}=useContext(UserContext);
 
  const RenderMenu=()=>{
    if(state===true){

      return(
        <>
        <NavLink to="/">Logo</NavLink> {" "}
        <NavLink to="/">Home</NavLink> | {" "}
        <NavLink to="/contact">Contact</NavLink> |  {" "}
        <NavLink to="/logout">Logout</NavLink>
        </>
      )
    }else{
      return(
        <>
        <NavLink to="/home">Logo</NavLink> {" "}
        <NavLink to="/home">Home</NavLink> | {" "}
        <NavLink to="/contact">Contact</NavLink> |  {" "}
       
        <NavLink to="/register">Register</NavLink>
    
        </>
      )
    }


  }
  return (
    <>
    <nav>
    
   
   
  <RenderMenu/>
   </nav>
    </>
  )
}
