import React,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import styles from '../Homepage.module.css'
import searchpng from '../../../png css/Search.png'
function Serarch() {

const [project,setProject]=useState()
const [profile,setProfile]=useState()

const [searchFilter,setSearchFilter]=useState('')

  const [text,setText]=useState('')
  const [suggestions, setSuggestions] = useState([]);

  const[data,setData]=useState()
  const fetchData= async ()=>{
    try{
      await fetch('/projects/searchUser',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
       
    }).then(res=>res.json())
    .then(json=>{
     
      const {Profile,Project}=json
      setProfile(Profile)
      setProject(Project)
     
    })
    }
    catch(err){
      console.log(err)
    }
  }
 useEffect( () => {
   
 fetchData();
 }, [])
  
 const onChangeHandler =(text)=>{
  let matches=[]
  if(text.length>0){
      
      if(searchFilter==="Profile"){
      
        matches=profile.filter(profiles=>{
              const regex=new RegExp(`${text}`,"gi");
              console.log(profiles.name.match(regex))
              return profiles.name.match(regex)
          })
      }else if(searchFilter==="Project") {
        matches=project.filter(projects=>{
          const regex=new RegExp(`${text}`,"gi");
         
          return projects.Project_Name.match(regex)
      })
      }
  }

  /* suggestion list will be field with matches  */
  setSuggestions(matches)
  setText(text)
}

  
    
  const onSuggestHandler=(text)=>{
      setText(text);
      setSuggestions([]);   
  }
  const onpoplateHandler=()=>{
  if(text){
    if(searchFilter==="Project"){
      setData({})
      const indexOfProject=project.findIndex((projects,index)=>{  
        return projects.Project_Name===text 
         })
      setData(project[indexOfProject])
      

    }
   
    else if(searchFilter==="Profile"){
      setData({})
      const indexOfProfile=profile.findIndex((profiles,index)=>{  
        return profiles.name===text 
         })
      setData(profile[indexOfProfile])
      

    }
   
       

  
    
  } 
}
    
  return (
    <div className={styles.inputdiv}>
       <input type="text" className={styles.searchinp} placeholder='Search' value={text} onChange={(e)=>onChangeHandler(e.target.value)} />
   
    
    {data?  searchFilter==="Project"? <Link className={styles.searchbutton} to="/externalProject" state={data}>Go to</Link>:<Link className={styles.searchbutton} to="/externalUser" state={data}>Go to</Link>:<button className={styles.searchbutton} onClick={onpoplateHandler}><img className={styles.searchpng} src={searchpng}></img></button>}
    
<br/>
    <input className={styles.profilerad} type="radio" id="html" name="search" value="Profile" onChange={(e)=>setSearchFilter(e.target.value)}/>
    <label className={styles.profilelab} htmlFor="student">Profile</label>
    <input type="radio" id="html" name="search" value="Project"  onChange={(e)=>setSearchFilter(e.target.value)}/>
    <label className={styles.projectlab} htmlFor="student">project</label>
<br />
    <div className={styles.suggestcont}>
    {searchFilter==="Project"?suggestions && suggestions.map((suggestion,i)=>
      <div className={styles.suggest} onClick={()=>onSuggestHandler(suggestion.Project_Name)}key={i}>{suggestion.Project_Name}</div>                                
    ):suggestions && suggestions.map((suggestion,i)=>
    <div className={styles.suggest} onClick={()=>onSuggestHandler(suggestion.name)} key={i}>{suggestion.name}</div>                                
  ) }
  </div>
    </div>
  )
}

export default Serarch