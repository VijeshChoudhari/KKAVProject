import React from 'react'
import { Link } from 'react-router-dom'
import Serarch from '../homepage/assests/Serarch'

function ExternalProject(props) {
  const data=props.project
  console.log("from userprojects",data)
  if(data){
    return (
      <>
      <div>
        <Link to="/externalProject" state={data}>{data.Project_Name}</Link>
      </div>
      <br />
      <br />
      
      {/* BookMark */}
      {/* Searching */}
      <Serarch/>
      </>
     
    )
  }
  return (
    <div>hello</div>
   
  )
}

export default ExternalProject