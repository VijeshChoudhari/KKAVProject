import {React,useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom';
import Bookmarks from '../homepage/assests/Bookmarks';
import Serarch from '../homepage/assests/Serarch';
import UserProjects from './UserProjects';


//User Profile View
function Profiles() {
   
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
      return<>is Loading</>;
    }
    return (
      <>
      <h1>About User</h1>
      {data.name}<br/>
      {data.role}<br/>
      {data.place}<br/>
  
      <a href={data.social1Link}>{data.social1Link}</a><br/>
      {data.social2Link}
  
      <h2>Project</h2>
      {
          project.map((data1,key)=>{
            
            return(
            
              <UserProjects project={data1} key={data1.id}/>
            )
          })
        }
       
    <br/>
    <NavLink to="/AddProject">Add Project</NavLink>
    <br />
    <br />
    
    {/* BookMark */}
    <Bookmarks/>
    
     
      </>
    )
  
}

export default Profiles