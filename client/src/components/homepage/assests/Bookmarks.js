import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import styles from './Bookmark.module.css'

function Bookmarks(props) {
  const postLength=props.value
    const [data,setData]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    
    
    const getBookmarks=async()=>{
      
        try{
            await fetch('/projects/getBookmarks',{
              method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
             
          }).then(res=>res.json())
          .then(json=>{
            console.log(data)
              setData(json)
              setIsLoading(false)
          })
          }
          catch(err){
            console.log(err)
          }
    }
    useEffect(()=>{
      
        getBookmarks() 
        
    },[postLength])

    
    if(isLoading){
        return(
            <>isLoading</>
        )
    }
    if(data.length===0){
      return(
        <div className={styles.bookmarkcont}>
        <h1 className={styles.heading}>My Bookmark</h1>
        <p className={styles.noData}>Empty</p>
        </div>
      )
    }
    return (
    <div className={styles.bookmarkcont}>
      <h1 className={styles.heading}>My Bookmark</h1>
      {data.map((user,key)=>{
        return(
            <>
            
              <Link className={styles.bookmarked} to="/userBookmarks" state={user}  key={user._id}>{user.ProjectName}</Link>
           
            </>
        )
      })}
    </div>
  )
}

export default Bookmarks