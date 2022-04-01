import React, { useEffect, useState } from 'react'


function Project() {
  const [project,setProject]=useState([])

  
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
    <div>Project</div>
  )
}

export default Project