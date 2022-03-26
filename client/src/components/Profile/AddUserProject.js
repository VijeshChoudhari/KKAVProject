import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <h1>Add Project</h1>
    <form method='POST'>
        <input type="text" value={project_name} placeholder='Enter project name' onChange={e=>setName(e.target.value)}/>
    <br/>
        {tech_stack.map((tag,index)=><div key={tag.id}>{tag} <button onClick={() => deleteTag(index)}>x</button></div>)}
        <input type="text" value={input} placeholder='Add tags' onKeyDown={onKeyDown}  onKeyUp={onKeyUp} onChange={handleChange} />
        <br/>
        <input type="text" value={github_link} placeholder='Enter Project Link' onChange={e=>setLink(e.target.value)}/>
        <br/>
        <input type="text" value={about_project} placeholder='Start Typing here' onChange={e=>setAbout(e.target.value)}/>
        <br/>
      <input type="submit" onClick={submitData}/>
        
    </form>
    </>
  )
}

export default AddUserProject