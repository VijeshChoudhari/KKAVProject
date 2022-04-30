import React,{useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

import Bookmarks from '../homepage/assests/Bookmarks'
import Serarch from '../homepage/assests/Serarch'
import styles from './css/ExternalUserProjectDetail.module.css'
import gitimage from '../../png css/Octocat.png'

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
    
    <div className={styles.block}>
    <div className={styles.ProjectName}>
        <p className={styles.projectname}>{value.Project_Name}</p>
        <p className={styles.teckstacks}>{
        values.map(name=>{
          return(
            <div className={styles.tech} key={name.id}>{name}</div>
          )
        })
      }</p>
      <a className={styles.link} href={value.Github_Link} target="_blank" rel="noreferrer"><img  className= {styles.images} src={gitimage} alt="" />{value.Github_Link}</a>
      {/* BookMark */}
      {isLoading?"Loading":user?"":status? "":reload?"":<button className={styles.button} onClick={BookmarkNow}>Save</button>}

      <p className={styles.about}> {value.About_Project}</p>
    
    </div>
    
    
    
    <Bookmarks value={postLength}/>
    
    </div>
  )
}

export default ExternalUserProjDetail