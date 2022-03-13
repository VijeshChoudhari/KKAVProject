const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv/config');

const app = express();
app.use(express.json())

//Default Home Page
app.get('/home', (req,res)=>{
    res.send('Welcome')
})

//Routing
const Signup = require('./routes/Signup')
const User = require('./routes/User')
const Project = require('./routes/Project')

app.use('/signup' , Signup )
app.use('/user' , User )
app.use('/projects' , Project )

//Library used
app.use(cors({
    credentials : true,
    origin : ['http://localhost:3000']
}))
app.use(cookieParser())

//Database Connection

    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true } , ()=>{
        console.log('connected to db')
    })


//Listening server on port 5000
app.listen(5000); 