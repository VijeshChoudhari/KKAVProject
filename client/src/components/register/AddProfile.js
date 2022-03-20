import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom';


export const AddProfile = () => {
  const navigate=useNavigate();
  const [name,setName]=useState('');
  const [profile,setProfile]=useState('');
  const [role,setRole]=useState('');
  const [place,setPlace]=useState('');
  const [social1Link,setSocial1Link]=useState('');
  const [social2Link,setSocial2Link]=useState('');


  const PostData=async (e)=>{
    e.preventDefault();

    const res=await fetch("/user/addProfile",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,profile,role,place,social1Link,social2Link
      })

    })
 
    const data=await res.json()
    
    if(data.status===400 ||!data){
      
    }
    else{
      window.alert("Data registered Successfully")
      console.log("Data registered Successfully")
      navigate('/')
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
        <input type="text" name="name" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <br/>
        <br/>
        <label htmlFor="">Profile</label><br/>
        <input type="radio" id="html" name="profile" value="Student" onChange={(e)=>setProfile(e.target.value)}/>
        <label htmlFor="student">Student</label>
        <input type="radio" id="employee" name="profile" value="Employee" onChange={(e)=>setProfile(e.target.value)}/>
        <label htmlFor="employee">Employee</label>
        <input type="radio" id="self" name="profile" value="Self" onChange={(e)=>setProfile(e.target.value)}/>
        <label htmlFor="self">Self</label>
        <br/>
        <br/>
        <label htmlFor="">Department/Role</label><br/>
        <input type="text" id='department-role' name="role" placeholder='Enter your Department or Role' value={role} onChange={(e)=>setRole(e.target.value)}/>
        <br/>
        <br/>
        <label htmlFor="">College/Working at</label><br/>
        <input type="text" id="college-working" name="place" placeholder='Enter your College or Working at' value={place} onChange={(e)=>setPlace(e.target.value)}/>
        <br/>
        <br/>
        <label htmlFor="">Github Profile</label><br/>
        <input type="text" id='Glink' name='social1Link' placeholder='Enter your Github Account' value={social1Link}onChange={(e)=>setSocial1Link(e.target.value)} />
        <br/>
        <br/>
        <label htmlFor="">LinkedIn Profile</label><br/>
        <input type="text" id='Llink' name='social2Link' placeholder='Enter your LinkedIn Account' value={social2Link} onChange={(e)=>setSocial2Link(e.target.value)}/>
        <br/>
        <br/>
        <input type="submit" onClick={PostData}/>
        
    </form>
    </>
  )
}
