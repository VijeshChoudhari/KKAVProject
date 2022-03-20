import {React,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';



function Profiles() {
    const navigate=useNavigate()
    const [data,setData]=useState('')
    const [project,setProject]=useState('')
    const callProfile=async ()=>{

        try{
          const res=await fetch('/user/profileData',{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
          })
          const data = await res.json();
          setData(data);
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
    
    const callProject=async ()=>{
      try{
        const res=await fetch('/projects/userProject',{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },

        })
        const data= await res.json()
        setProject(data)
        console.log(data)
        if(!res.status===200){
          const error =new Error(res.error);
          throw error;
        }

      }catch(err){
        console.log(err)
      }
    } 
      useEffect(() => {
        callProfile();
        callProject();
      }, [])
  return (
    <>
    <h1>About User</h1>
    {data.name}<br/>
    {data.role}<br/>
    {data.place}<br/>

    {data.social1Link}<br/>
    {data.social2Link}

    <h2>Project</h2>


    </>
  )
}

export default Profiles