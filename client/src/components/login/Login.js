import {React,useState,useContext} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import {UserContext} from "../../App"

function Login() {
  const[cookie,setCookie]=useState('')
  const {state,dispatch} =useContext(UserContext);


  const navigate=useNavigate()
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const checkDataEntry = async()=>{
    
    try{
      const res1=await fetch('/user/profile',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      
      })
     
      if(res1.status===200){
        
        navigate('/')
        
        
      }
      else{
        console.log("Profile not added already")
        navigate('/addProfile')
      }
    }catch(err){
      console.log(err)
 
    }
    
  }
  
  const loginUser= async (e)=>{
    e.preventDefault();
  
   await fetch('/user/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      }) 
    }).then(res=>res.json())
    .then(json=>{
      dispatch({type:"USER",payload:true})
      console.log(json)
      setCookie(json.userCookie)
      localStorage.setItem("Cookie",cookie);
      console.log("Login Successful")
      checkDataEntry()
    })
 
  }

  
  return (
    <>
      <h1>Login Form!!!</h1>
      <form method='POST'>
        <input type="email" placeholder='Enter your Email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="" />
        <br/>
        <br/>
        <input type="password" placeholder='Password'  name="password" email={password} onChange={(e)=>setPassword(e.target.value)}  />
        <br/>
        <br/>
        <input type="submit" name="Login" value="Log In" onClick={loginUser}id="" />
      </form>
      <br/>
     <NavLink to="/register">Register</NavLink> 
    </>
  )
}

export default Login;