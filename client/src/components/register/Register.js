import{React,useState,useContext} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import styles from './Register.module.css'
import singUpImage from '../../images/Signup.svg' 
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
    
    try{
      await fetch("/signup/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        //servr doesnt understand json
        body:JSON.stringify({
        email,password
        })
      }).then(res=>{
        if(res.status===200){
          res=res.json()
          navigate("/login")
        }
        else if(res.status===401){
          alert("Enter valid Email or Password")
          window.location.reload();
        }
        else if(res.status===409){
          alert("Email already exists")
          window.location.reload();
        }
      })
      

    }catch(err){
      console.log(err)
    }
  } 

  return (
    <>
    <div className={styles.block}>

      <div className={styles.innerBlock}>
        <p className={styles.heading}>Create a new account.</p>
        <p className={styles.heading2}>Find. Explore. Share.</p>
        <form method="POST">
          <input className={styles.input} type="email" placeholder='Enter your Email' name="email" id="email" value={user.name} onChange={handleInputs}/>
          <input className={styles.input} type="password" placeholder='Password'  name="password" id="password" value={user.password} onChange={handleInputs} />
          <div  className={styles.button}>
            <NavLink className={styles.login} to="/login">Log In</NavLink> 
            <input className={styles.register} type="submit" name="signup" value="Register"  onClick={PostData} id="signup" />
          </div>
        </form>  
      </div>
      <img className={styles.image} src={singUpImage} alt="" />
    </div>
   

    
      
    </>
  )
}

export default Register