const express = require('express')
const Router = express.Router()
const Signup = require('../models/Signup_model')
const UserProfile = require('../models/User_profile')
const jwt = require('jsonwebtoken')
const {LoginValidation} = require('../validation/validation')
const {ProfileValidation} = require('../validation/validation')
const bcrypt = require('bcryptjs')
require('dotenv/config')

Router.post('/Login' , async(req,res)=>{

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
        res.send({ message : "Login Success"}) 
    }
})

Router.get('/' , async(req,res) =>{
    //Taking jwt token from cookie
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
        res.send(data)    
    }
    else {
        res.send({ message : "You're Not Logged in"})
    }
})

Router.post('/ProfileSetup', async(req,res)=>{

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
            Email : data.email,
            Name : req.body.name,
            Profile : req.body.profile,
            Role : req.body.role,
            Working_Place : req.body.working_place,
            Github_Profile : req.body.github_profile,
            LinkedIn_Profile : req.body.linkedin_profile
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

//Logout on post request
Router.post('/Logout' , (req,res)=>{
    res.cookie('jwt' , '' , {maxAge : 0})
    res.send({message : "Logout success"})
})

module.exports = Router