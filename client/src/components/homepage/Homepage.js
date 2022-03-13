import {React,useEffect }from 'react'
import { useNavigate } from 'react-router-dom';
function Homepage() {
  const navigate=useNavigate()
  const callHomePage=async ()=>{

    try{
      const res=await fetch('/user',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      
      })
      const data = await res.json();
      console.log(data);
      if(!res.status===200){
       
        const error =new Error(res.error);
        throw error;
       
      }
    
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