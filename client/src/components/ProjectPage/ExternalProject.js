import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/ExternalUserProfile.module.css'

function ExternalProject(props) {
  const data=props.project

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

export default ExternalProject