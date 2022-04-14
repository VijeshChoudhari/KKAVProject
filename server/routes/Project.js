const express = require('express')
const router = express.Router()
const UserProject = require('../models/Project') 
const Signup = require('../models/Signup_model')
const jwt = require('jsonwebtoken')
const {ProjectValidation} = require('../validation/validation')
const Bookmark = require('../models/Bookmark')
const UserProfile = require('../models/User_profile')

router.post('/add', async(req,res)=>{
    
    //checking if sending user is valid or not
    const cookie = req.headers?.cookie
    if(cookie){

        const cookieValue = cookie.slice(4)
        const claims = jwt.verify(cookieValue , process.env.TOKEN_SECRET)
        
        if(!claims){
            return res.status(401).send({
                message : "Unauthenticated"
            })
        }
        //searching user from token
        const user = await Signup.findOne({_id : claims._id})
        const {password , ...data} = user.toJSON()
       
        //Validating data of Project
        const {error} = ProjectValidation(req.body)
        if(error) return res.status(402).send(error)
        

        const userproject = new UserProject({
            Email : data.email,
            Project_Name : req.body.project_name,
            Tech_Stack : req.body.tech_stack,
            Github_Link : req.body.github_link,
            About_Project : req.body.about_project
        })
        //Saving Project to database
        try{
            const savedData = await userproject.save()
            res.send(savedData)
        }catch(err){
            res.send(err)
        }

    }
    else{
        res.status(402).send({message : "You're not logged in"})
    }

})
//Route to retrive user project
router.get('/userProject',async(req,res)=>{
    const cookie = req.headers?.cookie
    if(cookie){

        const cookieValue = cookie.slice(4)
        const claims = jwt.verify(cookieValue , process.env.TOKEN_SECRET)
        
        if(!claims){
            return res.status(401).send({
                message : "Unauthenticated"
            })
        }    
        //searching user from token
        const user = await Signup.findOne({_id : claims._id})
        const {password , ...data} = user.toJSON()
        const Projects=await UserProject.find()
        const userProject= Projects.filter(item=>item.Email===data.email)
        const getUserStatus=await UserProfile.findOne({email : data.email })
        const {_id,...profileData}=getUserStatus.toJSON()
        profileData["Projects"]=userProject
        res.status(200).send(profileData)

    }
    else{
        res.status(402).send({message : "You're not logged in"})
    }
})
//Router for retrieving all Project data of all users
router.get('/all', async(req,res)=>{
    const cookie = req.headers?.cookie
    if(cookie){

        const cookieValue = cookie.slice(4)
        const claims = jwt.verify(cookieValue , process.env.TOKEN_SECRET)
        
        if(!claims){
            return res.status(401).send({
                message : "Unauthenticated"
            })
        }
        const user = await Signup.findOne({_id : claims._id})
        const {password , ...data} = user.toJSON()
        const getUserStatus=await UserProfile.findOne({email : data.email })
        if(getUserStatus){
            UserProject.find((err,data)=>{
                if(!err){
                    res.json(data)
                }
                else{
                    res.status(400).send({message : "Data not found"})
                }
            })
            
        }else{
            return res.status(400).send({message:"Profile not added"})
        }
        
        
    }
    else{
        res.status(402).send({message : "You're not logged in"})
    }

    
})


//get all user profile
router.get('/email', async(req,res)=>{
    const users=await UserProfile.find()
    res.send(users)
    
      
})

router.post("/externalProjects",async(req,res)=>{
    UserProject.find({Email:req.body.user},(err,data)=>{
        if(err) res.send({message:"err"})
        res.send(data)
    })
})  
//routes for search
router.get("/searchUser",async(req,res)=>{
    const project=await UserProject.find()
    const userProfile=await UserProfile.find()
    const data={}
    data["Profile"]=userProfile
    data["Project"]=project
    if(data){
        res.send(data)
    }
    
})

//for bookmark
router.post('/id', async(req,res)=>{

    UserProject.find({_id : req.body.id}, (err,data)=>{
        if(!err) res.json(data)
        else res.status(400).send({message : "Not found"})
    });
})  

module.exports = router