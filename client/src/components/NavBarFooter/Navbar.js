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
        <><div className={styles.blockarea}>
           <NavLink  to="/"><img className={styles.image} src={block} alt="logo" /></NavLink> {" "}
        <div className={styles.Navbar}>

        
        <NavLink className={styles.a} to="/">Home</NavLink>  {" "}
        <NavLink className={styles.a} to="/Profile">Profile</NavLink>  {" "}
        {/* <NavLink className={styles.a} to="/contact">Contact</NavLink>   {" "} */}
        <NavLink className={styles.rightnav+' '+styles.a} to="/logout">Logout</NavLink>
        </div>
        </div>
       
        </>
      )
    }else{
      return(
        <>
        <div className={styles.blockarea}>
        <NavLink  to="/home"><img className={styles.image} src={block} alt="logo" /></NavLink> {" "}
        <div className={styles.Navbar}>

        
        <NavLink className={styles.a} to="/home">Home</NavLink>  {" "}
      {/*   <NavLink className={styles.a} to="/contact">Contact</NavLink>  {" "} */}
       
        <NavLink className={styles.rightnav+' '+styles.a} to="/login">Login</NavLink>
        </div>
    
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
