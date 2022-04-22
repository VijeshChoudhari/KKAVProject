import React from 'react'
import {useLocation} from 'react-router-dom'
import Serarch from '../homepage/assests/Serarch'

//User project View
function UserProject() {
  const location=useLocation()
 const value=location.state

 const values=value.Tech_Stack
  return (
    <div>
      {value.Project_Name}<br/>
      {value.Date_Of_Created}<br/>
      {
        values.map(name=>{
          return(
            <div key={name.id}>{name}</div>
          )
        })
      }
      <a href={value.Github_Link} rel="noreferrer">{value.Github_Link}</a><br/>
      {value.About_Project}
      
    </div>
  )
}

export default UserProject