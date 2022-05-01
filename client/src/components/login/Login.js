import {React,useState,useContext} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import {UserContext} from "../../App"
import styles from './Login.module.css'
import loginImage from '../../images/young man practicing meditation.svg'
function Login() {
 
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
  try{
    await fetch('/user/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      }) 
    }).then(res=>{
     if(res.status===403){
       if(res.message==="Incorrect Password"){
         alert("Password Not Matched")
         window.location.reload();
       }
       else{
         alert("Email Not Matched")
         window.location.reload();
       }
     }
     else if(res.status===401){
       alert("Enter Proper Email or Password")
       window.location.reload();
     }
     else if(res.status===200){
      dispatch({type:"USER",payload:true})
      checkDataEntry()
     }
    })
  }catch(err){
    console.log(err)
  }
   
 
  }
    
  
  return (
    <><div className={styles.block}>
     
      <div className={styles.innerBlock}>
        <p className={styles.heading}>Welcome to Project HUB</p>
        <p className={styles.heading2}>Find. Explore. Share</p>
        <form method='POST'>
          <input className={styles.input} type="email" placeholder='Enter your Email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="" />
         
          <input className={styles.input} type="password" placeholder='Password'  name="password" email={password} onChange={(e)=>setPassword(e.target.value)}  />
         
          <div className={styles.button}>
          <NavLink className={styles.register} to="/register">Register</NavLink> 
          <input className={styles.login} type="submit" name="Login" value="Log In" onClick={loginUser}id="" />
          </div>
          
        </form>
      </div>
      <img className={styles.image} src={loginImage} alt="" />
    </div>
      
     
    </>
  )
}

export default Login;