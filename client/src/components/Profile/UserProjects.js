import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/Profile.module.css'
function UserProjects(props) {
  const data=props.project
 
  if(data){
    return (
      <div className={styles.projects}>
        <Link className={styles.project} to="/UserProject" state={data}>
        <p className={styles.projectname}>{data.Project_Name}</p>
        <p className={styles.projectabout}>{data.About_Project}</p>
        </Link>
       
      </div>
     
    )
  }
  return (
    <div>hello</div>
   
  )
}

export default UserProjects