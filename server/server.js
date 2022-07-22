const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('node:path')
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
const Project = require('./routes/Project');
const nodemon = require('nodemon');



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

    mongoose.connect("mongodb+srv://KAV:KAV123456@cluster0.vuoad.mongodb.net/KAV?retryWrites=true&w=majority", { useNewUrlParser: true } , ()=>{
        console.log('connected to db')
    })


//Server Production 
// if("production"==="production"){
//     app.use(express.static(path.join("../client/build")));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client', 'build','index.html'))
//     })
// }

//Listening server on port 5000
app.listen(5000); 