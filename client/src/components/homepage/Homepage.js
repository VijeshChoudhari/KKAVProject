import {React,useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Homepage() {
  const navigate=useNavigate()
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
      .then(json=>{
        const{Cookie,...data}=json
        
      })
     
    
    }catch(err){
    
      console.log(err)
      navigate('/home');
    }
  }

  useEffect(() => {
    callHomePage();
  }, [])
  
  return (
    <>
    <div>
      <h1>Search your interest from here.</h1>
     
      <p>Search from 1000 of projects and implement it.</p>
    </div>
    <input type="text" placeholder='Search' />
    <button>Search</button>
    
    </>
  )
}

export default Homepage