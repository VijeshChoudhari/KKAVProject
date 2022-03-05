const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(express.json())
app.get('/', (req,res)=>{
    res.send('Welcome')
})

const Signup = require('./routes/Signup')
app.use('/Signup' , Signup )

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true } , ()=>{
    console.log('connected to db')
})

app.listen(5000);