import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './css/Addproject.module.css'
function AddUserProject() {
    const navigate=useNavigate();
    const [project_name,setName]=useState('')
    const [github_link,setLink]=useState('')
    const [about_project,setAbout]=useState('')

    const [tech_stack,setStack]=useState([])
    const [input,setInput]=useState('')
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    const handleChange=(e)=>{
       const {value}=e.target;
       setInput(value)
    }
    const onKeyDown=(e)=>{
        const {key}=e;
        const trimmedInput=input.trim();
        if(key==="Enter" && trimmedInput.length && !tech_stack.includes(trimmedInput) )  {
            e.preventDefault();
            setStack(prevState=>[...prevState,trimmedInput]);
            setInput('')
        }
        if (key === "Backspace" && !input.length && tech_stack.length && isKeyReleased) {
            e.preventDefault();
            const tagsCopy = [...tech_stack];
            const poppedTag = tagsCopy.pop();
        
            setStack(tagsCopy);
            setInput(poppedTag);
          }
        
          setIsKeyReleased(false);      
    }
    const onKeyUp = () => {
        setIsKeyReleased(true);
      }

      const deleteTag = (index) => {
        setStack(prevState => prevState.filter((tag, i) => i !== index))
      }
      const submitData=async (e)=>{
        e.preventDefault();
        const res=await fetch("/projects/add",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            }, 
            body:JSON.stringify({
               project_name,tech_stack,github_link,about_project
               })

        })
        const data=await res.json()
        if(!res.status===200 || !data){
            console.log("error")
        }
        else{
            console.log("added")
            navigate("/Profile")
        }
      }
  return (
    <>
    <div>
      <form method='POST'>

        <div className={styles.addData}>
        <label 
        htmlFor="projectName">Name
        </label>

        <input type="text"
        id='projectName'
        value={project_name} 
        placeholder='Enter project name' 
        onChange={e=>setName(e.target.value)}/>


        
        <label 
        htmlFor="stack">Stack
        </label>
        
        {tech_stack.map((tag,index)=><div key={tag.id}>{tag}
          <button onClick={() => deleteTag(index)}>cancel</button>
        </div>)}

      
        
        <input type="text" 
        id='stack'
        value={input} 
        placeholder='Add tags' 
        onKeyDown={onKeyDown}  
        onKeyUp={onKeyUp} 
        onChange={handleChange} />
        
        
        <label 
        htmlFor="link">link
        </label>

        <input type="text" 
        id='link'
        value={github_link} 
        placeholder='Enter Project Link' 
        onChange={e=>setLink(e.target.value)}/>
        
        
        <label 
        htmlFor="about">About
        </label>
        
        <input type="text" 
        id='about'
        value={about_project} 
        placeholder='Start Typing here' 
        onChange={e=>setAbout(e.target.value)}/>

        </div>
        
      <input type="submit" onClick={submitData}/>
        
    </form>
    

    </div>

      
    </>
  )
}

export default AddUserProject