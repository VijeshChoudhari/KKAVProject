import React, { useEffect, useState,useContext} from 'react'
import {UserContext} from "../../App"
import {Link} from "react-router-dom"
import Serarch from '../homepage/assests/Serarch';
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
      console.log(json)
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
    <h1>Projects</h1>
    <div>{project.map((data,key)=>{
      return(<div><Link to="/externalProject"  state={data} key={key}>{data.Project_Name}</Link></div>)
    })}</div>
    <br />
    <br />
    
    {/* BookMark */}
    <Bookmarks/>
    <br />
    <br />
    {/* Searching */}
    <Serarch/>
  </>
    
  )
}

export default Project