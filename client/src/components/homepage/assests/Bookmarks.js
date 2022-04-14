import React,{useEffect, useState} from 'react'

function Bookmarks() {
    const [data,setData]=useState()
    const [isLoading,setIsLoading]=useState(true)
    const getBookmarks=async()=>{
        try{
            await fetch('/projects/getBookmarks',{
              method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
             
          }).then(res=>res.json())
          .then(json=>{
           console.log(json)
            setData(json)
            setIsLoading(false)
          })
          }
          catch(err){
            console.log(err)
          }
    }
    useEffect(()=>{
        getBookmarks()
    },[])

    const RemoveBookMark=()=>{

    }
    if(isLoading){
        return(
            <>isLoading</>
        )
    }
    return (
    <div>{data.map((user,key)=>{
        return(
            <><div>{user.ProjectName}<button onClick={RemoveBookMark}>remove</button>
            </div>
            </>
        )
    })}</div>
  )
}

export default Bookmarks