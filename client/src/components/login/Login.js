import {React} from 'react'
import {NavLink} from 'react-router-dom'



function Login() {
  
  return (
    <>
      <h1>Login Form!!!</h1>
      <form>
        <input type="email" placeholder='Enter your Email' name="email" id="" />
        <br/>
        <br/>
        <input type="password" placeholder='Password'  name="password"  />
        <br/>
        <br/>
        <input type="submit" name="Login"  id="" />
      </form>
      <br/>
     <NavLink to="/register">Register</NavLink> 
    </>
  )
}

export default Login;