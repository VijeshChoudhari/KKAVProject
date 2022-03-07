import React from 'react'
import { NavLink } from 'react-router-dom'

function WelcomePage() {
  return (
    <>
    <div>
      <h1>Welcome!</h1>
      <h2>Create your own project portfolio</h2>
      <h2>Explore others porject</h2>
      <NavLink to='/register'>Join Now</NavLink>
    </div>
    
    </>
  )
}

export default WelcomePage