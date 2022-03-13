import {React,useState} from 'react'


export const AddProfile = () => {
  const [userDetail,setUserDetail]=useState({
    name:"",
    profile:"",
    role:"",
    place:"",
    social1Link:"",
    social2Link:""

  })
  let name,value;
  const handleInputData=(e)=>{
    name=e.target.name;
  value=e.target.value
  setUserDetail({...userDetail,[name]:value})
  }

  const PostData=async (e)=>{
    e.preventDefault();
    const {name,profile,role,place,social1Link,social2Link}=userDetail;
    const res=await fetch("/User/addProfile",{
      method:"POST",
      header:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,profile,role,place,social1Link,social2Link
      })

    })
    const data=await res.json()
    if(data.status===422 ||!data){
      window.alert("Invalid Data input")
      console.log("Invalid Data input")
    }
    else{
      window.alert("Data registered Successfully")
      console.log("Data registered Successfully")
      
    }
  }
  return (

    <>
    <div>
        <h1>Profile Setup</h1>
        <h3>Setup your profile to now.</h3>
    </div>
    <form method="POST">
        <label htmlFor="">Name</label><br/>
        <input type="text" name="name" placeholder='Enter Name' onChange={handleInputData}/>
        <br/>
        <br/>
        <label htmlFor="">Profile</label><br/>
        <input type="radio" id="html" name="profile" value="Student" onChange={handleInputData}/>
        <label htmlFor="student">Student</label>
        <input type="radio" id="employee" name="profile" value="Employee" onChange={handleInputData}/>
        <label htmlFor="employee">Employee</label>
        <input type="radio" id="self" name="profile" value="Self" onChange={handleInputData}/>
        <label htmlFor="self">Self</label>
        <br/>
        <br/>
        <label htmlFor="">Department/Role</label><br/>
        <input type="text" id='department-role' name="role" placeholder='Enter your Department or Role ' onChange={handleInputData}/>
        <br/>
        <br/>
        <label htmlFor="">College/Working at</label><br/>
        <input type="text" id="college-working" name="place" placeholder='Enter your College or Working at' onChange={handleInputData}/>
        <br/>
        <br/>
        <label htmlFor="">Github Profile</label><br/>
        <input type="text" id='Glink' name='social1Link' placeholder='Enter your Github Account' onChange={handleInputData} />
        <br/>
        <br/>
        <label htmlFor="">LinkedIn Profile</label><br/>
        <input type="text" id='Llink' name='social2Link' placeholder='Enter your LinkedIn Account' onChange={handleInputData}/>
        <br/>
        <br/>
        <input type="submit" onClick={PostData}/>
        
    </form>
    </>
  )
}
