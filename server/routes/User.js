const express = require('express')
const Router = express.Router()
const Signup = require('../models/Signup_model')
const UserProfile = require('../models/User_profile')
const bookmark = require('../models/Bookmark')
const jwt = require('jsonwebtoken')
const {LoginValidation} = require('../validation/validation')
const {ProfileValidation} = require('../validation/validation')
const bcrypt = require('bcryptjs')
require('dotenv/config')

Router.post('/login' , async(req,res)=>{

    //Validation for Login
    const {error} = LoginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await Signup.findOne({email : req.body.email})

    //Checking email and password is correct or not
    if(!user){
        res.status(400).send({message : "Entered incorrect email or password"})
    }
    else {
        if(! await bcrypt.compare(req.body.password , user.password)){
            res.status(400).send({message : "Entered incorrect email or password !"})
        }

        //Creating token for a particular user
        const token = jwt.sign( {_id: user._id}, process.env.TOKEN_SECRET)
        res.cookie('jwt', token , {
            httpOnly : true,
            maxAge : 4*60*60*1000 // 4hr 
        })
        
        res.status(200).send({message:"Logged in Successfully"}) 
    }
})

//to check whether user is logged in or not
Router.get('/' , async(req,res) =>{
    //Taking jwt token from cookie
    const cookie = req.headers?.cookie
    
    if(cookie){
        
        const cookieValue = cookie.slice(4)
        const claims = jwt.verify(cookieValue , process.env.TOKEN_SECRET)
        
        if(!claims){
            return res.status(401).send('Unauthorized')
        }
        
        //searching user from token
        const user = await Signup.findOne({_id : claims._id})
        const {password , ...data} = user.toJSON()
       
        res.send(data) 
        
    }
    else {
        res.send("Not logged In")
    }
})
//Logout on post request
Router.post('/logout' , (req,res)=>{
    res.cookie('jwt' , '' , {maxAge : 0})
    res.status(200).send({message : "Logout success"})
    
})
//to get user data 
Router.get('/profileData',async(req,res)=>{
    const cookie = req.headers?.cookie
    
    if(cookie){

        const cookieValue = cookie.slice(4)
        const claims = jwt.verify(cookieValue , process.env.TOKEN_SECRET)
        
        if(!claims){
            return res.status(401).send('Unauthorized')
        }
        
        //searching user from token
        const user = await Signup.findOne({_id : claims._id})
        const {password , ...data} = user.toJSON()
        
        res.status(200).send(data)      
    }
    else {
        res.send("Not logged In")
    }
        

})
//to check user is authenticated or not
Router.get('/profile',async(req,res)=>{
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
        const getUserStatus=await UserProfile.findOne({email : data.email })
      
        if(getUserStatus){
            
            return res.status(200).send({message:"Profile added"})
        }else{
            return res.status(400).send({message:"Profile not added"})
        }

    }else{
        res.send("Not logged In")
    }
    
})
Router.post('/addProfile', async(req,res)=>{

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

       
       
       
        //Validation for User Profile
        const {error} = ProfileValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const userprofile = new UserProfile({
            email : data.email,
            name : req.body.name,
            profile : req.body.profile,
            role : req.body.role,
            place : req.body.place,
            social1Link : req.body.social1Link,
            social2Link : req.body.social2Link,
            
        })
        
        try{
            //Saving User Profile data into database
            const savedData = await userprofile.save();
           
            
            res.send(savedData)
            
        }
        catch(err){
            res.status(401).send(err)
        }
    }
    else {
        res.send({ message : "You're Not Logged in"})
    }
})


Router.get('/bookmark', async(req,res)=>{
    
    const cookie = req.headers?.cookie
    if(cookie){

        const cookieValue = cookie.slice(4)
        const claims = jwt.verify(cookieValue , process.env.TOKEN_SECRET)
        
        if(!claims){
            return res.status(401).send('Unauthorized')
        }

        //searching user from token
        const user = await Signup.findOne({_id : claims._id})
        const {password , ...data} = user.toJSON()
        const getbookmark=await bookmark.findOne({Email : data.email })
        if(!getbookmark) return res.status(402).send({message : "Bookmarks list are empty"})
        const {_id,...bookmarkData}=getbookmark.toJSON()
        res.send(bookmarkData)
          
    }
    else {
        res.send("Not logged In")
    }
    
})


Router.post('/bookmark/add', async(req,res)=>{
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
        
        const Bookmark = new bookmark({
            Email : data.email,
            ProjectId : req.body.projectid,
            ProjectName : req.body.projectname
        })

        try{
            const saveddata = await Bookmark.save()
            res.send(saveddata)
        }
        catch(err){
            res.send(err).status(402)
        }

    }
    else{
        res.status(402).send({message : "You're not logged in"})
    }
})

module.exports = Router