import React,{useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

import Bookmarks from '../homepage/assests/Bookmarks'
import Serarch from '../homepage/assests/Serarch'

function ExternalUserProjDetail() {
const location=useLocation()
const value=location.state


 const values=value.Tech_Stack
 const email=value.email
 const id=value._id

 const project_name=value.Project_Name
const [status,setStatus]=useState(false)
const [reload,setReload]=useState(false)
const [user,setUser]=useState(false)
const[isLoading,setIsLoading]=useState(true)
const[postLength,setPostlength]=useState(0)
const checkBookmark=async()=>{
  try{
    await fetch('/projects/id',{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
      id,project_name
       })
  }).then(data=>{
    if(data.status===204){
      setIsLoading(false)
      setStatus(false)
      
      
     
    }
    else if(data.message==="User Project"){
      setIsLoading(false)
      setUser(true)
   
      
    }
    else if(data.status===200){
      setIsLoading(false)
      setStatus(true)
      data=data.json()
     
      
    }
  })
  

  }catch(err){
    console.log("Error")
  }
}
 const BookmarkNow=async()=>{
  try{
    await fetch('/projects/addBookmark',{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
      email,id,project_name
       })
  }).then(data=>data.json())
  .then(json=>{
    setPostlength(postLength+1)
    
    setReload(true)
    
    
  })
}
  catch(err){
    console.log(err)
  }
 }
 useEffect(()=>{
  checkBookmark()
 },[])

 

  return (
    
    <div className=''>
      {value.Project_Name}<br/>
      {value.Date_Of_Created}<br/>
      {
        values.map(name=>{
          return(
            <div key={name.id}>{name}</div>
          )
        })
      }
      <a href={value.Github_Link} target="_blank" rel="noreferrer">{value.Github_Link}</a><br/>
      {value.About_Project}
      <br />
    <br />
    
    {/* BookMark */}
    {isLoading?"Loading":user?"":status? "":reload?"":<button onClick={BookmarkNow}>Save</button>}
    
    

   <Bookmarks value={postLength}/>
    
    </div>
  )
}

export default ExternalUserProjDetail