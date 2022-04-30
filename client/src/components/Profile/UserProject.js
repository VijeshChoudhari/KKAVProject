import React from 'react'
import {useLocation} from 'react-router-dom'
import Bookmarks from '../homepage/assests/Bookmarks'
import Serarch from '../homepage/assests/Serarch'
import styles from './css/Project.module.css'
import gitimage from '../../png css/Octocat.png'
//User project View
function UserProject() {
  const location=useLocation()
 const value=location.state

 const values=value.Tech_Stack
  return (
    <div className={styles.block}>
      
      <div className={styles.ProjectName}>
        <p className={styles.projectname}>{value.Project_Name}</p>
        <p className={styles.teckstacks}>{
        values.map(name=>{
          return(
            <div className={styles.tech} key={name.id}>{name}</div>
          )
        })
      }</p>
      <a className={styles.link} href={value.Github_Link} target="_blank" rel="noreferrer"><img  className= {styles.images} src={gitimage} alt="" />{value.Github_Link}</a>
      <p className={styles.about}> {value.About_Project}</p>
    
      </div>
      <Bookmarks/>
     
    </div>
  )
}

export default UserProject