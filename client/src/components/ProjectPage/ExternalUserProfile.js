import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Bookmarks from '../homepage/assests/Bookmarks'
import Serarch from '../homepage/assests/Serarch'
import ExternalProject from './ExternalProject'
import styles from './css/ExternalUserProfile.module.css'
import gitimage from '../../png css/Octocat.png'
import linkedimage from '../../png css/linked.png'

function ExternalUserProfile() {
  const location=useLocation()
  const [project,setProject]=useState()
  const [isLoading,setIsLoading]=useState(true)
 const value=location.state
 const user=value.email
console.log(user)
 const fetchProject=async ()=>{
  try{
    await fetch('/projects/externalProjects',{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify({
      user
     })
    })
    .then(res=>res.json())
    .then(json=>{
      console.log(json)
     setProject(json)
     setIsLoading(false)
   })
 }
 catch(err){
   console.log(err)
 }
 }
 useEffect( () => {
   fetchProject();
  
  }, [])
  if(isLoading){
    return(<>Loading</>)
  }
  return (
    <><div className={styles.block}>
     <div>
     <div className={styles.userData}>
          <div className={styles.Data}>
          <p className={styles.userName}>{value.name}</p>
          <p className={styles.profile}>{value.profile}</p>
          <p className={styles.desc}>{value.role}</p>
          <p className={styles.desc}>{value.place}</p>
          </div>
          <div className={styles.Links}> 
            <a className={styles.gitLink} href={value.social1Link}><img  className= {styles.images} src={gitimage} alt="" />{value.social1Link}</a>
            <a className={styles.LinkedIn} href={value.social2Link}><img className={styles.images} src={linkedimage} alt="" />{value.social2Link}</a>
          </div>
      </div>
      <div className={styles.userProject}>
    {
      project.map((data1,key)=>{
        return(
          <ExternalProject project={data1} key={data1.id}/>
          )
        })
      }
      </div>
     
     </div> 
        <Bookmarks/>
    </div>
        
  
    </>
   
  )
}

export default ExternalUserProfile