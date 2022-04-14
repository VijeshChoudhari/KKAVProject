import React,{useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

import Bookmarks from '../homepage/assests/Bookmarks'
import Serarch from '../homepage/assests/Serarch'

function ExternalUserProjDetail() {
const location=useLocation()
const value=location.state
console.log(value)

 const values=value.Tech_Stack
 const email=value.email
 const id=value._id

 const project_name=value.Project_Name
const [status,setStatus]=useState(false)
const [user,setUser]=useState(false)
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
    if(data.status===404){
      setStatus(false)
     
    }
    else if(data.message==="User Project"){
      setUser(true)
    }
    else if(data.status===200){
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
    console.log(json)
    
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
    <div>
      {value.Project_Name}<br/>
      {value.Date_Of_Created}<br/>
      {
        values.map(name=>{
          return(
            <div key={name.id}>{name}</div>
          )
        })
      }
      <a href={value.Github_Link} rel="noreferrer">{value.Github_Link}</a><br/>
      {value.About_Project}
      <br />
    <br />
    
    {/* BookMark */}
    {user?"":status? "":<button onClick={BookmarkNow}>Save</button>}
    
   
    <Bookmarks/>
    <br />
    <br />
    {/* Searching */}
    <Serarch/>
    </div>
  )
}

export default ExternalUserProjDetail