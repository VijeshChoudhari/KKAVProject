import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

function Bookmarks() {
    const [data,setData]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    
    const getBookmarks=async()=>{
      let isMounted = true
        try{
            await fetch('/projects/getBookmarks',{
              method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
             
          }).then(res=>res.json())
          .then(json=>{
            if(json.message==="Empty"){
            
              setIsLoading(false)

            }else{
              if(isMounted) setData(json)
              setIsLoading(false)
            }
            isMounted=false    
          })
          }
          catch(err){
            console.log(err)
          }
    }
    useEffect(()=>{
      
        getBookmarks() 
        
    },[data])

    
    if(isLoading){
        return(
            <>isLoading</>
        )
    }
    return (
    <div>
      <h1>Bookmarks</h1>
      {data.map((user,key)=>{
        return(
            <>
            
              <Link to="/userBookmarks" state={user}  key={user._id}>{user.ProjectName}</Link>
           
            </>
        )
    })}</div>
  )
}

export default Bookmarks