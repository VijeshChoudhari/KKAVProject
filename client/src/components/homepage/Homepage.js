import {React,useEffect, useState,useContext}from 'react'
import { useNavigate,NavLink } from 'react-router-dom';

import styles from'./Homepage.module.css'

import {UserContext} from "../../App"
import Serarch from './assests/Serarch';
import Bookmarks from './assests/Bookmarks';
function Homepage() {

  const navigate=useNavigate()
  const [isLoading,setLoading]=useState(true)

  const {state,dispatch} =useContext(UserContext);



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
      <div>
        
      isLoading
      </div>
      </>
    )
  }
 
  return (
    <>
    <div className={styles.contmain}>
    <div className={styles.cont}>
      <p className={styles.heading}>Search your interest from here.</p>
     
      <p className={styles.para}>Search from 1000 of projects and implement it.</p>
      
    <Serarch/>
    
    <br/>
    </div>
    <div>
      
    <Bookmarks/>
    <div className={styles.linkcont}>

    <NavLink className={styles.projectlink + ' ' + styles.link} to="/projects">Projects</NavLink>
    <NavLink className={styles.profilelink+ ' '+ styles.link} to="/externalProfile">Profile</NavLink>
    </div>
    </div>
    </div>
    </>
  )
}

export default Homepage