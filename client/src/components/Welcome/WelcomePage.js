import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Welcomepage.module.css'

function WelcomePage() {
  return (
    <>
    <div>
      <p className={styles.welcome}><b>Welcome!</b></p>
      <p className={styles.intro}>Create your own project portfolio <br></br>
      Explore others project</p>
      <NavLink className={styles.join} to='/register'>Join Now.</NavLink>
    </div>
    
    </>
  )
}

export default WelcomePage