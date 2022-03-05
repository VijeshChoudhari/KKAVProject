import{React,useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from "axios";
function Register() {
 
  return (
    <>
      <h1>Sign Up Form</h1>
      <form action="">
        <input type="email" placeholder='Enter your Email' name="email" id="" />
        <br/>
        <br/>
        <input type="password" placeholder='Password'  name="password" id=""  />
        <br/>
        <br/>
        <input type="submit" name="Login"   id="" />
      </form>
      <br/>
      <NavLink to="/login">Login</NavLink> 
      
    </>
  )
}

export default Register