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
       

        const {error} = ProjectValidation(req.body)
        if(error) return res.status(402).send(error)

        const email = data.email
        const userproject = new UserProject({
            Email : email,
            Project_Name : req.body.project_name,
            Tech_Stack : req.body.tech_stack,
            Github_Link : req.body.github_link,
            About_Project : req.body.about_project
        })

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

module.exports = router