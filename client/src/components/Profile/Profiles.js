import {React,useEffect,useState,useContext} from 'react'
import { NavLink } from 'react-router-dom';
import Bookmarks from '../homepage/assests/Bookmarks';
import ReactLoading from "react-loading";
import UserProjects from './UserProjects';
import styles from './css/Profile.module.css'
import gitimage from'../../png css/Octocat.png'
import linkedimage from '../../png css/linked.png'
import addimage from '../../png css/Add.svg'
import {UserContext} from "../../App"
//User Profile View
function Profiles() {
  const {state,dispatch} =useContext(UserContext);
   
    const [data,setData]=useState({})
    const [project,setProject]=useState({})
    const [isLoading,setLoading]=useState(true)
   
    useEffect(() => {
           
            callProject();
    },[])
    const callProject=async ()=>{
      try{
         await fetch('/projects/userProject',{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
         })
         .then(res=>res.json())
         .then(json=>{
          const {Projects,...data}=json
          
          setData(data)
          setProject(Projects)  
          setLoading(false)
        })
      }
      catch(err){
        console.log(err)
      }
    }
    if(isLoading){
      return(
        <>
      <div className={styles.loading}>
        <ReactLoading type="spin" color="#fff" />
        <h2>Fetching Data</h2>
      </div>
      </>
      )
    }
    dispatch({type:"USER",payload:true})
    return (
      <><div className={styles.block}>
        <div>
        <div className={styles.userData}>
          <div className={styles.Data}>
          <p className={styles.userName}>{data.name}</p>
          <p className={styles.profile}>{data.profile}</p>
          <p className={styles.desc}>{data.role}</p>
          <p className={styles.desc}>{data.place}</p>
          </div>
          <div className={styles.Links}> 
            <a className={styles.gitLink} href={data.social1Link} target="_blank" rel="noreferrer"><img  className= {styles.images} src={gitimage} alt="" />{data.social1Link}</a>
            <a className={styles.LinkedIn} href={data.social2Link} target="_blank" rel="noreferrer"><img className={styles.images} src={linkedimage} alt="" />{data.social2Link}</a>
          </div>
        </div>
      
      <div className={styles.userProject}>
        {
          project.map((data1,key)=>{
            return(
              <UserProjects project={data1} key={data1.id}/>
            )
          })
        }
        <NavLink className={styles.addproject} to="/AddProject"><img src={addimage} alt="" /></NavLink>
      </div>
        </div>
        {/* BookMark */}
        <Bookmarks/>

      </div>
       

   
      </>
    )
  
}

export default Profiles