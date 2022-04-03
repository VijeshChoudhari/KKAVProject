import {React,useEffect, useState,useContext}from 'react'
import { useNavigate,NavLink } from 'react-router-dom';

import {UserContext} from "../../App"
import Serarch from './assests/Serarch';
function Homepage() {

  const navigate=useNavigate()
  const [isLoading,setLoading]=useState(true)
  const {state,dispatch} =useContext(UserContext);

  const [value,setValue]=useState('')
  const callHomePage=async ()=>{

    try{
      await fetch('/user',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      
      }).then(res=>res.json())
      .then(()=>{
          dispatch({type:"USER",payload:true})
          setLoading(false)
      })
     
    
    }catch(err){
      dispatch({type:"USER",payload:false})
      console.log(err)
      navigate('/home');
    }
  }

  useEffect(() => {
    callHomePage();
  }, [])
  
  if(isLoading){
    return(
      <>
      isLoading
      </>
    )
  }
  return (
    <>
    <div>
      <h1>Search your interest from here.</h1>
     
      <p>Search from 1000 of projects and implement it.</p>
    </div>
    <Serarch/>
    <br/>
    
    <NavLink to="/projects">Projects</NavLink><br/>
    <NavLink to="/externalProfile">Profile</NavLink>
    </>
  )
}

export default Homepage