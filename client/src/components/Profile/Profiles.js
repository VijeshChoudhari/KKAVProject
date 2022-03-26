import {React,useEffect,useState} from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import UserProjects from './UserProjects';



function Profiles() {
    const navigate=useNavigate()
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
          console.log(data) 
          console.log(Projects)
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
      
    
      </>
    )
  
}

export default Profiles