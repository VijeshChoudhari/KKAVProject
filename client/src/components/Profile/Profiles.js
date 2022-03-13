import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';



function Profiles() {
    const navigate=useNavigate()
    const callHomePage=async ()=>{

        try{
          const res=await fetch('/user',{
            method:"GET",
            headers:{
              
              "Content-Type":"application/json"
            },
           
          
          })
          const data = await res.json();
          console.log(data);
          if(!res.status===200){
           
            const error =new Error(res.error);
            throw error;
           
          }
        
        }catch(err){
            navigate('/home');
          console.log(err)
         
        }
      }
    
      useEffect(() => {
        callHomePage();
      }, [])
  return (
    <div>Profiles</div>
  )
}

export default Profiles