import{React,useState} from 'react'
import {Outlet,NavLink} from 'react-router-dom'
import axios from "axios";
function Register() {

  return (
    <>
    <div>
    <h1>Create a new account.</h1>
    <p>Find. Explore. Share.</p>
      <form action="">
        <input type="email" placeholder='Enter your Email' name="email" id="" />
        <br/>
        <br/>
        <input type="password" placeholder='Password'  name="password" id=""  />
        <br/>
        <br/>
        <NavLink to="/addProfile"><input type="submit" name="Login"   id="" ></input></NavLink>
      </form>
      <br/>
     
      <NavLink to="/login">Login</NavLink> 
      
    </div>
    <Outlet/>

    
      
    </>
  )
}

export default Register