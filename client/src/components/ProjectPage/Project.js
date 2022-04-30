import React, { useEffect, useState,useContext} from 'react'
import {UserContext} from "../../App"
import {Link} from "react-router-dom"
import styles from './css/Project.module.css'
import Bookmarks from '../homepage/assests/Bookmarks';
import ReactLoading from 'react-loading'

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
    <>
    <div className={styles.loading}>
      <ReactLoading type="spin" color="#fff" />
      <h2>Fetching Data</h2>
    </div>
    </>
  )
}


  return (
  <>
    <div className={styles.block}>
    {
       
        project.length===0? <div className={styles.noData}><p className={styles.noDataName}>No Data</p></div>:
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
      }
    

    <Bookmarks/>

    </div>
    
    
    
    {/* BookMark */}
    
    
  </>
    
  )
}

export default Project