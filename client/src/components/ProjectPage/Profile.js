import React, { useEffect, useState,useContext} from 'react'
import {UserContext} from "../../App"
import {Link} from "react-router-dom"

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
    <h1>Profile</h1>
    <div>{profile.map((data,key)=>{
      return(<div><Link to="/externalUser"state={data} key={key}>{data.name}</Link></div>)
    })}</div>
  </>
    
  )
}

export default Profile