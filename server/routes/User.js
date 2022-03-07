const express = require('express')
const Router = express.Router()
const Signup = require('../models/Signup_model')
const jwt = require('jsonwebtoken')
const {LoginValidation} = require('../validation/validation')
const bcrypt = require('bcryptjs')

Router.post('/Login' , async(req,res)=>{

    //Validation for Login
    const {error} = LoginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await Signup.findOne({email : req.body.email})

    //Checking email and password is correct or not
    if(!user){
        res.status(400).send({message : "Entered incorrect email "})
    }
    else {
        if(! await bcrypt.compare(req.body.password , user.password)){
            res.status(400).send({message : "Entered incorrect email or password !"})
        }

        //Creating token for a particular user
        const token = jwt.sign( {_id: user._id}, "secret")
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
        const claims = jwt.verify(cookieValue , "secret")
        
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

//Logout on post request
Router.post('/Logout' , (req,res)=>{
    res.cookie('jwt' , '' , {maxAge : 0})
    res.send({message : "Logout success"})
})

module.exports = Router