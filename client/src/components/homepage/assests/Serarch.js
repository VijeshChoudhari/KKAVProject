import React,{useState}from 'react'

function Serarch() {
    
    const handleData=()=>{
        try{
            
            
        }catch(err){
      
        }
      }
      const [value,setValue]=useState('')
  return (
    <div><input type="text" placeholder='Search' value={value} onChange={(e)=>setValue(e.target.value)} />
    
    <button onClick={handleData}>Search</button>
    </div>
  )
}

export default Serarch