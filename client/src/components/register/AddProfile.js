import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Addprofile.module.css'


export const AddProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [role, setRole] = useState('');
  const [place, setPlace] = useState('');
  const [social1Link, setSocial1Link] = useState('');
  const [social2Link, setSocial2Link] = useState('');


  const PostData = async (e) => {
    e.preventDefault();

    const res = await fetch("/user/addProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, profile, role, place, social1Link, social2Link
      })

    })

    const data = await res.json()

    if (data.status === 400 || !data) {

    }
    else {
      window.alert("Data registered Successfully")
      console.log("Data registered Successfully")
      navigate('/')
    }
  }
  return (

    <>
      <div className={styles.profilecont}>

        <p className={styles.heading}>Profile Setup</p>
        <p className={styles.heading2}>Setup your profile to now.</p>
        <form className={styles.form} method="POST">
          <label className={styles.label + ' ' +styles.namelab} htmlFor="">Name</label>
          <label className={styles.label + ' ' +styles.gitlab} htmlFor="">Github Profile</label>
          <br />

          <input className={styles.input + ' ' +styles.nameinp} type="text" name="name" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input className={styles.input + ' ' +styles.gitinp} type="text" id='Glink' name='social1Link' placeholder='Enter your Github Account' value={social1Link} onChange={(e) => setSocial1Link(e.target.value)} />
          <br />

          <label className={styles.label + ' ' +styles.profilelab} htmlFor="">Profile</label>
          <label className={styles.label + ' ' +styles.linkedlab} htmlFor="">LinkedIn Profile</label>
          <br />

          <input className={styles.radio} type="radio" id="html" name="profile" value="Student" onChange={(e) => setProfile(e.target.value)} />
          <label className={styles.radiolab} htmlFor="student">Student</label>

          <input className={styles.radio} type="radio" id="employee" name="profile" value="Employee" onChange={(e) => setProfile(e.target.value)} />
          <label className={styles.radiolab} htmlFor="employee">Employee</label>

          <input className={styles.radio} type="radio" id="self" name="profile" value="Self" onChange={(e) => setProfile(e.target.value)} />
          <label className={styles.radiolab} htmlFor="self">Self</label>

          <input className={styles.input + ' ' +styles.linkedinp} type="text" id='Llink' name='social2Link' placeholder='Enter your LinkedIn Account' value={social2Link} onChange={(e) => setSocial2Link(e.target.value)} />
          <br />

          <label className={styles.label + ' ' +styles.deplab} htmlFor="">Department/Role</label>
          <br />
          <input className={styles.input + ' ' +styles.depinp} type="text" id='department-role' name="role" placeholder='Enter your Department or Role' value={role} onChange={(e) => setRole(e.target.value)} />
          <br />
          <label className={styles.label + ' ' +styles.worklab} htmlFor="">College/Working at</label>
          <br />
          <input className={styles.input + ' ' +styles.workinp} type="text" id="college-working" name="place" placeholder='Enter your College or Working at' value={place} onChange={(e) => setPlace(e.target.value)} />

          <input className={styles.submit} type="submit" value="Continue" onClick={PostData} />

        </form>
      </div>
    </>
  )
}
