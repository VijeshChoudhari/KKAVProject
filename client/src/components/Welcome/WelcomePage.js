import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Welcomepage.module.css'

function WelcomePage() {
  return (
    <>
    <div className={styles.block}>
      <p className={styles.welcome}>Welcome!</p>
      <p className={styles.intro}>Create your own project portfolio <br></br>
      Explore others project</p>
      <NavLink className={styles.join} to='/login'>Register Now</NavLink>
    </div>
    
    </>
  )
}

export default WelcomePage