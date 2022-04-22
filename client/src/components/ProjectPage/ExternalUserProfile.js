import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Bookmarks from '../homepage/assests/Bookmarks'
import Serarch from '../homepage/assests/Serarch'
import ExternalProject from './ExternalProject'
import styles from './ExternalUserProfile.module.css'
import gitpng from '../../png css/Octocat.png'
import linkedpng from '../../png css/linked.png'
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
    <div className={styles.profilecont}>
      <div className={styles.profilesec}>

      <div className={styles.userinfo}>
      <h5 className={styles.username}>{value.name}
      <a className={styles.gitlink} href={value.social1Link}><img src={gitpng}></img>Github Link</a></h5><br/>
     {value.role}/
     {value.profile}
     <a className={styles.linkedlink} href={value.social2Link}><img src={linkedpng}></img>Linkedin Link</a><br/>
     {value.place}<br/>
     </div>
    <div className={styles.userproject}>

    {
      project.map((data1,key)=>{
        
        return(
          
          <ExternalProject project={data1} key={data1.id}/>
          )
        })
      }
      </div>
        
        </div>
        <div className={styles.bookmarkcont}>
        <Bookmarks/>
         <section className={styles.searchsec}>
        <Serarch/>
           </section> 
        </div>
        
    </div>
    
  )
}

export default ExternalUserProfile