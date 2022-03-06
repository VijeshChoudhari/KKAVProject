const express = require('express')
const router = express.Router();
const Signup = require('../models/Signup_model')
const bcrypt = require('bcryptjs')
const {registerValidation} = require('../validation/validation')


router.post('/register' , async (req,res) =>{
    
    const {error} =await registerValidation(req.body);
    if (error) return res.send(error.details[0].message)
    
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.password, salt)
    
    const email = req.body.email;
    const password = hashedpassword;

    const signup = new Signup({
        email : email,
        password : password
    })

    try{
        const savedUser = await signup.save();
        const {password , ...data} = savedUser.toJSON()
        res.send(data)
    }
    catch(err){
        res.send(err)
    }

    
})

module.exports = router;