import React from 'react'
import { Link } from 'react-router-dom'

function UserProjects(props) {
  const data=props.project
  console.log("from userprojects",data)
  if(data){
    return (
      <div>
        <Link to="/UserProject" state={data}>{data.Project_Name}</Link>
</div>
     
    )
  }
  return (
    <div>hello</div>
   
  )
}

export default UserProjects