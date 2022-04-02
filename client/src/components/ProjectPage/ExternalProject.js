import React from 'react'
import { Link } from 'react-router-dom'

function ExternalProject(props) {
  const data=props.project
  console.log("from userprojects",data)
  if(data){
    return (
      <div>
        <Link to="/externalProject" state={data}>{data.Project_Name}</Link>
</div>
     
    )
  }
  return (
    <div>hello</div>
   
  )
}

export default ExternalProject