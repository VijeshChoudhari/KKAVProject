
import {React,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {UserContext} from "../../App"
function Logout() {
  const {state,dispatch} =useContext(UserContext);
 
 
  const navigate=useNavigate()
  const callDefaultPage=async ()=>{
    try{
      const res=await fetch('/user/logout',{
        method:"POST",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      
      })
      const data = await res.json();
      console.log(data);
      
      if(!res.status===200){
        const error =new Error(res.error);
        throw error;
      }else{
        dispatch({type:"USER",payload:false})
        console.log("Logout Successful")
        navigate('/login');
      }
    
    }catch(err){
    
      console.log(err)
      navigate('/login');
    }
  }
  useEffect(() => {
    callDefaultPage();
  }, [])
  
  return (
   <>
   
   </>
  )
}

export default Logout