import React, { useContext,useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../../App'
import styles from './Navbar.module.css'
import block from '../../images/block.svg'

export const Navbar = () => {
  const {state,dispatch}=useContext(UserContext); 
  const RenderMenu=()=>{
    if(state===true){
      return(
        <>
         
            <div className={styles.Navbar}>
              <div className={styles.logo}><NavLink  to="/"><img className={styles.logoImage}src={block} alt="" /></NavLink> {" "}</div>
              <ul className={styles.navigation}>
                <li className={styles.list}>
                  <NavLink className={styles.a} to="/">Home</NavLink>  {" "}
                </li>
                <li className={styles.list}>
                  <NavLink className={styles.a} to="/Profile">Profile</NavLink>  {" "}
                </li>
                <li className={styles.list}>
                  <NavLink className={styles.button} to="/logout">Logout</NavLink>
                </li>
            </ul>
            </div>
          
        </>
      )
    }else{
      return(
        <>
          
            <div className={styles.Navbar}>
              <div className={styles.logo}><NavLink  to="/home"><img className={styles.logoImage}src={block} alt="" /></NavLink> {" "}</div>
              <ul className={styles.navigation}>
                <li className={styles.list}>
                <NavLink className={styles.a} to="/home">Home</NavLink>  {" "}
                </li>
                <li className={styles.list}>
                <NavLink className={styles.button} to="/login">Login</NavLink>
                </li>
              </ul>
             
             
            </div>
         
        </>
      )
    }


  }
  return (
    <>
    <nav>
     <RenderMenu/>
   </nav>
    </>
  )
}
