import {React,useState,useContext} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import {UserContext} from "../../App"
import styles from './Login.module.css'

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
    .then(()=>{
      dispatch({type:"USER",payload:true})
     
     
      console.log("Login Successful")
      checkDataEntry()
    })
 
  }
    
  
  return (
    <>
      <p className={styles.heading}><b>Welcome to KKAV@Site</b></p>
      <p className={styles.heading2}>Find. Explore. Share</p>
      <form method='POST'>
        <input className={styles.input} type="email" placeholder='Enter your Email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="" />
        <br/>
        <br/>
        <input className={styles.input} type="password" placeholder='Password'  name="password" email={password} onChange={(e)=>setPassword(e.target.value)}  />
        <br/>
        <br/>
        <NavLink className={styles.linktoregister} to="/register">Create account</NavLink> 
        <input className={styles.submitlogin} type="submit" name="Login" value="Log In" onClick={loginUser}id="" />
      </form>
      <br/> 
    </>
  )
}

export default Login;