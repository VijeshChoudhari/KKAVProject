import React, { useContext,useEffect } from 'react'

import {NavLink} from 'react-router-dom'
import { UserContext } from '../../App'
import styles from './Navbar.module.css'
export const Navbar = () => {
  const {state,dispatch}=useContext(UserContext);
 
  const RenderMenu=()=>{
    if(state===true){

      return(
        <>
        <div className={styles.Navbar}>

        <NavLink className={styles.a} to="/">Logo</NavLink> {" "}
        <NavLink className={styles.a} to="/">Home</NavLink>  {" "}
        <NavLink className={styles.a} to="/Profile">Profile</NavLink>  {" "}
        <NavLink className={styles.a} to="/contact">Contact</NavLink>   {" "}
        <NavLink className={styles.rightnav+' '+styles.a} to="/logout">Logout</NavLink>
        </div>
        </>
      )
    }else{
      return(
        <>
        <div className={styles.Navbar}>

        <NavLink className={styles.a} to="/home">Logo</NavLink> {" "}
        <NavLink className={styles.a} to="/home">Home</NavLink>  {" "}
        <NavLink className={styles.a} to="/contact">Contact</NavLink>  {" "}
       
        <NavLink className={styles.rightnav+' '+styles.a} to="/register">Register</NavLink>
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
