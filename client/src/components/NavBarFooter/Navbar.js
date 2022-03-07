import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {NavLink} from 'react-router-dom'
export const Navbar = () => {
  return (
    <>
    <nav>
    
   <NavLink to="/">Logo</NavLink> {" "}
   <NavLink to="/">Home</NavLink> | {" "}
   <NavLink to="/contact">Contact</NavLink> |  {" "}
   <NavLink to="/login">Login</NavLink> | {" "}
    <NavLink to="/register">Register</NavLink>
   </nav>
    </>
  )
}
