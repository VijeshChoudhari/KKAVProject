const express = require('express')
const router = express.Router()
const UserProject = require('../models/Project') 
const Signup = require('../models/Signup_model')
const jwt = require('jsonwebtoken')
const {ProjectValidation} = require('../validation/validation')

router.get('/' ,(req,res)=>{
    res.send("project")
})
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
       
        
        res.status(200).send(userProject)

    }
    else{
        res.status(402).send({message : "You're not logged in"})
    }
})
//Router for retrieving all Project data of all users
router.get('/all', async(req,res)=>{
    UserProject.find((err,data)=>{
        if(!err){
            res.json(data)
        }
        else{
            res.status(400).send({message : "Data not found"})
        }
    })
})

router.post('/email', async(req,res)=>{

    UserProject.find({Email : req.body.email}, (err,data)=>{
        if(!err) res.json(data)
        else res.status(400).send({message : "Not found"})
    });
})  

module.exports = router