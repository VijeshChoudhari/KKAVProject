import React, { useEffect, useState } from 'react'
import {Navigate, useLocation, useNavigate} from'react-router-dom'
function BookmarkView() {
  const navigate=useNavigate()
    const location=useLocation()
    const value=location.state
    const projectId=value.ProjectId
    const[project,setProject]=useState()
    const[loading,setLoading]=useState(true)
   const[stack,setStack]=useState()

   
    const getProject=async()=>{
      try{
        await fetch('/projects/bookmarked',{
          method:"POST",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            projectId
          })
        }).then(res=>res.json())
        .then(json=>{
          
          if(json){
            setProject(json)
            //console.log(json)
            setStack(json.Tech_Stack)
            setLoading(false)
          }
        })

      }catch(err){
        
      }
    }
    useEffect(()=>{
      getProject()
    },[0])

    const removeProject=async()=>{
      
      try{
        await fetch('projects/remove',{
          method:"DELETE",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            projectId
          })
        }).then(res=>{
          if(res.status===204){
            console.log("Deleted")
            navigate('/')
          }
        })
        
        
      }catch(err){
        
      }
    }
  
    
    if(loading){
      return(<>Loading...</>)
    }
    return (
    <>
    {project.Project_Name}<br/>
      {project.Date_Of_Created}<br/>
      <br />
      {
        stack.map((name,key)=>{
          return(
            <div key={key}>{name}</div>
          )
        })
      }
      <br />
      <a href={project.Github_Link} rel="noreferrer">{project.Github_Link}</a><br/>
      {project.About_Project}
      <br />
    <br/>
    <button onClick={removeProject}>Remove</button>
    
    </>
  )
}

export default BookmarkView