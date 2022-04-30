import React, { useEffect, useState,useContext} from 'react'
import {UserContext} from "../../App"
import {Link} from "react-router-dom"
import styles from './css/Profile.module.css'
import Bookmarks from '../homepage/assests/Bookmarks';
import ReactLoading from 'react-loading'
function Profile() {
  const [profile,setProfile]=useState([])
  const {state,dispatch} =useContext(UserContext);
  const[isLoading,setIsLoading]=useState(true)
  
  const fetchData= async ()=>{
    try{
      await fetch('/projects/email',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      
    }).then(res=>res.json())
    .then(json=>{
      console.log(json)
      setProfile(json)
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
         
       
         profile.length===0?  <div className={styles.noData}><p className={styles.noDataName}>No Data</p></div>:
        <div className={styles.profileNames}>
        {profile.map((data,key)=>{
        return(
          <div className={styles.profiles}>
             <p className={styles.names}>{data.name}</p> 
            <Link to="/externalUser"
              state={data} 
              key={key}
              className={styles.profile}>
                View
            </Link>
          </div>)
        })
      }
    </div>
       }
    
    <Bookmarks/>
    </div>
  </>
    
  )
}

export default Profile