import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import ExternalProject from './ExternalProject'
function ExternalUserProfile() {
  const location=useLocation()
  const [project,setProject]=useState()
  const [isLoading,setIsLoading]=useState(true)
 const value=location.state
 const user=value.email
console.log(user)
 const fetchProject=async ()=>{
  try{
    await fetch('/projects/externalProjects',{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify({
      user
     })
    })
    .then(res=>res.json())
    .then(json=>{
      console.log(json)
     setProject(json)
     setIsLoading(false)
   })
 }
 catch(err){
   console.log(err)
 }
 }
 useEffect( () => {
   fetchProject();
  
  }, [])
  if(isLoading){
    return(<>Loading</>)
  }
  return (
    <div>
      <h1>Profile</h1>
      {value.name}<br/>
     {value.role}<br/>
     {value.profile}<br/>
     {value.place}<br/>
     <a href={value.social1Link}>{value.social1Link}</a><br/>
     <a href={value.social2Link}>{value.social2Link}</a>
    <h1>Projects</h1>
    {
          project.map((data1,key)=>{
            
            return(
            
              <ExternalProject project={data1} key={data1.id}/>
            )
          })
        }
    </div>
    
  )
}

export default ExternalUserProfile