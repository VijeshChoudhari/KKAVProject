import React, { useEffect, useState,useContext} from 'react'
import {UserContext} from "../../App"
import {Link} from "react-router-dom"
import styles from './css/Profile.module.css'
import Bookmarks from '../homepage/assests/Bookmarks';

function Profile() {
  const [profile,setProfile]=useState([])
  const {state,dispatch} =useContext(UserContext);

  
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
    })

    }
    catch(err){
      console.log(err)
    }
  }
 useEffect( () => {
   
 fetchData();
 }, [])
 
  return (
  <>
     <div className={styles.block}>
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
    <Bookmarks/>
    </div>
  </>
    
  )
}

export default Profile