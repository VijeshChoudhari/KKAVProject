import{React,useState,useContext} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import styles from './Register.module.css'


function Register() {
  

  const navigate=useNavigate()
  const [user,setUser]=useState({
    email:"",
    password:""
  });
let name,value;
const handleInputs=(e)=>{
  name=e.target.name;
  value=e.target.value
  setUser({...user,[name]:value})
}

const PostData=async (e)=>{
  e.preventDefault(); //prevent from default enter
  const {email,password}=user; //destructuring 
  
const res=await fetch("/signup/register",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  //servr doesnt understand json
  body:JSON.stringify({
   email,password
  })
})
const data=await res.json()
  if(res.status===422 || !data){
    window.alert("Invalid Registration")
    console.log("Invalid Registration")
  }else{
    
    window.alert("Registration Successful")
    console.log("Registration Successful")
    navigate("/login")
  }
} 

  return (
    <>
    <div>
    <p className={styles.heading}><b>Create a new account.</b></p>
    <p className={styles.heading2}>Find. Explore. Share.</p>
      <form method="POST">
        <input className={styles.input} type="email" placeholder='Enter your Email' name="email" id="email" value={user.name} onChange={handleInputs}/>
        <br/>
        <br/>
        <input className={styles.input} type="password" placeholder='Password'  name="password" id="password" value={user.password} onChange={handleInputs} />
        <br/>
        <br/>
      <NavLink className={styles.linktologin} to="/login">Login</NavLink> 
       <input className={styles.createaccount} type="submit" name="signup" value="Create account"  onClick={PostData} id="signup" ></input>
      </form>
      <br/>
     
      
    </div>
   

    
      
    </>
  )
}

export default Register