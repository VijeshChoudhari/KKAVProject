import React, { useEffect, useState,useContext} from 'react'
import {UserContext} from "../../App"
import {Link} from "react-router-dom"
import styles from './css/Project.module.css'
import Bookmarks from '../homepage/assests/Bookmarks';

function Project() {
  const [project,setProject]=useState([])
  const {state,dispatch} =useContext(UserContext);
const[isLoading,setIsLoading]=useState(true)
  
  const fetchData= async ()=>{
    try{
      await fetch('/projects/all',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      
    }).then(res=>res.json())
    .then(json=>{
      
      setProject(json)
      dispatch({type:"USER",payload:true})
      setIsLoading(false)
    })

    }
    catch(err){
      console.log(err)
    }
  }
 useEffect( () => {
   
 fetchData();
 }, [])
 if(isLoading){
   return(
     <div>IsLoading</div>
   )
 }

  return (
  <>
    <div className={styles.block}>
    <div className={styles.projectNames}>
      {project.map((data,key)=>{
        return(
          
          <div className={styles.projects}>
            <p className={styles.names}>{data.Project_Name}</p> 
            <Link to="/externalProject" 
              state={data} 
              key={key}
              className={styles.project}>
              View
            </Link>
          </div>)
        })
      }
    </div>

    <Bookmarks/>

    </div>
    
    
    
    {/* BookMark */}
    
    
  </>
    
  )
}

export default Project