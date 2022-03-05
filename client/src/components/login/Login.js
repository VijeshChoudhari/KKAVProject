import {React,useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios';



function Login() {


  return (
    <>
      <h1>Login Form</h1>
      <form action="">
        <input type="email" placeholder='Enter your Email'name="email" id="" />
        <br/>
        <br/>
        <input type="password" placeholder='Password' name="password"  />
        <br/>
        <br/>
        <input type="submit" name="Login"  id="" />
      </form>
      <br/>
     <NavLink to="/signup">Register</NavLink> 
    </>
  )
}

export default Login