import React, { useEffect, useState, useContext} from 'react'
import {Navigate, useLocation, useNavigate} from'react-router-dom'
import Bookmarks from '../homepage/assests/Bookmarks'
import styles from './css/Bookmark.module.css'
import gitimage from '../../png css/Octocat.png'
import {UserContext} from "../../App"



function BookmarkView() {
  const {state,dispatch} =useContext(UserContext);
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
            dispatch({type:"USER",payload:true})
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
    <div className={styles.block}>
      <div className={styles.ProjectName}>
      <p className={styles.projectname}>{project.Project_Name}</p>
      <p className={styles.teckstacks}>
        {
          stack.map((name,key)=>{
            return(
              <div className={styles.tech}  key={key}>{name}</div>
            )
          })
        }
      </p>
      
        <a className={styles.link} href={project.Github_Link} target="_blank" rel="noreferrer"><img  className= {styles.images} src={gitimage} alt="" />{project.Github_Link}</a>
        <button className={styles.button} onClick={removeProject}>Remove</button>
        
        <p className={styles.about}> {project.About_Project}</p>
        
      
      </div>
    <Bookmarks/>
    </div>
    </>
  )
}

export default BookmarkView