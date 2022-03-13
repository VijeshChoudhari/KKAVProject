import{React,useState,useContext} from 'react'
import {Outlet,NavLink,useNavigate} from 'react-router-dom'


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
    <h1>Create a new account.</h1>
    <p>Find. Explore. Share.</p>
      <form method="POST">
        <input type="email" placeholder='Enter your Email' name="email" id="email" value={user.name} onChange={handleInputs}/>
        <br/>
        <br/>
        <input type="password" placeholder='Password'  name="password" id="password" value={user.password} onChange={handleInputs} />
        <br/>
        <br/>
       <input type="submit" name="signup" value="register"  onClick={PostData} id="signup" ></input>
      </form>
      <br/>
     
      <NavLink to="/login">Login</NavLink> 
      
    </div>
    <Outlet/>

    
      
    </>
  )
}

export default Register