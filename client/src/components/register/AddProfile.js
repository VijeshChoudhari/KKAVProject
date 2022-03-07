import React from 'react'

export const AddProfile = () => {
  return (
    <>
    <div>
        <h1>Profile Setup</h1>
        <h3>Setup your profile to now.</h3>
    </div>
    <form action="">
        <label htmlFor="">Name</label><br/>
        <input type="text" name="name" placeholder='Enter Name' />
        <br/>
        <br/>
        <label htmlFor="">Profile</label><br/>
        <input type="radio" id="html" name="profile" value="Student"/>
        <label for="student">Student</label>
        <input type="radio" id="employee" name="profile" value="Employee"/>
        <label for="employee">Employee</label>
        <input type="radio" id="self" name="profile" value="Self"/>
        <label for="self">Self</label>
        <br/>
        <br/>
        <label htmlFor="">Department/Role</label><br/>
        <input type="text" id='department-role' placeholder='Enter your Department or Role ' />
        <br/>
        <br/>
        <label htmlFor="">College/Working at</label><br/>
        <input type="text" id="college-working" placeholder='Enter your College or Working at'/>
        <br/>
        <br/>
        <label htmlFor="">Github Profile</label><br/>
        <input type="text" id='Glink' name='Link' placeholder='Enter your Github Account' />
        <br/>
        <br/>
        <label htmlFor="">LinkedIn Profile</label><br/>
        <input type="text" id='Llink' name='Link' placeholder='Enter your LinkedIn Account' />
        <br/>
        <br/>
        <input type="submit" />
        
    </form>
    </>
  )
}
