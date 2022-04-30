import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/ExternalUserProfile.module.css'

function ExternalProject(props) {
  const data=props.project
  console.log("from userprojects",data)
  if(data){
    return (
      <>
       <div className={styles.projects}>
        <Link className={styles.project} to="/externalProject" state={data}>
        <p className={styles.projectname}>{data.Project_Name}</p>
        <p className={styles.projectabout}>{data.About_Project}</p>
        </Link>
      </div>
      </>
     
    )
  }
  return (
    <div>hello</div>
   
  )
}

export default ExternalProject